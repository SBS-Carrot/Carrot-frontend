import React from "react";
import RealtyHeader from "../layouts/RealtyHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import Footer from "../layouts/Footer";
import "../styles/Realty.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const Realty = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const { Router } = useParams();
  if (logined) {
    return (
      <div>
        <LoginedRealtyHeader setLogined={setLogined} />
        <section>
          <div
            style={{
              width: "800px",
              margin: "0 auto",
            }}
          >
            <div className="flex gap-3">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.5rem",
                  paddingTop: "5%",
                }}
              >
                인기 부동산 직거래 게시글
              </div>
              <span
                href={`/realtyWrite`}
                className="flex items-end justify-end "
                style={{
                  width: "62%",
                }}
              >
                <a
                  href={`/realtyWrite`}
                  className="rounded-md p-2"
                  style={{
                    backgroundColor: "#fc9d39",
                    color: "white",
                  }}
                >
                  {" "}
                  내 매물 내놓기
                </a>
              </span>
            </div>
            <div>
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div
                className="rounded-xl font-bold p-8 mb-16"
                style={{
                  marginTop: "8%",
                  fontSize: "1.25rem",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <div>
                  <span>복비 없이 투명한 투명한 부동산 직거래</span>
                </div>
                <div>
                  <span>당근마켓 내 근처 탭에서 바로 찾아보세요!</span>
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#084594",
                  }}
                >
                  <div className="flex items-center font-bold">
                    <a href="#">앱 다운로드 하기</a>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
              <div className="mt-7">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              </div>{" "}
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
          </div>
        </section>
        <br />
        <br />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <RealtyHeader />
        <section>
          <div
            style={{
              width: "800px",
              margin: "0 auto",
            }}
          >
            <div className="flex gap-3">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.5rem",
                  paddingTop: "5%",
                }}
              >
                인기 부동산 직거래 게시글
              </div>
              <span
                href={`/realtyWrite`}
                className="flex items-end justify-end "
                style={{
                  width: "62%",
                }}
              >
                <a
                  href={`/realtyWrite`}
                  className="rounded-md p-2"
                  style={{
                    backgroundColor: "#fc9d39",
                    color: "white",
                  }}
                >
                  {" "}
                  내 매물 내놓기
                </a>
              </span>
            </div>
            <div>
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div
                className="rounded-xl font-bold p-8 mb-16"
                style={{
                  marginTop: "8%",
                  fontSize: "1.25rem",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <div>
                  <span>복비 없이 투명한 투명한 부동산 직거래</span>
                </div>
                <div>
                  <span>당근마켓 내 근처 탭에서 바로 찾아보세요!</span>
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#084594",
                  }}
                >
                  <div className="flex items-center font-bold">
                    <a href="#">앱 다운로드 하기</a>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
              <div className="mt-7">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
              </div>{" "}
              <div className="mt-5">
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
                            <span>
                              주방이모 파트타임 오전 6시~오전 10시(4시간)
                            </span>
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
          </div>
        </section>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
};

export default Realty;
