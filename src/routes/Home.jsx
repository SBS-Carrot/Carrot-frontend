import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";

const Home = () => {
  const logined = useRecoilValue(authenticatedState);
  return (
    <div>
      <Header />
      <div>Home</div>
      <div>{logined ? "로그인됨" : "로그인안됨"}</div>
    </div>
  );
};

export default Home;
