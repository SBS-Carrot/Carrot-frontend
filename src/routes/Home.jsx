import { useState } from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import "../styles/Home.css";
import Footer from "../layouts/Footer";
import { AiFillHome, AiFillFileText, AiFillMessage } from "react-icons/ai";
import { useEffect } from "react";
import { FaCarrot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

const Home = ({ logined, setLogined }) => {
  const [hotSearch, setHotSearch] = useState([]);
  const [hotProduct, setHotProduct] = useState([]);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const onProduct = (data) => {
    const datas = data.reverse();
    setPost((prev) => datas);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/hotProduct`,
          method: "GET",
        });
        onProduct(data.data);
        setHotProduct(data.data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };
    getData();

    const getHotSearch = async () => {
      try {
        const data1 = await axios({
          url: `http://${BACKEND_URL}:8083/getHotSearch`,
          method: "GET",
        });

        setHotSearch(data1.data.reverse().slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    getHotSearch();
  }, []);

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
  if (logined == "true") {
    return (
      <div>
        <LoginedHeader setLogined={setLogined} />
        <div className="background1">
          <div className=" flex items-center">
            <div
              className="flex gap-2"
              style={{
                width: "1000px",
                margin: "0 auto",
              }}
            >
              <div className="flex justify-center flex-col">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "300px",
                    }}
                  >
                    ?????? ?????????
                  </div>
                  <div>????????????</div>
                </div>
                <div
                  className="mt-8"
                  style={{
                    width: "330px",
                  }}
                >
                  <div>?????? ???????????? ?????? ????????????, ????????? ?????????</div>
                  <div>????????? ????????? ????????? ????????? ????????????.</div>
                </div>
              </div>
              <div>
                <div className="firstimg flex items-center">
                  <img
                    src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="flex items-center">
          <div
            className="flex gap-6"
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="secondimg mt-2 flex items-center">
              <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp"
                alt=""
              />
            </div>
            <div className="flex justify-center flex-col">
              <div
                className="font-bold"
                style={{
                  width: "400px",
                  fontSize: "2.5rem",
                }}
              >
                <div>?????? ??????</div>
                <div>?????? ????????? ??????</div>
              </div>
              <div
                className="my-9"
                style={{
                  width: "420px",
                }}
              >
                ?????? ???????????? ????????? ????????? ????????? ?????? ??????????????????.
              </div>
              <div className="font-bold flex justify-center">
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/hot_articles`}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    ???????????? ??????
                  </a>
                </div>
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/trust`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    ?????? ??? ?????? ????????????
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background2 flex">
          <div
            className="flex "
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              className="flex justify-center flex-col pr-10"
              style={{
                width: "450px",
              }}
            >
              <div
                className="font-bold"
                style={{
                  fontSize: "2.3rem",
                }}
              >
                <div>????????? ????????????</div>
                <div>????????????</div>
              </div>

              <h1 className="py-5">
                ?????? ????????? ????????? ???????????? ????????? ?????? ????????????.
              </h1>
              <ul
                className="flex mt-11 gap-8"
                style={{
                  fontSize: "0.75rem",
                  width: "480px",
                }}
              >
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillHome />
                  </div>
                  <div className="font-bold mb-2 mt-3">??????????????????</div>
                  <span>????????? ??? ?????? ??? ???????????? ???????????????.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillFileText />
                  </div>
                  <div className="font-bold mb-2 mt-3">??????????????????</div>
                  <span>???????????? ??????????????? ???, ?????? ?????? ??? ?????????.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillMessage />
                  </div>
                  <div className="font-bold mb-2 mt-3">????????????</div>
                  <span>???????????? ????????? ????????? ????????????????????? ?????????.</span>
                </li>
              </ul>
            </div>
            <div className="thirdimg relative">
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "5%",
                  left: "10%",
                }}
              >
                <img
                  src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-91a2286453bdf82dea16a7f0ee4ceb9dd325eae0e5a2a9967ba72c344bf8f2fc.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <div className="section-Box flex flex-row">
          <div className="imgBox-1">
            <img
              src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-5fd6fb61d603ab919a45566b2ea6b505c83a93ec218f34ddcd5cb482543e2317.webp"
              alt=""
            />
          </div>
          <div className="flex-grow empty-Box"></div>
          <div className="flex flex-col justify-center">
            <div className="townShopBox">
              <span>??? ???????????? ?????? ????????????</span>
            </div>
            <div className="mt-5">
              <span>?????? ?????? ????????? ?????? ??????????</span>
            </div>
            <div>
              <span>?????? ????????? ?????? ?????? ????????? ?????? ??????????????????!</span>
            </div>
            <div className="mt-5 findTownBox">
              <a
                href="#"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "bolder",
                  fontSize: "1.2rem",
                }}
              >
                ???????????? ???????????? ??????
              </a>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#efefef", minWidth: "1090px" }}>
          <div className="section-Box1 ">
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "2.5rem",
                display: "flex",
                justifyContent: "center",
                padding: "4rem 0",
              }}
            >
              <h1>???????????? ????????????</h1>
            </div>
            <div>
              <ul className="grid grid-cols-4">
                {hotProduct.map((product, index) => (
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
                                transform: "translate(-5%, -5%)",
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
                            {product.productPrice}???
                          </span>
                        </div>
                        <div
                          className="flex mt-1"
                          style={{
                            fontSize: "0.8rem",
                          }}
                        >
                          <span>{product.productDealAddress}</span>
                        </div>
                        <div
                          className="flex"
                          style={{
                            paddingBottom: "3rem",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          <span>?????? {product.productLike}</span>
                          &nbsp; ??&nbsp;
                          <span>?????? {product.productChatting}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                textDecoration: "underline",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textAlign: "center",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <a href={`${BACKEND_URL}:3000/hot_articles`}>???????????? ??? ??????</a>
            </div>
          </div>
        </div>
        <div className="searchWordBox">
          <div
            className="mt-8"
            style={{
              fontWeight: "bolder",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            <a href="#">???????????? ???????????????</a>
          </div>
          <ul className="flex flex-raw gap-10 align-center justify-center mt-8 hotissueBox">
            {hotSearch.map((search, index) => (
              <li key={index}>
                <a href={`search/${search.searchWord}`}>{search.searchWord}</a>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="background1">
          <div className=" flex items-center">
            <div
              className="flex gap-2"
              style={{
                width: "1000px",
                margin: "0 auto",
              }}
            >
              <div className="flex justify-center flex-col">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "300px",
                    }}
                  >
                    ?????? ?????????
                  </div>
                  <div>????????????</div>
                </div>
                <div
                  className="mt-8"
                  style={{
                    width: "330px",
                  }}
                >
                  <div>?????? ???????????? ?????? ????????????, ????????? ?????????</div>
                  <div>????????? ????????? ????????? ????????? ????????????.</div>
                </div>
              </div>
              <div>
                <div className="firstimg flex items-center">
                  <img
                    src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="flex items-center">
          <div
            className="flex gap-6"
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="secondimg mt-2 flex items-center">
              <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp"
                alt=""
              />
            </div>
            <div className="flex justify-center flex-col">
              <div
                className="font-bold"
                style={{
                  width: "400px",
                  fontSize: "2.5rem",
                }}
              >
                <div>?????? ??????</div>
                <div>?????? ????????? ??????</div>
              </div>
              <div
                className="my-9"
                style={{
                  width: "420px",
                }}
              >
                ?????? ???????????? ????????? ????????? ????????? ?????? ??????????????????.
              </div>
              <div className="font-bold flex justify-center">
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/hot_articles`}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    ???????????? ??????
                  </a>
                </div>
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/trust`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    ?????? ??? ?????? ????????????
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background2 flex">
          <div
            className="flex "
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              className="flex justify-center flex-col pr-10"
              style={{
                width: "450px",
              }}
            >
              <div
                className="font-bold"
                style={{
                  fontSize: "2.3rem",
                }}
              >
                <div>????????? ????????????</div>
                <div>????????????</div>
              </div>

              <h1 className="py-5">
                ?????? ????????? ????????? ???????????? ????????? ?????? ????????????.
              </h1>
              <ul
                className="flex mt-11 gap-8"
                style={{
                  fontSize: "0.75rem",
                  width: "480px",
                }}
              >
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillHome />
                  </div>
                  <div className="font-bold mb-2 mt-3">??????????????????</div>
                  <span>????????? ??? ?????? ??? ???????????? ???????????????.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillFileText />
                  </div>
                  <div className="font-bold mb-2 mt-3">??????????????????</div>
                  <span>???????????? ??????????????? ???, ?????? ?????? ??? ?????????.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillMessage />
                  </div>
                  <div className="font-bold mb-2 mt-3">????????????</div>
                  <span>???????????? ????????? ????????? ????????????????????? ?????????.</span>
                </li>
              </ul>
            </div>
            <div className="thirdimg relative">
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "5%",
                  left: "10%",
                }}
              >
                <img
                  src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-91a2286453bdf82dea16a7f0ee4ceb9dd325eae0e5a2a9967ba72c344bf8f2fc.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <div className="section-Box flex flex-row">
          <div className="imgBox-1">
            <img
              src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-5fd6fb61d603ab919a45566b2ea6b505c83a93ec218f34ddcd5cb482543e2317.webp"
              alt=""
            />
          </div>
          <div className="flex-grow empty-Box"></div>
          <div className="flex flex-col justify-center">
            <div className="townShopBox">
              <span>??? ???????????? ?????? ????????????</span>
            </div>
            <div className="mt-5">
              <span>?????? ?????? ????????? ?????? ??????????</span>
            </div>
            <div>
              <span>?????? ????????? ?????? ?????? ????????? ?????? ??????????????????!</span>
            </div>
            <div className="mt-5 findTownBox">
              <a
                href="#"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "bolder",
                  fontSize: "1.2rem",
                }}
              >
                ???????????? ???????????? ??????
              </a>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#efefef", minWidth: "1090px" }}>
          <div className="section-Box1 ">
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "2.5rem",
                display: "flex",
                justifyContent: "center",
                padding: "4rem 0",
              }}
            >
              <h1>???????????? ????????????</h1>
            </div>
            <div>
              <ul className="grid grid-cols-4">
                {hotProduct.map((product, index) => (
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
                                transform: "translate(-5%, -5%)",
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
                            {product.productPrice}???
                          </span>
                        </div>
                        <div
                          className="flex mt-1"
                          style={{
                            fontSize: "0.8rem",
                          }}
                        >
                          <span>{product.productDealAddress}</span>
                        </div>
                        <div
                          className="flex"
                          style={{
                            paddingBottom: "3rem",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          <span>?????? {product.productLike}</span>
                          &nbsp; ??&nbsp;
                          <span>?????? {product.productChatting}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                textDecoration: "underline",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textAlign: "center",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <a href={`${BACKEND_URL}:3000/hot_articles`}>???????????? ??? ??????</a>
            </div>
          </div>
        </div>
        <div className="searchWordBox">
          <div
            className="mt-8"
            style={{
              fontWeight: "bolder",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            <a href="#">???????????? ???????????????</a>
          </div>
          <ul className="flex flex-raw gap-10 align-center justify-center mt-8 hotissueBox">
            {hotSearch.map((search, index) => (
              <li key={index}>
                <a href={`search/${search.searchWord}`}>{search.searchWord}</a>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Home;
