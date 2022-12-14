import React, { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaCarrot } from "react-icons/fa";
import RealtyPaging from "../components/RealtyPaging";
import ProductPaging from "../components/ProductPaging";
import JobsPaging from "../components/JobsPaging";
const ArticleControl = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate(-1);
  };
  if (!logined) {
    moveBack();
  }
  const [spreadProduct, setSpreadProduct] = useState(false);
  const [spreadJobs, setSpreadJobs] = useState(false);
  const [spreadRealty, setSpreadRealty] = useState(false);
  const onSpreadProduct = () => {
    setSpreadProduct(!spreadProduct);
  };
  const onSpreadJobs = () => {
    setSpreadJobs(!spreadJobs);
  };
  const onSpreadRealty = () => {
    setSpreadRealty(!spreadRealty);
  };
  //여기부터 Realty
  const [Rpage, setRPage] = useState(1);
  const [currentRealtys, setCurrentRealtys] = useState([]);
  const [realty, setRealty] = useState([]);
  const RhandlePageChange = (page) => {
    setRPage(page);
  };
  const [RpostPerPage] = useState(4);
  const RindexOfLastPost = Rpage * RpostPerPage;
  const RindexOfFirstPost = RindexOfLastPost - RpostPerPage;

  useEffect(() => {
    setCurrentRealtys(realty.slice(RindexOfFirstPost, RindexOfLastPost));
  }, [RindexOfFirstPost, RindexOfLastPost, Rpage]);

  const moveRealty = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/realtyCheck/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/realtypost/${id}`);
  };

  const onRealty = (data) => {
    const datas = data.reverse();
    setRealty((prev) => datas);
  };
  //여기부터 Product
  const [Ppage, setPPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const PhandlePageChange = (page) => {
    setPPage(page);
  };
  const [PpostPerPage] = useState(8);
  const PindexOfLastPost = Ppage * PpostPerPage;
  const PindexOfFirstPost = PindexOfLastPost - PpostPerPage;

  useEffect(() => {
    setCurrentProducts(product.slice(PindexOfFirstPost, PindexOfLastPost));
  }, [PindexOfFirstPost, PindexOfLastPost, Ppage]);
  const onProduct = (data) => {
    const datas = data.reverse();
    setProduct((prev) => datas);
  };
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

  //여기부터 Jobs
  const [Jpage, setJPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const JhandlePageChange = (page) => {
    setJPage(page);
  };
  const [JpostPerPage] = useState(4);
  const JindexOfLastPost = Jpage * JpostPerPage;
  const JindexOfFirstPost = JindexOfLastPost - JpostPerPage;

  useEffect(() => {
    setCurrentJobs(jobs.slice(JindexOfFirstPost, JindexOfLastPost));
  }, [JindexOfFirstPost, JindexOfLastPost, Jpage]);

  const moveJobs = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/jobsCheck/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/jobspost/${id}`);
  };

  const onJobs = (data) => {
    const datas = data.reverse();
    setJobs((prev) => datas);
  };

  // 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      const userid = sessionStorage.getItem("userid");
      try {
        const data = await axios({
          url: `http://localhost:8083/getRealtys/${userid}`,
          method: "post",
        });
        onRealty(data.data);
        setCurrentRealtys(data.data.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getProducts/${userid}`,
          method: "post",
        });
        onProduct(data.data);
        setCurrentProducts(data.data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getJobs/${userid}`,
          method: "post",
        });
        onJobs(data.data);
        setCurrentJobs(data.data.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

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
          style={{
            height: "40px",
            borderBottom: "1px #bcbcbc solid",
            borderTop: "1px #bcbcbc solid",
            display: "flex",
          }}
        >
          <ul
            className="flex flex-row items-center gap-5 ml-4"
            style={{
              fontWeight: "bolder",
            }}
          >
            <li>
              <a href="/mypage">내 프로필</a>
            </li>
            <li>
              <a href="/security">보안설정</a>
            </li>
            <li
              style={{
                color: "#ffa445",
              }}
            >
              <a href="/articleControl">게시글 관리</a>
            </li>
            <li>
              <a href="/ChatList">채팅방 목록</a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <button
                onClick={() => {
                  onSpreadProduct();
                }}
                style={{
                  marginBottom: "10px",
                  marginTop: "20px",
                  fontSize: "1.1rem",
                  fontWeight: "bolder",
                }}
              >
                {spreadProduct == false
                  ? "중고거래 마이게시글 펼쳐보기"
                  : "중고거래 마이게시글 접기"}
              </button>
            </li>
            <div>
              {spreadProduct && (
                <ul className="grid grid-cols-4">
                  {currentProducts.map((product, index) => (
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
              )}
            </div>
            {spreadProduct && (
              <ProductPaging
                totalCount={product.length}
                page={Ppage}
                postPerPage={PpostPerPage}
                pageRangeDisplayed={5}
                handlePageChange={PhandlePageChange}
              />
            )}
            <li>
              <button
                onClick={() => {
                  onSpreadJobs();
                }}
                style={{
                  marginBottom: "10px",
                  marginTop: "20px",
                  fontSize: "1.1rem",
                  fontWeight: "bolder",
                }}
              >
                {spreadJobs == false
                  ? "알바 마이게시글 펼쳐보기"
                  : "알바 마이게시글 접기"}
              </button>
            </li>
            <div>
              {spreadJobs && (
                <ul className="grid grid-cols-2">
                  {currentJobs.map((job, index) => (
                    <li key={index} style={{}}>
                      <button
                        onClick={() => {
                          moveJobs(job.jobid);
                        }}
                      >
                        <div className="flex flex-row">
                          <div
                            style={{
                              width: "140px",
                              height: "140px",
                              borderRadius: "10px",
                              display: "flex",
                            }}
                            className="gap-3"
                          >
                            {job.profileImage != null ? (
                              <img
                                src={job.profileImage}
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
                                  fontSize: "7rem",
                                  transform: "translate(12.5%,12.5%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div
                            className="flex flex-col"
                            style={{
                              width: "280px",
                              height: "150px",

                              paddingLeft: "5px",
                            }}
                          >
                            <div
                              className="JobSubjectBox ellipsis_2"
                              style={{
                                textAlign: "start",
                              }}
                            >
                              {job.jobSubject}
                            </div>
                            <span
                              className="flex items-center"
                              style={{
                                width: "280px",
                                height: "150px",
                              }}
                            >
                              <div
                                className="JobNameBox ellipsis_1"
                                style={{
                                  width: "280px",
                                  height: "60px",
                                  textAlign: "start",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "0.9rem",
                                    color: "gray",
                                  }}
                                >
                                  {job.jobName}&nbsp; ·&nbsp; {job.jobPlace}
                                </span>
                              </div>
                            </span>
                            <span
                              className="flex justify-start"
                              style={{
                                width: "280px",
                                height: "150px",
                                fontWeight: "bolder",
                                paddingLeft: "3px",
                                paddingTop: "5px",
                              }}
                            >
                              {job.jobCategory} {job.jobPrice}
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {spreadJobs && (
                <JobsPaging
                  totalCount={jobs.length}
                  page={Jpage}
                  postPerPage={JpostPerPage}
                  pageRangeDisplayed={5}
                  handlePageChange={JhandlePageChange}
                />
              )}
            </div>
            <li>
              <button
                onClick={() => {
                  onSpreadRealty();
                }}
                style={{
                  marginBottom: "10px",
                  marginTop: "20px",
                  fontSize: "1.1rem",
                  fontWeight: "bolder",
                }}
              >
                {spreadRealty == false
                  ? "부동산 마이게시글 펼쳐보기"
                  : "부동산 마이게시글 접기"}
              </button>
            </li>
            <div>
              {spreadRealty && (
                <ul className="grid grid-cols-2">
                  {currentRealtys.map((realty, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          moveRealty(realty.realtyId);
                        }}
                      >
                        <div
                          className="flex"
                          style={{
                            height: "120px",
                          }}
                        >
                          <div
                            style={{
                              width: "120px",
                              height: "120px",

                              borderRadius: "10px",
                            }}
                          >
                            {realty.profileImage != null ? (
                              <img
                                src={realty.profileImage}
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
                                  fontSize: "7rem",
                                  transform: "translate(1.5%,1.5%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div
                            className=""
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                            }}
                          >
                            <span
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyCategory}{" "}
                            </span>
                            <span>
                              {realty.realtyDeposit}만원/{realty.realtyMonthly}
                              만원 -
                              <span
                                style={{
                                  width: "240px",
                                  height: "50px",
                                  textAlign: "left",
                                }}
                                className="ellipsis_2"
                              >
                                {realty.realtyIntroduce}
                              </span>
                            </span>
                            <div
                              className="text-sm"
                              style={{
                                color: "#73777B",
                                textAlign: "left",
                              }}
                            >
                              <div>{realty.realtyAddressDong}</div>
                            </div>

                            <div
                              className="font-bold pt-1"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "월세" ? (
                                <div>
                                  {realty.realtyDealing} {realty.realtyDeposit}/
                                  {realty.realtyMonthly}
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "단기" ? (
                                <div>
                                  {realty.realtyDealing} {realty.realtyDeposit}/
                                  {realty.realtyMonthly}
                                </div>
                              ) : (
                                ""
                              )}
                              <div></div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {spreadRealty && (
              <RealtyPaging
                totalCount={realty.length}
                page={Rpage}
                postPerPage={RpostPerPage}
                pageRangeDisplayed={5}
                handlePageChange={RhandlePageChange}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleControl;
