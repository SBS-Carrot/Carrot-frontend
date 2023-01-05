import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";

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
    window.location.reload();
  };
  //알림예시 항해99 프론트 https://github.com/HangHae99-FinalProject/FinalProject-React/blob/master/src/components/Alert.js
  //알림예시 항해99 백 https://github.com/HangHae99-FinalProject/FinalProject-Spring/blob/master/src/main/java/com/hanghae99/finalproject/sse/service/NotificationService.java
  useEffect(() => {
    if (logined) {
      const eventSource = new EventSource(
        `http://${BACKEND_URL}:8083/sse/${userid}`,
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
  }, [logined, notification._read, notificationCnt]);

  useEffect(() => {
    if (logined) {
      const getData = async () => {
        try {
          const data = await axios({
            url: `http://${BACKEND_URL}:8083/notifications/count`,
            METHOD: "GET",
            params: { userid },
          });

          setNotificationCnt(data.data);
          setListening(false);
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    }
  }, [alertToggle, logined, notification]);
  const readNotification = (notificationId) => {
    try {
      axios({
        url: `http://${BACKEND_URL}:8083/notification/read/${notificationId}`,
        METHOD: "Get",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/notifications/delete/${notificationId}`,
        method: "delete",
        data: userid,
      });
      console.log(data.data);
      setNotification(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const allDeleteNotification = async () => {
    if (window.confirm("모든 알림을 삭제하시겠습니까?")) {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/notification/delete`,
          method: "Delete",
          params: { userid },
        });
        if (data.data.msg == "알림 목록 전체삭제 성공") {
          window.alert("모든 알림이 삭제되었습니다.");
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

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
                    backgroundColor: "#e96464",
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
              <div className="slide-fwd-left">
                <div className="listBox">
                  {notification.length === 0 ? (
                    <div
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
                      <div>
                        <span>아직 알림이 없어요!</span>
                      </div>
                    </div>
                  ) : (
                    <ul
                      style={{
                        width: "500px",
                        maxHeight: "600px",
                        backgroundColor: "white",
                        border: "1px #fc9d39 solid",
                        borderRadius: "10px",
                        overflow: "auto",
                        marginLeft: "-440px",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() => {
                          allDeleteNotification();
                        }}
                        style={{
                          padding: "5px 10px",
                          border: "1px #fc9d39 solid",
                          marginTop: "5px",
                        }}
                      >
                        알림 전체 삭제
                      </button>
                      {notification.map((notice, index) => (
                        <li
                          key={index}
                          style={{
                            width: "100%",
                            paddingBottom: "10px",
                          }}
                        >
                          {notice._read == true ? (
                            //읽은 메세지들
                            <div
                              style={{
                                color: "gray",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                style={{
                                  width: "90%",
                                }}
                                onClick={() => {
                                  readNotification(notice.id);
                                  setAlertToggle(false);
                                  sessionStorage.setItem(
                                    "sender",
                                    notice.sender
                                  );
                                  moveURL(notice.url);
                                }}
                              >
                                <span>{index + 1}.</span>
                                <span> {notice.sender}님께서 </span>
                                {notice.type == "CHAT" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span>메세지를 보냈어요</span>
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
                                  ""
                                )}
                                {notice.type == "APPLY" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span> 알바를 지원하셨어요</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {notice.type == "REVIEW" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span> 후기를 작성하셨어요</span>
                                    <br />
                                    <span> 후기를 작성해주세요!</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {notice.type == "REPLY" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span>답글을 작성하셨어요</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </button>
                              <button
                                style={{
                                  borderRadius: "50%",
                                  width: "20px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => {
                                  handleDeleteNotification(notice.id);
                                }}
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            //아직 안읽은 메세지들
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                style={{
                                  width: "90%",
                                }}
                                onClick={() => {
                                  readNotification(notice.id);
                                  setAlertToggle(false);
                                  sessionStorage.setItem(
                                    "sender",
                                    notice.sender
                                  );
                                  moveURL(notice.url);
                                }}
                              >
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "2rem",
                                    position: "absolute",
                                    transform: "translateX(-250%)",
                                  }}
                                >
                                  ˚
                                </span>
                                <span>{index + 1}. </span>
                                <span>{notice.sender}님께서</span>
                                {notice.type == "CHAT" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span>&nbsp;메세지를&nbsp;보냈어요</span>
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
                                  ""
                                )}
                                {notice.type == "APPLY" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span> 알바를 지원하셨어요</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {notice.type == "REVIEW" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span> 후기를 작성하셨어요</span>
                                    <br />
                                    <span> 후기를 작성해주세요!</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {notice.type == "REPLY" ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span> 답글을 작성하셨어요</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </button>
                              <button
                                style={{
                                  borderRadius: "50%",
                                  width: "20px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => {
                                  handleDeleteNotification(notice.id);
                                }}
                              >
                                X
                              </button>
                            </div>
                          )}
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
