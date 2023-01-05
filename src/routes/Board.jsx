import React from "react";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import BoardHeader from "../layouts/BoardHeader";
import { useNavigate } from "react-router-dom";
import { FaCarrot } from "react-icons/fa";
import { useState } from "react";
import { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import BoardPaging from "../components/BoardPaging";
import BoardQPaging from "../components/BoardQPaging";
import { BACKEND_URL } from "../config/config";
import {
  MdOutlineLocalCafe,
  MdOutlineQuestionAnswer,
  MdOutlineModeEditOutline,
  MdOutlineHome,
} from "react-icons/md";
import { SlEmotsmile } from "react-icons/sl";
import { AiFillLike, AiOutlineCaretRight } from "react-icons/ai";
import { FiMessageCircle, FiCheckCircle } from "react-icons/fi";

const Board = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveWrite = () => {
    navigate("/boardWrite");
  };

  const movePost = async (id, writer) => {
    try {
      if (sessionStorage.getItem("userid") == writer) {
        navigate(`/boardpost/${id}`);
      } else {
        await axios({
          url: `http://${BACKEND_URL}:8083/boardView/${id}`,
          method: "POST",
        });
        navigate(`/boardpost/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //동네질문
  const [spreadQue, setSpreadQue] = useState(true);
  const onSpreadQue = () => {
    setSpreadQue(true);
    setSpreadCafe(false);
    setSpreadLife(false);
  };
  //동네 카페
  const [spreadCafe, setSpreadCafe] = useState(false);
  const onSpreadCafe = () => {
    setSpreadQue(false);
    setSpreadCafe(true);
    setSpreadLife(false);
  };
  //나의 동네 생활
  const [spreadLife, setSpreadLife] = useState(false);
  const onSpreadLife = () => {
    setSpreadQue(false);
    setSpreadCafe(false);
    setSpreadLife(true);
  };
  //동네 카페
  const [Bpage, setBPage] = useState(1);
  const [lifes, setLifes] = useState([]); //전체 게시글
  const [getCafe, setGetCafe] = useState([]);
  const [getQue, setGetQue] = useState([]);

  // 스크롤 질문
  const [Qtarget, setQTarget] = useState(null); // 관찰대상 target
  const [QisLoaded, setQIsLoaded] = useState(false); // Load 중인가를 판별하는 boolean
  // 요청이 여러번 가는 것을 방지하기 위해서
  const [Qstop, setQStop] = useState(false); // 마지막 데이터까지 다 불러온 경우 더이상 요청을 보내지 않기 위해서
  // 마지막 부분까지 가버릴 때 계속 요청을 보내는 것 방지
  const [qnum, setQNum] = useState(1);

  let observer;
  useEffect(() => {
    if (Qtarget && !Qstop) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onQIntersect, {
        threshold: 0.5,
      });
      observer.observe(Qtarget);
    }
    return () => observer && observer.disconnect();
  }, [Qtarget, QisLoaded]);

  // isLoaded가 변할 때 실행
  useEffect(() => {
    if (QisLoaded && !Qstop) {
      axios
        .get(`http://${BACKEND_URL}:8083/qboards?qnum=${qnum}`)
        .then((res) => {
          setGetQue((getQue) => getQue.concat(res.data));
          setQNum(qnum + 1);
          setQIsLoaded(false);

          if (res.data.length == 0) {
            setQStop(true);
          }
        });
    }
  }, [QisLoaded]);

  const getQMoreItem = () => {
    // 데이터를 받아오도록 true 로 변경
    setQIsLoaded(true);
  };

  // callback
  const onQIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !QisLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target);
      // 데이터 불러오기
      getQMoreItem();
      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target);
    }
  };
  //스크롤 카페
  const [target, setTarget] = useState(null); // 관찰대상 target
  const [isLoaded, setIsLoaded] = useState(false); // Load 중인가를 판별하는 boolean
  // 요청이 여러번 가는 것을 방지하기 위해서
  const [stop, setStop] = useState(false); // 마지막 데이터까지 다 불러온 경우 더이상 요청을 보내지 않기 위해서
  // 마지막 부분까지 가버릴 때 계속 요청을 보내는 것 방지
  const [num, setNum] = useState(1);
  useEffect(() => {
    if (target && !stop) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target, isLoaded]);

  // isLoaded가 변할 때 실행
  useEffect(() => {
    // isLoaded가 true일 때 + 마지막 페이지가 아닌 경우 = 요청보내기
    if (isLoaded && !stop) {
      //api 카페만 몇개 불러오는지에 대한 주소 새로 만들어야함.
      //초기값 7개 , 스크롤 내릴 때마다 그 다음 7개에 대한 인덱스만 가져와야함
      axios.get(`http://${BACKEND_URL}:8083/boards?num=${num}`).then((res) => {
        // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
        setGetCafe((getCafe) => getCafe.concat(res.data));
        setNum(num + 1);
        // 다음 요청 전까지 요청 그만 보내도록 false로 변경
        setIsLoaded(false);

        if (res.data.length == 0) {
          // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면 -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
          setStop(true);
        }
      });
    }
  }, [isLoaded]);

  const getMoreItem = () => {
    // 데이터를 받아오도록 true 로 변경
    setIsLoaded(true);
  };

  // callback
  const onIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !isLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target);
      // 데이터 불러오기
      getMoreItem();
      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target);
    }
  };

  //페이지
  const BhandlePageChange = (page) => {
    setBPage(page);
  };
  const [BpostPerPage] = useState(6); //한 화면에 8개 표시
  const BindexOfLastPost = Bpage * BpostPerPage;
  const BindexOfFirstPost = BindexOfLastPost - BpostPerPage;

  useEffect(() => {
    setCurrentLife(lifes.slice(BindexOfFirstPost, BindexOfLastPost));
  }, [BindexOfFirstPost, BindexOfLastPost, Bpage]);

  const [currentlife, setCurrentLife] = useState([]); //보여줄 게시글

  const onLife = (list) => {
    const newList = list.filter((index) => {
      return index.boardCategory == "동네 카페" ? true : false;
    });
    setLifes(newList);
    setCurrentLife(newList.reverse().slice(0, 6));
  };
  const onQLifes = (list) => {
    const newList = list.filter((index) => {
      return index.boardCategory == "동네 질문" ? true : false;
    });
    setQLifes(newList);
    setCurrentQLife(newList.reverse().slice(0, 6));
  };
  const moveBoard = (id) => {
    navigate(`/boardpost/${id}`);
  };

  //동네질문
  const [BQpage, setBQPage] = useState(1);
  const [Qlifes, setQLifes] = useState([]); //전체 게시글

  const BQhandlePageChange = (page) => {
    setBQPage(page);
  };
  const [BQpostPerPage] = useState(6); //한 화면에 8개 표시
  const BQindexOfLastPost = BQpage * BQpostPerPage;
  const BQindexOfFirstPost = BQindexOfLastPost - BQpostPerPage;

  useEffect(() => {
    setCurrentQLife(Qlifes.slice(BQindexOfFirstPost, BQindexOfLastPost));
  }, [BQindexOfFirstPost, BQindexOfLastPost, BQpage]);

  const [currentQlife, setCurrentQLife] = useState([]); //보여줄 게시글
  const userid = sessionStorage.getItem("userid");

  //데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getBoard/${userid}`,
          method: "POST",
        });
        onLife(data.data);
        onQLifes(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data1 = await axios({
          url: `http://${BACKEND_URL}:8083/board`,
          method: "GET",
        });

        onCafe(data1.data);
        onQue(data1.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const onCafe = (list) => {
    const newList = list.filter((index) => {
      return index.boardCategory == "동네 카페" ? true : false;
    });
    setGetCafe(newList.reverse().slice(0, 7));
  };
  const onQue = (list) => {
    const newList = list.filter((index) => {
      return index.boardCategory == "동네 질문" ? true : false;
    });
    setGetQue(newList.reverse().slice(0, 7));
  };

  if (logined) {
    return (
      <div>
        <LoginedBoardHeader setLogined={setLogined} />
        <div
          className="flex"
          style={{
            width: "800px",
            margin: "0 auto",

            position: "relative",
          }}
        >
          <div
            style={{
              width: "150px",
              position: "absolute",
              left: "-170px",
            }}
          >
            <button
              className="flex  items-start"
              style={{
                width: "100%",
              }}
              onClick={() => {
                onSpreadQue();
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineQuestionAnswer />
              </span>
              {spreadQue == false ? (
                "우리동네질문"
              ) : (
                <div className="font-bold">우리동네질문</div>
              )}
            </button>
            <button
              className="flex items-start"
              style={{
                width: "100%",
              }}
              onClick={() => {
                onSpreadCafe();
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineLocalCafe />
              </span>
              {spreadCafe == false ? (
                "동네 카페"
              ) : (
                <div className="font-bold">동네 카페</div>
              )}
            </button>
            <button
              className="flex items-start"
              style={{
                width: "100%",
              }}
              onClick={() => {
                onSpreadLife();
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineHome />
              </span>
              {spreadLife == false ? (
                "나의 동네생활"
              ) : (
                <div className="font-bold">나의 동네생활</div>
              )}
            </button>
            <button
              className="flex items-start"
              onClick={() => {
                moveWrite();
              }}
              style={{
                width: "100%",
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineModeEditOutline />
              </span>
              게시판 글쓰기
            </button>
          </div>
          <div
            style={{
              width: "100%",
              display: "inline",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              {spreadQue && (
                <div className="pt-2">
                  <div
                    style={{
                      margin: "0 auto",
                      width: "700px",
                    }}
                  >
                    <ul>
                      {getQue.map((que, index) => (
                        <li key={index}>
                          <div
                            className=" pt-2 mb-2"
                            style={{
                              border: "1px rgb(209, 209, 209) solid",
                            }}
                          >
                            <div className="p-3">
                              <div className="pb-3">
                                <span
                                  className="rounded-lg p-1"
                                  style={{
                                    backgroundColor: "rgb(209, 209, 209)",
                                  }}
                                >
                                  {que.boardCategory}
                                </span>
                              </div>

                              <div
                                className="flex gap-1"
                                onClick={() => {
                                  movePost(que.boardId);
                                }}
                                style={{
                                  minHeight: "40px",
                                  cursor: "pointer",
                                }}
                              >
                                {" "}
                                <span
                                  className="font-bold"
                                  style={{
                                    color: "orange",
                                  }}
                                >
                                  Q
                                </span>
                                <div
                                  className="ellipsis_3"
                                  style={{
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {que.boardContent}
                                </div>
                              </div>

                              <div
                                className="mt-1 flex justify-between"
                                style={{
                                  color: "gray",
                                }}
                              >
                                <span>{que.boardUserid}</span>
                                <span>{que.createDate}</span>
                              </div>
                            </div>
                            <hr />
                            <div className="flex p-2 justify-between">
                              <div className="flex gap-2">
                                <button className="flex items-center gap-1">
                                  <span>
                                    <FiCheckCircle />
                                  </span>
                                  <span> 궁금해요</span>
                                </button>
                                <button
                                  className="flex items-center gap-1"
                                  onClick={() => {
                                    movePost(que.boardId);
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    <FiMessageCircle />
                                  </span>
                                  {que.boardChattingNum > 0 ? (
                                    <div>
                                      <span>댓글</span>
                                      <span> {que.boardChattingNum}</span>
                                    </div>
                                  ) : (
                                    <span> 댓글쓰기</span>
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center gap-1">
                                <span
                                  className="rounded-full"
                                  style={{
                                    color: "white",
                                    padding: "2px",
                                    backgroundColor: "orange",
                                  }}
                                >
                                  <AiFillLike />
                                </span>
                                {que.boardAgree}
                              </div>
                            </div>
                            <div ref={setQTarget} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 동네 카페 */}
              {spreadCafe && (
                <div>
                  <div className="pt-2">
                    <div
                      style={{
                        margin: "0 auto",
                        width: "700px",
                      }}
                    >
                      <ul>
                        {getCafe.map((cafe, index) => (
                          <li key={index}>
                            <div
                              className=" pt-2 mb-2"
                              style={{
                                border: "1px rgb(209, 209, 209) solid",
                              }}
                            >
                              <div className="p-3">
                                <div className="pb-3">
                                  <span
                                    className="rounded-lg p-1"
                                    style={{
                                      backgroundColor: "rgb(209, 209, 209)",
                                    }}
                                  >
                                    {cafe.boardCategory}
                                  </span>
                                </div>

                                <div
                                  onClick={() => {
                                    movePost(cafe.boardId, cafe.boardUserid);
                                  }}
                                  style={{
                                    minHeight: "40px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {" "}
                                  <div
                                    className="ellipsis_3"
                                    style={{
                                      whiteSpace: "pre-wrap",
                                    }}
                                  >
                                    {cafe.boardContent}
                                  </div>
                                </div>

                                <div
                                  className="mt-1 flex justify-between"
                                  style={{
                                    color: "gray",
                                  }}
                                >
                                  <span>{cafe.boardUserid}</span>
                                  <span>{cafe.createDate}</span>
                                </div>
                              </div>
                              <hr />
                              <div className="flex p-2 justify-between">
                                <div className="flex gap-2">
                                  <button className="flex items-center gap-1">
                                    <span>
                                      <SlEmotsmile />
                                    </span>
                                    <span>공감하기</span>
                                  </button>
                                  <button
                                    className="flex items-center gap-1"
                                    onClick={() => {
                                      movePost(cafe.boardId, cafe.boardUserid);
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "1.2rem",
                                      }}
                                    >
                                      <FiMessageCircle />
                                    </span>
                                    {cafe.boardChattingNum > 0 ? (
                                      <div>
                                        <span>댓글</span>
                                        <span> {cafe.boardChattingNum}</span>
                                      </div>
                                    ) : (
                                      <span> 댓글쓰기</span>
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span
                                    className="rounded-full"
                                    style={{
                                      color: "white",
                                      padding: "2px",
                                      backgroundColor: "orange",
                                    }}
                                  >
                                    <AiFillLike />
                                  </span>
                                  {cafe.boardAgree}
                                </div>
                              </div>
                              <div ref={setTarget}></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {/* 나의 동네 생활 */}
              {spreadLife && (
                <div>
                  <div className="font-bold mb-2 flex">
                    {" "}
                    <span className="flex items-center">
                      <AiOutlineCaretRight />
                    </span>
                    동네 질문
                  </div>
                  <ul className="grid grid-cols-2">
                    {currentQlife.map((Qlife, index) => (
                      <li className="mb-3" key={index}>
                        {Qlife.boardCategory == "동네 질문" && (
                          <button
                            onClick={() => {
                              moveBoard(Qlife.boardId);
                            }}
                          >
                            <div
                              className="flex"
                              style={{
                                height: "120px",
                              }}
                            >
                              <div
                                style={{
                                  width: "120px",
                                  height: "120px",
                                  borderRadius: "10px",
                                }}
                              >
                                {Qlife.profileImage != null ? (
                                  <img
                                    src={Qlife.profileImage}
                                    alt=""
                                    style={{
                                      borderRadius: "15px",
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "fill",
                                      display: "block",
                                    }}
                                  />
                                ) : (
                                  <FaCarrot
                                    style={{
                                      color: "#fc9d39",
                                      fontSize: "7rem",
                                      transform: "translate(1.5%,1.5%)",
                                      border: "0.1px #fc9d39 solid",
                                      borderRadius: "50%",
                                    }}
                                  />
                                )}
                              </div>
                              <div
                                className=""
                                style={{
                                  textAlign: "left",
                                  marginLeft: "10px",
                                }}
                              >
                                <div
                                  className="ellipsis_2"
                                  style={{
                                    maxWidth: "260px",
                                    maxHeight: "50px",
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "left",
                                    }}
                                  >
                                    {Qlife.boardContent}
                                  </span>
                                </div>
                                <div
                                  className="text-sm"
                                  style={{
                                    color: "#73777B",
                                    textAlign: "left",
                                  }}
                                >
                                  <div>{Qlife.boardCategory} </div>
                                </div>
                                <div className="text-sm">
                                  <span className="mr-2">
                                    공감 {Qlife.boardAgree}
                                  </span>
                                  <span>댓글 {Qlife.boardChattingNum}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {spreadLife && (
                    <BoardQPaging
                      totalCount={Qlifes.length}
                      page={BQpage}
                      postPerPage={BQpostPerPage}
                      pageRangeDisplayed={5}
                      handlePageChange={BQhandlePageChange}
                    />
                  )}
                  <div className="font-bold mb-2 flex">
                    {" "}
                    <span className="flex items-center">
                      <AiOutlineCaretRight />
                    </span>
                    동네 카페
                  </div>
                  <ul className="grid grid-cols-2">
                    {currentlife.map((life, index) => (
                      <li className="mb-3" key={index}>
                        {life.boardCategory == "동네 카페" && (
                          <button
                            onClick={() => {
                              moveBoard(life.boardId);
                            }}
                          >
                            <div
                              className="flex"
                              style={{
                                height: "120px",
                              }}
                            >
                              <div
                                style={{
                                  width: "120px",
                                  height: "120px",

                                  borderRadius: "10px",
                                }}
                              >
                                {life.profileImage != null ? (
                                  <img
                                    src={life.profileImage}
                                    alt=""
                                    style={{
                                      borderRadius: "15px",
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "fill",
                                      display: "block",
                                    }}
                                  />
                                ) : (
                                  <FaCarrot
                                    style={{
                                      color: "#fc9d39",
                                      fontSize: "7rem",
                                      transform: "translate(1.5%,1.5%)",
                                      border: "0.1px #fc9d39 solid",
                                      borderRadius: "50%",
                                    }}
                                  />
                                )}
                              </div>
                              <div
                                className=""
                                style={{
                                  textAlign: "left",
                                  marginLeft: "10px",
                                }}
                              >
                                <div
                                  className="ellipsis_2"
                                  style={{
                                    maxWidth: "260px",
                                    maxHeight: "50px",
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "left",
                                    }}
                                  >
                                    {life.boardContent}
                                  </span>
                                </div>
                                <div
                                  className="text-sm"
                                  style={{
                                    color: "#73777B",
                                    textAlign: "left",
                                  }}
                                >
                                  <div>{life.boardCategory} </div>
                                </div>
                                <div className="text-sm">
                                  <span className="mr-2">
                                    공감 {life.boardAgree}
                                  </span>
                                  <span>댓글 {life.boardChattingNum}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {spreadLife && (
              <BoardPaging
                totalCount={lifes.length}
                page={Bpage}
                postPerPage={BpostPerPage}
                pageRangeDisplayed={5}
                handlePageChange={BhandlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <BoardHeader />
        <div
          className="flex"
          style={{
            width: "800px",
            margin: "0 auto",

            position: "relative",
          }}
        >
          <div
            style={{
              width: "150px",
              position: "absolute",
              left: "-170px",
            }}
          >
            <button
              className="flex  items-start"
              style={{
                width: "100%",
              }}
              onClick={() => {
                onSpreadQue();
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineQuestionAnswer />
              </span>
              {spreadQue == false ? (
                "우리동네질문"
              ) : (
                <div className="font-bold">우리동네질문</div>
              )}
            </button>
            <button
              className="flex items-start"
              style={{
                width: "100%",
              }}
              onClick={() => {
                onSpreadCafe();
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineLocalCafe />
              </span>
              {spreadCafe == false ? (
                "동네 카페"
              ) : (
                <div className="font-bold">동네 카페</div>
              )}
            </button>
            <button
              className="flex items-start"
              style={{
                width: "100%",
              }}
              onClick={() => {
                alert("로그인 후 이용해주세요!");
                navigate(`/login`);
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineHome />
              </span>
              {spreadLife == false ? (
                "나의 동네생활"
              ) : (
                <div className="font-bold">나의 동네생활</div>
              )}
            </button>
            <button
              className="flex items-start"
              onClick={() => {
                moveWrite();
              }}
              style={{
                width: "100%",
              }}
            >
              <span className="mt-1 mr-1">
                <MdOutlineModeEditOutline />
              </span>
              게시판 글쓰기
            </button>
          </div>
          <div
            style={{
              width: "100%",
              display: "inline",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              {spreadQue && (
                <div className="pt-2">
                  <div
                    style={{
                      margin: "0 auto",
                      width: "700px",
                    }}
                  >
                    <ul>
                      {getQue.map((que, index) => (
                        <li key={index}>
                          <div
                            className=" pt-2 mb-2"
                            style={{
                              border: "1px rgb(209, 209, 209) solid",
                            }}
                          >
                            <div className="p-3">
                              <div className="pb-3">
                                <span
                                  className="rounded-lg p-1"
                                  style={{
                                    backgroundColor: "rgb(209, 209, 209)",
                                  }}
                                >
                                  {que.boardCategory}
                                </span>
                              </div>

                              <div
                                className="flex gap-1"
                                onClick={() => {
                                  movePost(que.boardId);
                                }}
                                style={{
                                  minHeight: "40px",
                                  cursor: "pointer",
                                }}
                              >
                                {" "}
                                <span
                                  className="font-bold"
                                  style={{
                                    color: "orange",
                                  }}
                                >
                                  Q
                                </span>
                                <div>{que.boardContent}</div>
                              </div>

                              <div
                                className="mt-1 flex justify-between"
                                style={{
                                  color: "gray",
                                }}
                              >
                                <span>{que.boardUserid}</span>
                                <span>{que.createDate}</span>
                              </div>
                            </div>
                            <hr />
                            <div className="flex p-2 justify-between">
                              <div className="flex gap-2">
                                <button
                                  className="flex items-center gap-1"
                                  onClick={() => {
                                    alert("로그인 후 이용해주세요.");
                                  }}
                                >
                                  <span>
                                    <FiCheckCircle />
                                  </span>
                                  <span>궁금해요</span>
                                </button>
                                <button
                                  className="flex items-center gap-1"
                                  onClick={() => {
                                    movePost(que.boardId);
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    <FiMessageCircle />
                                  </span>
                                  {que.boardChattingNum > 0 ? (
                                    <div>
                                      <span>댓글</span>
                                      <span> {que.boardChattingNum}</span>
                                    </div>
                                  ) : (
                                    <span> 댓글쓰기</span>
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center gap-1">
                                <span
                                  className="rounded-full"
                                  style={{
                                    color: "white",
                                    padding: "2px",
                                    backgroundColor: "orange",
                                  }}
                                >
                                  <AiFillLike />
                                </span>
                                {que.boardAgree}
                              </div>
                            </div>
                            <div ref={setQTarget} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 동네 카페 */}
              {spreadCafe && (
                <div>
                  <div className="pt-2">
                    <div
                      style={{
                        margin: "0 auto",
                        width: "700px",
                      }}
                    >
                      <ul>
                        {getCafe.map((cafe, index) => (
                          <li key={index}>
                            <div
                              className=" pt-2 mb-2"
                              style={{
                                border: "1px rgb(209, 209, 209) solid",
                              }}
                            >
                              <div className="p-3">
                                <div className="pb-3">
                                  <span
                                    className="rounded-lg p-1"
                                    style={{
                                      backgroundColor: "rgb(209, 209, 209)",
                                    }}
                                  >
                                    {cafe.boardCategory}
                                  </span>
                                </div>

                                <div
                                  onClick={() => {
                                    movePost(cafe.boardId, cafe.boardUserid);
                                  }}
                                  style={{
                                    minHeight: "40px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {" "}
                                  <div className="ellipsis_3">
                                    {cafe.boardContent}
                                  </div>
                                </div>

                                <div
                                  className="mt-1 flex justify-between"
                                  style={{
                                    color: "gray",
                                  }}
                                >
                                  <span>{cafe.boardUserid}</span>
                                  <span>{cafe.createDate}</span>
                                </div>
                              </div>
                              <hr />
                              <div className="flex p-2 justify-between">
                                <div className="flex gap-2">
                                  <button
                                    className="flex items-center gap-1"
                                    onClick={() => {
                                      alert("로그인 후 이용해주세요.");
                                    }}
                                  >
                                    <span>
                                      <SlEmotsmile />
                                    </span>
                                    <span>공감하기</span>
                                  </button>
                                  <button
                                    className="flex items-center gap-1"
                                    onClick={() => {
                                      movePost(cafe.boardId, cafe.boardUserid);
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "1.2rem",
                                      }}
                                    >
                                      <FiMessageCircle />
                                    </span>
                                    {cafe.boardChattingNum > 0 ? (
                                      <div>
                                        <span>댓글</span>
                                        <span> {cafe.boardChattingNum}</span>
                                      </div>
                                    ) : (
                                      <span> 댓글쓰기</span>
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span
                                    className="rounded-full"
                                    style={{
                                      color: "white",
                                      padding: "2px",
                                      backgroundColor: "orange",
                                    }}
                                  >
                                    <AiFillLike />
                                  </span>
                                  {cafe.boardAgree}
                                </div>
                              </div>
                              <div ref={setTarget}></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Board;
