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

const Board = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveWrite = () => {
    navigate("/boardWrite");
  };

  //동네질문
  //동네 카페
  //나의 동네 생활
  const [spreadLife, setSpreadLife] = useState(false);
  const onSpreadLife = () => {
    setSpreadLife(!spreadLife);
  };
  //
  const [Bpage, setBPage] = useState(1);
  const [lifes, setLifes] = useState([]); //보여줄 게시글

  const BhandlePageChange = (page) => {
    setBPage(page);
  };
  const [BpostPerPage] = useState(4); //한 화면에 4개 표시
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
        setLifes(data.data.slice(0, 4));
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
            border: "1px red solid",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "120px",
              position: "absolute",
              left: "-120px",
            }}
          >
            <button
              style={{
                width: "100%",
                border: "1px red solid",
              }}
            >
              우리동네질문
            </button>
            <button
              style={{
                width: "100%",
                border: "1px red solid",
              }}
            >
              동네 카페
            </button>
            <button
              style={{
                width: "100%",
                border: "1px red solid",
              }}
              onClick={() => {
                onSpreadLife();
              }}
            >
              나의 동네생활
            </button>
            <button
              onClick={() => {
                moveWrite();
              }}
              style={{
                width: "100%",
                border: "1px red solid",
              }}
            >
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
                <ul className="grid grid-cols-2">
                  {lifes.map((life, index) => (
                    <li key={index}>
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
                              {life.boardCategory}{" "}
                            </span>

                            <div
                              className="text-sm"
                              style={{
                                color: "#73777B",
                                textAlign: "left",
                              }}
                            >
                              <div>{life.boardContent}</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
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
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <BoardHeader />

        <Footer />
      </div>
    );
  }
};

export default Board;
