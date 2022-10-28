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
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BiMap } from "react-icons/bi";

const Jobspost = () => {
  return (
    <div>
      <Header />
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
            className="flex flex-col gap-6 mb-11"
            style={{
              fontSize: "1.3rem",
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
            className="font-bold pb-1"
            style={{
              fontSize: "1.2rem",
            }}
          >
            상세 내용
          </div>
          <div
            style={{
              height: "350px",
              border: "1px gray solid",
            }}
          ></div>
        </section>
        <div
          className="flex gap-4 align-center font-bold mt-2 pb-11"
          style={{
            fontSize: "1rem",
            height: "30px",
          }}
        >
          <div>지원자 0{/* {img.imgLike} */}</div>
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
              지원하기
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
                사는 곳 근처 알바
              </div>
            </div>
          </div>

          <br />
        </div>
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
      <Footer />
    </div>
  );
};

export default Jobspost;
