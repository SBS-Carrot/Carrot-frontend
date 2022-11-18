import React from "react";
import RealtyHeader from "../layouts/RealtyHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import Footer from "../layouts/Footer";
import "../styles/Realty.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaCarrot } from "react-icons/fa";
import "../styles/Jobs.css";
import RealtyPaging from "./RealtyPaging";
const AllRealty = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [Realty, setRealty] = useState([]);
  const [address, setAddress] = useState("");
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(10);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const onAddress = () => {
    // let index = address.includes("대전광역시");
    // console.log(index);
  };

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

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = await axios({
          url: `http://localhost:8083/realty`,
          method: "GET",
        });
        onRealty(data.data);
        setCurrentPosts(data.data.slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);

  useEffect(() => {
    setCurrentPosts(Realty.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);

  if (logined) {
    return (
      <div>
        <LoginedRealtyHeader setLogined={setLogined} />
        <section>
          <div
            style={{
              width: "800px",
              margin: "0 auto",
            }}
          >
            <div className="flex gap-3">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.5rem",
                  paddingTop: "5%",
                }}
              >
                모든 부동산 직거래 게시글
              </div>
              <span
                href={`/realtyWrite`}
                className="flex items-end justify-end "
                style={{
                  width: "62%",
                }}
              >
                <a
                  href={`/realtyWrite`}
                  className="rounded-md p-2"
                  style={{
                    backgroundColor: "#fc9d39",
                    color: "white",
                  }}
                >
                  {" "}
                  내 매물 내놓기
                </a>
              </span>
            </div>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bolder",
                marginTop: "10px",
              }}
            >
              <a href="/realty">＞인기 부동산 매물 보러가기</a>
            </h2>
            <div>
              <div className="mt-5">
                <ul className="grid grid-cols-2 gap-5">
                  {currentPosts.map((realty, index) => (
                    <li
                      key={index}
                      style={{
                        width: "360px",
                        height: "120px",
                      }}
                    >
                      <button
                        onClick={() => {
                          moveRealty(realty.realtyId);
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
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
                            className="gap-2"
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                            }}
                          >
                            <div>
                              <span>{realty.realtyCategory}</span>
                              <span
                                style={{
                                  paddingRight: "5px",
                                }}
                              >
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length == 6 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
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
                                          {realty.realtySalePrice.substring(2)}
                                          만
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
                                          {realty.realtySalePrice.substring(1)}
                                          만
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
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "30px",
                                          whiteSpace: "nowrap",
                                          marginLeft: "5px",
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

                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
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
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "30px",
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
                                          {realty.realtySalePrice.substring(1)}
                                          만
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
                                  <span>
                                    {realty.realtyDeposit}만원/
                                    {realty.realtyMonthly}만원 -
                                  </span>
                                ) : (
                                  ""
                                )}{" "}
                                {realty.realtyDealing === "단기" ? (
                                  <span>
                                    {realty.realtyDeposit}만원/
                                    {realty.realtyMonthly}만원 -
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>

                              <span
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                {realty.realtyIntroduce}
                              </span>
                            </div>
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
              </div>

              <div
                className="rounded-xl font-bold p-8 mb-16"
                style={{
                  marginTop: "8%",
                  fontSize: "1.25rem",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <div>
                  <span>복비 없이 투명한 투명한 부동산 직거래</span>
                </div>
                <div>
                  <span>당근마켓 내 근처 탭에서 바로 찾아보세요!</span>
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#084594",
                  }}
                >
                  <div className="flex items-center font-bold">
                    <a href="#">앱 다운로드 하기</a>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
              <RealtyPaging
                totalCount={Realty.length}
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={5}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
        <br />
        <br />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <RealtyHeader />
        <section>
          <div
            style={{
              width: "800px",
              margin: "0 auto",
            }}
          >
            <div className="flex gap-3">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.5rem",
                  paddingTop: "5%",
                }}
              >
                모든 부동산 직거래 게시글
              </div>
              <span
                href={`/realtyWrite`}
                className="flex items-end justify-end "
                style={{
                  width: "62%",
                }}
              >
                <a
                  href={`/realtyWrite`}
                  className="rounded-md p-2"
                  style={{
                    backgroundColor: "#fc9d39",
                    color: "white",
                  }}
                >
                  {" "}
                  내 매물 내놓기
                </a>
              </span>
            </div>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bolder",
                marginTop: "10px",
              }}
            >
              <a href="/realty">＞인기 부동산 매물 보러가기</a>
            </h2>
            <div>
              <div className="mt-5">
                <ul className="grid grid-cols-2 gap-5">
                  {currentPosts.map((realty, index) => (
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
                              {realty.realtyDealing == "월세" ? (
                                <div>
                                  {realty.realtyDeposit}만원 /{" "}
                                  {realty.realtyMonthly}
                                  만원 -
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing == "단기" ? (
                                <div>
                                  {realty.realtyDeposit}만원 /{" "}
                                  {realty.realtyMonthly}
                                  만원 -
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "전세" ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtySalePrice.length >= 5 ? (
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
                                            width: "50px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ) : (
                                    realty.realtySalePrice + "만원"
                                  )}
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "매매" ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtySalePrice.length >= 5 ? (
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
                                            width: "50px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ) : (
                                    realty.realtySalePrice + "만원"
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              <span
                                style={{
                                  width: "240px",
                                  height: "50px",
                                  textAlign: "left",
                                }}
                                className="ellipsis_2"
                              >
                                {realty.realtyAddress}
                              </span>
                            </span>
                            <div
                              className="text-sm"
                              style={{
                                color: "#73777B",
                                textAlign: "left",
                              }}
                            >
                              <div>OO동</div>
                            </div>

                            <div
                              className="font-bold pt-1"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyDealing === "전세" ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  {realty.realtySalePrice.length >= 5 ? (
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
                                            width: "50px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ) : (
                                    realty.realtySalePrice + "만원"
                                  )}
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "매매" ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  {realty.realtySalePrice.length >= 5 ? (
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
                                            width: "50px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ) : (
                                    realty.realtySalePrice + "만원"
                                  )}
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
              </div>

              <div
                className="rounded-xl font-bold p-8 mb-16"
                style={{
                  marginTop: "8%",
                  fontSize: "1.25rem",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <div>
                  <span>복비 없이 투명한 투명한 부동산 직거래</span>
                </div>
                <div>
                  <span>당근마켓 내 근처 탭에서 바로 찾아보세요!</span>
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#084594",
                  }}
                >
                  <div className="flex items-center font-bold">
                    <a href="#">앱 다운로드 하기</a>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
              <RealtyPaging
                totalCount={Realty.length}
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={5}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
};

export default AllRealty;
