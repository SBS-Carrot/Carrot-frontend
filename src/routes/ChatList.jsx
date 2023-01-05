import { useEffect, useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCarrot } from "react-icons/fa";
import { BACKEND_URL } from "../config/config";
const ChatList = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveHome = () => {
    navigate("/");
  };
  const moveChatRoom = (url) => {
    navigate(`/chat/${url}`);
  };
  if (!logined) {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    moveHome();
  }
  const [chatList, setChatList] = useState([]);
  const userid = sessionStorage.getItem("userid");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getChatList`,
          method: "get",
          params: { userid },
        });
        setChatList(data.data);
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
          height: "500px",
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
        <div
          style={{
            width: "100%",

            height: "100%",
          }}
        >
          <ul
            style={{
              width: "100%",
              border: "1px #bcbcbc solid",

              marginTop: "10px",
              borderRadius: "10px",
              paddingLeft: "10px",
              paddingTop: "10px",
              paddingRight: "10px",
            }}
          >
            {chatList.map((room, index) => (
              <li
                key={index}
                style={{
                  border: "1px #bcbcbc solid",
                  borderRadius: "10px",
                  marginBottom: "5px",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => {
                    moveChatRoom(room.roomId);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div>
                      {sessionStorage.getItem("userid") == room.myName ? (
                        room.yourURL == null ? (
                          <div>
                            <FaCarrot
                              style={{
                                color: "#fc9d39",
                                fontSize: "3rem",
                                transform: "translate(0%,0%)",
                                border: "0.1px #fc9d39 solid",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                            }}
                          >
                            <img
                              src={room.yourURL}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                objectFit: "fill",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                        )
                      ) : room.myURL == null ? (
                        <div>
                          <FaCarrot
                            style={{
                              color: "#fc9d39",
                              fontSize: "3rem",
                              transform: "translate(0%,0%)",
                              border: "0.1px #fc9d39 solid",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <img
                            src={room.myURL}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "block",
                              objectFit: "fill",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div style={{}}>
                      {sessionStorage.getItem("userid") == room.myName ? (
                        <div>"{room.yourName}"님</div>
                      ) : (
                        <div>"{room.myName}"님</div>
                      )}
                      <div
                        style={{
                          marginLeft: "10px",
                          width: "200px",
                        }}
                      >
                        {room.type == "product" ? (
                          <div>채팅 유형 : 중고 거래</div>
                        ) : (
                          ""
                        )}
                        {room.type == "realty" ? (
                          <div>채팅 유형 : 부동산 거래</div>
                        ) : (
                          ""
                        )}
                        {room.type == "board" ? (
                          <div>채팅 유형 : 동네 질문</div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="ellipsis_1"
                        style={{
                          paddingLeft: "15px",
                          maxWidth: "300px",
                        }}
                      >
                        {room.lastMessage}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
