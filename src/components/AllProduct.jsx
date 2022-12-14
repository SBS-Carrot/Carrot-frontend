import React from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import Footer from "../layouts/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCarrot } from "react-icons/fa";
import ProductPaging from "./ProductPaging";
import "../styles/Pagination.css";
import Board from "../routes/Board";
import { BACKEND_URL } from "../config/config";

const AllProduct = ({ logined, setLogined }) => {
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
          url: `http://${BACKEND_URL}:8083/`,
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
        url: `http://${BACKEND_URL}:8083/productView/${id}`,
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
          <div
            className="mt-1"
            style={{
              width: "100%",

              height: "120px",
            }}
          >
            <div
              style={{
                transform: "translate(10%,10%)",
                display: "inline-block",
                width: "90px",
                textAlign: "center",
                marginLeft: "2.5rem",
                backgroundColor: "#fc9d39",
                borderRadius: "10px",
                height: "55px",
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
                  ????????????
                  <br />
                  ????????????
                </div>
              </a>
            </div>
            <h1
              style={{
                fontSize: "1.7rem",
                fontWeight: "bolder",
                textAlign: "center",
                margin: "0 auto",
                display: "inline",
                paddingLeft: "14rem",
                position: "relative",
              }}
            >
              ???????????? ?????? ????????????
            </h1>

            <h2
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.3rem",
                transform: "translateX(%)",
              }}
            >
              <a href="/hot_articles">??? ???????????? ????????????</a>
            </h2>
          </div>
          <div
            className="container"
            style={{
              width: "800px",

              margin: "0 auto",
            }}
          >
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
                          width: "150px",
                          height: "150px",
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
                              transform: "translate(-5% ,-5%)",
                              border: "0.1px #fc9d39 solid",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>
                      <div
                        className="ellipsis_1"
                        style={{
                          width: "150px",
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
                          {product.productPrice}???
                        </span>
                      </div>
                      <div
                        className="flex"
                        style={{
                          fontSize: "0.9rem",
                        }}
                      >
                        <span>{product.productDealAddress}</span>
                      </div>
                      <div
                        className="flex"
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        <span>?????? {product.productLike}</span>
                        &nbsp; ??&nbsp;
                        <span>?????? {product.productChatting}</span>
                      </div>
                      {product.productDeal == "?????? ??????" ? (
                        <div
                          style={{
                            border: "1px gray solid",
                            margin: "10px 0px",
                          }}
                        >
                          <span>?????? ??????</span>
                        </div>
                      ) : (
                        ""
                      )}
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
            marginTop: "20px",
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
            ??? ???????????? ??????????
          </h1>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <span>???????????? ????????? ????????? ????????? ?????? ??????????????????!</span>
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
          <div
            className="mt-1"
            style={{
              width: "100%",

              height: "120px",
            }}
          >
            <div
              style={{
                transform: "translate(10%,10%)",
                display: "inline-block",
                width: "90px",
                textAlign: "center",
                marginLeft: "2.5rem",
                backgroundColor: "#fc9d39",
                borderRadius: "10px",
                height: "55px",
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
                  ????????????
                  <br />
                  ????????????
                </div>
              </a>
            </div>
            <h1
              style={{
                fontSize: "1.7rem",
                fontWeight: "bolder",
                textAlign: "center",
                margin: "0 auto",
                display: "inline",
                paddingLeft: "14rem",
                position: "relative",
              }}
            >
              ???????????? ?????? ????????????
            </h1>

            <h2
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.3rem",
                transform: "translateX(%)",
              }}
            >
              <a href="/hot_articles">??? ???????????? ????????????</a>
            </h2>
          </div>
          <div
            className="container"
            style={{
              width: "800px",

              margin: "0 auto",
            }}
          >
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
                          width: "150px",
                          height: "150px",
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
                              transform: "translate(-5% ,-5%)",
                              border: "0.1px #fc9d39 solid",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>
                      <div
                        className="ellipsis_1"
                        style={{
                          width: "150px",
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
                          {product.productPrice}???
                        </span>
                      </div>
                      <div
                        className="flex"
                        style={{
                          fontSize: "0.9rem",
                        }}
                      >
                        <span>{product.productDealAddress}</span>
                      </div>
                      <div
                        className="flex"
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        <span>?????? {product.productLike}</span>
                        &nbsp; ??&nbsp;
                        <span>?????? {product.productChatting}</span>
                      </div>
                      {product.productDeal == "?????? ??????" ? (
                        <div
                          style={{
                            border: "1px gray solid",
                            margin: "10px 0px",
                          }}
                        >
                          <span>?????? ??????</span>
                        </div>
                      ) : (
                        ""
                      )}
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
            marginTop: "20px",
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
            ??? ???????????? ??????????
          </h1>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <span>???????????? ????????? ????????? ????????? ?????? ??????????????????!</span>
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

export default AllProduct;
