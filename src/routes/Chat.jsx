import React from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
// npm i @stomp/stompjs
// npm i ws
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
  const [roomId, setRoomId] = useState("");

  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8083/ws",
      onConnect: () => {
        console.log("success");
        onCreateRoom();
        subscribe();
      },
      // connectHeaders: {

      //   Authorization: window.localStorage.getItem("authorization"),
      // },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;
    console.log(roomId);
    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        sender: sessionStorage.getItem("userid"),
        roomId,
        message: chat,
      }),
      // connectHeaders: {
      //   Authorization: window.localStorage.getItem("authorization"),
      // },
    });

    setChat("");
  };

  const subscribe = () => {
    console.log("roomId : ", roomId);
    client.current.subscribe(`/sub/ws/${roomId}`, (body) => {
      const json_body = JSON.parse(body.body);
      console.log("body : ", body.body);
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

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const onCreateRoom = async () => {
    try {
      const name = sessionStorage.getItem("userid");
      const data = await axios({
        url: `http://localhost:8083/chat`,
        method: "POST",
        data: { name },
      });
      setRoomId(data.data.roomId);
    } catch (e) {
      console.log(e);
    }
  };

  const onMessage = async (chat) => {
    try {
      const userid = sessionStorage.getItem("userid");
      const chatting = {
        messageType: "text",
        roomId,
        sender: userid,
        chat,
      };
      const data = await axios({
        url: `http://localhost:8083/chat/message`,
        method: "POST",
        data: { chatting },
      });
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <LoginedHeader setLogined={setLogined} />
      <div>
        <div>
          <button
            onClick={() => {
              onCreateRoom();
            }}
          >
            방만들기
          </button>
        </div>
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
            채팅들
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
