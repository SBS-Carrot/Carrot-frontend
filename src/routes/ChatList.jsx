import { useEffect, useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ChatList = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveHome = () => {
    navigate("/");
  };
  if (!logined) {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    moveHome();
  }
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:8083/getChatList",
          method: "get",
        });
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
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
              <a href="/mypage">내 프로필</a>{" "}
            </li>
            <li>
              <a href="/security">보안설정</a>
            </li>
            <li>
              <a href="/articleControl">게시글 관리</a>
            </li>
            <li
              style={{
                color: "#ffa445",
              }}
            >
              <a href="/chatList">채팅방 목록</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
