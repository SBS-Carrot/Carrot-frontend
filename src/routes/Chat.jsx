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
import uuid from "react-uuid";
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
      setChatList((_chat_list) => [..._chat_list, json_body.message]);
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
    const datas = data.reverse();
    setChatList(datas);
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
        console.log(data.data);
      }
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
            height: "500px",
            border: "1px black solid",
          }}
        >
          <div
            style={{
              border: "1px black solid",
              width: "90%",
              height: "70%",
            }}
          >
            <ul
              style={{
                width: "100%",
                height: "100%",
                border: "1px red solid",
              }}
            >
              {chatList.map((chat, index) => {
                <li
                  key={index}
                  style={{
                    border: "1px red solid",
                    width: "100px",
                    height: "50px",
                  }}
                >
                  <span>하이</span>
                  <span>{chat.message}</span>
                </li>;
              })}
            </ul>
          </div>

          <input
            type="text"
            value={chat}
            onChange={handleChange}
            placeholder="메시지를 입력해 주세요"
            style={{
              width: "70%",
              heiht: "30px",
              border: "1px black solid",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
          />
          <button
            onClick={() => {
              handleSubmit(chat);
            }}
            style={{
              padding: "5px",
              border: "1px black solid",
            }}
          >
            전송
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
