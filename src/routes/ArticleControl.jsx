import React from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
const ArticleControl = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const onChangeComplete = () => {
    window.location.replace("/articleControl");
  };
  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate(-1);
  };
  if (!logined) {
    moveBack();
  }
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
            borderBottom: "1px #bcbcbc solid",
            borderTop: "1px #bcbcbc solid",
            display: "flex",
          }}
        >
          <ul
            className="flex flex-row items-center gap-5 ml-4"
            style={{
              fontWeight: "bolder",
            }}
          >
            <li>
              <a href="/mypage">내 프로필</a>
            </li>
            <li>
              <a href="/security">보안설정</a>
            </li>
            <li
              style={{
                color: "#ffa445",
              }}
            >
              <a href="/articleControl">게시글 관리</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleControl;
