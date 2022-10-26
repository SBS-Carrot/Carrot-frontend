import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {
  BsFillEmojiSmileFill,
  BsChevronLeft,
  BsChevronRight,
  BsCalendarEvent,
} from "react-icons/bs";
import { AiOutlineDollar, AiOutlineClockCircle } from "react-icons/ai";
import { BiMap } from "react-icons/bi";

const Jobspost = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          width: "800px",
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
          <a href="#">
            <img
              className="rounded-lg"
              src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/83cbd5362a585918a9b4a7354984ecbfb20208da27522d9b39579099b2cfe1f9.webp?q=95&s=1440x1440&t=inside"
              alt=""
            />
          </a>
        </div>
        <section className="mt-6 flex justify-end gap-3">
          <div
            className="avatar flex justify-center items-center"
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
          <div className="mt-6">
            <div
              className="font-bold"
              style={{
                fontSize: "1.25rem",
              }}
            >
              [대전역]주5일/4시간/130~150만원/홍보/상담/초보 경단가능
            </div>
            <div className="flex gap-2">
              <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                (주)케이삼흥
              </div>
              <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                2일 전
              </div>
            </div>
          </div>
          <br />
        </section>
        <section>
          <div
            className="font-bold pb-2 mt-9"
            style={{
              fontSize: "1.2rem",
            }}
          >
            정보
          </div>

          <ul
            className="flex flex-col gap-6 mb-14"
            style={{
              fontSize: "1.5rem",
            }}
          >
            <li className="flex gap-4">
              <AiOutlineDollar className="mt-2" />
              <span>월급 130만원</span>
            </li>
            <li className="flex gap-4">
              <BiMap className="mt-2" />
              <span>대전 서구 둔산동</span>
            </li>
            <li className="flex gap-4">
              <BsCalendarEvent className="mt-2" />
              <span>월~금 협의</span>
            </li>
            <li className="flex gap-4">
              <AiOutlineClockCircle className="mt-2" />
              <span>10:00~16:00</span>
            </li>
          </ul>
        </section>
        <section>
          <div
            className="font-bold pb-2"
            style={{
              fontSize: "1.2rem",
            }}
          >
            상세 내용
          </div>
          <div
            style={{
              width: "700px",
              height: "400px",
              border: "1px gray solid",
            }}
          ></div>
        </section>
        <br />
        <div>
          <div
            className="font-bold"
            style={{
              fontSize: "1.2rem",
            }}
          >
            주소
          </div>
        </div>
        <section>
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
                  사는 곳 근처 알바
                </div>
              </div>
            </div>
            <div className="gap-2">
              <div>
                <ul className="grid grid-cols-2">
                  <li className="flex  items-center gap-4">
                    <a href="#" className="flex-col flex justify-center">
                      <div className="img1">
                        <img
                          src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                          alt=""
                        />
                      </div>
                    </a>
                    <div
                      style={{
                        height: "120px",
                        marginTop: "25px",
                      }}
                    >
                      <a
                        href="#"
                        className="img1"
                        style={{
                          width: "350px",
                        }}
                      >
                        <div style={{}}>
                          <a href="#">
                            주방이모 파트타임 오전 6시~오전 10시(4시간)
                          </a>
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: "#73777B",
                            paddingTop: "5px",
                          }}
                        >
                          <a href="#">밥을짓는홍여사 . 부평동</a>
                        </div>
                        <div className="font-bold pt-1">
                          <a href="#">시급 10,100</a>
                        </div>
                      </a>
                    </div>
                  </li>{" "}
                  <li className="flex  items-center gap-4">
                    <a href="#" className="flex-col flex justify-center">
                      <div className="img1">
                        <img
                          src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                          alt=""
                        />
                      </div>
                    </a>
                    <div
                      style={{
                        height: "120px",

                        marginTop: "25px",
                      }}
                    >
                      <a
                        href="#"
                        className="img1"
                        style={{
                          width: "350px",
                        }}
                      >
                        <div style={{}}>
                          <a href="#">직원 구해요</a>
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: "#73777B",
                            paddingTop: "5px",
                          }}
                        >
                          <a href="#">장수손만두 . 만년동</a>
                        </div>
                        <div className="font-bold pt-1">
                          <a href="#">시급 9,500</a>
                        </div>
                      </a>
                    </div>
                  </li>{" "}
                  <li className="flex  items-center gap-4">
                    <a href="#" className="flex-col flex justify-center">
                      <div className="img1">
                        <img
                          src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                          alt=""
                        />
                      </div>
                    </a>
                    <div
                      style={{
                        height: "120px",

                        marginTop: "25px",
                      }}
                    >
                      <a
                        href="#"
                        className="img1"
                        style={{
                          width: "350px",
                        }}
                      >
                        <div style={{}}>
                          <a href="#">
                            정기적으로 목,금 4시~6시 하원 도우미 구해요
                          </a>
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: "#73777B",
                            paddingTop: "5px",
                          }}
                        >
                          <a href="#">도안동</a>
                        </div>
                        <div className="font-bold pt-1">
                          <a href="#">시급 13,000</a>
                        </div>
                      </a>
                    </div>
                  </li>{" "}
                  <li className="flex  items-center gap-4">
                    <a href="#" className="flex-col flex justify-center">
                      <div className="img1">
                        <img
                          src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                          alt=""
                        />
                      </div>
                    </a>
                    <div
                      style={{
                        height: "120px",

                        marginTop: "25px",
                      }}
                    >
                      <a
                        href="#"
                        className="img1"
                        style={{
                          width: "350px",
                        }}
                      >
                        <div style={{}}>
                          <a href="#">주방 이모님 구해요</a>
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: "#73777B",
                            paddingTop: "5px",
                          }}
                        >
                          <a href="#">삼첩분식 덮덮밥 . 갈마동</a>
                        </div>
                        <div className="font-bold pt-1">
                          <a href="#">시급 9,160</a>
                        </div>
                      </a>
                    </div>
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
};

export default Jobspost;
