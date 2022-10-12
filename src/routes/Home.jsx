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
      <div className="section-Box bg-gray-50 flex flex-row">
        <div className="imgBox-1">
          <img
            src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-5fd6fb61d603ab919a45566b2ea6b505c83a93ec218f34ddcd5cb482543e2317.webp"
            alt=""
          />
        </div>
        <div className="flex-grow empty-Box"></div>
        <div className="flex flex-col justify-center">
          <div className="townShopBox">
            <span>내 근처에서 찾는 동네가게</span>
          </div>
          <div className="mt-5">
            <span>우리 동네 가게를 찾고 있나요?</span>
          </div>
          <div>
            <span>동네 주민이 남긴 진짜 후기를 함께 확인해보세요!</span>
          </div>
          <div className="mt-5">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#B7CACA",
                fontWeight: "bolder",
                fontSize: "1.2rem",
              }}
            >
              당근마켓 동네가게 찾기
            </button>
          </div>
        </div>
      </div>
      {/* ul li로 나중에 변경할것 */}
      <div className="section-Box1 bg-gray-100">
        <div
          style={{
            fontWeight: "bolder",
            fontSize: "2.5rem",
            display: "flex",
            justifyContent: "center",
            padding: "4rem 0",
          }}
        >
          <h1>중고거래 인기매물</h1>
        </div>
        <div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "15px",
              outline: "gray 1px solid",
            }}
          >
            <img
              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
              alt=""
              style={{
                borderRadius: "15px",
              }}
            />
          </div>
          <div
            style={{
              width: "200px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflowX: "hidden",
            }}
          >
            <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
          </div>
          <div>
            <span>33,000원</span>
          </div>
          <div>
            <span>부산 진구 부전동</span>
          </div>
          <div>
            <span>관심 5</span>
            <span> º </span>
            <span>채팅 42</span>
          </div>
        </div>
        <div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "15px",
              outline: "gray 1px solid",
            }}
          >
            <img
              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
              alt=""
              style={{
                borderRadius: "15px",
              }}
            />
          </div>
          <div
            style={{
              width: "200px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflowX: "hidden",
            }}
          >
            <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
          </div>
          <div>
            <span>33,000원</span>
          </div>
          <div>
            <span>부산 진구 부전동</span>
          </div>
          <div>
            <span>관심 5</span>
            <span> º </span>
            <span>채팅 42</span>
          </div>
        </div>
        <div
          style={{
            textDecoration: "underline",
            fontSize: "1.1rem",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <a href="#">인기매물 더 보기</a>
        </div>
      </div>

      <div className="searchWordBox">
        <div
          className="mt-8"
          style={{
            fontWeight: "bolder",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          <a href="#">중고거래 인기검색어</a>
        </div>
        <ul className="flex flex-raw gap-10 align-center justify-center mt-8">
          <li>자전거</li>
          <li>포켓몬빵</li>
          <li>캠핑</li>
          <li>아이폰</li>
          <li>당근알바</li>
          <li>의자</li>
          <li>냉장고</li>
          <li>텐트</li>
          <li>노트북</li>
        </ul>
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
