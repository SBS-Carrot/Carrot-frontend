import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
const Security = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(
    sessionStorage.getItem("pwCheck") || false
  );
  const [changePassword, setChangePassword] = useState(false);
  const onChangePassword = () => {
    navigate("/changepassword");
  };
  const onChangeComplete = () => {
    window.location.replace("/security");
  };
  const onChange = (e) => {
    if (e.target.value.length > 20) {
      return;
    }
    setPassword(e.target.value);
  };
  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate(-1);
  };
  if (!logined) {
    moveBack();
  }
  useEffect(() => {
    const onSubmit = async () => {
      let abcd = sessionStorage.getItem("userid");
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getUser/${abcd}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);

  const pwCheck = async (password) => {
    const userDto = { userid: sessionStorage.getItem("userid"), password };
    const data = await axios({
      url: `http://${BACKEND_URL}:8083/checkPw`,
      method: "POST",
      data: userDto,
    });
    if (data.data) {
      sessionStorage.setItem("pwCheck", true);
      setChecked(data.data);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

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
            <li
              style={{
                color: "#ffa445",
              }}
            >
              <a href="/security">보안설정</a>
            </li>
            <li>
              <a href="/articleControl">게시글 관리</a>
            </li>
            <li>
              <a href="/ChatList">채팅방 목록</a>
            </li>
          </ul>
        </div>
      </div>
      {!checked && (
        <div
          style={{
            margin: "0 auto",
            width: "800px",
            height: "400px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "15px",
            border: "1px #bcbcbc solid",
            marginTop: "50px",
          }}
        >
          <h1>본인확인을 위해 비밀번호를 입력해 주세요</h1>
          <div className="mt-2">
            <input
              type="password"
              value={password}
              onChange={onChange}
              style={{
                width: "250px",
                height: "50px",
                border: "1px #fc9d39 solid",
                borderRadius: "15px",
              }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  pwCheck(password);
                }
              }}
            />
            <button
              onClick={() => {
                pwCheck(password);
              }}
              style={{
                width: "70px",
                height: "40px",
                border: "1px #fc9d39 solid",
                borderRadius: "10px",
                marginLeft: "15px",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {checked && (
        <div
          style={{
            width: "1000px",
            height: "80vh",

            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "750px",
              border: "1px #fc9d39 solid",
              borderRadius: "20px",
              margin: "20px auto",
              height: "100px",
            }}
          >
            <span
              style={{
                color: "gray",
                marginLeft: "20px",
              }}
            >
              기본보안설정
            </span>
            <div
              style={{
                margin: "5px auto",
                display: "flex",
                justifyContent: "space-between",
                width: "710px",
              }}
            >
              <span>비밀번호 변경</span>
              <button
                onClick={() => {
                  onChangePassword();
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: "10px",
                  backgroundColor: "#eeeeee",
                  color: "gray",
                }}
              >
                수정
              </button>
            </div>
          </div>
          <div
            style={{
              width: "750px",
              border: "1px #fc9d39 solid",
              borderRadius: "20px",
              margin: "20px auto",
              height: "100px",
            }}
          >
            <span
              style={{
                color: "gray",
                marginLeft: "20px",
              }}
            >
              다른보안설정
            </span>
            <div
              style={{
                margin: "5px auto",
                display: "flex",
                justifyContent: "space-between",
                width: "710px",
              }}
            ></div>
          </div>
          <div
            style={{
              width: "750px",
              border: "1px #fc9d39 solid",
              borderRadius: "20px",
              margin: "20px auto",
              height: "100px",
            }}
          >
            <span
              style={{
                color: "gray",
                marginLeft: "20px",
              }}
            >
              또다른보안설정
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
