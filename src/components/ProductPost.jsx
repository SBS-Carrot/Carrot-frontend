import LoginedHeader from "../layouts/LoginedHeader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "../styles/ProductPost.css";
import {
  BsFillEmojiSmileFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCarrot } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import Temp from "../routes/Temp";
import uuid from "react-uuid";
import { BACKEND_URL } from "../config/config";
const ProductPost = ({
  logined,
  setLogined,
  onLike,
  liked,
  setLiked,
  onRemove,
  deleteToggle,
  onDeleteToggle,
  menuToggle,
  onMenuToggle,
  setMenuToggle,
  editToggle,
  onEditToggle,
}) => {
  const { num } = useParams();
  const [userid, setUserid] = useState(sessionStorage.getItem("userid"));
  const [articleWriter, setArticleWriter] = useState("");

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
      url: `http://${BACKEND_URL}:8083/getChattingRoom`,
      method: "GET",
      params: { myName, yourName },
    });
    // 채팅방이 여러개라 오류남.
    const data1 = await axios({
      url: `http://${BACKEND_URL}:8083/getChattingRoom`,
      method: "GET",
      params: { myName: yourName, yourName: myName },
    });
    sessionStorage.setItem("articleId", num);
    sessionStorage.setItem("type", "product");
    let testNum = uuid();
    if (data.data.length == 0) {
      // 채팅방이 없다면 (메시지를 처음주고 받는다면)
      // uuid로 랜덤한 문자 생성 후 그 URL로 채팅방 생성 후 이동
      const data1 = await axios({
        url: `http://${BACKEND_URL}:8083/getUser/${userid}`,
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
        type: "product",
        articleId: num,
      };
      axios({
        url: `http://${BACKEND_URL}:8083/chat`,
        method: "POST",
        data: chattingRoom,
      });

      navigate(`/chat/${roomNum}`);
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
          url: `http://${BACKEND_URL}:8083/getUser/${userid}`,
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
          type: "product",
          articleId: num,
        };
        axios({
          url: `http://${BACKEND_URL}:8083/chat`,
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
          url:
            `http://${BACKEND_URL}:8083/getRoomByType/` + data.data[i].roomId,
          method: "POST",
          data: {
            myName,
            yourName,
            articleId: num,
            type: "product",
          },
        });
        if (data2.data == "") {
          //type과 id 비교시 없으므로 새로운 채팅방 개설.

          const data1 = await axios({
            url: `http://${BACKEND_URL}:8083/getUser/${userid}`,
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
            type: "product",
            articleId: num,
          };
          axios({
            url: `http://${BACKEND_URL}:8083/chat`,
            method: "POST",
            data: chattingRoom,
          });
          if (roomNum != undefined) {
            navigate(`/chat/${roomNum}`);
          } else {
            alert("오류가 Post에서 발생했습니다. 다시 시도해 주세요");
            window.location.reload();
          }
          return;
        } else {
          //이미 있으므로 이미 있는방으로 보낼 것.
          navigate(`/chat/${data2.data.roomId}`);
          return;
        }
      } else if (data1.data[i].roomId != "") {
        const data3 = await axios({
          url:
            `http://${BACKEND_URL}:8083/getRoomByType/` + data1.data[i].roomId,
          method: "POST",
          data: {
            myName,
            yourName,
            articleId: num,
            type: "product",
          },
        });
        if (data3.data == "") {
          //type과 id 비교시 없으므로 새로운 채팅방 개설.
          const data1 = await axios({
            url: `http://${BACKEND_URL}:8083/getUser/${userid}`,
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
            type: "product",
            articleId: num,
          };
          axios({
            url: `http://${BACKEND_URL}:8083/chat`,
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

  const productmove = () => {
    navigate(`/allproduct`);
  };

  const moveLogin = () => {
    navigate(`/login`);
  };
  const [article, setArticle] = useState("");

  const [images, setImages] = useState([]);
  const onLikes = (data) => {
    setLiked(data);
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
  const [user, setUser] = useState("");
  useEffect(() => {
    const onSubmit = async (num) => {
      let abcd = "";
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/product/${num}`,
          method: "GET",
        });
        abcd = data.data.productUserid;

        onArticle(data.data);
      } catch (e) {
        console.log(e);
        window.alert("존재하지 않는 게시물입니다");
        moveBack();
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getUser/${abcd}`,
          method: "GET",
        });
        setArticleWriter(data.data);
        sessionStorage.setItem("yourName", data.data.userid);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getProductWithImage/${num}`,
          method: "GET",
        });

        setImgs(data.data.images);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/likeProductCheck/${num}`,
          method: "GET",
          params: {
            productId: num,
            userid: sessionStorage.getItem("userid"),
          },
        });
        onLikes(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getUser/${sessionStorage.getItem(
            "userid"
          )}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/hotProduct`,
          method: "GET",
        });
        onProduct(data.data);
        onHotRemove(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit(num);
  }, []);

  const onHotRemove = (data) => {
    setHotProduct(
      data.filter((product) => product.productId != num).slice(0, 6)
    );
  };
  const [hotProduct, setHotProduct] = useState([]);
  const [post, setPost] = useState([]);

  const onProduct = (data) => {
    const datas = data.reverse();
    setPost((prev) => datas);
  };

  const moveProduct = async (id) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}lhost:8083/productView/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/productpost/${id}`);
  };

  const onArticle = (data) => {
    setArticle((prev) => data);
  };
  useEffect(() => {
    const onLikeRe = async (num) => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/product/${num}`,
          method: "GET",
        });
        onArticle(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onLikeRe(num);
  }, [liked]);
  sessionStorage.setItem("myURL", user.profileImage);
  sessionStorage.setItem("yourURL", articleWriter.profileImage);
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
        <LoginedHeader setLogined={setLogined} />
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
              className="avatar flex justify-center items-center"
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
                width: "500px",
              }}
            >
              <div className="font-bold ">
                {articleWriter.nickname == "닉네임 없음"
                  ? articleWriter.username
                  : articleWriter.nickname}
              </div>
              <div className="text-sm">{articleWriter.address}</div>
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
            <div className="mt-6 ">
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="font-bold flex"
                  style={{
                    fontSize: "1.25rem",
                  }}
                >
                  {article.productSubject}
                </div>
                {article.productUserid === userid ? (
                  <span>
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
                          <a href={`/productedit/${num}`}>수정</a>
                          <button
                            onClick={() => {
                              onDeleteToggle();
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </div>

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
                        onRemove(num);
                        alert("삭제되었습니다.");
                        setMenuToggle();
                        onDeleteToggle(false);
                        productmove();
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

              <div className="flex gap-2">
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {article.productCategory}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {article.productCreateTime}
                </div>
              </div>
              <div
                className="font-bold"
                style={{
                  fontSize: "1.25rem",
                }}
              >
                {article.productPrice}원
              </div>
            </div>
            <br />
            <div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {article.productContent}
              </div>
              <div
                className="flex text-sm gap-2 my-5"
                style={{
                  color: "gray",
                }}
              >
                <span>관심</span>
                <div>{article.productLike}</div>
                <span>채팅</span>
                <div>{article.productChatting}</div>
                <span>조회</span>
                <div>{article.productView}</div>
              </div>
            </div>
          </section>
          <br />
          <section>
            <div className="py-2 flex gap-5 justify-end">
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  onLike(num, sessionStorage.getItem("userid"));
                }}
              >
                {liked ? (
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

                  sessionStorage.setItem("yourName", articleWriter.userid);
                  moveChat(myName, yourName);
                }}
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                채팅하기
              </button>
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
            <div>
              <div className="py-9 flex justify-between">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  당근마켓 인기중고
                </div>
                <div
                  className=""
                  style={{
                    color: "#FF7F3F",
                  }}
                >
                  <a href="/hot_articles">더 구경하기</a>
                </div>
              </div>
              <div>
                <div>
                  <ul className="grid grid-cols-3">
                    {hotProduct.map((product, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            moveProduct(product.productId);
                          }}
                        >
                          <div
                            style={{
                              paddingLeft: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "15px",
                                marginBottom: "10px",
                              }}
                            >
                              {product.profileImage != null ? (
                                <img
                                  src={product.profileImage}
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
                                    fontSize: "10rem",
                                    transform: "translate(-5%, -5%)",
                                    border: "0.1px #fc9d39 solid",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}
                            </div>
                            <div
                              className="ellipsis_1"
                              style={{
                                width: "200px",
                                height: "25px",
                                textAlign: "start",
                              }}
                            >
                              <span>{product.productSubject}</span>
                            </div>
                            <div className="flex ">
                              <span
                                className="ellipsis_1"
                                style={{
                                  fontWeight: "bold",
                                  width: "100px",
                                  height: "20px",
                                  textAlign: "start",
                                }}
                              >
                                {product.productPrice}원
                              </span>
                            </div>
                            <div
                              className="flex mt-1"
                              style={{
                                fontSize: "0.8rem",
                              }}
                            >
                              <span>{product.productDealAddress}</span>
                            </div>
                            <div
                              className="flex"
                              style={{
                                paddingBottom: "3rem",
                                fontSize: "0.8rem",
                                color: "gray",
                              }}
                            >
                              <span>관심 {product.productLike}</span>
                              &nbsp; ·&nbsp;
                              <span>채팅 {product.productChatting}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <br />
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />

        <div
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
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
          </div>
          <section className="mt-6 flex justify-end gap-3">
            <div
              className="avatar flex justify-center items-center"
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
                width: "500px",
              }}
            >
              <div className="font-bold ">
                {articleWriter.nickname == "닉네임 없음"
                  ? articleWriter.username
                  : articleWriter.nickname}
              </div>
              <div className="text-sm">{articleWriter.address}</div>
            </div>

            <div
              style={{
                width: "200px",
              }}
            >
              <div className="flex gap-2">
                <div>
                  <div
                    className="font-bold flex justify-end p-1 "
                    style={{
                      color: "green",
                    }}
                  >
                    {articleWriter.temp}
                  </div>
                  <progress
                    className="flex progress progress-success w-32"
                    value="40"
                    max="100"
                  ></progress>
                </div>
                <div
                  className="flex"
                  style={{
                    color: "green",
                    fontSize: "1.75rem",
                  }}
                >
                  <BsFillEmojiSmileFill />
                </div>
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
            <div className="mt-6">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.25rem",
                }}
              >
                {article.productSubject}
              </div>
              <div className="flex gap-2">
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {article.productCategory}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {article.productCreateTime}
                </div>
              </div>
              <div
                className="font-bold"
                style={{
                  fontSize: "1.25rem",
                }}
              >
                {article.productPrice}원
              </div>
            </div>
            <br />
            <div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {article.productContent}
              </div>
              <div
                className="flex text-sm gap-2 my-5"
                style={{
                  color: "gray",
                }}
              >
                <span>관심</span>
                <div>{article.productLike}</div>
                <span>채팅</span>
                <div>{article.productChatting}</div>
                <span>조회</span>
                <div>{article.productView}</div>
              </div>
            </div>
          </section>
          <br />
          <section>
            <div className="py-2 flex gap-5 justify-end" style={{}}>
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  alert("로그인 후 이용해주세요.");
                }}
              >
                {liked ? (
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
                  moveLogin();
                }}
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                로그인 후 이용해주세요.
              </button>
            </div>
          </section>
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div>
              <div className="py-9 flex justify-between">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  당근마켓 인기중고
                </div>
                <div
                  className=""
                  style={{
                    color: "#FF7F3F",
                  }}
                >
                  <a href="/hot_articles">더 구경하기</a>
                </div>
              </div>
              <div>
                <div>
                  <ul className="grid grid-cols-3">
                    {hotProduct.map((product, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            moveProduct(product.productId);
                          }}
                        >
                          <div
                            style={{
                              paddingLeft: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "15px",
                                marginBottom: "10px",
                              }}
                            >
                              {product.profileImage != null ? (
                                <img
                                  src={product.profileImage}
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
                                    fontSize: "10rem",
                                    transform: "translate(-5%, -5%)",
                                    border: "0.1px #fc9d39 solid",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}
                            </div>
                            <div
                              className="ellipsis_1"
                              style={{
                                width: "200px",
                                height: "25px",
                                textAlign: "start",
                              }}
                            >
                              <span>{product.productSubject}</span>
                            </div>
                            <div className="flex ">
                              <span
                                className="ellipsis_1"
                                style={{
                                  fontWeight: "bold",
                                  width: "100px",
                                  height: "20px",
                                  textAlign: "start",
                                }}
                              >
                                {product.productPrice}원
                              </span>
                            </div>
                            <div
                              className="flex mt-1"
                              style={{
                                fontSize: "0.8rem",
                              }}
                            >
                              <span>{product.productDealAddress}</span>
                            </div>
                            <div
                              className="flex"
                              style={{
                                paddingBottom: "3rem",
                                fontSize: "0.8rem",
                                color: "gray",
                              }}
                            >
                              <span>관심 {product.productLike}</span>
                              &nbsp; ·&nbsp;
                              <span>채팅 {product.productChatting}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <br />
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
};

export default ProductPost;
