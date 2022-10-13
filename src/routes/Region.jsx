import React from "react";
import { Routes, useParams } from "react-router-dom";
import Header from "../layouts/Header";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Region = () => {
  const navigate = useNavigate();
  const { address } = useParams();
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
            transform: "translateX(160%)",
            marginTop: "3rem",
            display: "inline-block",
            width: "350px",
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
              {address}
              {/* address == ? 임에따라 밑에 OO동 출력하는것 다르게. */}
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
    </div>
  );
};

export default Region;
