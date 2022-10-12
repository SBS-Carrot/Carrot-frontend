import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import "../styles/Home.css";

const Home = () => {
  const logined = useRecoilValue(authenticatedState);
  return (
    <div>
      <Header />
      <div className="background1 flex items-center">
        <div
          className="flex"
          style={{
            width: "1000px",

            margin: "0 auto",
          }}
        >
          <div className="flex justify-center flex-col">
            <div
              className="font-bold"
              style={{
                fontSize: "3rem",
              }}
            >
              <div
                style={{
                  width: "300px",
                }}
              >
                당신 근처의
              </div>
              <div>당근마켓</div>
            </div>
            <div
              className="mt-8"
              style={{
                width: "330px",
              }}
            >
              <div>중고 거래부터 동네 정보까지, 이웃과 함께해</div>
              <div>가깝고 따듯한 당신의 근처를 만들어요.</div>
            </div>
          </div>
          <div>
            <div className="firstimg">
              <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

//https://goddaehee.tistory.com/274 Branch 기초생성 및 이동
//https://goddaehee.tistory.com/275?category=381481 Branch 병합

//branch - master, test 두종류.
//master에서 작업 후 git add, commit ,push.
//git switch test해서 test branch로 이동 후 git pull origin master
//test branch에서 작업 후 git add, commit, git push origin test
//git switch master해서 master로 이동, git pull origin test.
