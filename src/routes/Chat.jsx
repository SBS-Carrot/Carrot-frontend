import React from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stomp from "stompjs";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import SockJsClient from "react-stomp";
import axios from "axios";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// npm i @stomp/stompjs
// npm i react-uuid
// npm i ws
// npm i sockjs-client
// 위 4개 해보고 안되면 밑에꺼
// npm i react-stomp
// npm i stompjs
const Chat = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate(-1);
  };
  if (!logined) {
    moveBack();
  }

  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const { roomId } = useParams();
  const [user2, setUser2] = useState("");
  const client = useRef({});
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8083/wss/chat", // 웹소켓 서버 직접 접속
      // https://www.daddyprogrammer.org/post/4077/spring-websocket-chatting/
      // https://sg-choi.tistory.com/294

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        onCreateRoom();
        subscribe();
      },
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        type: "TALK",
        roomId,
        sender: sessionStorage.getItem("userid"),
        message: chat,
      }),
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
    });

    setChat("");
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + roomId, (body) => {
      const json_body = JSON.parse(body.body);
      console.log("body : ", json_body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (chat) => {
    // 보내기 버튼 눌렀을 때 publish
    // event.preventDefault();

    publish(chat);
  };
  const onChatList = (data) => {
    setChatList(data);
  };
  const onUser2 = (data) => {
    setUser2(data);
  };
  const onCreateRoom = async () => {
    try {
      const myName = sessionStorage.getItem("userid");
      const yourName = sessionStorage.getItem("yourName");

      const chattingRoom = {
        roomId: roomId,
        myName,
        yourName,
      };
      //params로 받은 이미 존재하는 or 새로 생성된 채팅방 조회
      const data1 = await axios({
        url: `http://localhost:8083/room/${roomId}`,
        method: "GET",
      });

      // 없다면 URL의 랜덤한 ID로 채팅방 새로 생성.
      if (data1 == "") {
        const data = await axios({
          url: `http://localhost:8083/chat`,
          method: "POST",
          data: chattingRoom,
        });
      } else {
        // 있다면 채팅목록 GET
        const data = await axios({
          url: `http://localhost:8083/getMessage`,
          method: "GET",
          params: { roomId },
        });
        onChatList(data.data);
      }
      const chatUser = await axios({
        url: `http://localhost:8083/getUser/${yourName}`,
        method: "GET",
      });
      onUser2(chatUser.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <LoginedHeader setLogined={setLogined} />
      <div>
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            minHeight: "50vh",
          }}
        >
          <div
            style={{
              width: "90%",
              margin: "0 auto",
            }}
          >
            <ul>
              {chatList.map((chat, index) => (
                <li
                  key={index}
                  style={{
                    width: "100%",
                  }}
                >
                  {chat.sender == sessionStorage.getItem("userid") ? (
                    <div
                      style={{
                        backgroundColor: "#ffa445",
                        borderRadius: "20px",
                        width: "45%",
                        minHeight: "50px",
                        marginTop: "10px",
                        color: "white",
                        transform: "translateX(100%)",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      <span style={{}}>{chat.message}</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "50%",

                          position: "absolute",
                        }}
                      >
                        {user2.profileImage == null ? (
                          <FontAwesomeIcon
                            icon={faCarrot}
                            style={{
                              fontSize: "2rem",
                              color: "#ffa445",
                              position: "absolute",

                              left: "0%",
                              top: "10%",
                            }}
                          />
                        ) : (
                          <img src={user2.profileImage} alt="" />
                        )}
                      </div>

                      <div
                        style={{
                          borderRadius: "20px",
                          width: "45%",
                          minHeight: "50px",
                          marginTop: "10px",
                          marginLeft: "35px",
                          backgroundColor: "#eeeeee",
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "10px",
                          }}
                        >
                          <span>{chat.message}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              margin: "10px auto",
              display: "flex",
              justifyContent: "center",
              marginLeft: "-37px",
            }}
          >
            <input
              type="text"
              value={chat}
              onChange={handleChange}
              placeholder="메시지를 입력해 주세요"
              style={{
                width: "70%",
                border: "1px #ffa445 solid",
                borderRadius: "10px",
                backgroundColor: "white",
                padding: "10px",
              }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  handleSubmit(chat);
                }
              }}
            />

            <button
              onClick={() => {
                handleSubmit(chat);
              }}
              style={{
                padding: "5px 10px",
                border: "1px #ffa445 solid",
                marginLeft: "10px",
                borderRadius: "10%",
                color: "#ffa445",
              }}
            >
              전송
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
