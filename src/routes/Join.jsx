import { useState } from "react";
import axios from "axios";
import Header from "../layouts/Header";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Join = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password1Value, setPassword1Value] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [birthValue, setBirthValue] = useState({
    yy: "",
    mm: "",
    dd: "",
  });

  const [addressValue, setAddressValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [useid, setUseid] = useState(false);
  const [pwStatus, setPwStatus] = useState(false);

  const IdCheck = async (idValue) => {
    try {
      const data = await axios.get(`http://localhost:8083/checkId/${idValue}`);
      setIdCheck(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const dataRuleCheckForID = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    // if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    // if (ch === ".") return true;

    return false;
  };
  const dataRuleCheckForPw = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (33 <= ascii && ascii <= 126) return true;
    return false;
  };
  const onUseidChange = () => {
    setUseid(!useid);
  };
  const onIdChange = (e) => {
    let value = e.target.value;
    if (e.target.value.length >= 20) {
      return;
    }
    if (value === "") {
      setIdValue(value);
      return;
    }
    let length = value.length;
    if (dataRuleCheckForID(value[length - 1]) === false) {
      return;
    }

    setIdValue(value);
    return;
  };
  const passwordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/g;

  const onPasswordChange = (e) => {
    let value = e.target.value;
    if (e.target.value.length >= 20) {
      return;
    }
    if (e.target.value.length <= 7) {
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
    if (e.target.value.length >= 8) {
      if (e.target.value.match(passwordReg) === null) {
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
    setPassword1Value(e.target.value);
  };

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const onYearChange = (e) => {
    setBirthValue((prev) => {
      return { ...prev, yy: e.target.value };
    });
  };
  const onMonthChange = (e) => {
    setBirthValue((prev) => {
      return { ...prev, mm: e.target.value };
    });
  };
  const onDayChange = (e) => {
    setBirthValue((prev) => {
      return { ...prev, dd: e.target.value };
    });
  };
  const onAddressChange = (e) => {
    setAddressValue(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const onNicknameChange = (e) => {
    setNicknameValue(e.target.value);
  };
  const onPhoneChange = (e) => {
    setPhoneValue(e.target.value);
  };

  const onJoin = async (
    idValue,
    passwordValue,
    password1Value,
    nameValue,
    birthValue,
    addressValue,
    emailValue,
    nicknameValue,
    phoneValue
  ) => {
    try {
      const data = await axios.post(`http://localhost:8083/createUser`, {
        userid: idValue,
        password: passwordValue,
        password2: password1Value,
        username: nameValue,
        birth: birthValue,
        email: emailValue,
        nickname: nicknameValue,
        address: addressValue,
        phone: phoneValue,
      });
      window.alert("회원가입 완료");
    } catch (e) {
      console.log(e);
    }
  };

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
            onClick={() => {
              if (idValue.length >= 5) {
                IdCheck(idValue);
                onUseidChange();
              } else {
                window.alert("ID는 최소 5글자 이상이어야 합니다.");
              }
            }}
          >
            아이디 확인
          </button>
          {idCheck == true
            ? useid && (
                <div
                  style={{
                    width: "320px",
                    height: "130px",
                    position: "absolute",
                    border: "1px #fcb264 solid",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    left: "20%",
                    top: "15%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{}}>
                    <div>
                      <span>"{idValue}"은(는) 사용 가능한 아이디입니다.</span>
                    </div>
                    <div>
                      <span>사용하시겠습니까?</span>
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#fcb264",
                          color: "white",
                          width: "70px",
                          height: "30px",
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          onUseidChange();
                        }}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              )
            : useid && (
                <div
                  style={{
                    width: "320px",
                    height: "150px",
                    position: "absolute",
                    border: "1px #fcb264 solid",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    left: "20%",
                    top: "15%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <span>"{idValue}"은(는) 사용 불가능하거나</span>
                    <span>이미 존재하는 아이디입니다.</span>
                    <span>다른 아이디를 사용해주세요</span>
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#fcb264",
                          color: "white",
                          width: "70px",
                          height: "30px",
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          onUseidChange();
                        }}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
            placeholder="아이디를 입력해 주세요, 소문자+숫자"
            value={idValue}
            onChange={(e) => onIdChange(e)}
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
            }}
          >
            비밀번호
          </h5>
          {pwCheck == true &&
            (pwStatus == true ? (
              <div
                style={{
                  position: "absolute",
                  width: "270px",
                  height: "30px",
                  top: "17.5%",
                  left: "40%",
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
                  "비밀번호 양식에 적합합니다."
                </span>
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  width: "270px",
                  height: "30px",
                  top: "17.5%",
                  left: "40%",
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
                  "비밀번호 양식이 틀렸습니다."
                </span>
              </div>
            ))}
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
            value={nameValue}
            onChange={onNameChange}
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
              type="text"
              placeholder="생년(4자)"
              onChange={onYearChange}
              value={birthValue.yy}
              style={{
                outline: "1px #d5d5d5 solid",
                width: "125px",
                height: "50px",
              }}
            />
            <select
              placeholder="월"
              value={birthValue.mm}
              onChange={onMonthChange}
              style={{
                outline: "1px #d5d5d5 solid",
                width: "125px",
                height: "50px",
              }}
            >
              <option value="01">1월</option>
              <option value="02">2월</option>
              <option value="03">3월</option>
              <option value="04">4월</option>
              <option value="05">5월</option>
              <option value="06">6월</option>
              <option value="07">7월</option>
              <option value="08">8월</option>
              <option value="09">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </select>

            <select
              placeholder="일"
              onChange={onDayChange}
              value={birthValue.dd}
              style={{
                outline: "1px #d5d5d5 solid",
                width: "125px",
                height: "50px",
              }}
            >
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
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
            주소
          </h5>
          <input
            type="text"
            placeholder="대전시 OO구 OO동까지 입력해주세요"
            value={addressValue}
            onChange={onAddressChange}
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
            }}
          >
            본인 확인 이메일(선택)
          </h5>
          <input
            type="text"
            placeholder="이메일을 입력해 주세요"
            value={emailValue}
            onChange={onEmailChange}
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
            }}
          >
            닉네임 (선택)
          </h5>
          <input
            type="text"
            placeholder="당근마켓 내에서 사용할 닉네임 입력"
            value={nicknameValue}
            onChange={onNicknameChange}
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
            }}
          >
            휴대전화
          </h5>
          <input
            type="text"
            placeholder="전화번호 입력, 010-xxxx-xxxx"
            onChange={onPhoneChange}
            value={phoneValue}
            style={{
              outline: "1px #d5d5d5 solid",
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
                backgroundColor: "#fc9d39",
                padding: "15px 20px",
                borderRadius: "10px",
                color: "white",
                fontWeight: "bolder",
              }}
              onClick={() => {
                if (phoneValue.length == 13) {
                  onJoin(
                    idValue,
                    passwordValue,
                    password1Value,
                    nameValue,
                    birthValue,
                    addressValue,
                    emailValue,
                    nicknameValue,
                    phoneValue
                  );
                }
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
