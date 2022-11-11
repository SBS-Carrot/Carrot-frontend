import React from "react";
import LoginedHeader from "../layouts/LoginedHeader";

const MyPage = ({ setLogined }) => {
  return (
    <div>
      <LoginedHeader setLogined={setLogined} />
      <div
        style={{
          width: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            height: "40px",
            position: "sticky",
            top: "0%",
            borderBottom: "1px #bcbcbc solid",
            borderTop: "1px #bcbcbc solid",
            zIndex: "9999",
            display: "flex",
          }}
        >
          <ul
            className="flex flex-row items-center gap-5 ml-4"
            style={{
              fontWeight: "bolder",
            }}
          >
            <li>내 프로필</li>
            <li>보안설정</li>
            <li>게시글 관리</li>
          </ul>
        </div>
        <div
          style={{
            border: "1px red solid",
          }}
        >
          <div className="mt-10">
            <h2>프로필 수정</h2>
            <h2>당근마켓 대표 이미지와 닉네임을 변경할 수 있습니다.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
