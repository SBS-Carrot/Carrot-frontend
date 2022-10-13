import React from "react";
import Header from "../layouts/Header";

const HotArticles = () => {
  return (
    <div>
      <Header />
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
            textAlign: "center",
          }}
        >
          중고거래 인기매물
        </h1>
        <div
          style={{
            transform: "translateX(170%)",
            marginTop: "3rem",
            display: "inline-block",
          }}
        >
          <select className="select select-info  mr-4 ">
            <option disabled selected>
              대전광역시
            </option>
          </select>
          <select className="select select-info  mr-1 ">
            <option disabled selected>
              동네를 선택하세요
            </option>
            <option>
              <a href="#">대덕구</a>
            </option>
            <option>
              <a href="#">동구</a>
            </option>
            <option>
              <a href="#">서구</a>
            </option>
            <option>
              <a href="#">유성구</a>
            </option>
            <option>
              <a href="#">중구</a>
            </option>
          </select>
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
      <div
        style={{
          height: "300px",
          backgroundColor: "#f3f6f4",
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: "bolder",
            padding: "4rem",
            textAlign: "center",
          }}
        >
          더 구경하고 싶나요?
        </h1>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <span>당근마켓 앱에서 따뜻한 거래를 직접 경험해보세요!</span>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <a
            href="#"
            style={{
              backgroundColor: "#faa64f",
              marginTop: "10px",
              padding: "10px 30px",
              fontSize: "1.5rem",
              borderRadius: "10px",
              fontWeight: "bolder",
              color: "white",
            }}
          >
            App Store
          </a>
          <a
            href="#"
            style={{
              backgroundColor: "#faa64f",
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "1.5rem",
              borderRadius: "10px",
              marginLeft: "20px",
              fontWeight: "bolder",
              color: "white",
            }}
          >
            Google Play
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotArticles;
