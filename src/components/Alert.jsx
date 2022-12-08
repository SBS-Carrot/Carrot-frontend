import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
const Alert = () => {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [is_open, setIs_open] = useState(false);
  const [notificationCnt, setNotificationCnt] = useState();
  const [listening, setListening] = useState(false);

  //알림예시 항해99 프론트 https://github.com/HangHae99-FinalProject/FinalProject-React/blob/master/src/components/Alert.js
  //알림예시 항해99 백 https://github.com/HangHae99-FinalProject/FinalProject-Spring/blob/master/src/main/java/com/hanghae99/finalproject/sse/service/NotificationService.java

  const userid = sessionStorage.getItem("userid");
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `http://localhost:8083/sse/${userid}`,
      {
        withCredentials: true,
      }
    );
    if (!listening) {
      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.addEventListener("get", (e) => {
        console.log(JSON.parse(e.data));
      });

      eventSource.onmessage = (e) => {
        console.log("onmessage : ", [e.data]);
        if (e.type === "message") {
          setNotification([e.data]);
          setAlertOpen(true);
        }
      };

      //   eventSource.addEventListener("Progress", (event) => {
      //     const result = JSON.parse(event.data);
      //     console.log("received:", result);
      //   });

      eventSource.onerror = (event) => {
        console.log("error : ", event);
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
    },
    [
      // alertOpen, logined
    ]
  );
  const handelOpenMessage = async (
    notificationId,
    //  url,
    status
  ) => {
    // window.location.href = url;
    if (status === false) {
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
    }
  };

  const handelDeleteMessage = async (notificationId, status) => {
    setNotification(notification.filter((a, idx) => a.id !== notificationId));
    try {
      const data = await axios({
        url: `http://localhost:8083//notifications/delete/${notificationId}`,
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
                <ul>
                  {notification.map((notice, index) => (
                    <li key={index}>
                      <span
                      // className="delete"
                      // onClick={() => {
                      //   handelDeleteMessage(notice.id, notice.status);
                      // }}
                      >
                        x
                      </span>
                      <span
                      // onClick={() => {
                      //   handelOpenMessage(notice.id, notice.url, notice.status);
                      // }}
                      // className={
                      //   a.status === true
                      //     ? "readMessage"
                      //     : "notificationsMsg"
                      // }
                      >
                        {notice}
                      </span>

                      <div className="line" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// const NoMessage = styled.div`
//   display: flex;
//   margin: 0 auto;
//   justify-content: center;
//   .noMessage {
//     font-size: 25px;
//     font-weight: bold;
//   }
//   .noImage {
//     position: absolute;
//     top: 28%;
//     right: 13%;
//     display: flex;
//     width: 300px;
//     height: 200px;
//     cursor: auto;
//   }
// `;

// const NotificationsList = styled.div``;

// const Container = styled.div`
//   .messageList {
//     margin-top: 15px;
//     display: flex;
//     align-items: flex-start;
//     margin-left: 20px;
//     flex-direction: column;
//     cursor: pointer;
//     height: auto;
//   }
//   .noList {
//     font-size: 16px;
//     font-weight: bold;
//     line-height: 1.4;
//     margin-bottom: 10px;
//     color: #c2c0c1;
//   }
//   .readMessage {
//     font-size: 16px;
//     font-weight: bold;
//     line-height: 1.4;
//     margin-bottom: 10px;
//     color: #c2c0c1;
//   }
//   .notificationsMsg {
//     font-size: 16px;
//     font-weight: bold;
//     line-height: 1.4;
//     margin-bottom: 10px;
//     :hover {
//       color: #b9daf7;
//     }
//   }
//   .line {
//     width: 93%;
//     height: 2px;
//     background-color: gray;
//   }
//   .delete {
//     display: flex;
//     text-align: center;
//     justify-content: center;
//     justify-items: center;
//     align-items: center;
//     align-content: center;
//     flex-direction: column;
//     margin-left: 85%;
//     margin-top: -3%;
//     font-size: 20px;
//     :hover {
//       font-weight: bold;
//     }
//   }
//   .notifications-cnt {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: fixed;
//     background: #b9daf7;
//     border-radius: 12px;
//     width: 22px;
//     height: 22px;
//     color: #2967ac;
//     font-size: 16px;
//     font-weight: bold;
//     border-radius: 50%;
//     text-align: center;
//     margin-left: 20px;
//     right: 6.3%;
//     top: 85%;
//   }
//   .cnt-zero {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: fixed;
//     background: transparent;
//     border-radius: 12px;
//     width: 22px;
//     height: 22px;
//     color: transparent;
//     font-size: 16px;
//     font-weight: bold;
//     border-radius: 50%;
//     text-align: center;
//     margin-left: 20px;
//     right: 6.3%;
//     top: 85%;
//   }
//   .listBox {
//     display: flex;
//     flex-direction: column;
//     background-color: #fff;
//     border: 1px solid gray;
//     width: 420px;
//     height: 295px;
//     position: fixed;
//     right: 5%;
//     top: 58%;
//     overflow: auto;
//     -webkit-animation: slide-fwd-left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)
//       both;
//     animation: slide-fwd-left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
//     @-webkit-keyframes slide-fwd-left {
//       0% {
//         -webkit-transform: translateZ(0) translateX(0);
//         transform: translateZ(0) translateX(0);
//       }
//       100% {
//         -webkit-transform: translateZ(160px) translateX(-100px);
//         transform: translateZ(160px) translateX(-100px);
//       }
//     }
//     @keyframes slide-fwd-left {
//       0% {
//         -webkit-transform: translateZ(0) translateX(0);
//         transform: translateZ(0) translateX(0);
//       }
//       100% {
//         -webkit-transform: translateZ(160px) translateX(-100px);
//         transform: translateZ(160px) translateX(-100px);
//       }
//     }
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//     &::-webkit-scrollbar {
//       display: none;
//     }
//   }
//   img {
//     position: fixed;
//     top: 86%;
//     right: 7%;
//     cursor: pointer;
//     width: 32px;
//     height: 40px;
//   }
//   .shake-top {
//     -webkit-animation: shake-top 1s ease-in-out 2 both;
//     animation: shake-top 1s ease-in-out 2 both;
//   }
//   @-webkit-keyframes shake-top {
//     0%,
//     100% {
//       -webkit-transform: rotate(0deg);
//       transform: rotate(0deg);
//       -webkit-transform-origin: 50% 0;
//       transform-origin: 50% 0;
//     }
//     10% {
//       -webkit-transform: rotate(2deg);
//       transform: rotate(2deg);
//     }
//     20%,
//     40%,
//     60% {
//       -webkit-transform: rotate(-4deg);
//       transform: rotate(-4deg);
//     }
//     30%,
//     50%,
//     70% {
//       -webkit-transform: rotate(4deg);
//       transform: rotate(4deg);
//     }
//     80% {
//       -webkit-transform: rotate(-2deg);
//       transform: rotate(-2deg);
//     }
//     90% {
//       -webkit-transform: rotate(2deg);
//       transform: rotate(2deg);
//     }
//   }
//   @keyframes shake-top {
//     0%,
//     100% {
//       -webkit-transform: rotate(0deg);
//       transform: rotate(0deg);
//       -webkit-transform-origin: 50% 0;
//       transform-origin: 50% 0;
//     }
//     10% {
//       -webkit-transform: rotate(2deg);
//       transform: rotate(2deg);
//     }
//     20%,
//     40%,
//     60% {
//       -webkit-transform: rotate(-4deg);
//       transform: rotate(-4deg);
//     }
//     30%,
//     50%,
//     70% {
//       -webkit-transform: rotate(4deg);
//       transform: rotate(4deg);
//     }
//     80% {
//       -webkit-transform: rotate(-2deg);
//       transform: rotate(-2deg);
//     }
//     90% {
//       -webkit-transform: rotate(2deg);
//       transform: rotate(2deg);
//     }
//   }
// `;

export default Alert;
