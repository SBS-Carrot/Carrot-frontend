import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { BACKEND_URL } from "../config/config";
import { useNavigate } from "react-router-dom";
const LoginedBoardHeader = ({ setLogined }) => {
  const navigate = useNavigate();
  const onMyPage = () => {
    navigate("/mypage");
  };
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = (searchKeyword) => {
    navigate(`/search/${searchKeyword}`);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "65px",
        position: "sticky",
        top: "0%",
        zIndex: "9999",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "1100px",
          height: "100%",
          justifyContent: "space-between",
          margin: "0 auto",
          display: "flex",
          backgroundColor: "white",
          position: "sticky",
          top: "0%",
          zIndex: "9999",
        }}
      >
        <div
          className="flex items-center justify-around"
          style={{
            width: "550px",
            height: "100%",
            fontSize: "1.2rem",
            fontWeight: "bolder",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              color: "#ffa445",
              fontSize: "1.4rem",
            }}
          >
            <a href={`/`} className="fontt">
              <FontAwesomeIcon
                icon={faCarrot}
                style={{
                  fontSize: "1.8rem",
                }}
              />
              당근마켓
            </a>
          </div>
          <div>
            <a href={`/allproduct`}>중고거래</a>
          </div>
          <div>
            <a href={`/alljobs`}>알바</a>
          </div>
          <div>
            <a href={`/allrealty`}>부동산 직거래</a>
          </div>
          <div
            style={{
              color: "#ffa445",
            }}
          >
            <a href={`/board`}>동네게시판</a>
          </div>
        </div>
        <div
          className="flex-grow justify-center items-center flex gap-7"
          style={{}}
        >
          <button
            style={{
              outline: "1px #bcbcbc solid",
              padding: "5px 5px",
              borderRadius: "5px",
            }}
            onClick={() => {
              setLogined(false);
              sessionStorage.clear();
            }}
          >
            로그아웃
          </button>
          <button
            style={{
              outline: "1px #bcbcbc solid",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
            onClick={() => {
              onMyPage();
            }}
          >
            마이 페이지
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              fontSize: "1.5rem",
            }}
          />
          <input
            type="text"
            placeholder="물품이나 동네를 검색해 보세요"
            value={search}
            onChange={onSearchChange}
            style={{
              width: "300px",
              backgroundColor: "#f3f6f4",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                onSearch(search);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginedBoardHeader;
