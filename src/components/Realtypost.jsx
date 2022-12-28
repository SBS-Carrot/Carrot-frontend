import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RealtyHeader from "../layouts/RealtyHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import Footer from "../layouts/Footer";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  BsFillEmojiSmileFill,
  BsChevronLeft,
  BsChevronRight,
  BsCalendarEvent,
} from "react-icons/bs";
import { AiOutlineDollar, AiOutlineClockCircle } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCarrot } from "react-icons/fa";
import ReadMap from "./ReadMap";
import Temp from "../routes/Temp";
import uuid from "react-uuid";
const Realtypost = ({
  logined,
  setLogined,
  realtyLiked,
  setRealtyLiked,
  onRealtyLike,
  onRemoveRealty,
  deleteToggle,
  onDeleteToggle,
  menuToggle,
  onMenuToggle,
  setMenuToggle,
  editToggle,
  onEditToggle,
}) => {
  const { num } = useParams();
  const [article, setArticle] = useState("");
  const [userid, setUserid] = useState(sessionStorage.getItem("userid"));
  const [user, setUser] = useState("");
  const [articleWriter, setArticleWriter] = useState("");
  const [images, setImages] = useState([]);
  const onLikes = (data) => {
    setRealtyLiked(data);
  };
  const navigate = useNavigate();
  const moveBack = () => {
    navigate(-1);
  };
  const moveChat = async (myName, yourName) => {
    if (myName === yourName) {
      alert("자기 자신에게는 메세지를 보낼 수 없습니다.");
      return;
    }
    //나와 상대방 사이의 채팅방 존재 유무 확인
    const data = await axios({
      url: `http://localhost:8083/getChattingRoom`,
      method: "GET",
      params: { myName, yourName },
    });
    // 채팅방이 여러개라 오류남.
    const data1 = await axios({
      url: `http://localhost:8083/getChattingRoom`,
      method: "GET",
      params: { myName: yourName, yourName: myName },
    });
    sessionStorage.setItem("articleId", num);
    sessionStorage.setItem("type", "realty");
    if (data.data.length == 0) {
      // 채팅방이 없다면 (메시지를 처음주고 받는다면)
      // uuid로 랜덤한 문자 생성 후 그 URL로 채팅방 생성 후 이동
      const data1 = await axios({
        url: `http://localhost:8083/getUser/${userid}`,
        method: "Get",
      });
      const myURL = data1.data.profileImage;
      const yourURL = articleWriter.profileImage;
      const roomNum = uuid();
      const chattingRoom = {
        roomId: roomNum,
        myName,
        yourName,
        myURL,
        yourURL,
        type: "realty",
        articleId: num,
      };
      axios({
        url: `http://localhost:8083/chat`,
        method: "POST",
        data: chattingRoom,
      });
      if (roomNum != undefined) {
        navigate(`/chat/${roomNum}`);
      } else {
        alert("에러가 Post에서 발생했습니다. 다시 시도해 주세요");
        window.location.reload();
      }
      return;
    }
    for (let i = 0; i < data.data.length; i++) {
      if (
        (data.data[i].roomId == "" || data.data[i].roomId == undefined) &&
        (data1.data[i].roomId == "" || data1.data[i].roomId == undefined)
      ) {
        // 채팅방이 없다면 (메시지를 처음주고 받는다면)
        // uuid로 랜덤한 문자 생성 후 그 URL로 채팅방 생성 후 이동
        const data1 = await axios({
          url: `http://localhost:8083/getUser/${userid}`,
          method: "Get",
        });
        const myURL = data1.data.profileImage;
        const yourURL = articleWriter.profileImage;
        const roomNum = uuid();
        const chattingRoom = {
          roomId: roomNum,
          myName,
          yourName,
          myURL,
          yourURL,
          type: "realty",
          articleId: num,
        };
        axios({
          url: `http://localhost:8083/chat`,
          method: "POST",
          data: chattingRoom,
        });

        navigate(`/chat/${roomNum}`);
        return;
      }
      //이미 존재한다면 type과 id를 비교해서
      // 상품이 같다면 그방으로, 다르면 다른채팅방으로 보내야함.
      else if (data.data[i].roomId != "") {
        const data2 = await axios({
          url: `http://localhost:8083/getRoomByType/` + data.data[i].roomId,
          method: "POST",
          data: {
            myName,
            yourName,
            articleId: num,
            type: "realty",
          },
        });
        if (data2.data == "") {
          //type과 id 비교시 없으므로 새로운 채팅방 개설.

          const data1 = await axios({
            url: `http://localhost:8083/getUser/${userid}`,
            method: "Get",
          });
          const myURL = data1.data.profileImage;
          const yourURL = articleWriter.profileImage;
          const roomNum = uuid();
          const chattingRoom = {
            roomId: roomNum,
            myName,
            yourName,
            myURL,
            yourURL,
            type: "realty",
            articleId: num,
          };
          axios({
            url: `http://localhost:8083/chat`,
            method: "POST",
            data: chattingRoom,
          });

          navigate(`/chat/${roomNum}`);
          return;
        } else {
          //이미 있으므로 이미 있는방으로 보낼 것.
          navigate(`/chat/${data2.data.roomId}`);
          return;
        }
      } else if (data1.data[i].roomId != "") {
        const data3 = await axios({
          url: `http://localhost:8083/getRoomByType/` + data1.data[i].roomId,
          method: "POST",
          data: {
            myName,
            yourName,
            articleId: num,
            type: "realty",
          },
        });
        if (data3.data == "") {
          //type과 id 비교시 없으므로 새로운 채팅방 개설.
          const data1 = await axios({
            url: `http://localhost:8083/getUser/${userid}`,
            method: "Get",
          });
          const myURL = data1.data.profileImage;
          const yourURL = articleWriter.profileImage;
          const roomNum = uuid();
          const chattingRoom = {
            roomId: roomNum,
            myName,
            yourName,
            myURL,
            yourURL,
            type: "realty",
            articleId: num,
          };
          axios({
            url: `http://localhost:8083/chat`,
            method: "POST",
            data: chattingRoom,
          });

          navigate(`/chat/${roomNum}`);
          return;
        } else {
          //이미 있으므로 이미 있는방으로 보낼 것.
          navigate(`/chat/${data3.data.roomId}`);
          return;
        }
      }
    }
  };
  const realtymove = () => {
    navigate(`/allrealty`);
  };
  const onArticle = (data) => {
    setArticle((prev) => data);
  };
  const [imgs, setImgs] = useState([
    {
      url: images[0],
    },
    {
      url: images[1],
    },
    {
      url: images[2],
    },
    {
      url: images[3],
    },
    {
      url: images[4],
    },
    {
      url: images[5],
    },
    {
      url: images[6],
    },
    {
      url: images[7],
    },
    {
      url: images[8],
    },
    {
      url: images[9],
    },
  ]);

  useEffect(() => {
    const onSubmit = async (num) => {
      let abcd = "";
      try {
        const data = await axios({
          url: `http://localhost:8083/realty/${num}`,
          method: "GET",
        });
        abcd = data.data.realtyUserid;
        onArticle(data.data);
        console.log("아아", data.data);
      } catch {
        console.log("에러");
        window.alert("존재하지 않는 게시글입니다.");
        moveBack();
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/realtyDong`,
          method: "GET",
        });
        console.log(data.data);
        onRealty(data.data);
        onRealtyDong(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getUser/${abcd}`,
          method: "GET",
        });
        setArticleWriter(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getRealtyWithImage/${num}`,
          method: "GET",
        });

        setImgs(data.data.images);
      } catch (e) {
        console.log(e);
      }

      try {
        const data = await axios({
          url: `http://localhost:8083/likeRealtyCheck/${num}`,
          method: "GET",
          params: {
            realtyId: num,
            userid: sessionStorage.getItem("userid"),
          },
        });
        onLikes(data.data);
      } catch (e) {
        console.log(e);
      }

      try {
        const data = await axios({
          url: `http://localhost:8083/getUser/${userid}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit(num);
    let testnum = uuid();
  }, []);

  const [realtyDong, setRealtyDong] = useState([]);
  const [realtypost, setRealtyPost] = useState([]);

  const onRealtyDong = (data) => {
    setRealtyDong(data.filter((realty) => realty.realtyId != num).slice(0, 2));
  };

  const onRealty = (data) => {
    const datas = data.reverse();
    setRealtyPost((prev) => datas);
  };

  useEffect(() => {
    const onLikeRe = async (num) => {
      try {
        const data = await axios({
          url: `http://localhost:8083/realty/${num}`,
          method: "GET",
        });
        onArticle(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onLikeRe(num);
  }, [realtyLiked]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  if (logined) {
    return (
      <div>
        <LoginedRealtyHeader setLogined={setLogined} />
        <div
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
            <div>
              {imgs[0] != undefined ? (
                <div>
                  <Slider {...settings}>
                    {imgs[0] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[0]} alt="" />
                      </div>
                    )}
                    {imgs[1] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[1]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[2] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[2]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[3] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[3]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[4] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[4]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[5] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[5]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[6] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[6]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[7] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[7]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[8] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[8]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[9] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[9]} alt="" />
                      </div>
                    )}
                  </Slider>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <section className="mt-6 flex justify-end gap-3">
            <div
              className="flex"
              style={{
                width: "700px",
              }}
            >
              <div
                className="avatar items-center"
                style={{
                  width: "3.5rem",
                }}
              >
                <div className="w-12 rounded-full">
                  {articleWriter.profileImage != null ? (
                    <img src={articleWriter.profileImage} />
                  ) : (
                    <FaCarrot
                      style={{
                        color: "#fc9d39",
                        fontSize: "3rem",
                        transform: "translate(0%,0%)",
                        border: "0.1px #fc9d39 solid",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                className="flex justify-center flex-col"
                style={{
                  width: "300px",
                }}
              >
                <div className="font-bold ">
                  {articleWriter.nickname == "닉네임 없음"
                    ? article.realtyUserid
                    : articleWriter.nickname}
                </div>
                <div className="text-sm">{articleWriter.address}</div>
              </div>
            </div>
            <div
              style={{
                width: "200px",
              }}
            >
              <div
                className="flex gap-2"
                style={{
                  marginLeft: "-10px",
                }}
              >
                <Temp temp={articleWriter.temp} page="" />
              </div>

              <div
                className="text-sm flex justify-end"
                style={{
                  color: "gray",
                }}
              >
                매너온도
              </div>
            </div>
          </section>
          <br />
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div className="flex items-center mt-6 gap-2">
              <div
                className="flex justify-center text-sm"
                style={{
                  border: "1px black solid",
                  width: "45px",
                  height: "20px",
                  fontSize: "0.7rem",
                }}
              >
                {article.realtyWho}
              </div>
              <div>
                <div
                  className="flex "
                  style={{
                    justifyContent: "space-between",
                    width: "650px",
                  }}
                >
                  <span className="font-bold">{article.realtyCategory}</span>
                  {article.realtyUserid === userid ? (
                    <span>
                      {" "}
                      <span
                        className=""
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          onClick={() => {
                            onMenuToggle();
                          }}
                        >
                          <FiMoreHorizontal />
                        </button>
                        {menuToggle && (
                          <div
                            className="flex flex-col items-center"
                            style={{
                              position: "absolute",
                              width: "50px",
                              height: "50px",
                              left: "-22px",
                            }}
                          >
                            <a href={`/realtyEdit/${num}`}>수정</a>
                            <button
                              onClick={() => {
                                onDeleteToggle();
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </span>{" "}
                      {deleteToggle && (
                        <div
                          className="p-2 rounded-md"
                          style={{
                            width: "250px",
                            height: "80px",
                            border: "1px gray solid",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                          }}
                        >
                          <div className="flex justify-center">
                            게시물을 삭제하시겠어요?
                          </div>
                          <div className="flex justify-center gap-4 mt-3">
                            <button
                              className=" rounded-md font-bold"
                              style={{
                                padding: "5px",
                                color: "red",
                              }}
                              onClick={() => {
                                onRemoveRealty(num);
                                alert("삭제되었습니다.");
                                setMenuToggle();
                                onDeleteToggle(false);
                                realtymove();
                              }}
                            >
                              삭제
                            </button>
                            <button
                              onClick={() => {
                                onDeleteToggle(false);
                              }}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div
              className=" flex items-center gap-3"
              style={{
                fontSize: "1.8rem",
              }}
            >
              <div className="font-bold">
                {article.realtyDeal == "판매중" ? (
                  <div
                    style={{
                      color: "#ffa445",
                    }}
                  >
                    {article.realtyDeal}
                  </div>
                ) : (
                  <div
                    style={{
                      color: "gray",
                    }}
                  >
                    {article.realtyDeal}
                  </div>
                )}
              </div>
              <div className="font-bold">
                {article.realtyDealing === "매매" ? (
                  <div>
                    {article.realtyDealing} {article.realtySalePrice}
                  </div>
                ) : (
                  ""
                )}
                {article.realtyDealing === "전세" ? (
                  <div>
                    {article.realtyDealing} {article.realtySalePrice}
                    {article.realtyD}
                  </div>
                ) : (
                  ""
                )}
                {article.realtyDealing === "월세" ? (
                  <div>
                    {article.realtyDealing} {article.realtyDeposit} /{" "}
                    {article.realtyMonthly}
                  </div>
                ) : (
                  ""
                )}
                {article.realtyDealing === "단기" ? (
                  <div>
                    {article.realtyDealing} {article.realtyDeposit} /{" "}
                    {article.realtyMonthly}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                {article.createDate}
              </div>
            </div>
            <br />
          </section>
          <div
            className="font-bold pb-5 mt-9"
            style={{
              fontSize: "1.2rem",
            }}
          >
            정보
          </div>
          <section className="flex">
            <ul
              className="flex flex-col gap-4 mb-11 "
              style={{
                fontSize: "1.1rem",
                width: "120px",
              }}
            >
              {article.realtySpace && article.realtyArea == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">면적</span>
                </li>
              )}
              {article.realtyRoom && article.realtyBath == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">방/욕실 수</span>
                </li>
              )}
              {article.realtyFloor && article.realtyWhole == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">층</span>
                </li>
              )}
              {article.realtyLoan == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">대출가능여부</span>
                </li>
              )}
              {article.realtyMove == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">입주 가능일</span>
                </li>
              )}
              {article.realtyPet == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">반려동물</span>
                </li>
              )}
              {article.realtyParking == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">주차</span>
                </li>
              )}
              {article.realtyElevator == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">엘리베이터</span>
                </li>
              )}
              {article.realtyInside == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">내부 시설</span>
                </li>
              )}
            </ul>
            <ul
              className="flex flex-col gap-4 mb-11 "
              style={{
                fontSize: "1.1rem",
              }}
            >
              {article.realtySpace && article.realtyArea == "" ? (
                ""
              ) : (
                <li className="flex gap-4 font-bold">
                  <div>
                    {article.realtySpace}평 · 전용 {article.realtyArea}㎡
                  </div>
                </li>
              )}
              {article.realtyRoom && article.realtyBath == "" ? (
                ""
              ) : (
                <li className="flex gap-4 font-bold">
                  <div>
                    방 {article.realtyRoom}개 / 욕실 {article.realtyBath}개
                  </div>
                </li>
              )}
              {article.realtyFloor && article.realtyWhole == "" ? (
                ""
              ) : (
                <li className="flex gap-4 font-bold">
                  <div>
                    {article.realtyFloor}층 / {article.realtyWhole}층{" "}
                  </div>
                </li>
              )}
              {article.realtyLoan == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyLoan}</div>
                </li>
              )}
              {article.realtyMove == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyMove}</div>
                </li>
              )}
              {article.realtyPet == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyPet}</div>
                </li>
              )}
              {article.realtyParking == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyParking}</div>
                </li>
              )}
              {article.realtyElevator == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyElevator}</div>
                </li>
              )}
              {article.realtyInside == null ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyInside}</div>
                </li>
              )}
            </ul>
          </section>
          <section>
            <div
              className="font-bold pb-1"
              style={{
                fontSize: "1.2rem",
              }}
            >
              소개
            </div>
            <div
              className="mb-10"
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {article.realtyContent}
              {article.realtyDepositChange == "" ? (
                ""
              ) : (
                <div> 보증금 조정 가능: {article.realtyDepositChange}</div>
              )}
              {article.realtyShortTerm == "" ? (
                ""
              ) : (
                <div> 단기임대 설명: {article.realtyShortTerm}</div>
              )}
            </div>
          </section>
          <div
            className="flex gap-4 align-center font-bold mt-2 pb-11"
            style={{
              fontSize: "1rem",
              height: "30px",
            }}
          >
            <div>채팅 {article.realtyChatting}</div>
            <div>관심 {article.realtyLike}</div>
            <div>조회수 {article.realtyCheck}</div>
          </div>

          {/* map */}
          <div>
            <div
              className="font-bold pt-2"
              style={{
                fontSize: "1.2rem",
              }}
            >
              주소
            </div>
            <ReadMap searchPlace={article.realtyAddress} />
            <div>{article.realtyAddress}</div>
          </div>
          <section>
            <div
              className="py-2 flex gap-5 justify-end"
              style={{
                width: "700px",
              }}
            >
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  onRealtyLike(num, userid);
                }}
              >
                {realtyLiked ? (
                  <FiHeart
                    style={{
                      color: "pink",
                    }}
                  />
                ) : (
                  <FiHeart />
                )}
              </button>

              <button
                onClick={() => {
                  const myName = sessionStorage.getItem("userid");

                  const yourName = articleWriter.userid;

                  moveChat(myName, yourName);
                }}
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                채팅하기{" "}
              </button>
            </div>
          </section>

          <div>
            <div
              style={{
                height: "60px",
              }}
            >
              <div className="py-7 flex items-start">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  부동산 직거래 게시글 더보기
                </div>
              </div>
            </div>

            <br />
          </div>
          <div className="gap-2">
            <div>
              <ul className="grid grid-cols-2 gap-5">
                {realtyDong.map((realty, index) => (
                  <li
                    key={index}
                    style={{
                      width: "360px",
                      height: "120px",
                    }}
                  >
                    <button
                      onClick={() => {
                        // moveRealty(realty.realtyId);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        className="flex"
                        style={{
                          height: "120px",
                        }}
                      >
                        <div
                          style={{
                            minWidth: "120px",
                            maxWidth: "120px",
                            height: "120px",

                            borderRadius: "10px",
                          }}
                        >
                          {realty.profileImage != null ? (
                            <img
                              src={realty.profileImage}
                              alt=""
                              style={{
                                borderRadius: "15px",
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                                display: "block",
                              }}
                            />
                          ) : (
                            <FaCarrot
                              style={{
                                color: "#fc9d39",
                                fontSize: "7rem",
                                transform: "translate(1.5%,1.5%)",
                                border: "0.1px #fc9d39 solid",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                        <div
                          className="gap-2"
                          style={{
                            textAlign: "left",
                            marginLeft: "10px",
                          }}
                        >
                          <div>
                            <span>{realty.realtyCategory}</span>
                            <span
                              style={{
                                paddingRight: "3px",
                              }}
                            >
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length >= 7 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                        marginLeft: "3px",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "30px",
                                        whiteSpace: "nowrap",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",

                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "30px",
                                        whiteSpace: "nowrap",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",

                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "15px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "월세" ? (
                                <span>
                                  {realty.realtyDeposit}만원/
                                  {realty.realtyMonthly}만원 -
                                </span>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "단기" ? (
                                <span>
                                  {realty.realtyDeposit}만원/
                                  {realty.realtyMonthly}만원 -
                                </span>
                              ) : (
                                ""
                              )}
                            </span>

                            <span
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyIntroduce}
                            </span>
                          </div>
                          <div
                            className="text-sm"
                            style={{
                              color: "#73777B",
                              textAlign: "left",
                            }}
                          >
                            <div>{realty.realtyAddressDong}</div>
                          </div>

                          <div
                            className="font-bold pt-1"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {realty.realtyDealing === "전세" &&
                            realty.realtySalePrice.length == 6 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing} &nbsp;
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                    {realty.realtySalePrice.charAt(1)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(2) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(2)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "전세" &&
                            realty.realtySalePrice.length == 5 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing}
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(1) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(1)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "매매" &&
                            realty.realtySalePrice.length == 6 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing} &nbsp;
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                    {realty.realtySalePrice.charAt(1)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(2) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(2)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "전세" &&
                            realty.realtySalePrice.length >= 7 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing} &nbsp;
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "25px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                    {realty.realtySalePrice.charAt(1)}
                                    {realty.realtySalePrice.charAt(2)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(3) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(2)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "매매" &&
                            realty.realtySalePrice.length == 5 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing}
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(1) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(1)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "월세" ? (
                              <div>
                                {realty.realtyDealing} {realty.realtyDeposit}/
                                {realty.realtyMonthly}
                              </div>
                            ) : (
                              ""
                            )}{" "}
                            {realty.realtyDealing === "단기" ? (
                              <div>
                                {realty.realtyDealing} {realty.realtyDeposit}/
                                {realty.realtyMonthly}
                              </div>
                            ) : (
                              ""
                            )}
                            <div></div>
                            <div></div>
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

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <RealtyHeader />
        <div
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
            <div>
              {imgs[0] != undefined ? (
                <div>
                  <Slider {...settings}>
                    {imgs[0] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[0]} alt="" />
                      </div>
                    )}
                    {imgs[1] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[1]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[2] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[2]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[3] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[3]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[4] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[4]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[5] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[5]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[6] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[6]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[7] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[7]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[8] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[8]} alt="" />
                      </div>
                    )}{" "}
                    {imgs[9] == undefined ? (
                      ""
                    ) : (
                      <div>
                        <img src={imgs[9]} alt="" />
                      </div>
                    )}
                  </Slider>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <section className="mt-6 flex justify-end gap-3">
            <div
              className="flex"
              style={{
                width: "700px",
              }}
            >
              <div
                className="avatar items-center"
                style={{
                  width: "3.5rem",
                }}
              >
                <div className="w-12 rounded-full">
                  {articleWriter.profileImage != null ? (
                    <img src={articleWriter.profileImage} />
                  ) : (
                    <FaCarrot
                      style={{
                        color: "#fc9d39",
                        fontSize: "3rem",
                        transform: "translate(0%,0%)",
                        border: "0.1px #fc9d39 solid",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                className="flex justify-center flex-col"
                style={{
                  width: "300px",
                }}
              >
                <div className="font-bold ">
                  {articleWriter.nickname == "닉네임 없음"
                    ? article.realtyUserid
                    : articleWriter.nickname}
                </div>
                <div className="text-sm">{articleWriter.address}</div>
              </div>
            </div>
            <div
              style={{
                width: "200px",
              }}
            >
              <div
                className="flex gap-2"
                style={{
                  marginLeft: "-10px",
                }}
              >
                <Temp temp={articleWriter.temp} page="" />
              </div>

              <div
                className="text-sm flex justify-end"
                style={{
                  color: "gray",
                }}
              >
                매너온도
              </div>
            </div>
          </section>
          <br />
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div className="flex items-center mt-6 gap-2">
              <div
                className="flex justify-center text-sm"
                style={{
                  border: "1px black solid",
                  width: "45px",
                  height: "20px",
                  fontSize: "0.7rem",
                }}
              >
                {article.realtyWho}
              </div>
              <div>
                <div
                  className="flex "
                  style={{
                    justifyContent: "space-between",
                    width: "650px",
                  }}
                >
                  <span className="font-bold">{article.realtyCategory}</span>
                  {article.realtyUserid === userid ? (
                    <span>
                      {" "}
                      <span
                        className=""
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          onClick={() => {
                            onMenuToggle();
                          }}
                        >
                          <FiMoreHorizontal />
                        </button>
                        {menuToggle && (
                          <div
                            className="flex flex-col items-center"
                            style={{
                              position: "absolute",
                              width: "50px",
                              height: "50px",
                              left: "-22px",
                            }}
                          >
                            <button
                            // onClick={() => {
                            //   onEditToggle();
                            // }}
                            >
                              수정
                            </button>
                            <button
                              onClick={() => {
                                onDeleteToggle();
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </span>{" "}
                      {deleteToggle && (
                        <div
                          className="p-2 rounded-md"
                          style={{
                            width: "250px",
                            height: "80px",
                            border: "1px gray solid",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                          }}
                        >
                          <div className="flex justify-center">
                            게시물을 삭제하시겠어요?
                          </div>
                          <div className="flex justify-center gap-4 mt-3">
                            <button
                              className=" rounded-md font-bold"
                              style={{
                                padding: "5px",
                                color: "red",
                              }}
                              onClick={() => {
                                onRemoveRealty(num);
                                alert("삭제되었습니다.");
                                setMenuToggle();
                                onDeleteToggle(false);
                                realtymove();
                              }}
                            >
                              삭제
                            </button>
                            <button
                              onClick={() => {
                                onDeleteToggle(false);
                              }}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div
              className=" flex items-center gap-3"
              style={{
                fontSize: "1.8rem",
              }}
            >
              <div className="font-bold">
                {article.realtyDeal == "판매중" ? (
                  <div
                    style={{
                      color: "#ffa445",
                    }}
                  >
                    {article.realtyDeal}
                  </div>
                ) : (
                  <div
                    style={{
                      color: "gray",
                    }}
                  >
                    {article.realtyDeal}
                  </div>
                )}
              </div>
              <div className="font-bold">
                {article.realtyDealing === "매매" ? (
                  <div>
                    {article.realtyDealing} {article.realtySalePrice}
                  </div>
                ) : (
                  ""
                )}
                {article.realtyDealing === "전세" ? (
                  <div>
                    {article.realtyDealing} {article.realtySalePrice}
                    {article.realtyD}
                  </div>
                ) : (
                  ""
                )}
                {article.realtyDealing === "월세" ? (
                  <div>
                    {article.realtyDealing} {article.realtyDeposit} /{" "}
                    {article.realtyMonthly}
                  </div>
                ) : (
                  ""
                )}
                {article.realtyDealing === "단기" ? (
                  <div>
                    {article.realtyDealing} {article.realtyDeposit} /{" "}
                    {article.realtyMonthly}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                {article.createDate}
              </div>
            </div>
            <br />
          </section>
          <div
            className="font-bold pb-5 mt-9"
            style={{
              fontSize: "1.2rem",
            }}
          >
            정보
          </div>
          <section className="flex">
            <ul
              className="flex flex-col gap-4 mb-11 "
              style={{
                fontSize: "1.1rem",
                width: "120px",
              }}
            >
              {article.realtySpace && article.realtyArea == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">면적</span>
                </li>
              )}
              {article.realtyRoom && article.realtyBath == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">방/욕실 수</span>
                </li>
              )}
              {article.realtyFloor && article.realtyWhole == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">층</span>
                </li>
              )}
              {article.realtyLoan == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">대출가능여부</span>
                </li>
              )}
              {article.realtyMove == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">입주 가능일</span>
                </li>
              )}
              {article.realtyPet == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">반려동물</span>
                </li>
              )}
              {article.realtyParking == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">주차</span>
                </li>
              )}
              {article.realtyElevator == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">엘리베이터</span>
                </li>
              )}
              {article.realtyInside == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <span className="text-gray-400">내부 시설</span>
                </li>
              )}
            </ul>
            <ul
              className="flex flex-col gap-4 mb-11 "
              style={{
                fontSize: "1.1rem",
              }}
            >
              {article.realtySpace && article.realtyArea == "" ? (
                ""
              ) : (
                <li className="flex gap-4 font-bold">
                  <div>
                    {article.realtySpace}평 · 전용 {article.realtyArea}㎡
                  </div>
                </li>
              )}
              {article.realtyRoom && article.realtyBath == "" ? (
                ""
              ) : (
                <li className="flex gap-4 font-bold">
                  <div>
                    방 {article.realtyRoom}개 / 욕실 {article.realtyBath}개
                  </div>
                </li>
              )}
              {article.realtyFloor && article.realtyWhole == "" ? (
                ""
              ) : (
                <li className="flex gap-4 font-bold">
                  <div>
                    {article.realtyFloor}층 / {article.realtyWhole}층{" "}
                  </div>
                </li>
              )}
              {article.realtyLoan == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyLoan}</div>
                </li>
              )}
              {article.realtyMove == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyMove}</div>
                </li>
              )}
              {article.realtyPet == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyPet}</div>
                </li>
              )}
              {article.realtyParking == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyParking}</div>
                </li>
              )}
              {article.realtyElevator == "" ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyElevator}</div>
                </li>
              )}
              {article.realtyInside == null ? (
                ""
              ) : (
                <li className="flex gap-4">
                  <div>{article.realtyInside}</div>
                </li>
              )}
            </ul>
          </section>
          <section>
            <div
              className="font-bold pb-1"
              style={{
                fontSize: "1.2rem",
              }}
            >
              소개
            </div>
            <div
              className="mb-10"
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {article.realtyContent}
              {article.realtyDepositChange == "" ? (
                ""
              ) : (
                <div> 보증금 조정 가능: {article.realtyDepositChange}</div>
              )}
              {article.realtyShortTerm == "" ? (
                ""
              ) : (
                <div> 단기임대 설명: {article.realtyShortTerm}</div>
              )}
            </div>
          </section>
          <div
            className="flex gap-4 align-center font-bold mt-2 pb-11"
            style={{
              fontSize: "1rem",
              height: "30px",
            }}
          >
            <div>채팅 {article.realtyChatting}</div>
            <div>관심 {article.realtyLike}</div>
            <div>조회수 {article.realtyCheck}</div>
          </div>

          {/* map */}
          <div>
            <div
              className="font-bold pt-2"
              style={{
                fontSize: "1.2rem",
              }}
            >
              주소
            </div>
            <ReadMap searchPlace={article.realtyAddress} />
            <div>{article.realtyAddress}</div>
          </div>
          <section>
            <div
              className="py-2 flex gap-5 justify-end"
              style={{
                width: "700px",
              }}
            >
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  alert("로그인 후 사용할 수 있는 기능입니다.");
                }}
              >
                {realtyLiked ? (
                  <FiHeart
                    style={{
                      color: "pink",
                    }}
                  />
                ) : (
                  <FiHeart />
                )}
              </button>

              <button
                onClick={() => {
                  alert("로그인 후 사용할 수 있는 기능입니다.");
                }}
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                채팅하기{" "}
              </button>
            </div>
          </section>

          <div>
            <div
              style={{
                height: "60px",
              }}
            >
              <div className="py-7 flex items-start">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  부동산 직거래 게시글 더보기
                </div>
              </div>
            </div>

            <br />
          </div>
          <div className="gap-2">
            <div>
              <ul className="grid grid-cols-2 gap-5">
                {realtyDong.map((realty, index) => (
                  <li
                    key={index}
                    style={{
                      width: "360px",
                      height: "120px",
                    }}
                  >
                    <button
                      onClick={() => {
                        // moveRealty(realty.realtyId);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        className="flex"
                        style={{
                          height: "120px",
                        }}
                      >
                        <div
                          style={{
                            minWidth: "120px",
                            maxWidth: "120px",
                            height: "120px",

                            borderRadius: "10px",
                          }}
                        >
                          {realty.profileImage != null ? (
                            <img
                              src={realty.profileImage}
                              alt=""
                              style={{
                                borderRadius: "15px",
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                                display: "block",
                              }}
                            />
                          ) : (
                            <FaCarrot
                              style={{
                                color: "#fc9d39",
                                fontSize: "7rem",
                                transform: "translate(1.5%,1.5%)",
                                border: "0.1px #fc9d39 solid",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                        <div
                          className="gap-2"
                          style={{
                            textAlign: "left",
                            marginLeft: "10px",
                          }}
                        >
                          <div>
                            <span>{realty.realtyCategory}</span>
                            <span
                              style={{
                                paddingRight: "3px",
                              }}
                            >
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length >= 7 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                        marginLeft: "3px",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "30px",
                                        whiteSpace: "nowrap",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",

                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "30px",
                                        whiteSpace: "nowrap",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",

                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "15px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "월세" ? (
                                <span>
                                  {realty.realtyDeposit}만원/
                                  {realty.realtyMonthly}만원 -
                                </span>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "단기" ? (
                                <span>
                                  {realty.realtyDeposit}만원/
                                  {realty.realtyMonthly}만원 -
                                </span>
                              ) : (
                                ""
                              )}
                            </span>

                            <span
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyIntroduce}
                            </span>
                          </div>
                          <div
                            className="text-sm"
                            style={{
                              color: "#73777B",
                              textAlign: "left",
                            }}
                          >
                            <div>{realty.realtyAddressDong}</div>
                          </div>

                          <div
                            className="font-bold pt-1"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {realty.realtyDealing === "전세" &&
                            realty.realtySalePrice.length == 6 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing} &nbsp;
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                    {realty.realtySalePrice.charAt(1)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(2) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(2)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "전세" &&
                            realty.realtySalePrice.length == 5 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing}
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(1) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(1)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "매매" &&
                            realty.realtySalePrice.length == 6 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing} &nbsp;
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                    {realty.realtySalePrice.charAt(1)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(2) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(2)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "전세" &&
                            realty.realtySalePrice.length >= 7 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing} &nbsp;
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "25px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                    {realty.realtySalePrice.charAt(1)}
                                    {realty.realtySalePrice.charAt(2)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(3) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(2)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "매매" &&
                            realty.realtySalePrice.length == 5 ? (
                              <div
                                style={{
                                  display: "inline",
                                }}
                              >
                                {realty.realtyDealing}
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "20px",
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {realty.realtySalePrice.charAt(0)}
                                  </span>
                                  <span>억</span>
                                  {realty.realtySalePrice.substring(1) != 0 ? (
                                    <span
                                      style={{
                                        width: "55px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        textAlign: "end",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {realty.realtySalePrice.substring(1)}만
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {realty.realtyDealing === "월세" ? (
                              <div>
                                {realty.realtyDealing} {realty.realtyDeposit}/
                                {realty.realtyMonthly}
                              </div>
                            ) : (
                              ""
                            )}{" "}
                            {realty.realtyDealing === "단기" ? (
                              <div>
                                {realty.realtyDealing} {realty.realtyDeposit}/
                                {realty.realtyMonthly}
                              </div>
                            ) : (
                              ""
                            )}
                            <div></div>
                            <div></div>
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

        <Footer />
      </div>
    );
  }
};

export default Realtypost;
