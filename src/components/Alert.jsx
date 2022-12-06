import { useEffect, useState } from "react";

const Alert = () => {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const [notificationCnt, setNotificationCnt] = useState();
  const [listening, setListening] = useState(false);

  let eventSource = undefined;

  //알림예시 항해99 프론트 https://github.com/HangHae99-FinalProject/FinalProject-React/blob/master/src/components/Alert.js
  //알림예시 항해99 백 https://github.com/HangHae99-FinalProject/FinalProject-Spring/blob/master/src/main/java/com/hanghae99/finalproject/sse/service/NotificationService.java
  console.log("로그인 상태", logined);
  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource("http://localhost:8083/sse");

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (e) => {
        console.log(e);
        if (e.type === "message" && e.data.startsWith("{")) {
          setNotification((prev) => [JSON.parse(e.data)]);
          setAlertOpen(true);
        }
      };

      //   eventSource.addEventListener("Progress", (event) => {
      //     const result = JSON.parse(event.data);
      //     console.log("received:", result);
      //   });

      eventSource.onerror = (event) => {
        console.log(event.target);
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

  const notificationRead = (notificationId) =>
    instance.post(`/notification/read/${notificationId}`);
  const notificationDelete = (notificationId) =>
    instance.delete(`/notifications/delete/${notificationId}`);
  useEffect(() => {
    if (logined) {
      const userid = sessionStorage.getItem("userid");
      const getData = async () => {
        try {
          const data = await axios({
            url: "http://localhost:8083/notifications",
            METHOD: "GET",
            params: { userid },
          });
          setNotification(data.data);
        } catch (e) {
          console.log(e);
        }
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
  }, [alertOpen, logined]);
  const handelOpenMessage = (id, url, status) => {
    window.location.href = url;

    setIs_open(false);

    if (status === false) {
      notificationRead(id)
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const handelDeleteMessage = (id, status) => {
    setNotification(notification.filter((a, idx) => a.id !== id));

    notificationDelete(id)
      .then((res) => {})
      .catch((err) => {});
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
  if (pathName.pathname === "/signup") {
    return null;
  }
  if (pathName.pathname === "/login") {
    return null;
  }
  if (!logined) {
    return null;
  }
  return (
    <Container>
      {logined ? (
        <div className="slide-fwd-left">
          <div className="listBox">
            {notification.length === 0 ? (
              <NoMessage>
                <div>
                  <p className="noMessage">아직 알림이 없어요!</p>
                </div>
                <img
                  src="
                  https://velog.velcdn.com/images/tty5799/post/d04c4b94-f56d-40e0-8a5e-ab090dc68e7f/image.svg"
                  alt="noImage"
                  className="noImage"
                />
              </NoMessage>
            ) : (
              <>
                {notification.map((a, idx) => {
                  return (
                    <NotificationsList key={idx}>
                      <div className="messageList">
                        <span
                          className="delete"
                          onClick={() => {
                            handelDeleteMessage(a.id, a.status);
                          }}
                        >
                          x
                        </span>
                        <span
                          onClick={() => {
                            handelOpenMessage(a.id, a.url, a.status);
                          }}
                          className={
                            a.status === true
                              ? "readMessage"
                              : "notificationsMsg"
                          }
                        >
                          {a.content}
                        </span>

                        <div className="line" />
                      </div>
                    </NotificationsList>
                  );
                })}
              </>
            )}
          </div>
        </div>
      ) : null}
      <div className={notificationCnt ? "notifications-cnt" : "cnt-zero"}>
        {notificationCnt}
      </div>
      {notificationCnt ? (
        <img
          src="https://velog.velcdn.com/images/tty5799/post/5709cebe-6e89-4ca8-8ae7-1d383feaf100/image.svg"
          alt="alertImage"
          onClick={handelOpenBtn}
          className="shake-top"
        />
      ) : (
        <img
          src="https://velog.velcdn.com/images/tty5799/post/7fd59818-7932-4120-9c52-cdbc3615228c/image.png"
          alt="alertImage"
          onClick={handelOpenBtn}
        />
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleAlertClose}
      >
        <AlertMsg onClose={handleAlertClose} severity="success">
          {notification[notification.length - notification.length]?.content}
        </AlertMsg>
      </Snackbar>
    </Container>
  );
};

const NoMessage = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  .noMessage {
    font-size: 25px;
    font-weight: bold;
  }
  .noImage {
    position: absolute;
    top: 28%;
    right: 13%;
    display: flex;
    width: 300px;
    height: 200px;
    cursor: auto;
  }
`;

const NotificationsList = styled.div``;

const Container = styled.div`
  .messageList {
    margin-top: 15px;
    display: flex;
    align-items: flex-start;
    margin-left: 20px;
    flex-direction: column;
    cursor: pointer;
    height: auto;
  }
  .noList {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 10px;
    color: #c2c0c1;
  }
  .readMessage {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 10px;
    color: #c2c0c1;
  }
  .notificationsMsg {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 10px;
    :hover {
      color: #b9daf7;
    }
  }
  .line {
    width: 93%;
    height: 2px;
    background-color: gray;
  }
  .delete {
    display: flex;
    text-align: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    margin-left: 85%;
    margin-top: -3%;
    font-size: 20px;
    :hover {
      font-weight: bold;
    }
  }
  .notifications-cnt {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: #b9daf7;
    border-radius: 12px;
    width: 22px;
    height: 22px;
    color: #2967ac;
    font-size: 16px;
    font-weight: bold;
    border-radius: 50%;
    text-align: center;
    margin-left: 20px;
    right: 6.3%;
    top: 85%;
  }
  .cnt-zero {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: transparent;
    border-radius: 12px;
    width: 22px;
    height: 22px;
    color: transparent;
    font-size: 16px;
    font-weight: bold;
    border-radius: 50%;
    text-align: center;
    margin-left: 20px;
    right: 6.3%;
    top: 85%;
  }
  .listBox {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid gray;
    width: 420px;
    height: 295px;
    position: fixed;
    right: 5%;
    top: 58%;
    overflow: auto;
    -webkit-animation: slide-fwd-left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-fwd-left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @-webkit-keyframes slide-fwd-left {
      0% {
        -webkit-transform: translateZ(0) translateX(0);
        transform: translateZ(0) translateX(0);
      }
      100% {
        -webkit-transform: translateZ(160px) translateX(-100px);
        transform: translateZ(160px) translateX(-100px);
      }
    }
    @keyframes slide-fwd-left {
      0% {
        -webkit-transform: translateZ(0) translateX(0);
        transform: translateZ(0) translateX(0);
      }
      100% {
        -webkit-transform: translateZ(160px) translateX(-100px);
        transform: translateZ(160px) translateX(-100px);
      }
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  img {
    position: fixed;
    top: 86%;
    right: 7%;
    cursor: pointer;
    width: 32px;
    height: 40px;
  }
  .shake-top {
    -webkit-animation: shake-top 1s ease-in-out 2 both;
    animation: shake-top 1s ease-in-out 2 both;
  }
  @-webkit-keyframes shake-top {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform-origin: 50% 0;
      transform-origin: 50% 0;
    }
    10% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
    20%,
    40%,
    60% {
      -webkit-transform: rotate(-4deg);
      transform: rotate(-4deg);
    }
    30%,
    50%,
    70% {
      -webkit-transform: rotate(4deg);
      transform: rotate(4deg);
    }
    80% {
      -webkit-transform: rotate(-2deg);
      transform: rotate(-2deg);
    }
    90% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
  }
  @keyframes shake-top {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform-origin: 50% 0;
      transform-origin: 50% 0;
    }
    10% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
    20%,
    40%,
    60% {
      -webkit-transform: rotate(-4deg);
      transform: rotate(-4deg);
    }
    30%,
    50%,
    70% {
      -webkit-transform: rotate(4deg);
      transform: rotate(4deg);
    }
    80% {
      -webkit-transform: rotate(-2deg);
      transform: rotate(-2deg);
    }
    90% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
  }
`;

export default Alert;
