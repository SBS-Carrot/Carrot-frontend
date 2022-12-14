import { useState } from "react";
import axios from "axios";
import Header from "../layouts/Header";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { BACKEND_URL } from "../config/config";

const Join = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password1Value, setPassword1Value] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [birthValue, setBirthValue] = useState({
    yy: "",
    mm: "01",
    dd: "01",
  });

  const [addressValue, setAddressValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [pw2Check, setPw2Check] = useState(false);
  const [pwStatus, setPwStatus] = useState(false);
  const [pw2Status, setPw2Status] = useState(false);
  const [useid, setUseid] = useState(false);
  const [joinCheck, setJoinCheck] = useState(false);
  const navigate = useNavigate();
  const moveLogin = () => {
    navigate("/login");
  };

  const IdCheck = async (idValue) => {
    try {
      const data = await axios.get(
        `http://${BACKEND_URL}:8083/checkId/${idValue}`
      );
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
    setIdCheck(false);
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

  const onNameChange = (e) => {
    if (e.target.value.length >= 20) {
      return;
    }

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
    nameValue,
    birthValue,
    addressValue,
    emailValue,
    nicknameValue,
    phoneValue
  ) => {
    try {
      let birth = JSON.stringify(birthValue);
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/createUser`,
        method: "POST",
        data: {
          userid: idValue,
          password: passwordValue,
          username: nameValue,
          birth: birth,
          email: emailValue,
          nickname: nicknameValue,
          address: addressValue,
          phone: phoneValue,
        },
      });

      setJoinCheck(true);
    } catch (e) {
      console.log(e);
    }
  };

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    setAddressValue(fullAddr);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    margin: "0 auto",
    width: "450px",
    height: "480px",
    padding: "7px",
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
                window.alert("ID??? ?????? 5?????? ??????????????? ?????????.");
              }
            }}
          >
            ????????? ??????
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
                    zIndex: "9999",
                  }}
                >
                  <div>
                    <div>
                      <span>
                        "{idValue}"???(???)
                        <br />
                        ?????? ????????? ??????????????????.
                      </span>
                    </div>
                    <div>
                      <span>?????????????????????????</span>
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
                        ??????
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
                    zIndex: "9999",
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
                    <span>
                      "{idValue}"???(???)
                      <br />
                      ?????? ??????????????????
                    </span>
                    <span>?????? ???????????? ??????????????????.</span>
                    <span>?????? ???????????? ??????????????????</span>
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
                        ??????
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
            ?????????
          </h5>
          <input
            type="text"
            placeholder="???????????? ????????? ?????????, ?????????+??????"
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
            ????????????
          </h5>
          {pwCheck == true &&
            (pwStatus == true ? (
              <div
                style={{
                  position: "absolute",
                  width: "290px",
                  height: "30px",
                  top: "170px",
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
                  ???????????? ????????? ???????????????
                </span>
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  width: "290px",
                  height: "30px",
                  top: "170px",
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
                  ???????????? ????????? ?????? ??????????????????
                </span>
              </div>
            ))}
          <input
            type="password"
            placeholder="??????????????? 8??? ~ 20??? ??????, ????????????+??????+????????????"
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
            ???????????? ?????????
          </h5>
          {pw2Check == true &&
            (pw2Status == true ? (
              <div
                style={{
                  position: "absolute",
                  width: "290px",
                  height: "30px",
                  top: "265px",
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
                  ???????????? ?????? ??????
                </span>
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  width: "290px",
                  height: "30px",
                  top: "265px",
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
                  ??????????????? ???????????? ????????????.
                </span>
              </div>
            ))}
          <input
            type="password"
            placeholder="??????????????? 8??? ~ 20??? ??????, ????????????+??????+????????????"
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
            ??????
          </h5>
          <input
            type="text"
            placeholder="????????? ????????? ?????????"
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
            ????????????
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
              placeholder="??????(4???)"
              onChange={onYearChange}
              value={birthValue.yy}
              style={{
                outline: "1px #d5d5d5 solid",
                width: "125px",
                height: "50px",
              }}
            />
            <select
              placeholder="???"
              value={birthValue.mm}
              onChange={onMonthChange}
              style={{
                outline: "1px #d5d5d5 solid",
                width: "125px",
                height: "50px",
              }}
            >
              <option value="01">1???</option>
              <option value="02">2???</option>
              <option value="03">3???</option>
              <option value="04">4???</option>
              <option value="05">5???</option>
              <option value="06">6???</option>
              <option value="07">7???</option>
              <option value="08">8???</option>
              <option value="09">9???</option>
              <option value="10">10???</option>
              <option value="11">11???</option>
              <option value="12">12???</option>
            </select>

            <select
              placeholder="???"
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
            ??????
          </h5>
          <span
            style={{
              display: "flex",
              justifyContent: "start",
              marginLeft: "50px",
            }}
          >
            <button
              className="mb-2"
              type="button"
              style={{
                border: "1px #d5d5d5 solid",
                width: "120px",
                height: "30px",
              }}
              onClick={() => {
                onChangeOpenPost();
              }}
            >
              ???????????? ??????
            </button>
          </span>
          <input
            type="text"
            placeholder="????????? OO??? OO????????? ??????????????????"
            value={addressValue}
            disabled
            onChange={onCompletePost}
            onClick={() => {
              onChangeOpenPost();
            }}
            style={{
              outline: "1px #d5d5d5 solid",
              width: "400px",
              height: "50px",
            }}
          />
          {isOpenPost && (
            <span>
              <DaumPostcode
                style={postCodeStyle}
                autoClose
                onComplete={onCompletePost}
              />
            </span>
          )}
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            ?????? ?????? ?????????(??????)
          </h5>
          <input
            type="text"
            placeholder="???????????? ????????? ?????????"
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
            ????????? (??????)
          </h5>
          <input
            type="text"
            placeholder="???????????? ????????? ????????? ????????? ??????"
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
            ????????????
          </h5>
          <input
            type="text"
            placeholder="???????????? ??????, 010-xxxx-xxxx"
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
                if (!idCheck) {
                  window.alert("?????????????????? ????????????");
                  return;
                } else if (!pwStatus) {
                  window.alert("???????????? ????????? ??????????????????");
                  return;
                } else if (!pw2Status) {
                  window.alert("???????????? ???????????? ???????????? ????????????.");
                  return;
                } else if (nameValue.length <= 1) {
                  window.alert("????????? ?????? 2?????? ??????????????? ?????????.");
                  return;
                } else if (birthValue.yy == "") {
                  window.alert("??????????????? ????????? ?????????");
                  return;
                } else if (birthValue.yy.length > 4) {
                  window.alert("????????? 5?????? ???????????? ??????????????????.");
                } else if (birthValue.mm == "") {
                  window.alert("??????????????? ????????? ?????????");
                  return;
                } else if (birthValue.dd == "") {
                  window.alert("??????????????? ????????? ?????????");
                  return;
                } else if (addressValue.length <= 6) {
                  window.alert("??????????????? ????????? ?????????.");
                  return;
                } else if (phoneValue.length != 13) {
                  window.alert("???????????? 010 - **** - **** ??? ??????????????????. ");
                  return;
                } else {
                  if (phoneValue.length == 13) {
                    onJoin(
                      idValue,
                      passwordValue,
                      nameValue,
                      birthValue,
                      addressValue,
                      emailValue,
                      nicknameValue,
                      phoneValue
                    );
                  }
                }
              }}
            >
              ????????????
            </button>
          </div>
          {joinCheck && (
            <div
              style={{
                width: "300px",
                height: "160px",
                border: "1px #fcb264 solid",
                position: "absolute",
                top: "20%",
                left: "20%",
                backgroundColor: "white",
                borderRadius: "10px",
                paddingTop: "15px",
              }}
            >
              <span>
                ??????????????? ??????????????????.
                <br />
                ????????? ??????????????? ????????????
                <br />
                ??????????????? ?????? ??????????????????!
                <br />
              </span>
              <button
                style={{
                  backgroundColor: "#fcb264",
                  color: "white",
                  width: "250px",
                  height: "30px",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
                onClick={() => {
                  moveLogin();
                }}
              >
                ????????? ???????????? ????????????
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;
