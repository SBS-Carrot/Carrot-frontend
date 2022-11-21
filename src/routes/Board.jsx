import React from "react";
import Footer from "../layouts/Footer";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import BoardHeader from "../layouts/BoardHeader";
const Board = ({ logined, setLogined }) => {
  if (logined) {
    return (
      <div>
        <LoginedBoardHeader setLogined={setLogined} />

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
