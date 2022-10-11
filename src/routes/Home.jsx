import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";

const Home = () => {
  const logined = useRecoilValue(authenticatedState);
  return (
    <div>
      <Header />
      <div>Home 입니다</div>
      <div className="border-8">테일윈드 적용</div>
    </div>
  );
};

export default Home;
