import React from "react";
import Header from "../layouts/Header";

const Jobs = () => {
  return (
    <div>
      <Header />
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
        <ul
          style={{
            paddingTop: "3rem",
            paddingLeft: "5rem",
          }}
        >
          <li>
            <a href="#">
              <div
                style={{
                  width: "140px",
                  display: "flex",
                }}
              >
                <img
                  src="https://dnvefa72aowie.cloudfront.net/jobs/article/430198/1646300764992/job-post-2947125003.jpeg?q=95&s=1440x1440&t=inside"
                  alt=""
                  style={{
                    objectFit: "auto",
                    width: "100%",
                    display: "block",
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
                      width: "300px",
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
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Jobs;
