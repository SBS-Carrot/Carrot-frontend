import React from "react";
import JobsHeader from "../layouts/JobsHeader";
import "../styles/Jobs.css";
import Footer from "../layouts/Footer";
import { useNavigate, useParams } from "react-router-dom";
const Jobs = () => {
  const navigate = useNavigate();
  const { Router } = useParams();

  return (
    <div>
      <JobsHeader />
      <div
        style={{
          backgroundColor: "orange",
        }}
      >
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            height: "500px",
          }}
        >
          <div
            style={{
              width: "600px",
              margin: "0 auto",
              paddingTop: "65px",
            }}
          >
            <h1
              style={{
                fontSize: "2.1rem",
                color: "white",
                fontWeight: "bolder",
                width: "300px",
                marginTop: "-40px",
                marginLeft: "-20px",
              }}
            >
              우리 동네에서 찾는 당근알바
            </h1>
            <img
              src="https://www.daangn.com/_next/static/media/jobs_hero_daangn_3x.8b217530.png"
              alt=""
              style={{
                marginTop: "-58px",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "1000px",
          margin: "0 auto",
        }}
      >
        <div className="flex gap-24">
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              paddingTop: "5rem",
              paddingLeft: "5rem",
            }}
          >
            인기 당근알바
          </h1>
          <span
            href={`/jobsWrite`}
            className="flex items-end justify-end "
            style={{
              width: "60%",
            }}
          >
            <a
              href={`/jobsWrite`}
              className="rounded-md p-2"
              style={{
                backgroundColor: "#fc9d39",
                color: "white",
              }}
            >
              {" "}
              알바 구하기
            </a>
          </span>
        </div>
        <ul
          style={{
            paddingTop: "3rem",
            paddingLeft: "5rem",
          }}
          className="grid grid-cols-2 jobBox"
        >
          <li>
            {/* 조회수 1 증가하는 기능 */}
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div
          style={{
            backgroundColor: "#e6f3ff",
            height: "150px",
            width: "880px",
            margin: "0 auto",
            borderRadius: "15px",
            marginLeft: "80px",
            marginTop: "20px",
            position: "relative",
          }}
        >
          <a href="#">
            <div className="">
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  width: "270px",
                  paddingTop: "2rem",
                  paddingLeft: "2rem",
                }}
              >
                이웃의 일손을 빠르게
              </h1>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  width: "450px",
                  paddingLeft: "2rem",
                }}
              >
                당근알바에서 바로 찾아보세요!
              </h1>
            </div>
            <div
              style={{
                position: "absolute",
                left: "80%",
                top: "3%",
              }}
            >
              <img src="https://i.postimg.cc/HkQh8THv/123.png" alt="" />
            </div>
          </a>
        </div>

        <ul
          style={{
            paddingTop: "3rem",
            paddingLeft: "5rem",
          }}
          className="grid grid-cols-2 jobBox"
        >
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                  borderRadius: "10px",
                }}
                className="gap-3"
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="flex flex-col"
                  style={{
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontSize: "1.2rem",
                    }}
                  >
                    칠성뷔페 주방/홀 직원모집
                  </span>
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    칠성뷔페 · 제주 특별자치도 제주시 일도1동
                  </span>
                  <span
                    style={{
                      width: "300px",
                      height: "150px",
                      fontWeight: "bolder",
                      fontSize: "1.1rem",
                    }}
                  >
                    월급 3,000,000
                  </span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
