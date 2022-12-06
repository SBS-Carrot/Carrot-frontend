import React from "react";
import Footer from "../layouts/Footer";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import BoardHeader from "../layouts/BoardHeader";
import { useNavigate } from "react-router-dom";
import { FaCarrot } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BoardPaging from "../components/BoardPaging";
import BoardQPaging from "../components/BoardQPaging";
import {
  MdOutlineLocalCafe,
  MdOutlineQuestionAnswer,
  MdOutlineModeEditOutline,
  MdOutlineHome,
} from "react-icons/md";
//스크롤
//https://medium.com/@_diana_lee/react-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-fbd51a8a099f
//https://velog.io/@yunsungyang-omc/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-used-by-Intersection-Observer-1

const Board = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveWrite = () => {
    navigate("/boardWrite");
  };

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
        setGetCafe(data1.data);
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
          {spreadCafe && (
            <div>
              <div className="pt-2">
                <div
                  style={{
                    width: "700px",
                  }}
                >
                  <ul>
                    {getCafe.map((cafe, index) => (
                      <li key={index} style={{}}>
                        <div>
                          <div
                            className=" pt-5 mb-2"
                            style={{
                              border: "1px rgb(209, 209, 209) solid",
                            }}
                          >
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
                            <div
                              style={{
                                height: "40px",
                              }}
                            >
                              {cafe.boardContent}
                            </div>
                            <div
                              className="flex justify-between"
                              style={{
                                color: "gray",
                              }}
                            >
                              <span>{cafe.boardUserid}</span>
                              <span>{cafe.createDate}</span>
                            </div>
                            <hr />
                            <div>
                              <span>공감하기</span>
                              <span>댓글</span>
                              {cafe.boardAgree}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
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
