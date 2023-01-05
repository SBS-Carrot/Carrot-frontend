import { useState, useEffect } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { MdAddAPhoto, MdPeopleOutline } from "react-icons/md";
import { FaCarrot } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
import Temp from "./Temp";

const MyPage = ({ logined, setLogined }) => {
  const [user, setUser] = useState("");
  const [uploadedImg, setUploadedImg] = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  const [nickname, setNickname] = useState(user.nickname || "");
  const navigate = useNavigate();
  const onChangeComplete = () => {
    window.location.replace("/mypage");
  };
  const moveBack = () => {
    navigate("/");
    alert("로그인 후 사용할 수 있는 기능입니다.");
  };
  if (!logined) {
    moveBack();
  }
  const handleAddImages = (event) => {
    setUploadedImg(event.target.files[0]);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleDeleteImage = async () => {
    try {
      const formData = new FormData();
      const user1 = sessionStorage.getItem("userid");
      const json = { userid: user1 };
      const _json = JSON.stringify(json);
      const blob = new Blob([_json], { type: "application/json" });

      formData.append("userdto", blob);

      const data = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://${BACKEND_URL}:8083/userProfileImageReset`,
        method: "POST",
        data: formData,
      });

      window.alert("초기화에 성공하였습니다.");
      onChangeComplete();
    } catch (e) {
      console.log(e);
    }
  };

  const onNicknameChange = (e) => {
    if (e.target.value.length > 10) {
      return;
    }
    setNickname(e.target.value);
  };

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getUser/${sessionStorage.getItem(
            "userid"
          )}`,
          method: "GET",
        });
        setUser(data.data);

        if (data.data.profileImage != null) {
          setImageSrc(data.data.profileImage);
        }
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);
  const onSubmit1 = async (image, nickname) => {
    try {
      const formData = new FormData();
      const user1 = sessionStorage.getItem("userid");
      if (nickname == "") {
        nickname = user.nickname;
      }
      const json = { nickname: nickname, userid: user1 };
      const _json = JSON.stringify(json);
      const blob = new Blob([_json], { type: "application/json" });

      formData.append("userdto", blob);
      formData.append("file", image);
      const data = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://${BACKEND_URL}:8083/userProfileImageChange`,
        method: "POST",
        data: formData,
      });

      window.alert("변경에 성공하였습니다.");
      onChangeComplete();
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit2 = async (nickname) => {
    try {
      const formData = new FormData();
      if (nickname == "") {
        nickname = user.nickname;
      }
      const user1 = sessionStorage.getItem("userid");
      const json = { nickname: nickname, userid: user1 };
      const _json = JSON.stringify(json);
      const blob = new Blob([_json], { type: "application/json" });

      formData.append("userdto", blob);
      const data = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://${BACKEND_URL}:8083/userProfileChange`,
        method: "POST",
        data: formData,
      });

      window.alert("변경에 성공하였습니다.");
      onChangeComplete();
    } catch (e) {
      console.log(e);
    }
  };

  const onReset = async () => {
    try {
      const formData = new FormData();
      const user1 = sessionStorage.getItem("userid");
      const json = { userid: user1 };
      const _json = JSON.stringify(json);
      const blob = new Blob([_json], { type: "application/json" });

      formData.append("userdto", blob);

      const data = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://${BACKEND_URL}:8083/userProfileImageAndNicknameReset`,
        method: "POST",
        data: formData,
      });

      window.alert("초기화에 성공하였습니다.");
      onChangeComplete();
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
            <li
              style={{
                color: "#ffa445",
              }}
            >
              <a href="/mypage">내 프로필</a>{" "}
            </li>
            <li>
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
        <div>
          <Temp temp={user.temp} page="MyPage" />

          <div className="mt-5">
            <div
              className="font-bold"
              style={{
                fontSize: "1.1rem",
              }}
            >
              받은 매너 평가
            </div>
            <div>
              <span className="flex items-center gap-2 mb-2">
                <MdPeopleOutline className="text-lg" />
                {user.sadReview}
                <span
                  style={{
                    backgroundColor: "#e7e7e7",
                    padding: "2px",
                  }}
                >
                  {" "}
                  별로예요
                </span>
              </span>
              <span className="flex items-center gap-2 mb-2">
                <MdPeopleOutline className="text-lg" />
                {user.smileReview}
                <span
                  style={{
                    backgroundColor: "#e7e7e7",
                    padding: "2px",
                  }}
                >
                  {" "}
                  좋아요!
                </span>
              </span>
              <span className="flex items-center gap-2">
                <MdPeopleOutline className="text-lg" /> {user.happyReview}
                <span
                  style={{
                    backgroundColor: "#e7e7e7",
                    padding: "2px",
                  }}
                >
                  {" "}
                  최고예요!!
                </span>
              </span>
            </div>
          </div>
          <div className="mt-7">
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: "bolder",
              }}
            >
              프로필 수정
            </h2>
            <h2
              style={{
                marginTop: "10px",
                color: "gray",
              }}
            >
              당근마켓 대표 이미지와 닉네임을 변경할 수 있습니다.
            </h2>
            <section
              style={{
                borderTop: "1px #d5d5d5 solid",
                borderBottom: "1px #d5d5d5 solid",
                width: "100%",
                height: "450px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "65%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    borderRight: "1px #d5d5d5 solid",
                    borderBottom: "1px #d5d5d5 solid",
                    width: "200px",
                    fontWeight: "bolder",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  프로필사진
                </div>
                <div
                  style={{
                    borderBottom: "1px #d5d5d5 solid",
                    width: "100%",
                  }}
                >
                  <ul className="gap-4 pl-4 mt-4">
                    {imageSrc != "" ? (
                      <div
                        className="preview"
                        style={{
                          width: "120px",
                          height: "120px",
                          display: "flex",
                          flexDirection: "row",
                          position: "relative",
                          marginBottom: "20px",
                        }}
                      >
                        <img
                          src={imageSrc}
                          alt="preview-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                            display: "block",
                          }}
                        />

                        <div />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "120px",
                          height: "120px",
                          display: "flex",
                          flexDirection: "row",
                          position: "relative",
                          marginBottom: "20px",
                          border: "1px #d5d5d5 solid",
                          marginTop: "10px",
                        }}
                      >
                        <FaCarrot
                          style={{
                            width: "120px",
                            height: "120px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "3rem",
                            color: "#fc9d39",
                          }}
                        />
                      </div>
                    )}
                  </ul>
                  <div
                    className=" rounded-lg"
                    style={{
                      border: "1px #d5d5d5 solid",
                      width: "105px",
                      height: "100px",
                      color: "#8f8f8f",
                      marginLeft: "17px",
                    }}
                  >
                    <label
                      htmlFor="input-file"
                      onChange={(e) => {
                        handleAddImages(e);
                        encodeFileToBase64(e.target.files[0]);
                      }}
                    >
                      <input
                        type="file"
                        id="input-file"
                        accept="image/*"
                        style={{
                          display: "none",
                        }}
                      />
                      <MdAddAPhoto
                        style={{
                          fontSize: "3rem",
                          cursor: "pointer",
                          margin: "1.5rem",
                        }}
                      />
                      <button>사진 변경하기</button>
                    </label>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "35%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    borderRight: "1px #d5d5d5 solid",
                    borderBottom: "1px #d5d5d5 solid",
                    width: "167px",
                    fontWeight: "bolder",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  닉네임
                </div>
                <div>
                  <input
                    type="text"
                    value={nickname}
                    onChange={onNicknameChange}
                    placeholder={user.nickname}
                    style={{
                      border: "1px #d5d5d5 solid",
                      marginLeft: "18px",
                      width: "200px",
                      marginTop: "65px",
                    }}
                  />
                </div>
              </div>
            </section>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                gap: "20px",
              }}
            >
              <button
                onClick={() => {
                  if (uploadedImg == "") {
                    onSubmit2(nickname);
                  } else {
                    onSubmit1(uploadedImg, nickname);
                  }
                }}
              >
                <span
                  style={{
                    border: "1px #d5d5d5 solid",
                    padding: "5px 10px",
                  }}
                >
                  적용하기
                </span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm("정말 사진을 초기화하시겠습니까?")) {
                    handleDeleteImage();
                  }
                }}
              >
                <span
                  style={{
                    border: "1px #d5d5d5 solid",
                    padding: "5px 10px",
                  }}
                >
                  사진 초기화하기
                </span>
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm("정말 사진과 닉네임을 초기화하시겠습니까?")
                  ) {
                    onReset();
                  }
                }}
              >
                <span
                  style={{
                    border: "1px #d5d5d5 solid",
                    padding: "5px 10px",
                  }}
                >
                  초기화
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
