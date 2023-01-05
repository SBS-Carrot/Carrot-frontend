import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { BACKEND_URL } from "../config/config";
const Login = () => {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");

  const navigate = useNavigate();
  const onHomepage = () => {
    navigate("/");
  };
  useEffect(() => {
    if (logined) {
      alert("이미 로그인한 상태입니다.");
      onHomepage();
    }
  }, []);
  const onIdChange = (e) => {
    if (e.target.value.length >= 20) {
      return;
    }
    setIdValue(e.target.value);
  };
  const onPwChange = (e) => {
    if (e.target.value.length >= 20) {
      return;
    }
    setPwValue(e.target.value);
  };

  const onLogin = async (idValue, pwValue) => {
    try {
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/loginUser`,
        method: "POST",
        data: {
          userid: idValue,
          password: pwValue,
        },
      });
      if (data.data == false) {
        alert("로그인 정보가 일치하지 않습니다.");
      } else {
        const logined = data.data.substring(0, 4);
        const userid = data.data.substring(4);
        sessionStorage.setItem("isLogined", logined);
        sessionStorage.setItem("userid", userid);
        setLogined(sessionStorage.getItem("isLogined"));
        onHomepage();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "65px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          className="flex items-center"
          style={{
            width: "500px",
            height: "100%",
            fontSize: "1.2rem",
            fontWeight: "bolder",
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
        </div>
      </div>
      <hr />
      <div className="bg-gray-200 flex justify-center ">
        <div
          className="bg-white flex items-center flex-col py-56"
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            className="font-bold"
            style={{
              fontSize: "2rem",
            }}
          >
            당근 로그인
          </div>
          <br />
          <div className="pb-2">
            <div style={{ border: "1px #dad4d4 solid" }}>
              <input
                type="text"
                placeholder="아이디"
                value={idValue}
                onChange={onIdChange}
                style={{
                  width: "300px",
                  backgroundColor: "#F5F5F5",
                  padding: "5px",
                }}
              />
            </div>
          </div>
          <div style={{ border: "1px #dad4d4 solid" }}>
            <input
              type="password"
              placeholder="비밀번호"
              value={pwValue}
              onChange={onPwChange}
              style={{
                width: "300px",
                backgroundColor: "#F5F5F5",
                padding: "5px",
              }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  onLogin(idValue, pwValue);
                }
              }}
            />
          </div>
          <div>
            <br />
            <button
              className="rounded p-2 font-bold"
              style={{
                width: "300px",
                color: "white",
                backgroundColor: "#fc9d39",
              }}
              onClick={() => {
                if (idValue == "") {
                  window.alert("ID를 입력해 주세요");
                } else if (pwValue == "") {
                  window.alert("비밀번호를 입력해 주세요");
                } else {
                  onLogin(idValue, pwValue);
                }
              }}
            >
              로그인
            </button>
          </div>
          <br />
          <div
            className="p-4"
            style={{
              border: "1px #F3F1F5 solid",
            }}
          >
            {" "}
            <div className="flex gap-3">
              계정이 없으신가요?
              <div
                className="font-bold "
                style={{
                  color: "#FF9F29",
                }}
              >
                <a href="/Join">회원 가입하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div
        className="text-sm flex items-center flex-col"
        style={{
          width: "100%",
          height: "65px",
          margin: "0 auto",
          color: "gray",
        }}
      >
        <div
          className="flex justify-start "
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "1200px",
          }}
        >
          <div
            className="gap-3 flex items-center"
            style={{
              width: "1000px",
            }}
          >
            <a href="#" className="link-hover">
              이용약관
            </a>
            <a href="#" className="link-hover">
              개인정보 취급방침
            </a>
            <a href="#" className="link-hover">
              위치기반 서비스 이용약관
            </a>
          </div>
          <div className="flex items-center">© Daangn Market Inc.</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
