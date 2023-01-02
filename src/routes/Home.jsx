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
  const [user, setUser] = useState(sessionStorage.getItem("user") || "");
  const [hotSearch, setHotSearch] = useState([]);
  const [hotProduct, setHotProduct] = useState([]);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const onProduct = (data) => {
    const datas = data.reverse();
    setPost((prev) => datas);
  };
  useEffect(() => {
    if (logined) {
      const getData = async () => {
        try {
          const data = await axios.get(
            `${BACKEND_URL}:8083/getUser/${sessionStorage.getItem("userid")}`
          );

          setUser(data.data);
          sessionStorage.getItem("user", data.data);
        } catch (e) {
          console.log(e);
        }
        try {
          const data = await axios({
            url: `${BACKEND_URL}:8083/hotProduct`,
            method: "GET",
          });
          onProduct(data.data);
          setHotProduct(data.data.slice(0, 8));
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    }

    const getData = async () => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}:8083/hotProduct`,
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
          url: `${BACKEND_URL}:8083/getHotSearch`,
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
        url: `${BACKEND_URL}:8083/productView/${id}`,
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
        <div className="background1 flex items-center">
          <div
            className="flex"
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
                  당신 근처의
                </div>
                <div>당근마켓</div>
              </div>
              <div
                className="mt-8"
                style={{
                  width: "330px",
                }}
              >
                <div>중고 거래부터 동네 정보까지, 이웃과 함께해</div>
                <div>가깝고 따듯한 당신의 근처를 만들어요.</div>
              </div>
            </div>
            <div>
              <div className="firstimg">
                <img
                  src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <section className="flex items-center">
          <div
            className="flex"
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="secondimg">
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
                <div>우리 동네</div>
                <div>중고 직거래 마켓</div>
              </div>
              <div
                className="my-9"
                style={{
                  width: "420px",
                }}
              >
                동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
              </div>
              <div className="font-bold flex justify-center">
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`${BACKEND_URL}:3000/hot_articles`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    인기매물 보기
                  </a>
                </div>
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <a
                      href={`${BACKEND_URL}:3000/trust`}
                      style={{
                        padding: "10px 20px",

                        borderRadius: "10px",
                      }}
                      className="mr-8 bg-gray-200"
                    >
                      믿을 수 있는 중고거래
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background2 flex  ">
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
                <div>이웃과 함께하는</div>
                <div>동네생활</div>
              </div>

              <h1 className="py-5">
                우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
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
                  <div className="font-bold mb-2 mt-3">우리동네질문</div>
                  <span>궁금한 게 있을 땐 이웃에게 물어보세요.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillFileText />
                  </div>
                  <div className="font-bold mb-2 mt-3">우리분실센터</div>
                  <span>무언가를 잃어버렸을 때, 함께 찾을 수 있어요.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillMessage />
                  </div>
                  <div className="font-bold mb-2 mt-3">동네모임</div>
                  <span>관심사가 비슷한 이웃과 온오프라인으로 만나요.</span>
                </li>
              </ul>
            </div>
            <div className="thirdimg relative">
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "10%",
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

        <div className="section-Box bg-gray-50 flex flex-row">
          <div className="imgBox-1">
            <img
              src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-5fd6fb61d603ab919a45566b2ea6b505c83a93ec218f34ddcd5cb482543e2317.webp"
              alt=""
            />
          </div>
          <div className="flex-grow empty-Box"></div>
          <div className="flex flex-col justify-center">
            <div className="townShopBox">
              <span>내 근처에서 찾는 동네가게</span>
            </div>
            <div className="mt-5">
              <span>우리 동네 가게를 찾고 있나요?</span>
            </div>
            <div>
              <span>동네 주민이 남긴 진짜 후기를 함께 확인해보세요!</span>
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
                당근마켓 동네가게 찾기
              </a>
            </div>
          </div>
        </div>

        <div className="section-Box1 bg-gray-100">
          <div
            style={{
              fontWeight: "bolder",
              fontSize: "2.5rem",
              display: "flex",
              justifyContent: "center",
              padding: "4rem 0",
            }}
          >
            <h1>중고거래 인기매물</h1>
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
                          {product.productPrice}원
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
            <a href={`${BACKEND_URL}:3000/hot_articles`}>인기매물 더 보기</a>
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
            <a href="#">중고거래 인기검색어</a>
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
        <div className="background1 flex items-center">
          <div
            className="flex"
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
                  당신 근처의
                </div>
                <div>당근마켓</div>
              </div>
              <div
                className="mt-8"
                style={{
                  width: "330px",
                }}
              >
                <div>중고 거래부터 동네 정보까지, 이웃과 함께해</div>
                <div>가깝고 따듯한 당신의 근처를 만들어요.</div>
              </div>
            </div>
            <div>
              <div className="firstimg">
                <img
                  src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <section className="flex items-center">
          <div
            className="flex"
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="secondimg">
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
                <div>우리 동네</div>
                <div>중고 직거래 마켓</div>
              </div>
              <div
                className="my-9"
                style={{
                  width: "420px",
                }}
              >
                동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
              </div>
              <div className="font-bold flex justify-center">
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`${BACKEND_URL}:3000/hot_articles`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    인기매물 보기
                  </a>
                </div>
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`${BACKEND_URL}:3000/trust`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    믿을 수 있는 중고거래
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background2 flex  ">
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
                <div>이웃과 함께하는</div>
                <div>동네생활</div>
              </div>

              <h1 className="py-5">
                우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
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
                  <div className="font-bold mb-2 mt-3">우리동네질문</div>
                  <span>궁금한 게 있을 땐 이웃에게 물어보세요.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillFileText />
                  </div>
                  <div className="font-bold mb-2 mt-3">우리분실센터</div>
                  <span>무언가를 잃어버렸을 때, 함께 찾을 수 있어요.</span>
                </li>
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillMessage />
                  </div>
                  <div className="font-bold mb-2 mt-3">동네모임</div>
                  <span>관심사가 비슷한 이웃과 온오프라인으로 만나요.</span>
                </li>
              </ul>
            </div>
            <div className="thirdimg relative">
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "10%",
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

        <div className="section-Box bg-gray-50 flex flex-row">
          <div className="imgBox-1">
            <img
              src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-5fd6fb61d603ab919a45566b2ea6b505c83a93ec218f34ddcd5cb482543e2317.webp"
              alt=""
            />
          </div>
          <div className="flex-grow empty-Box"></div>
          <div className="flex flex-col justify-center">
            <div className="townShopBox">
              <span>내 근처에서 찾는 동네가게</span>
            </div>
            <div className="mt-5">
              <span>우리 동네 가게를 찾고 있나요?</span>
            </div>
            <div>
              <span>동네 주민이 남긴 진짜 후기를 함께 확인해보세요!</span>
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
                당근마켓 동네가게 찾기
              </a>
            </div>
          </div>
        </div>

        <div className="section-Box1 bg-gray-100">
          <div
            style={{
              fontWeight: "bolder",
              fontSize: "2.5rem",
              display: "flex",
              justifyContent: "center",
              padding: "4rem 0",
            }}
          >
            <h1>중고거래 인기매물</h1>
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
                          {product.productPrice}원
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
            <a href={`${BACKEND_URL}:3000/hot_articles`}>인기매물 더 보기</a>
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
            <a href="#">중고거래 인기검색어</a>
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
