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
      <span> master branch 추가했습니다</span>
      <span> test branch bug fix했습니다</span>
    </div>
  );
};

export default Home;

//https://goddaehee.tistory.com/274 Branch 기초생성 및 이동
//https://goddaehee.tistory.com/275?category=381481 Branch 병합
