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
import {
  MdOutlineLocalCafe,
  MdOutlineQuestionAnswer,
  MdOutlineModeEditOutline,
  MdOutlineHome,
} from "react-icons/md";

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
  //
  const [Bpage, setBPage] = useState(1);
  const [lifes, setLifes] = useState([]); //보여줄 게시글

  const BhandlePageChange = (page) => {
    setBPage(page);
  };
  const [BpostPerPage] = useState(8); //한 화면에 8개 표시
  const BindexOfLastPost = Bpage * BpostPerPage;
  const BindexOfFirstPost = BindexOfLastPost - BpostPerPage;

  useEffect(() => {
    setLifes(currentlife.slice(BindexOfFirstPost, BindexOfLastPost));
  }, [BindexOfFirstPost, BindexOfLastPost, Bpage]);

  //
  const [currentlife, setCurrentLife] = useState([]); //전체 게시글

  const onLife = (data) => {
    const datas = data.reverse();
    setCurrentLife((prev) => datas);
  };

  const moveBoard = (id) => {
    navigate(`/boardpost/${id}`);
  };

  //데이터 불러오기
  useEffect(() => {
    const userid = sessionStorage.getItem("userid");
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:8083/getBoard/${userid}`,
          method: "POST",
        });
        onLife(data.data);
        setLifes(data.data.slice(0, 8));
        //console.log(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

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
              {spreadLife && (
                <div>
                  <div>동네 질문</div>
                  <div>동네 카페</div>

                  <ul className="grid grid-cols-2">
                    {lifes.map((life, index) => (
                      <li className="mb-3" key={index}>
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
                              <span
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                {life.boardContent}
                              </span>

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
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {spreadLife && (
              <BoardPaging
                totalCount={currentlife.length}
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
