import React from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import Footer from "../layouts/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCarrot } from "react-icons/fa";
import "../styles/Jobs.css";
import ProductPaging from "../components/ProductPaging";
import { useParams } from "react-router-dom";
import "../styles/Pagination.css";
const HotArticles = ({ logined, setLogined }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(8);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const onProduct = (data) => {
    const datas = data.reverse();
    setPosts((prev) => datas);
  };
  //   npm i react-js-pagination
  useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = await axios({
          url: "http://localhost:8083/",
          method: "GET",
        });
        onProduct(data.data);
        setCurrentPosts(data.data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);

  useEffect(() => {
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);
  const navigate = useNavigate();
  const moveProduct = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/productView/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/productpost/${id}`);
  };

  if (logined) {
    return (
      <div>
        <LoginedHeader setLogined={setLogined} />
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
            중고거래 모든 매물보기
          </h1>

          <div
            style={{
              transform: "translateX(10%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "100px",
              textAlign: "center",
              marginLeft: "2.5rem",
              backgroundColor: "#fc9d39",
              borderRadius: "10px",
              height: "60px",
            }}
          >
            <a
              href="/productWrite"
              style={{
                color: "white",
                fontWeight: "bolder",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: "5px",
                }}
              >
                중고매물
                <br />
                거래하기
              </div>
            </a>
          </div>
          <div
            style={{
              transform: "translateX(140%)",
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
                동네를 선택하세요
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
          <div className="container">
            <ul className="grid grid-cols-4">
              {currentPosts.map((product, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      moveProduct(product.productId);
                    }}
                  >
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

                          marginBottom: "10px",
                        }}
                      >
                        {product.profileImage != null ? (
                          <img
                            src={product.profileImage}
                            alt=""
                            style={{
                              borderRadius: "15px",
                              width: "100%",
                              height: "100%",
                              objectFit: "fill",
                              display: "block",
                            }}
                          />
                        ) : (
                          <FaCarrot
                            style={{
                              color: "#fc9d39",
                              fontSize: "10rem",
                              transform: "translate(12.5%,12.5%)",
                              border: "0.1px #fc9d39 solid",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>
                      <div
                        className="ellipsis_1"
                        style={{
                          width: "200px",
                          height: "25px",
                          textAlign: "start",
                        }}
                      >
                        <span>{product.productSubject}</span>
                      </div>
                      <div className="flex ">
                        <span
                          className="ellipsis_1"
                          style={{
                            fontWeight: "bold",
                            width: "100px",
                            height: "20px",

                            textAlign: "start",
                          }}
                        >
                          {product.productPrice}원
                        </span>
                      </div>
                      <div
                        className="flex"
                        style={{
                          fontSize: "0.9rem",
                        }}
                      >
                        <span>부산 진구 부전동</span>
                      </div>
                      <div
                        className="flex"
                        style={{
                          paddingBottom: "3rem",
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        <span>관심 {product.productLike}</span>
                        &nbsp; ·&nbsp;
                        <span>채팅 {product.productChatting}</span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ProductPaging
            totalCount={posts.length}
            page={page}
            postPerPage={postPerPage}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
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
              transform: "translateX(10%)",
              marginTop: "3rem",
              display: "inline-block",
              width: "100px",
              textAlign: "center",
              marginLeft: "2.5rem",
              backgroundColor: "#fc9d39",
              borderRadius: "10px",
              height: "60px",
            }}
          >
            <a
              href="/productWrite"
              style={{
                color: "white",
                fontWeight: "bolder",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: "5px",
                }}
              >
                중고매물
                <br />
                거래하기
              </div>
            </a>
          </div>
          <div
            style={{
              transform: "translateX(140%)",
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
                동네를 선택하세요
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
        <Footer />
      </div>
    );
  }
};

export default HotArticles;
