import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
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
        </div>
      </div>
      <hr />
      <div className="bg-gray-200 flex justify-center ">
        <div
          className="bg-white flex items-center flex-col py-40"
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
                style={{
                  width: "300px",
                  backgroundColor: "#F5F5F5",
                  padding: "5px",
                }}
              ></input>
            </div>
          </div>
          <div style={{ border: "1px #dad4d4 solid" }}>
            <input
              type="password"
              placeholder="비밀번호"
              style={{
                width: "300px",
                backgroundColor: "#F5F5F5",
                padding: "5px",
              }}
            ></input>
          </div>

          <div>
            <br />
            <button
              className="rounded p-2 font-bold"
              style={{
                width: "300px",
                color: "white",
                backgroundColor: "#FFB26B",
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
              위치기반서비스 이용약관
            </a>
          </div>
          <div className="flex items-center">© Daangn Market Inc.</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
