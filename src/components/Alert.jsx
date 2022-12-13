import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Alert = ({}) => {
  const userid = sessionStorage.getItem("userid");
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [notification, setNotification] = useState([]);
  const [is_open, setIs_open] = useState(false);
  const [notificationCnt, setNotificationCnt] = useState();
  const [listening, setListening] = useState(false);
  const [alertToggle, setAlertToggle] = useState(false);
  const onAlertToggle = () => {
    setAlertToggle(!alertToggle);
  };
  const navigate = useNavigate();

  const moveURL = (data) => {
    navigate(`${data}`);
  };
  //알림예시 항해99 프론트 https://github.com/HangHae99-FinalProject/FinalProject-React/blob/master/src/components/Alert.js
  //알림예시 항해99 백 https://github.com/HangHae99-FinalProject/FinalProject-Spring/blob/master/src/main/java/com/hanghae99/finalproject/sse/service/NotificationService.java
  useEffect(() => {
    if (logined) {
      const eventSource = new EventSource(
        `http://localhost:8083/sse/${userid}`,
        {
          // headers: {
          //   "Content-Type": "text/event-stream",
          //   "Cache-Control": "no-cache",
          //   Connection: "keep-alive",
          //   // "X-Accel-Buffering": "no",
          // },
          // heartbeatTimeout: 120000,
          withCredentials: true,
        }
      );
      if (!listening) {
        eventSource.onopen = (event) => {
          console.log("connection opened");
        };

        eventSource.addEventListener("sse", (e) => {
          console.log("sse");
        });

        eventSource.addEventListener("get", (e) => {
          let data = JSON.parse(e.data);
          console.log(data);
          setNotification(data);
        });

        eventSource.addEventListener("new", (e) => {
          console.log("new");
          // setNotification(...notification, JSON.parse(e.data));
        });

        eventSource.onmessage = (e) => {
          console.log("onmessage : ", [e.data]);
          if (e.type === "message") {
            setNotification([e.data]);
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
    }
  }, [logined, notification._read]);

  useEffect(() => {
    if (logined) {
      const getData = async () => {
        try {
          const data = await axios({
            url: "http://localhost:8083/notifications/count",
            METHOD: "GET",
            params: { userid },
          });

          setNotificationCnt(data.data);
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    }
  }, [alertToggle, logined]);
  const readNotification = (notificationId) => {
    try {
      axios({
        url: `http://localhost:8083/notification/read/${notificationId}`,
        METHOD: "Get",
      });
    } catch (e) {
      console.log(e);
    }
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
    <div
      style={{
        margin: "0 auto",
        width: "1000px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        {logined ? (
          <div
            style={{
              width: "10px",
              maxHeight: "600px",
              position: "absolute",
              top: "12%",
            }}
          >
            <button
              onClick={() => {
                onAlertToggle();
              }}
            >
              <AiOutlineBell
                style={{
                  fontSize: "4rem",
                  position: "relative",
                }}
              />
              {notificationCnt > 0 ? (
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fc9d39",
                    color: "white",
                    position: "absolute",
                    top: "-10px",
                    right: "1px",
                    fontSize: "1.2rem",
                  }}
                >
                  {notificationCnt}
                </div>
              ) : (
                ""
              )}
            </button>
            {alertToggle == true ? (
              <div
                className="slide-fwd-left"
                style={{
                  border: "1px solid #ffa445",
                  borderRadius: "15px",
                  width: "180px",
                  textAlign: "center",
                  padding: "10px",
                  marginLeft: "-180px",
                  marginTop: "-60px",
                  backgroundColor: "white",
                }}
              >
                <div className="listBox">
                  {notification.length === 0 ? (
                    <div>
                      <div>
                        <span>아직 알림이 없어요!</span>
                      </div>
                    </div>
                  ) : (
                    <ul
                      style={{
                        width: "400px",
                        maxHeight: "600px",
                        backgroundColor: "white",
                        border: "1px #fc9d39 solid",
                        borderRadius: "10px",
                        overflow: "auto",
                      }}
                    >
                      {notification.map((notice, index) => (
                        <li
                          key={index}
                          style={{
                            width: "100%",
                            paddingBottom: "10px",
                          }}
                        >
                          <button
                            style={{
                              width: "100%",
                            }}
                            onClick={() => {
                              readNotification(notice.id);
                              setAlertToggle(false);
                              moveURL(notice.url);
                            }}
                          >
                            {notice._read == true ? (
                              //읽은 메세지들
                              <div
                                style={{
                                  color: "gray",
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
                                    overflow: "hidden",
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "start",
                                    }}
                                  >
                                    "{notice.content}"
                                  </span>
                                </div>
                              </div>
                            ) : (
                              //아직 안읽은 메세지들
                              <div>
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "2rem",
                                    position: "absolute",
                                    left: "20%",
                                  }}
                                >
                                  ˚
                                </span>
                                <span>{index + 1}.</span>
                                <span> {notice.sender}님께서 </span>
                                {notice.type == "CHAT" ? (
                                  <span>메세지를 보냈어요</span>
                                ) : (
                                  ""
                                )}
                                <div
                                  style={{
                                    overflow: "hidden",
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "start",
                                    }}
                                  >
                                    "{notice.content}"
                                  </span>
                                </div>
                              </div>
                            )}
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
