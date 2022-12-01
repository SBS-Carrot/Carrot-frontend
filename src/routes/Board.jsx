import React from "react";
import Footer from "../layouts/Footer";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import BoardHeader from "../layouts/BoardHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
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
  const [life, setLife] = useState([]);
  const [currentlife, setCurrentLife] = useState([]);

  const onLife = (data) => {
    const datas = data.reverse();
    setLife((prev) => datas);
  };

  const moveBoard = (id) => {
    navigate(`/boardpost/${id}`);
  };

  //데이터 불러오기
  // useEffect(()=>{
  //   const getData =
  // })

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
            {spreadLife && (
              <ul>
                <li></li>
              </ul>
            )}
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
