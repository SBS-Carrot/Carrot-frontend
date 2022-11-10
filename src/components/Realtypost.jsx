import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RealtyHeader from "../layouts/RealtyHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import Footer from "../layouts/Footer";
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

const Realtypost = ({ logined, setLogined }) => {
  const { num } = useParams();
  const [article, setArticle] = useState("");

  const navigate = useNavigate();
  const moveBack = () => {
    navigate(-1);
  };

  const onArticle = (data) => {
    setArticle((prev) => data);
  };
  useEffect(() => {
    const onSubmit = async (num) => {
      try {
        const data = await axios({
          url: `http://localhost:8083/realty/${num}`,
          method: "GET",
        });
        onArticle(data.data);
      } catch {
        console.log("에러");
        window.alert("존재하지 않는 게시글입니다.");
        moveBack();
      }
    };
    onSubmit(num);
  }, []);
  if (logined) {
    return (
      <div>
        <LoginedRealtyHeader setLogined={setLogined} />
        <div
          style={{
            width: "780px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
            <button
              className="font-bold absolute"
              style={{
                fontSize: "1.3rem",
                top: "50%",
                left: "-5%",
              }}
            >
              <BsChevronLeft />
            </button>
            <button
              className="font-bold absolute "
              style={{
                fontSize: "1.3rem",

                top: "50%",
                right: "-5%",
              }}
            >
              <BsChevronRight />
            </button>
            <button href="#">
              <img
                className="rounded-lg "
                style={{
                  width: "800px",
                  height: "500px",
                }}
                src="https://dnvefa72aowie.cloudfront.net/jobs/article/36458049/1649751854029/job-post-3286665810.jpeg?q=95&s=1440x1440&t=inside"
                alt=""
              />
            </button>
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
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div
                className="flex justify-center flex-col"
                style={{
                  width: "500px",
                }}
              >
                <div className="font-bold ">nickname</div>
                <div className="text-sm">대전광역시 서구 둔산동</div>
              </div>
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
                    38.8
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
              <div className="font-bold">{article.realtyCategory}</div>
            </div>

            <div
              className=" flex items-center gap-3"
              style={{
                fontSize: "1.8rem",
              }}
            >
              <div
                className="font-bold"
                style={{
                  color: "#ffa445",
                }}
              >
                {article.realtyDealing}
              </div>
              <div className="font-bold">
                {article.realtyDeal} {article.realtyDeposit} /{" "}
                {article.realtyMonthly}
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
              {/* <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                2일 전
              </div> */}
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
              <li className="flex gap-4">
                <span className="text-gray-400">면적</span>
              </li>

              <li className="flex gap-4">
                <span className="text-gray-400">방/욕실 수</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">층</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">대출가능여부</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">입주 가능일</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">반려동물</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">주차</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">엘리베이터</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">내부 시설</span>
              </li>
            </ul>
            <ul
              className="flex flex-col gap-4 mb-11 "
              style={{
                fontSize: "1.1rem",
              }}
            >
              <li className="flex gap-4 font-bold">
                <div>
                  {article.realtySpace}평 · 전용 {article.realtyArea}㎡
                </div>
              </li>

              <li className="flex gap-4 font-bold">
                <div>
                  방 {article.realtyRoom}개 / 욕실 {article.realtyBath}개
                </div>
              </li>
              <li className="flex gap-4 font-bold">
                <div>
                  {article.realtyFloor}층 / {article.realtyWhole}층{" "}
                </div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyLoan}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyMove}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyPet}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyParking}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyElevator}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyInside}</div>
              </li>
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
              style={{
                height: "350px",
              }}
            >
              {article.realtyContent}
            </div>
          </section>
          <div
            className="flex gap-4 align-center font-bold mt-2 pb-11"
            style={{
              fontSize: "1rem",
              height: "30px",
            }}
          >
            <div>채팅 0{/* {img.imgLike} */}</div>
            <div>관심 0{/* {img.imgLike} */}</div>
            <div>조회수 0{/* {img.imgLike} */}</div>
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
            <div
              style={{
                height: "200px",
                border: "1px gray solid",
              }}
            ></div>
            <div>{article.realtyAddress}</div>
          </div>
          <section>
            <div className="py-2 flex gap-5 justify-end" style={{}}>
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                // onClick={() => {
                //   onLike(img.id, userinfo.userid, img.imgSrc);
                // }}
              >
                {/* {like ? (
                  <FaHeart
                    style={{
                      color: "pink",
                    }}
                  />
                ) : ( */}
                <FiHeart />
                {/* )} */}
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
              <ul className="grid grid-cols-2">
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                        marginTop: "25px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
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
            width: "780px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
            <button
              className="font-bold absolute"
              style={{
                fontSize: "1.3rem",
                top: "50%",
                left: "-5%",
              }}
            >
              <BsChevronLeft />
            </button>
            <button
              className="font-bold absolute "
              style={{
                fontSize: "1.3rem",

                top: "50%",
                right: "-5%",
              }}
            >
              <BsChevronRight />
            </button>
            <button href="#">
              <img
                className="rounded-lg "
                style={{
                  width: "800px",
                  height: "500px",
                }}
                src="https://dnvefa72aowie.cloudfront.net/jobs/article/36458049/1649751854029/job-post-3286665810.jpeg?q=95&s=1440x1440&t=inside"
                alt=""
              />
            </button>
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
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div
                className="flex justify-center flex-col"
                style={{
                  width: "500px",
                }}
              >
                <div className="font-bold ">nickname</div>
                <div className="text-sm">대전광역시 서구 둔산동</div>
              </div>
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
                    38.8
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
              <div className="font-bold">{article.realtyCategory}</div>
            </div>

            <div
              className=" flex items-center gap-3"
              style={{
                fontSize: "1.8rem",
              }}
            >
              <div
                className="font-bold"
                style={{
                  color: "#ffa445",
                }}
              >
                {article.realtyDealing}
              </div>
              <div className="font-bold">
                {article.realtyDeal} {article.realtyDeposit} /{" "}
                {article.realtyMonthly}
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
              {/* <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                2일 전
              </div> */}
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
              <li className="flex gap-4">
                <span className="text-gray-400">면적</span>
              </li>

              <li className="flex gap-4">
                <span className="text-gray-400">방/욕실 수</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">층</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">대출가능여부</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">입주 가능일</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">반려동물</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">주차</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">엘리베이터</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gray-400">내부 시설</span>
              </li>
            </ul>
            <ul
              className="flex flex-col gap-4 mb-11 "
              style={{
                fontSize: "1.1rem",
              }}
            >
              <li className="flex gap-4 font-bold">
                <div>
                  {article.realtySpace}평 · 전용 {article.realtyArea}㎡
                </div>
              </li>

              <li className="flex gap-4 font-bold">
                <div>
                  방 {article.realtyRoom}개 / 욕실 {article.realtyBath}개
                </div>
              </li>
              <li className="flex gap-4 font-bold">
                <div>
                  {article.realtyFloor}층 / {article.realtyWhole}층{" "}
                </div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyLoan}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyMove}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyPet}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyParking}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyElevator}</div>
              </li>
              <li className="flex gap-4">
                <div>{article.realtyInside}</div>
              </li>
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
              style={{
                height: "350px",
              }}
            >
              {article.realtyContent}
            </div>
          </section>
          <div
            className="flex gap-4 align-center font-bold mt-2 pb-11"
            style={{
              fontSize: "1rem",
              height: "30px",
            }}
          >
            <div>채팅 0{/* {img.imgLike} */}</div>
            <div>관심 0{/* {img.imgLike} */}</div>
            <div>조회수 0{/* {img.imgLike} */}</div>
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
            <div
              style={{
                height: "200px",
                border: "1px gray solid",
              }}
            ></div>
            <div>{article.realtyAddress}</div>
          </div>
          <section>
            <div className="py-2 flex gap-5 justify-end" style={{}}>
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                // onClick={() => {
                //   onLike(img.id, userinfo.userid, img.imgSrc);
                // }}
              >
                {/* {like ? (
                  <FaHeart
                    style={{
                      color: "pink",
                    }}
                  />
                ) : ( */}
                <FiHeart />
                {/* )} */}
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
              <ul className="grid grid-cols-2">
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                        marginTop: "25px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
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
