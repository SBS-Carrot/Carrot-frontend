import React from "react";
import Header from "../layouts/Header";
const Join = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          width: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            paddingTop: "5rem",
            margin: "0 auto",
            width: "100%",

            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "7%",
              left: "70%",
              border: "1px gray solid",
              padding: "5px 10px",
            }}
          >
            아이디 확인
          </button>
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
            }}
          >
            아이디
          </h5>
          <input
            type="text"
            placeholder="아이디를 입력해 주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            비밀번호
          </h5>
          <input
            type="password"
            placeholder="비밀번호는 8자 이상 20자 이하, 대문자+소문자+숫자"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />{" "}
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            비밀번호 재확인
          </h5>
          <input
            type="password"
            placeholder="비밀번호는 8자 이상 20자 이하, 대문자+소문자+숫자"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />{" "}
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            이름
          </h5>
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            생년월일
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
              margin: "0 auto",
            }}
          >
            <input
              type="number"
              placeholder="년(4자)"
              style={{
                outline: "1px gray solid",
                width: "125px",
                height: "50px",
              }}
            />
            <input
              type="number"
              placeholder="생년월일"
              style={{
                outline: "1px gray solid",
                width: "125px",
                height: "50px",
              }}
            />
            <input
              type="number"
              placeholder="일"
              style={{
                outline: "1px gray solid",
                width: "125px",
                height: "50px",
              }}
            />
          </div>
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            본인 확인 이메일(선택)
          </h5>
          <input
            type="text"
            placeholder="이메일을 입력해 주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            닉네임 (선택)
          </h5>
          <input
            type="text"
            placeholder="당근마켓 내에서 사용할 닉네임 입력"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            휴대전화
          </h5>
          <input
            type="text"
            placeholder="전화번호 입력"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: "#ffa445",
                padding: "15px 20px",
                borderRadius: "10px",
              }}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
