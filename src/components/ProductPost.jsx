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
}) => {
  const { num } = useParams();

  const [articleWriter, setArticleWriter] = useState("");
  const navigate = useNavigate();
  const moveBack = () => {
    navigate(-1);
  };

  const productmove = () => {
    navigate(`/allproduct`);
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
          url: `http://localhost:8083/product/${num}`,
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
          url: `http://localhost:8083/getUser/${abcd}`,
          method: "GET",
        });
        setArticleWriter(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getProductWithImage/${num}`,
          method: "GET",
        });

        setImgs(data.data.images);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/likeProductCheck/${num}`,
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
          url: `http://localhost:8083/getUser/${sessionStorage.getItem(
            "userid"
          )}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit(num);
  }, []);

  const onArticle = (data) => {
    setArticle((prev) => data);
  };
  useEffect(() => {
    const onLikeRe = async (num) => {
      try {
        const data = await axios({
          url: `http://localhost:8083/product/${num}`,
          method: "GET",
        });
        onArticle(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onLikeRe(num);
  }, [liked]);

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
                  : user.nickname}
              </div>
              <div className="text-sm">{user.address}</div>
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
                    {user.temp}
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
                </span>
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
                        onMenuToggle();
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
              <div>{article.productContent}</div>
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

              <a
                href="#"
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                채팅하기{" "}
              </a>
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
                  <a href="#">더 구경하기</a>
                </div>
              </div>
              <div>
                <div>
                  <ul
                    className="grid grid-cols-3"
                    style={{
                      maxWidth: "1000px",
                      margin: "0 auto",
                    }}
                  >
                    <li
                      style={{
                        paddingBottom: "30px",
                      }}
                    >
                      <a href="http://localhost:3000/articles/1">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              className="object-fill"
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/83cbd5362a585918a9b4a7354984ecbfb20208da27522d9b39579099b2cfe1f9.webp?q=95&s=1440x1440&t=inside"
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div
                            style={{
                              fontWeight: "bolder",
                              padding: "5px 0",
                            }}
                          >
                            <span>33,000원</span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                            }}
                          >
                            <span>부산 진구 부전동</span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "gray",
                            }}
                          >
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="http://localhost:3000/articles/2">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="http://localhost:3000/articles/3">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="#">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="#">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="#">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>
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
              <div>{article.productContent}</div>
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
                  <a href="#">더 구경하기</a>
                </div>
              </div>
              <div>
                <div>
                  <ul
                    className="grid grid-cols-3"
                    style={{
                      maxWidth: "1000px",
                      margin: "0 auto",
                    }}
                  >
                    <li
                      style={{
                        paddingBottom: "30px",
                      }}
                    >
                      <a href="http://localhost:3000/articles/1">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              className="object-fill"
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/83cbd5362a585918a9b4a7354984ecbfb20208da27522d9b39579099b2cfe1f9.webp?q=95&s=1440x1440&t=inside"
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div
                            style={{
                              fontWeight: "bolder",
                              padding: "5px 0",
                            }}
                          >
                            <span>33,000원</span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                            }}
                          >
                            <span>부산 진구 부전동</span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "gray",
                            }}
                          >
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="http://localhost:3000/articles/2">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="http://localhost:3000/articles/3">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="#">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="#">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>{" "}
                    <li>
                      <a href="#">
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "15px",
                              outline: "gray 1px solid",
                            }}
                          >
                            <img
                              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop"
                              alt=""
                              style={{
                                borderRadius: "15px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflowX: "hidden",
                            }}
                          >
                            <span>
                              롯데 자이언츠 이대호 은퇴경기 티켓 팔아요
                            </span>
                          </div>
                          <div>
                            <span>33,000원</span>
                          </div>
                          <div>
                            <span>부산 진구 부전동</span>
                          </div>
                          <div>
                            <span>관심 5</span>
                            <span> º </span>
                            <span>채팅 42</span>
                          </div>
                        </div>
                      </a>
                    </li>
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
