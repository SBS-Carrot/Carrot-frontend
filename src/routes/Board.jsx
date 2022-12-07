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
import {
  MdOutlineLocalCafe,
  MdOutlineQuestionAnswer,
  MdOutlineModeEditOutline,
  MdOutlineHome,
} from "react-icons/md";
import { SlEmotsmile } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";

//스크롤
//https://medium.com/@_diana_lee/react-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-fbd51a8a099f
//https://velog.io/@yunsungyang-omc/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-used-by-Intersection-Observer-1

const Board = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveWrite = () => {
    navigate("/boardWrite");
  };

  const movePost = (id) => {
    navigate(`/boardpost/${id}`);
  };

  //스크롤

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);

    console.log("dd", observer);
    return () => {
      observer.disconnect();
    };
  }, []);

  const obsHandler = (entries) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  useEffect(() => {
    getPost();
  }, [page]);

  const getPost = useCallback(async () => {
    //글 불러오기
    setLoad(true); //로딩 시작

    const res = await axios({
      method: "GET",
      url: `http://localhost:8083/board`,
    });
    if (res.data) {
      if (res.data.lengh) {
        setLifes((prev) => [...prev, ...res.data.lifes]); //리스트 배열에 추가
        preventRef.current = true;
      }
    } else {
      console.log(res);
    }
    console.log("res", res);
    setLoad(false); //로딩 종료
  }, [page]);

  //동네질문
  const [spreadQue, setSpreadQue] = useState(false);
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

  //스크롤
  // const [offset, setOffset] = useState(0);
  // // offset 이후 순서의 데이터부터 8개씩 데이터를 받아올 것임
  // const [target, setTarget] = useState(null); // 관찰대상 target
  // const [isLoaded, setIsLoaded] = useState(false); // Load 중인가를 판별하는 boolean
  // // 요청이 여러번 가는 것을 방지하기 위해서
  // const [stop, setStop] = useState(false); // 마지막 데이터까지 다 불러온 경우 더이상 요청을 보내지 않기 위해서
  // // 마지막 부분까지 가버릴 때 계속 요청을 보내는 것 방지

  // useEffect(() => {
  //   let observer;
  //   if (target && !stop) {
  //     // callback 함수로 onIntersect를 지정
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.5,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target, isLoaded]);

  // // isLoaded가 변할 때 실행
  // useEffect(() => {
  //   // isLoaded가 true일 때 + 마지막 페이지가 아닌 경우 = 요청보내기
  //   if (isLoaded && !stop) {
  //     axios.get(`http://localhost:8083/board`).then((res) => {
  //       // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
  //       setGetCafe((getCafe) => getCafe.concat(res.data));
  //       // 다음 요청할 데이터 offset 정보
  //       setOffset((offset) => offset + res.data.length);
  //       // 다음 요청 전까지 요청 그만 보내도록 false로 변경
  //       setIsLoaded(false);

  //       if (res.data.length < 8) {
  //         // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면 -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
  //         setStop(true);
  //       }
  //       console.log("Res", res);
  //     });
  //   }
  // }, [isLoaded]);

  // const getMoreItem = () => {
  //   // 데이터를 받아오도록 true 로 변경
  //   setIsLoaded(true);
  // };

  // // callback
  // const onIntersect = async ([entry], observer) => {
  //   // entry 요소가 교차되거나 Load중이 아니면
  //   if (entry.isIntersecting && !isLoaded) {
  //     // 관찰은 일단 멈추고
  //     observer.unobserve(entry.target);
  //     // 데이터 불러오기
  //     getMoreItem();
  //     // 불러온 후 다시 관찰 실행
  //     // observer.observe(entry.target);
  //   }
  // };

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
          url: `http://localhost:8083/getBoard/${userid}`,
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
  const [getCafe, setGetCafe] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data1 = await axios({
          url: `http://localhost:8083/board`,
          method: "GET",
        });
        setGetCafe(data1.data.reverse());
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  console.log(getCafe);

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
                          <li key={index} ref={obsRef}>
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
                                    동네 카페
                                  </span>
                                </div>

                                <button
                                  onClick={() => {
                                    movePost(cafe.boardId);
                                  }}
                                  style={{
                                    minHeight: "40px",
                                  }}
                                >
                                  {" "}
                                  <span>{cafe.boardContent}</span>
                                </button>

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
                                      movePost(cafe.boardId);
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
                              {/* <div ref={setTarget}></div> */}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {spreadLife && (
                <div>
                  <div>동네 질문</div>
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
                  <div>동네 카페</div>
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
      </div>
    );
  }
};

export default Board;
