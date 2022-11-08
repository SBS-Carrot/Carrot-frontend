import React from "react";
import { Routes, useParams } from "react-router-dom";
import Header from "../layouts/Header";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
const Region = ({ logined }) => {
  const navigate = useNavigate();
  const { address } = useParams();
  if (address == "대덕구") {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            중고거래 인기매물
          </h1>
          <div
            style={{
              transform: "translateX(140%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "400px",
            }}
          >
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                대전광역시
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#">대전광역시</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                {address}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구">대덕구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/동구">동구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/서구">서구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/유성구">유성구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/중구">중구</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                동을 선택해 주세요
                {/* address == ? 임에따라 밑에 OO동 출력하는것 다르게. */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구/법2동">법2동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신대동">
                    신대동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/상서동">
                    상서동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/삼정동">
                    삼정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/장동">장동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/중리동">
                    중리동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/연축동">
                    연축동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용호동">
                    용호동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/회덕동">
                    회덕동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/석봉동">
                    석봉동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/목상동">
                    목상동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/갈전동">
                    갈전동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/평촌동">
                    평촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/부수동">
                    부수동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/황호동">
                    황호동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/이현동">
                    이현동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/미호동">
                    미호동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/송촌동">
                    송촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/읍내동">
                    읍내동
                  </a>
                </li>{" "}
                <li>
                  <a href="http://localhost:3000/region/대덕구/대화동">
                    대화동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신탄진동">
                    신탄진동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/와동">와동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/오정동">
                    오정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/비래동">
                    비래동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신일동">
                    신일동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/문평동">
                    문평동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/덕암동">
                    덕암동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/법동">법동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/법1동">법1동</a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="grid grid-cols-4">
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else if (address == "동구") {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            중고거래 인기매물
          </h1>
          <div
            style={{
              transform: "translateX(140%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "400px",
            }}
          >
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                대전광역시
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#">대전광역시</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                {address}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구">대덕구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/동구">동구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/서구">서구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/유성구">유성구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/중구">중구</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                동을 선택해 주세요
                {/* address == ? 임에따라 밑에 OO동 출력하는것 다르게. */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구/효평동">
                    효평동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/마산동">
                    마산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신하동">
                    신하동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/내탑동">
                    내탑동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/산내동">
                    산내동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대청동">
                    대청동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신촌동">
                    신촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/비룡동">
                    비룡동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/직동">직동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/판암1동">
                    판암1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/낭월동">
                    낭월동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/사성동">
                    사성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/주촌동">
                    주촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/판암2동">
                    판암2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/하소동">
                    하소동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/판암동">
                    판암동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가양2동">
                    가양2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신인동">
                    신인동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용계동">
                    용계동
                  </a>
                </li>{" "}
                <li>
                  <a href="http://localhost:3000/region/대덕구/신상동">
                    신상동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/추동">추동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/원동">원동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/이사동">
                    이사동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/구도동">
                    구도동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가양1동">
                    가양1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/홍도동">
                    홍도동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/천동">천동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/소호동">
                    소호동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/자양동">
                    자양동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/세천동">
                    세천동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/오동">오동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/효동">효동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신흥동">
                    신흥동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/상소동">
                    상소동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/장척동">
                    장척동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대동">대동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/삼성동">
                    삼성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/삼괴동">
                    삼괴동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/중앙동">
                    중앙동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/인동">인동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/소제동">
                    소제동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/중동">중동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용전동">
                    용전동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가양동">
                    가양동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/정동">정동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/주산동">
                    주산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대별동">
                    대별동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가오동">
                    가오동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대성동">
                    대성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/성남동">
                    성남동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신안동">
                    신안동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/삼정동">
                    삼정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용운동">
                    용운동
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="grid grid-cols-4">
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else if (address == "서구") {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            중고거래 인기매물
          </h1>
          <div
            style={{
              transform: "translateX(140%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "400px",
            }}
          >
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                대전광역시
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#">대전광역시</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                {address}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구">대덕구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/동구">동구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/서구">서구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/유성구">유성구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/중구">중구</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                동을 선택해 주세요
                {/* address == ? 임에따라 밑에 OO동 출력하는것 다르게. */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구/월평동">
                    월평동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/기성동">
                    기성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/장안동">
                    장안동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용촌동">
                    용촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/갈마2동">
                    갈마2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/흑석동">
                    흑석동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/도마1동">
                    도마1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/매노동">
                    매노동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/원정동">
                    원정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/월평1동">
                    월평1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/월평3동">
                    월평3동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/월평2동">
                    월평2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가장동">
                    가장동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/둔산동">
                    둔산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/봉곡동">
                    봉곡동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/우명동">
                    우명동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/산직동">
                    산직동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/둔산2동">
                    둔산2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/도마동">
                    도마동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/복수동">
                    복수동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/둔산3동">
                    둔산3동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/둔산1동">
                    둔산1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/도안동">
                    도안동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/정림동">
                    정림동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/오동">오동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용문동">
                    용문동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가수원동">
                    가수원동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/변동">변동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/만년동">
                    만년동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/괴정동">
                    괴정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/도마2동">
                    도마2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/관저2동">
                    관저2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/괴곡동">
                    괴곡동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/관저1동">
                    관저1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/갈마1동">
                    갈마1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/내동">내동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/탄방동">
                    탄방동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/갈마동">
                    갈마동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/관저동">
                    관저동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/평촌동">
                    평촌동
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="grid grid-cols-4">
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else if (address == "유성구") {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            중고거래 인기매물
          </h1>
          <div
            style={{
              transform: "translateX(140%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "400px",
            }}
          >
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                대전광역시
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#">대전광역시</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                {address}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구">대덕구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/동구">동구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/서구">서구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/유성구">유성구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/중구">중구</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                동을 선택해 주세요
                {/* address == ? 임에따라 밑에 OO동 출력하는것 다르게. */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구/외삼동">
                    외삼동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/노은3동">
                    노은3동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/노은2동">
                    노은2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/구암동">
                    구암동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/전민동">
                    전민동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/하기동">
                    하기동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대정동">
                    대정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/수남동">
                    수남동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/지족동">
                    지족동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/덕진동">
                    덕진동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/덕명동">
                    덕명동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/원내동">
                    원내동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/진잠동">
                    진잠동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/봉산동">
                    봉산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/성북동">
                    성북동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/구즉동">
                    구즉동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/원촌동">
                    원촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/화암동">
                    화암동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신봉동">
                    신봉동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/교촌동">
                    교촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/둔곡동">
                    둔곡동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/반석동">
                    반석동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/온천2동">
                    온천2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/가정동">
                    가정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/어은동">
                    어은동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/온천1동">
                    온천1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/방동">방동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/장대동">
                    장대동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/봉명동">
                    봉명동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/노은1동">
                    노은1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/송강동">
                    송강동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신동">신동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/구룡동">
                    구룡동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/갑동">갑동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/안산동">
                    안산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/추목동">
                    추목동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/세동">세동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/장동">장동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/금고동">
                    금고동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대동">대동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/복용동">
                    복용동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/죽동">죽동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/도룡동">
                    도룡동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/원신흥동">
                    원신흥동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/문지동">
                    문지동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/학하동">
                    학하동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/신성동">
                    신성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/노은동">
                    노은동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/궁동">궁동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/상대동">
                    상대동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/송정동">
                    송정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용계동">
                    용계동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/자운동">
                    자운동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/탑립동">
                    탑립동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/방현동">
                    방현동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/구성동">
                    구성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/계산동">
                    계산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/관평동">
                    관평동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/금탄동">
                    금탄동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용산동">
                    용산동
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="grid grid-cols-4">
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else if (address == "중구") {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            중고거래 인기매물
          </h1>
          <div
            style={{
              transform: "translateX(140%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "400px",
            }}
          >
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                대전광역시
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#">대전광역시</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                {address}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구">대덕구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/동구">동구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/서구">서구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/유성구">유성구</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/중구">중구</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn m-1">
                동을 선택해 주세요
                {/* address == ? 임에따라 밑에 OO동 출력하는것 다르게. */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="http://localhost:3000/region/대덕구/사정동">
                    사정동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/정생동">
                    정생동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/부사동">
                    부사동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/구완동">
                    구완동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/무수동">
                    무수동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/호동">호동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/문화2동">
                    문화2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/문화동">
                    문화동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/석교동">
                    석교동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/용두동">
                    용두동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/침산동">
                    침산동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대흥동">
                    대흥동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/선화동">
                    선화동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/금동">금동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/유천동">
                    유천동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/목동">목동</a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/어남동">
                    어남동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/목달동">
                    목달동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/태평2동">
                    태평2동
                  </a>
                </li>{" "}
                <li>
                  <a href="http://localhost:3000/region/대덕구/안영동">
                    안영동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/유천2동">
                    유천2동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/문창동">
                    문창동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/옥계동">
                    옥계동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/중촌동">
                    중촌동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/태평동">
                    태평동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/은행선화동">
                    은행선화동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/산성동">
                    산성동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/문화1동">
                    문화1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/태평1동">
                    태평1동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/오류동">
                    오류동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/대사동">
                    대사동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/은행동">
                    은행동
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/region/대덕구/유천1동">
                    유천1동
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="grid grid-cols-4">
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  paddingTop: "3rem",
                  paddingLeft: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px",
                    outline: "gray 1px solid",
                    marginBottom: "10px",
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
                    marginBottom: "5px",
                  }}
                >
                  <span>롯데 자이언츠 이대호 은퇴경기 티켓 팔아요</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    33,000원
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  <span>부산 진구 부전동</span>
                </div>
                <div
                  style={{
                    paddingBottom: "3rem",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  <span>관심 5</span>
                  <span> º </span>
                  <span>채팅 42</span>
                </div>
              </div>
            </li>
          </ul>
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
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          >
            <img src="https://i.postimg.cc/6QPMVGLr/321.png" alt="" />
          </div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            앗! 죄송해요
          </h1>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            <h1>원하시는 페이지를 찾을 수 없어요.</h1>
            <h1>찾으시려는 페이지의 주소가 잘못 입력되었거나</h1>
            <h1>페이지 주소가 변경 또는 삭제되어 더는 사용하실 수 없습니다.</h1>
            <br />
            <h1>입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.</h1>
            <br />
            <div
              style={{
                color: "#ffa445",
                paddingTop: "1.2rem",
                fontSize: "1.2rem",
              }}
            >
              <a href="http://localhost:3000">홈으로 이동</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Region;
