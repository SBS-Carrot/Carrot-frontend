import React from "react";
import Footer from "../layouts/Footer";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import BoardHeader from "../layouts/BoardHeader";
import { useNavigate } from "react-router-dom";
const Board = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveWrite = () => {
    navigate("/boardWrite");
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
              동네 카페
            </button>
            <button
              style={{
                width: "100%",
                border: "1px red solid",
              }}
            >
              우리동네질문
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

              height: "90px",

              display: "inline",
            }}
          >
            <div></div>
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
