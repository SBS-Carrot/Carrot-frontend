import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BACKEND_URL } from "../config/config";
const ChangePassword = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password1Value, setPassword1Value] = useState("");
  const [pwCheck, setPwCheck] = useState(false);
  const [pw2Check, setPw2Check] = useState(false);
  const [pwStatus, setPwStatus] = useState(false);
  const [pw2Status, setPw2Status] = useState(false);
  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate("/");
  };
  if (!logined) {
    moveBack();
  }
  const moveMypage = () => {
    navigate("/mypage");
  };
  const dataRuleCheckForPw = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (33 <= ascii && ascii <= 126) return true;
    return false;
  };
  const passwordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/g;
  const onPasswordChange = (e) => {
    let value = e.target.value;
    if (value.length >= 20) {
      return;
    }
    if (value.length <= 7) {
      setPwCheck(false);
    }
    if (value === "") {
      setPasswordValue(value);
      return;
    }
    let length = value.length;
    if (dataRuleCheckForPw(value[length - 1]) === false) {
      return;
    }
    setPasswordValue(value);
    if (length >= 8) {
      if (value.match(passwordReg) === null) {
        setPwStatus(false);
      } else {
        setPwStatus(true);
      }
      setPwCheck((prev) => true);
    } else {
      setPwCheck((prev) => false);
    }
  };

  const onPassword1Change = (e) => {
    let value = e.target.value;
    if (e.target.value.length >= 20) {
      return;
    }
    if (e.target.value.length <= 7) {
      setPw2Check(false);
    }
    if (value === "") {
      setPassword1Value(value);
      return;
    }
    let length = value.length;
    if (dataRuleCheckForPw(value[length - 1]) === false) {
      return;
    }
    setPassword1Value(value);
    if (length >= 8) {
      setPw2Check(true);
      if (value === passwordValue) {
        setPw2Status(true);
      } else {
        setPw2Status(false);
      }
    } else {
      setPw2Check(false);
    }
  };
  const onPassword = (e) => {
    if (e.target.value.length > 20) {
      return;
    }
    setPassword(e.target.value);
  };

  const changePassword = async (currentPw, newPw) => {
    const userid = sessionStorage.getItem("userid");
    const userDto = {
      userid,
      password: currentPw,
      password1: newPw,
    };
    try {
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/changePw`,
        method: "post",
        data: userDto,
      });
      if (data.data) {
        alert("비밀번호가 변경되었습니다.");
        moveMypage();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      console.log(e);
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
        <div
          style={{
            width: "500px",
            height: "600px",
            margin: "0 auto",
            border: "1px #ffa445 solid",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "1.4rem",
                fontWeight: "bolder",
              }}
            >
              비밀번호 변경
            </h1>
            <ul>
              ·&nbsp;
              <li
                style={{
                  color: "red",
                  display: "inline",
                }}
              >
                다른 아이디/사이트에서 사용한 적 없는 비밀번호
              </li>
              <br />
              ·&nbsp;
              <li
                style={{
                  color: "red",
                  display: "inline",
                }}
              >
                이전에 사용한 적 없는 비밀번호
              </li>
              <span>가 안전합니다.</span>
            </ul>
            <div
              style={{
                paddingTop: "50px",
                paddingBottom: "20px",
              }}
            >
              <div>
                <input
                  type="password"
                  style={{
                    outline: "1px #d5d5d5 solid",
                    width: "400px",
                    height: "50px",
                  }}
                  placeholder="현재 비밀번호"
                  value={password}
                  onChange={onPassword}
                />
              </div>
              {pwCheck == true &&
                (pwStatus == true ? (
                  <div
                    style={{
                      position: "absolute",
                      width: "290px",
                      height: "30px",
                      top: "37.5%",
                      left: "50%",
                    }}
                  >
                    <AiOutlineCheckCircle
                      style={{
                        color: "green",
                        fontSize: "1.4rem",
                        display: "inline",
                      }}
                    />
                    <span
                      style={{
                        paddingLeft: "5px",
                      }}
                    >
                      비밀번호 양식에 적합합니다
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      width: "290px",
                      height: "30px",
                      top: "37.5%",
                      left: "50%",
                    }}
                  >
                    <AiOutlineCheckCircle
                      style={{
                        color: "red",
                        fontSize: "1.4rem",
                        display: "inline",
                      }}
                    />
                    <span
                      style={{
                        paddingLeft: "5px",
                      }}
                    >
                      비밀번호 양식을 다시 확인해주세요
                    </span>
                  </div>
                ))}
              <h5
                style={{
                  textAlign: "start",
                  paddingLeft: "50px",
                  paddingBottom: "5px",
                  fontWeight: "bolder",
                  paddingTop: "15px",
                  width: "190px",
                }}
              >
                새 비밀번호
              </h5>
              <input
                type="password"
                placeholder="비밀번호는 8자 ~ 20자 이하, 대소문자+숫자+특수문자"
                value={passwordValue}
                onChange={(e) => onPasswordChange(e)}
                style={{
                  outline: "1px #d5d5d5 solid",
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
                  width: "190px",
                }}
              >
                비밀번호 재확인
              </h5>
              {pw2Check == true &&
                (pw2Status == true ? (
                  <div
                    style={{
                      position: "absolute",
                      width: "290px",
                      height: "30px",
                      top: "46.5%",
                      left: "50%",
                    }}
                  >
                    <AiOutlineCheckCircle
                      style={{
                        color: "green",
                        fontSize: "1.4rem",
                        display: "inline",
                      }}
                    />
                    <span
                      style={{
                        paddingLeft: "5px",
                      }}
                    >
                      비밀번호 일치 확인
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      width: "290px",
                      height: "30px",
                      top: "46.5%",
                      left: "50%",
                    }}
                  >
                    <AiOutlineCheckCircle
                      style={{
                        color: "red",
                        fontSize: "1.4rem",
                        display: "inline",
                      }}
                    />
                    <span
                      style={{
                        paddingLeft: "5px",
                      }}
                    >
                      비밀번호가 일치하지 않습니다.
                    </span>
                  </div>
                ))}
              <input
                type="password"
                placeholder="비밀번호는 8자 ~ 20자 이하, 대소문자+숫자+특수문자"
                value={password1Value}
                onChange={onPassword1Change}
                style={{
                  outline: "1px #d5d5d5 solid",
                  width: "400px",
                  height: "50px",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <button
                style={{
                  margin: "50px auto",
                  backgroundColor: "#ffa445",
                  color: "white",
                  transform: "translateX(-7%)",
                  padding: "20px 40px",
                  fontSize: "1.3rem",
                  fontWeight: "bolder",
                }}
                onClick={() => {
                  if (password1Value.length < 8 || passwordValue.length < 8) {
                    alert("비밀번호는 8자 이상이어야 합니다.");
                  } else if (!pw2Check) {
                    alert("새 비밀번호가 일치하지 않습니다.");
                  } else {
                    changePassword(password, passwordValue);
                  }
                }}
              >
                비밀번호 변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
