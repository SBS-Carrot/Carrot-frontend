import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Alert = () => {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [is_open, setIs_open] = useState(false);
  const [notificationCnt, setNotificationCnt] = useState();
  const [listening, setListening] = useState(false);
  const [alertToggle, setAlertToggle] = useState(false);
  const onAlertToggle = () => {
    setAlertToggle(!alertToggle);
  };
  const navigate = useNavigate();

  const moveURL = (data) => {
    navigate(`http://${data}`);
  };
  //알림예시 항해99 프론트 https://github.com/HangHae99-FinalProject/FinalProject-React/blob/master/src/components/Alert.js
  //알림예시 항해99 백 https://github.com/HangHae99-FinalProject/FinalProject-Spring/blob/master/src/main/java/com/hanghae99/finalproject/sse/service/NotificationService.java

  const userid = sessionStorage.getItem("userid");
  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8083/sse/${userid}`, {
      // headers: {
      //   "Content-Type": "text/event-stream",
      //   "Cache-Control": "no-cache",
      //   Connection: "keep-alive",
      //   // "X-Accel-Buffering": "no",
      // },
      // heartbeatTimeout: 120000,
      withCredentials: true,
    });
    if (!listening) {
      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.addEventListener("sse", (e) => {
        console.log("sse");
      });

      eventSource.addEventListener("get", (e) => {
        console.log("get", e.data);
        setNotification(JSON.parse(e.data));
      });

      eventSource.addEventListener("new", (e) => {
        console.log("new");
        // setNotification(...notification, JSON.parse(e.data));
      });

      eventSource.onmessage = (e) => {
        console.log("onmessage : ", [e.data]);
        if (e.type === "message") {
          setNotification([e.data]);
          setAlertOpen(true);
        }
      };

      eventSource.onerror = (event) => {
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("SSE closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log("event closed");
    };
  }, []);

  useEffect(
    () => {
      if (logined) {
        const getData = async () => {
          // try {
          //   const data = await axios({
          //     url: "http://localhost:8083/notifications",
          //     METHOD: "GET",
          //     params: { userid },
          //   });
          //   console.log(data.data);
          //   setNotification(data.data);
          // } catch (e) {
          //   console.log(e);
          // }
          // try {
          //   const data = await axios({
          //     url: "http://localhost:8083/notifications/count",
          //     METHOD: "GET",
          //     params: { userid },
          //   });
          //   setNotificationCnt(data.data);
          // } catch (e) {
          //   console.log(e);
          // }
        };
        getData();
      }
    },
    [
      // alertOpen, logined
    ]
  );
  const readNotification = async (notificationId) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/notification/read/${notificationId}`,
        METHOD: "POST",
        params: { userid },
      });
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
    setIs_open(false);
  };

  const handelDeleteMessage = async (notificationId, status) => {
    setNotification(notification.filter((a, idx) => a.id !== notificationId));
    try {
      const data = await axios({
        url: `http://localhost:8083/notification/delete/${notificationId}`,
        METHOD: "DELETE",
        params: { userid },
      });
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }

    if (notificationCnt && status === false) {
      setNotificationCnt(notificationCnt - 1);
      return;
    }
    if (!notificationCnt) {
      setNotificationCnt();
      return;
    }
  };

  const handelOpenBtn = () => {
    setLogined(!logined);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  //   if (pathName.pathname === "/") {
  //     return null;
  //   }
  //   if (pathName.pathname === "/user/kakao/login") {
  //     return null;
  //   }
  // if (pathName.pathname === "/signup") {
  //   return null;
  // }
  // if (pathName.pathname === "/login") {
  //   return null;
  // }
  if (!logined) {
    return null;
  }
  return (
    <div>
      <div>
        {logined ? (
          <div
            style={{
              width: "400px",
              maxHeight: "600px",
              position: "absolute",
              top: "10%",
              border: "1px red solid",
            }}
          >
            <button
              onClick={() => {
                onAlertToggle();
              }}
            >
              <AiOutlineBell
                style={{
                  fontSize: "3rem",
                }}
              />
            </button>
            {alertToggle == true ? (
              <div className="slide-fwd-left">
                <div className="listBox">
                  {notification.length === 0 ? (
                    <div>
                      <div>
                        <p className="noMessage">아직 알림이 없어요!</p>
                      </div>
                      <img
                        src="
                  https://velog.velcdn.com/images/tty5799/post/d04c4b94-f56d-40e0-8a5e-ab090dc68e7f/image.svg"
                        alt="noImage"
                        className="noImage"
                      />
                    </div>
                  ) : (
                    <ul
                      style={{
                        width: "400px",
                        maxHeight: "600px",
                      }}
                    >
                      {notification.map((notice, index) => (
                        <li
                          key={index}
                          style={{
                            width: "100%",
                          }}
                        >
                          <button
                            style={{
                              width: "100%",
                            }}
                            onClick={() => {
                              moveURL(`http://${notice.url}`);
                            }}
                          >
                            <span>{index + 1}.</span>
                            <span> {notice.sender}님께서 </span>
                            {notice.type == "CHAT" ? (
                              <span>메세지를 보냈어요</span>
                            ) : (
                              ""
                            )}
                            <div
                              style={{
                                width: "100%",
                                maxHeight: "50px",
                                border: "1px red solid",
                              }}
                            >
                              <span
                                style={{
                                  textAlign: "start",
                                }}
                              >
                                {notice.content}
                              </span>
                            </div>
                          </button>
                          <div className="line" />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Alert;
