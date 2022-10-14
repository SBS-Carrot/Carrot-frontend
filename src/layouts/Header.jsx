import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [logined, setLogined] = useRecoilState(authenticatedState);

  return (
    <div
      style={{
        width: "100%",
        height: "65px",
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        className="flex items-center justify-around"
        style={{
          width: "500px",
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
          <a href="http://localhost:3000/">
            <FontAwesomeIcon
              icon={faCarrot}
              style={{
                fontSize: "1.8rem",
              }}
            />
            당근마켓
          </a>
        </div>
        <div
          style={{
            color: "#ffa445",
          }}
        >
          <a href="http://localhost:3000/">중고거래</a>
        </div>
        <div>
          <a href="http://localhost:3000/jobs">알바</a>
        </div>
        <div>
          <a href="http://localhost:3000/realty">부동산 직거래</a>
        </div>
      </div>
      <div className="flex-grow justify-center items-center flex" style={{}}>
        <a
          href="#"
          style={{
            outline: "1px #bcbcbc solid",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          로그인
        </a>
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
          style={{
            width: "300px",
            backgroundColor: "#f3f6f4",
            padding: "5px 10px",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default Header;
