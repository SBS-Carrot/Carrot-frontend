import React from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import { faCarrot, faHandshakeSimple } from "@fortawesome/free-solid-svg-icons";
import { FaCarrot } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ImSad,
  ImSad2,
  ImSmile,
  ImSmile2,
  ImHappy,
  ImHappy2,
} from "react-icons/im";
// https://gilssang97.tistory.com/69

const Chat = ({ logined, setLogined }) => {
  const navigate = useNavigate();

  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate("/");
  };
  if (!logined) {
    moveBack();
  }
  const moveReview = () => {
    navigate("/ArticleControl");
  };
  const userid = sessionStorage.getItem("userid");
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const { roomId } = useParams();
  const [user2, setUser2] = useState("");
  const client = useRef({});
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);
  const [product, setProduct] = useState("");
  const [realty, setRealty] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  let now = new Date();
  const year = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDate = now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const [chatYear, setChatYear] = useState("");
  const [chatMonth, setChatMonth] = useState("");
  const [chatDate, setChatDate] = useState("");
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

  const onPriceChange = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
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
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + roomId, (body) => {
      const json_body = JSON.parse(body.body);

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
  const getData = (chat) => {
    const url = "/chat/" + roomId;
    const yourid = sessionStorage.getItem("yourName");
    try {
      axios({
        url: "http://localhost:8083/addChatNotification",
        method: "POST",
        data: {
          content: chat,
          url,
          notificationType: "CHAT",
          userid: yourid,
          sender: userid,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (chat) => {
    // 보내기 버튼 눌렀을 때 publish
    // event.preventDefault();

    getData(chat);
    publish(chat);
    setChat("");
  };
  const onChatList = (data) => {
    setChatList(data);
  };
  const onUser2 = (data) => {
    setUser2(data);
  };

  const onCreateRoom = async () => {
    try {
      //params로 받은 이미 존재하는 or 새로 생성된 채팅방 조회
      const data1 = await axios({
        url: `http://localhost:8083/room/` + roomId,
        method: "GET",
      });
      setType(data1.data.type);

      setId(data1.data.articleId);
      const myName = sessionStorage.getItem("userid");

      if (myName === data1.data.myName) {
        sessionStorage.removeItem("yourName");
        sessionStorage.setItem("yourName", data1.data.yourName);
      } else if (myName === data1.data.yourName) {
        sessionStorage.removeItem("yourName");
        sessionStorage.setItem("yourName", data1.data.myName);
      } else if (myName != data1.data.myName && myName != data1.data.yourName) {
        if (
          data1.data.myName == undefined ||
          data1.data.yourName == undefined
        ) {
          window.alert("에러가 Chat에서 발생했습니다. 다시 시도해주세요");
          navigate(-1);
          return;
        }
        console.log(myName);
        console.log(data1.data.myName);
        console.log(data1.data.yourName);
        notChattingUser();
      }

      const yourName = sessionStorage.getItem("yourName");
      // 있다면 채팅목록 GET
      if (data1.data != "") {
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

      if (data1.data.type == "product") {
        try {
          const data = await axios({
            url: `http://localhost:8083/product/${data1.data.articleId}`,
            method: "get",
          });

          setProduct(data.data);
        } catch (e) {
          console.log(e);
        }
      } else if (data1.data.type == "realty") {
        try {
          const data = await axios({
            url: `http://localhost:8083/realty/${data1.data.articleId}`,
            method: "get",
          });
          setRealty(data.data);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const notChattingUser = () => {
    navigate(-1);
    alert("채팅 당사자만 입장할 수 있습니다.");
  };

  const [pnum, setPnum] = useState("");
  const [reviewCheck, setReviewCheck] = useState("");
  const [psadToggle, setPSadToggle] = useState(false);
  const [psmileToggle, setSmileToggle] = useState(false);
  const [phappyToggle, setHappyToggle] = useState(false);
  const [dealToggle, setDealToggle] = useState(false);
  const onDealToggle = () => {
    setPSadToggle(false);
    setSmileToggle(false);
    setHappyToggle(false);
    setDealToggle(!dealToggle);
  };
  const onSad = () => {
    setPSadToggle(true);
    setSmileToggle(false);
    setHappyToggle(false);
    setReviewCheck("별로예요");
  };
  const onSmile = () => {
    setPSadToggle(false);
    setSmileToggle(true);
    setHappyToggle(false);
    setReviewCheck("좋아요");
  };
  const onHappy = () => {
    setPSadToggle(false);
    setSmileToggle(false);
    setHappyToggle(true);
    setReviewCheck("최고예요");
  };

  const onProductReview = async (articleid) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/productBuyReview`,
        method: "POST",
        data: {
          productId: articleid,
          productReview: reviewCheck,
          sellUserId: product.productUserid,
          buyUserId: sessionStorage.getItem("userid"),
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  //Realty
  const [rnum, setRnum] = useState("");
  const [realtyReviewCheck, setRealtyReviewCheck] = useState("");
  const [rsadToggle, setRSadToggle] = useState(false);
  const [rsmileToggle, setRSmileToggle] = useState(false);
  const [rhappyToggle, setRHappyToggle] = useState(false);
  const [realtyDealToggle, setRealtyDealToggle] = useState(false);
  const onRealtyDealToggle = () => {
    setPSadToggle(false);
    setSmileToggle(false);
    setRHappyToggle(false);
    setRealtyDealToggle(!realtyDealToggle);
  };

  const onRealtyReview = async (articleid) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/realtyBuyReview`,
        method: "POST",
        data: {
          realtyId: articleid,
          realtyReview: realtyReviewCheck,
          realtySellUserId: realty.realtyUserid,
          realtyBuyUserId: sessionStorage.getItem("userid"),
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const onRealtySad = () => {
    setRSadToggle(true);
    setRSmileToggle(false);
    setRHappyToggle(false);
    setRealtyReviewCheck("별로예요");
  };
  const onRealtySmile = () => {
    setRSadToggle(false);
    setRSmileToggle(true);
    setRHappyToggle(false);
    setRealtyReviewCheck("좋아요");
  };
  const onRealtyHappy = () => {
    setRSadToggle(false);
    setRSmileToggle(false);
    setRHappyToggle(true);
    setRealtyReviewCheck("최고예요");
  };

  return (
    <div>
      {type == "realty" ? (
        <LoginedRealtyHeader setLogined={setLogined} />
      ) : (
        <LoginedHeader setLogined={setLogined} />
      )}

      <div
        style={{
          width: "900px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {type == "product" ? (
          //중고거래일때
          product.productDeal == "거래 완료" ? (
            //중고거래 거래완료일때
            product.productBuyUserid == sessionStorage.getItem("userid") ? (
              //거래완료 구매자일때만 후기 창 팝업등장
              product.reviewFinished == true ? (
                //구매자가 이미 후기를 남겼을경우
                <div
                  style={{
                    position: "absolute",
                    top: "250px",
                    left: "900px",
                    width: "160px",
                    textAlign: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHandshakeSimple}
                    style={{
                      fontSize: "3rem",
                      color: "#ffa445",
                      marginLeft: "45px",
                      display: "block",
                    }}
                  />

                  <span>이미 후기를</span>
                  <br />
                  <span>작성하셨습니다.</span>
                </div>
              ) : (
                //구매자가 아직 후기를 남기기 전
                <div
                  style={{
                    position: "absolute",
                    top: "250px",
                    left: "900px",
                    width: "160px",
                    textAlign: "center",
                  }}
                >
                  <button
                    style={{
                      display: "block",
                      paddingTop: "5px",
                      paddingLeft: "47px",
                    }}
                    onClick={() => {
                      onDealToggle();
                      setPnum(product.productId);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHandshakeSimple}
                      style={{
                        fontSize: "3rem",
                        color: "#ffa445",

                        display: "block",
                      }}
                    />
                  </button>
                  <span>거래가 끝났나요?</span>
                  <br />
                  <span>후기를 작성해주세요!</span>
                  {dealToggle && product.productId == pnum ? (
                    <div
                      style={{
                        border: "1px #cccccc solid",
                        backgroundColor: "white",
                        position: "absolute",
                        zIndex: "9",
                        marginLeft: "-70px",
                      }}
                    >
                      <div className="font-bold flex gap-2 m-2">
                        <span className="flex items-center">
                          <FiArrowRight />
                        </span>
                        거래 후기 남기기
                      </div>
                      <div
                        className="flex gap-2 p-2"
                        style={{
                          backgroundColor: "#eeeeee",
                        }}
                      >
                        {product.profileImage != null ? (
                          <img
                            src={product.profileImage}
                            alt=""
                            style={{
                              borderRadius: "15px",
                              width: "60px",
                              height: "60px",
                              objectFit: "fill",
                              display: "block",
                            }}
                          />
                        ) : (
                          <FaCarrot
                            style={{
                              color: "#fc9d39",
                              fontSize: "10rem",
                              width: "70px",
                              height: "70px",
                              transform: "translate(-5% ,-5%)",
                              border: "0.1px #fc9d39 solid",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <div className="flex flex-col justify-center">
                          <span
                            style={{
                              color: "gray",
                            }}
                          >
                            거래한 상품
                          </span>
                          <div>{product.productSubject}</div>
                        </div>
                      </div>

                      <div className="flex justify-center font-bold p-4">
                        "{sessionStorage.getItem("yourName")}"님과 거래가
                        어떠셨나요?
                      </div>

                      <div>
                        {/* 내가 구매자면 판매자에 대한 후기 남기기 */}
                        <div
                          className="flex gap-5 justify-between p-3"
                          style={{
                            fontSize: "2rem",
                            width: "300px",
                          }}
                        >
                          <button
                            onClick={() => {
                              onSad();
                            }}
                          >
                            {psadToggle == true ? (
                              <div
                                className="flex flex-col items-center "
                                style={{
                                  color: "#fc9d39",
                                }}
                              >
                                <ImSad2
                                  style={{
                                    fontSize: "3.2rem",
                                  }}
                                />
                                <span className="text-base">별로예요</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center ">
                                <ImSad
                                  style={{
                                    fontSize: "3.2rem",
                                  }}
                                />
                                <span className="text-base">별로예요</span>
                              </div>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              onSmile();
                            }}
                          >
                            {psmileToggle == true ? (
                              <div
                                className="flex flex-col items-center "
                                style={{
                                  color: "#fc9d39",
                                }}
                              >
                                <ImSmile2
                                  style={{
                                    fontSize: "3.2rem",
                                  }}
                                />
                                <span className="text-base">좋아요!</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center ">
                                <ImSmile
                                  style={{
                                    fontSize: "3.2rem",
                                  }}
                                />
                                <span className="text-base">좋아요!</span>
                              </div>
                            )}
                          </button>
                          <button
                            className="flex flex-col items-center gap-1"
                            onClick={() => {
                              onHappy();
                            }}
                          >
                            {phappyToggle == true ? (
                              <div
                                className="flex flex-col items-center gap-1"
                                style={{
                                  color: "#fc9d39",
                                }}
                              >
                                <ImHappy2
                                  style={{
                                    fontSize: "3.2rem",
                                  }}
                                />
                                <span className="text-base">최고예요!</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <ImHappy
                                  style={{
                                    fontSize: "3.2rem",
                                  }}
                                />
                                <span className="text-base">최고예요!</span>
                              </div>
                            )}
                          </button>
                        </div>

                        <div
                          className=" flex justify-center m-2"
                          style={{
                            backgroundColor: "#fc9d39",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          <button
                            className="font-bold p-2"
                            style={{
                              width: "100%",
                            }}
                            onClick={() => {
                              onProductReview(pnum);
                              onDealToggle(false);
                              // window.location.reload();
                            }}
                          >
                            거래 후기 작성 완료
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* 거래완료 구매자일때 여기까지 */}
                </div>
              )
            ) : product.productUserid == sessionStorage.getItem("userid") ? (
              //거래완료 판매자일땐 이미 후기작성 완료 팝업창
              <div
                style={{
                  position: "absolute",
                  top: "250px",
                  left: "900px",
                  width: "160px",
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faHandshakeSimple}
                  style={{
                    fontSize: "3rem",
                    color: "#ffa445",
                    paddingTop: "5px",
                    paddingLeft: "47px",
                    display: "block",
                  }}
                />
                <span>이미 후기를 작성하셨습니다.</span>
              </div>
            ) : (
              //거래 당사자가 아니면 아무것도 안뜨게 빈칸.
              ""
              //중고거래 거래완료 여기까지
            )
          ) : product.productUserid == sessionStorage.getItem("userid") ? (
            //중고거래 판매중일때 판매자는 후기버튼 누르면 바로 이동
            <div
              style={{
                position: "absolute",
                top: "250px",
                left: "900px",
                width: "160px",
                textAlign: "center",
              }}
            >
              <button
                style={{
                  display: "block",
                  paddingTop: "5px",
                  paddingLeft: "47px",
                }}
                onClick={() => {
                  onDealToggle();
                  setPnum(product.productId);
                }}
              >
                <FontAwesomeIcon
                  icon={faHandshakeSimple}
                  style={{
                    fontSize: "3rem",
                    color: "#ffa445",

                    display: "block",
                  }}
                />
              </button>
              <span>거래가 끝났나요?</span>
              <br />
              <span>후기를 작성해주세요!</span>
              {dealToggle && product.productId == pnum ? (
                <div
                  style={{
                    border: "1px #cccccc solid",
                    backgroundColor: "white",
                    position: "absolute",
                    zIndex: "9",
                    marginLeft: "-70px",
                  }}
                >
                  <div className="font-bold flex gap-2 m-2">
                    <span className="flex items-center">
                      <FiArrowRight />
                    </span>
                    거래 후기 남기기
                  </div>
                  <div
                    className="flex gap-2 p-2"
                    style={{
                      backgroundColor: "#eeeeee",
                    }}
                  >
                    {product.profileImage != null ? (
                      <img
                        src={product.profileImage}
                        alt=""
                        style={{
                          borderRadius: "15px",
                          width: "60px",
                          height: "60px",
                          objectFit: "fill",
                          display: "block",
                        }}
                      />
                    ) : (
                      <FaCarrot
                        style={{
                          color: "#fc9d39",
                          fontSize: "10rem",
                          width: "70px",
                          height: "70px",
                          transform: "translate(-5% ,-5%)",
                          border: "0.1px #fc9d39 solid",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <div className="flex flex-col justify-center">
                      <span
                        style={{
                          color: "gray",
                        }}
                      >
                        거래한 상품
                      </span>
                      <div>{product.productSubject}</div>
                    </div>
                  </div>

                  <div className="flex justify-center font-bold p-4">
                    "{sessionStorage.getItem("yourName")}"님과 거래가
                    어떠셨나요?
                  </div>

                  <div>
                    {/* 내가 구매자면 판매자에 대한 후기 남기기 */}

                    <div
                      className=" flex justify-center m-2"
                      style={{
                        backgroundColor: "#fc9d39",
                        color: "white",
                        borderRadius: "5px",
                        width: "300px",
                      }}
                    >
                      <button
                        className="font-bold p-2"
                        style={{
                          width: "100%",
                        }}
                        onClick={() => {
                          sessionStorage.setItem(
                            "buyer",
                            sessionStorage.getItem("yourName")
                          );
                          sessionStorage.setItem("productId", pnum);
                          sessionStorage.setItem("productToggle", true);
                          moveReview();
                        }}
                      >
                        거래 후기 작성 하기
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* 거래완료 구매자일때 여기까지 */}
            </div>
          ) : (
            //중고거래 판매중일때 판매자제외 아무것도 안뜸.
            ""
          )
        ) : //중고거래 판매중일때 여기까지
        //지금부터 부동산 거래일때

        realty.isRealtyDeal == "거래 완료" ? (
          //부동산 거래완료일때
          realty.realtyBuyUserid == sessionStorage.getItem("userid") ? (
            //거래완료 구매자일때만 후기 창 팝업등장
            realty.reviewFinished == true ? (
              //구매자가 이미 후기를 남겼을경우
              <div
                style={{
                  position: "absolute",
                  top: "250px",
                  left: "900px",
                  width: "160px",
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faHandshakeSimple}
                  style={{
                    fontSize: "3rem",
                    color: "#ffa445",
                    marginLeft: "45px",
                    display: "block",
                  }}
                />

                <span>이미 후기를</span>
                <br />
                <span>작성하셨습니다.</span>
              </div>
            ) : (
              //구매자가 아직 후기를 남기기 전

              <div
                style={{
                  position: "absolute",
                  top: "250px",
                  left: "900px",
                  width: "160px",
                  textAlign: "center",
                }}
              >
                <button
                  style={{
                    display: "block",
                    paddingTop: "5px",
                    paddingLeft: "47px",
                  }}
                  onClick={() => {
                    onRealtyDealToggle();
                    setRnum(realty.realtyId);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHandshakeSimple}
                    style={{
                      fontSize: "3rem",
                      color: "#ffa445",

                      display: "block",
                    }}
                  />
                </button>
                <span>거래가 끝났나요?</span>
                <br />
                <span>후기를 작성해주세요!</span>
                {realtyDealToggle && realty.realtyId == rnum ? (
                  <div
                    style={{
                      border: "1px #cccccc solid",
                      backgroundColor: "white",
                      position: "absolute",
                      zIndex: "9",
                      marginLeft: "-70px",
                    }}
                  >
                    <div className="font-bold flex gap-2 m-2">
                      <span className="flex items-center">
                        <FiArrowRight />
                      </span>
                      거래 후기 남기기
                    </div>
                    <div
                      className="flex gap-2 p-2"
                      style={{
                        backgroundColor: "#eeeeee",
                      }}
                    >
                      {realty.profileImage != null ? (
                        <img
                          src={realty.profileImage}
                          alt=""
                          style={{
                            borderRadius: "15px",
                            width: "60px",
                            height: "60px",
                            objectFit: "fill",
                            display: "block",
                          }}
                        />
                      ) : (
                        <FaCarrot
                          style={{
                            color: "#fc9d39",
                            fontSize: "10rem",
                            width: "70px",
                            height: "70px",
                            transform: "translate(-5% ,-5%)",
                            border: "0.1px #fc9d39 solid",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      <div className="flex flex-col justify-center">
                        <span
                          style={{
                            color: "gray",
                          }}
                        >
                          거래한 상품
                        </span>
                        <div>{realty.realtyAddress}</div>
                      </div>
                    </div>

                    <div className="flex justify-center font-bold p-4">
                      "{sessionStorage.getItem("yourName")}"님과 거래가
                      어떠셨나요?
                    </div>

                    <div>
                      {/* 내가 구매자면 판매자에 대한 후기 남기기 */}
                      <div
                        className="flex gap-5 justify-between p-3"
                        style={{
                          fontSize: "2rem",
                          width: "300px",
                        }}
                      >
                        <button
                          onClick={() => {
                            onRealtySad();
                          }}
                        >
                          {rsadToggle == true ? (
                            <div
                              className="flex flex-col items-center "
                              style={{
                                color: "#fc9d39",
                              }}
                            >
                              <ImSad2
                                style={{
                                  fontSize: "3.2rem",
                                }}
                              />
                              <span className="text-base">별로예요</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center ">
                              <ImSad
                                style={{
                                  fontSize: "3.2rem",
                                }}
                              />
                              <span className="text-base">별로예요</span>
                            </div>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            onRealtySmile();
                          }}
                        >
                          {rsmileToggle == true ? (
                            <div
                              className="flex flex-col items-center "
                              style={{
                                color: "#fc9d39",
                              }}
                            >
                              <ImSmile2
                                style={{
                                  fontSize: "3.2rem",
                                }}
                              />
                              <span className="text-base">좋아요!</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center ">
                              <ImSmile
                                style={{
                                  fontSize: "3.2rem",
                                }}
                              />
                              <span className="text-base">좋아요!</span>
                            </div>
                          )}
                        </button>
                        <button
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            onRealtyHappy();
                          }}
                        >
                          {rhappyToggle == true ? (
                            <div
                              className="flex flex-col items-center gap-1"
                              style={{
                                color: "#fc9d39",
                              }}
                            >
                              <ImHappy2
                                style={{
                                  fontSize: "3.2rem",
                                }}
                              />
                              <span className="text-base">최고예요!</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <ImHappy
                                style={{
                                  fontSize: "3.2rem",
                                }}
                              />
                              <span className="text-base">최고예요!</span>
                            </div>
                          )}
                        </button>
                      </div>

                      <div
                        className=" flex justify-center m-2"
                        style={{
                          backgroundColor: "#fc9d39",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <button
                          className="font-bold p-2"
                          style={{
                            width: "100%",
                          }}
                          onClick={() => {
                            onRealtyReview(rnum);
                            onRealtyDealToggle(false);
                          }}
                        >
                          거래 후기 작성 완료
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* 거래완료 구매자일때 여기까지 */}
              </div>
            )
          ) : realty.realtyUserid == sessionStorage.getItem("userid") ? (
            //거래완료 판매자일땐 이미 후기작성 완료 팝업창
            <div
              style={{
                position: "absolute",
                top: "250px",
                left: "900px",
                width: "160px",
                textAlign: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faHandshakeSimple}
                style={{
                  fontSize: "3rem",
                  color: "#ffa445",
                  paddingTop: "5px",
                  paddingLeft: "47px",
                  display: "block",
                }}
              />
              <span>이미 후기를 작성하셨습니다.</span>
            </div>
          ) : (
            //거래 당사자가 아니면 아무것도 안뜨게 빈칸.
            ""
            //부동산 거래완료 여기까지
          )
        ) : realty.realtyUserid == sessionStorage.getItem("userid") ? (
          //부동산 판매중일때 판매자는 후기버튼 누르면 바로 이동
          <div
            style={{
              position: "absolute",
              top: "250px",
              left: "900px",
              width: "160px",
              textAlign: "center",
            }}
          >
            <button
              style={{
                display: "block",
                paddingTop: "5px",
                paddingLeft: "47px",
              }}
              onClick={() => {
                onRealtyDealToggle();
                setRnum(realty.realtyId);
              }}
            >
              <FontAwesomeIcon
                icon={faHandshakeSimple}
                style={{
                  fontSize: "3rem",
                  color: "#ffa445",

                  display: "block",
                }}
              />
            </button>
            <span>거래가 끝났나요?</span>
            <br />
            <span>후기를 작성해주세요!</span>
            {realtyDealToggle && realty.realtyId == rnum ? (
              <div
                style={{
                  border: "1px #cccccc solid",
                  backgroundColor: "white",
                  position: "absolute",
                  zIndex: "9",
                  marginLeft: "-70px",
                }}
              >
                <div className="font-bold flex gap-2 m-2">
                  <span className="flex items-center">
                    <FiArrowRight />
                  </span>
                  거래 후기 남기기
                </div>
                <div
                  className="flex gap-2 p-2"
                  style={{
                    backgroundColor: "#eeeeee",
                  }}
                >
                  {realty.profileImage != null ? (
                    <img
                      src={realty.profileImage}
                      alt=""
                      style={{
                        borderRadius: "15px",
                        width: "60px",
                        height: "60px",
                        objectFit: "fill",
                        display: "block",
                      }}
                    />
                  ) : (
                    <FaCarrot
                      style={{
                        color: "#fc9d39",
                        fontSize: "10rem",
                        width: "70px",
                        height: "70px",
                        transform: "translate(-5% ,-5%)",
                        border: "0.1px #fc9d39 solid",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <div className="flex flex-col justify-center">
                    <span
                      style={{
                        color: "gray",
                      }}
                    >
                      거래한 상품
                    </span>
                    <div>{realty.realtyAddress}</div>
                  </div>
                </div>

                <div className="flex justify-center font-bold p-4">
                  "{sessionStorage.getItem("yourName")}"님과 거래가 어떠셨나요?
                </div>

                <div>
                  {/* 내가 구매자면 판매자에 대한 후기 남기기 */}

                  <div
                    className=" flex justify-center m-2"
                    style={{
                      backgroundColor: "#fc9d39",
                      color: "white",
                      borderRadius: "5px",
                      width: "300px",
                    }}
                  >
                    <button
                      className="font-bold p-2"
                      style={{
                        width: "100%",
                      }}
                      onClick={() => {
                        sessionStorage.setItem(
                          "realtyBuyer",
                          sessionStorage.getItem("yourName")
                        );
                        sessionStorage.setItem("realtyId", rnum);
                        sessionStorage.setItem("realtyToggle", true);
                        moveReview();
                      }}
                    >
                      거래 후기 작성 하기
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* 거래완료 구매자일때 여기까지 */}
          </div>
        ) : (
          //부동산 판매중일때 판매자제외 아무것도 안뜸.
          ""
        )}
        <div
          style={{
            width: "900px",
            margin: "0 auto",
            height: "80vh",
            position: "relative",
            border: "1px solid #ffa445",
            borderRadius: "20px",
            overflow: "auto",
            paddingBottom: "10px",
          }}
        >
          {type == "product" ? (
            <div
              style={{
                borderBottom: "1px #ffa445 solid",
                margin: "0 auto",
                width: "500px",
                display: "flex",
              }}
            >
              {product.profileImage != null ? (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <img
                    src={product.profileImage}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCarrot}
                    style={{
                      fontSize: "5rem",
                      color: "#ffa445",
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h1>
                  {product.productSubject} / {product.productCategory}
                </h1>
                <div>가격 : {onPriceChange(product.productPrice)}원</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {type == "realty" ? (
            <div
              style={{
                borderBottom: "1px #ffa445 solid",
                margin: "0 auto",
                width: "500px",
                display: "flex",
              }}
            >
              {realty.profileImage != null ? (
                <div
                  style={{
                    width: "150px",
                    height: "120px",
                  }}
                >
                  <img
                    src={realty.profileImage}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCarrot}
                    style={{
                      fontSize: "5rem",
                      color: "#ffa445",
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h1>{realty.realtyAddress}</h1>
                <div>
                  {realty.realtyDealing === "매매" ? (
                    <div>
                      {realty.realtyDealing} {realty.realtySalePrice}
                    </div>
                  ) : (
                    ""
                  )}
                  {realty.realtyDealing === "전세" ? (
                    <div>
                      {realty.realtyDealing} {realty.realtySalePrice}
                      {realty.realtyD}
                    </div>
                  ) : (
                    ""
                  )}
                  {realty.realtyDealing === "월세" ? (
                    <div>
                      {realty.realtyDealing} {realty.realtyDeposit} /{" "}
                      {realty.realtyMonthly}
                    </div>
                  ) : (
                    ""
                  )}
                  {realty.realtyDealing === "단기" ? (
                    <div>
                      {realty.realtyDealing} {realty.realtyDeposit} /{" "}
                      {realty.realtyMonthly}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <h1>
                  평수 {realty.realtySpace}평, 방 {realty.realtyRoom}개 / 욕실{" "}
                  {realty.realtyBath}개
                </h1>
                <h1>
                  높이 총 {realty.realtyWhole}층 / {realty.realtyFloor}층
                </h1>
              </div>
            </div>
          ) : (
            ""
          )}
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
                    paddingLeft: "20px",
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
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                            }}
                          >
                            <img
                              src={user2.profileImage}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                borderRadius: "50%",
                                objectFit: "fill",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          borderRadius: "20px",
                          width: "45%",
                          minHeight: "50px",
                          marginTop: "10px",
                          marginLeft: "25px",
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
        </div>
        <div
          style={{
            width: "900px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            value={chat}
            onChange={handleChange}
            placeholder="메시지를 입력해 주세요"
            style={{
              width: "830px",
              border: "1px #ffa445 solid",
              borderRadius: "10px",
              backgroundColor: "white",
              padding: "10px",
              display: "inline",
              marginTop: "15px",
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
  );
};

export default Chat;
