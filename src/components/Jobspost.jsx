import { useState, useEffect } from "react";
import JobsHeader from "../layouts/JobsHeader";
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import Footer from "../layouts/Footer";
import {
  BsFillEmojiSmileFill,
  BsChevronLeft,
  BsChevronRight,
  BsCalendarEvent,
} from "react-icons/bs";
import { AiOutlineDollar, AiOutlineClockCircle } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCarrot } from "react-icons/fa";
import { MdKeyboardCapslock } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import ReadMap from "./ReadMap";
import { data } from "autoprefixer";
const Jobspost = ({
  logined,
  setLogined,
  onJobsLike,
  jobsLiked,
  setJobsLiked,
  onRemoveJobs,
  deleteToggle,
  onDeleteToggle,
  menuToggle,
  onMenuToggle,
  setMenuToggle,
  editToggle,
  onEditToggle,
}) => {
  const { num } = useParams();
  const navigate = useNavigate();
  const moveBack = () => {
    navigate(-1);
  };

  const jobsmove = () => {
    navigate(`/alljobs`);
  };
  const [userid, setUserid] = useState(sessionStorage.getItem("userid"));
  const [jobArticle, setJobArticle] = useState("");
  const [user, setUser] = useState("");
  const [articleWriter, setArticleWriter] = useState("");
  const [images, setImages] = useState([]);
  const onLikes = (data) => {
    setJobsLiked(data);
  };

  const onArticle = (data) => {
    setJobArticle((prev) => data);
  };
  const [imgs, setImgs] = useState([
    {
      url: images[0],
    },
    {
      url: images[1],
    },
    {
      url: images[2],
    },
    {
      url: images[3],
    },
    {
      url: images[4],
    },
    {
      url: images[5],
    },
    {
      url: images[6],
    },
    {
      url: images[7],
    },
    {
      url: images[8],
    },
    {
      url: images[9],
    },
  ]);

  useEffect(() => {
    const onSubmit = async (num) => {
      let abcd = "";
      try {
        const data = await axios({
          url: `http://localhost:8083/Jobs/${num}`,
          method: "GET",
        });

        abcd = data.data.jobUserid;
        onArticle(data.data);
      } catch (e) {
        console.log(e);
        window.alert("존재하지 않는 게시물입니다");
        moveBack();
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getUser/${abcd}`,
          method: "GET",
        });
        setArticleWriter(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getJobsWithImage/${num}`,
          method: "GET",
        });

        setImgs(data.data.images);
      } catch (e) {
        console.log(e);
      }

      try {
        const data = await axios({
          url: `http://localhost:8083/likeJobsCheck/${num}`,
          method: "GET",
          params: {
            jobsId: num,
            userid: sessionStorage.getItem("userid"),
          },
        });
        onLikes(data.data);
      } catch (e) {
        console.log(e);
      }

      try {
        const data = await axios({
          url: `http://localhost:8083/getUser/${userid}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit(num);
  }, []);

  useEffect(() => {
    const onLikeRe = async (num) => {
      try {
        const data = await axios({
          url: `http://localhost:8083/Jobs/${num}`,
          method: "GET",
        });
        onArticle(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onLikeRe(num);
  }, [jobsLiked]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  if (logined) {
    return (
      <div>
        <LoginedJobsHeader setLogined={setLogined} />
        <div
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
            {imgs[0] != undefined ? (
              <div>
                <Slider {...settings}>
                  {imgs[0] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[0]} alt="" />
                    </div>
                  )}
                  {imgs[1] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[1]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[2] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[2]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[3] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[3]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[4] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[4]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[5] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[5]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[6] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[6]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[7] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[7]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[8] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[8]} alt="" />
                    </div>
                  )}{" "}
                  {imgs[9] == undefined ? (
                    ""
                  ) : (
                    <div>
                      <img src={imgs[9]} alt="" />
                    </div>
                  )}
                </Slider>
              </div>
            ) : (
              ""
            )}
          </div>
          <section className="mt-6 flex justify-end gap-3">
            <div
              className="flex"
              style={{
                width: "700px",
              }}
            >
              <div
                className="avatar items-center"
                style={{
                  width: "3.5rem",
                }}
              >
                <div className="w-12 rounded-full">
                  {articleWriter.profileImage != null ? (
                    <img src={articleWriter.profileImage} />
                  ) : (
                    <FaCarrot
                      style={{
                        color: "#fc9d39",
                        fontSize: "3rem",
                        transform: "translate(0%,0%)",
                        border: "0.1px #fc9d39 solid",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                className="flex justify-center flex-col"
                style={{
                  width: "470px",
                }}
              >
                <div className="font-bold ">{jobArticle.jobUserid}</div>
                <div className="text-sm">{articleWriter.address}</div>
              </div>
            </div>
            <div
              style={{
                width: "200px",
              }}
            >
              <div className="flex gap-2">
                <div>
                  <div
                    className="font-bold flex justify-end p-1 "
                    style={{
                      color: "green",
                    }}
                  >
                    {articleWriter.temp}
                  </div>
                  <progress
                    className="flex progress progress-success w-32"
                    value="40"
                    max="100"
                  ></progress>
                </div>
                <div
                  className="flex"
                  style={{
                    color: "green",
                    fontSize: "1.75rem",
                  }}
                >
                  <BsFillEmojiSmileFill />
                </div>
              </div>
              <div
                className="text-sm flex justify-end"
                style={{
                  color: "gray",
                }}
              >
                매너온도
              </div>
            </div>
          </section>
          <br />
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div className="mt-6">
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.25rem",
                  }}
                >
                  {jobArticle.jobSubject}
                </div>
                {jobArticle.jobUserid === userid ? (
                  <span>
                    <span
                      className=""
                      style={{
                        position: "relative",
                      }}
                    >
                      {" "}
                      <button
                        onClick={() => {
                          onMenuToggle();
                        }}
                      >
                        <FiMoreHorizontal />
                      </button>
                      {menuToggle && (
                        <div
                          className="flex flex-col items-center"
                          style={{
                            position: "absolute",
                            width: "50px",
                            height: "50px",
                            left: "-22px",
                          }}
                        >
                          <button
                          // onClick={() => {
                          //   onEditToggle();
                          // }}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              onDeleteToggle();
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}{" "}
                    </span>
                    {deleteToggle && (
                      <div
                        className="p-2 rounded-md"
                        style={{
                          width: "250px",
                          height: "80px",
                          border: "1px gray solid",
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        <div className="flex justify-center">
                          게시물을 삭제하시겠어요?
                        </div>
                        <div className="flex justify-center gap-4 mt-3">
                          <button
                            className=" rounded-md font-bold"
                            style={{
                              padding: "5px",
                              color: "red",
                            }}
                            onClick={() => {
                              onRemoveJobs(num);
                              alert("삭제되었습니다.");
                              setMenuToggle();
                              onDeleteToggle(false);
                              jobsmove();
                            }}
                          >
                            삭제
                          </button>
                          <button
                            onClick={() => {
                              onDeleteToggle(false);
                            }}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="flex gap-2">
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {jobArticle.jobName}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {jobArticle.createDate}
                </div>
              </div>
            </div>
            <br />
          </section>
          <section>
            <div
              className="font-bold pb-2 mt-9"
              style={{
                fontSize: "1.2rem",
              }}
            >
              정보
            </div>

            <ul
              className="flex flex-col gap-6 mb-11"
              style={{
                fontSize: "1.3rem",
              }}
            >
              <li className="flex gap-4">
                <AiOutlineDollar className="mt-2" />
                <span>
                  {jobArticle.jobCategory} {jobArticle.jobPrice}원
                </span>
              </li>
              <li className="flex gap-4">
                <BiMap className="mt-2" />
                <span>{jobArticle.jobPlace}</span>
              </li>
              <li className="flex gap-4">
                <BsCalendarEvent className="mt-2" />
                <span>
                  {jobArticle.jobDay == "월화수목금"
                    ? "월~금"
                    : jobArticle.jobDay}{" "}
                  협의
                </span>
              </li>
              <li className="flex gap-4">
                <AiOutlineClockCircle className="mt-2" />
                <span>
                  {jobArticle.jobStartTime}~{jobArticle.jobEndTime}
                </span>
              </li>
            </ul>
          </section>
          <section>
            <div
              className="font-bold pb-1"
              style={{
                fontSize: "1.2rem",
              }}
            >
              상세 내용
            </div>
            <div
              style={{
                height: "200px",
              }}
            >
              {jobArticle.jobContent}
            </div>
          </section>
          <div
            className="flex gap-4 align-center font-bold mt-2 pb-11"
            style={{
              fontSize: "1rem",
              height: "30px",
            }}
          >
            <div>지원자 {jobArticle.jobVolunteer}</div>
            <div>관심 {jobArticle.jobLike}</div>
            <div>조회수 {jobArticle.jobCheck}</div>
          </div>

          <div>
            <div
              className="font-bold pt-2"
              style={{
                fontSize: "1.2rem",
                display: "inline",
              }}
            >
              <ReadMap searchPlace={jobArticle.jobPlace} />
            </div>
          </div>
          <section>
            <span style={{}}>{jobArticle.jobPlace}</span>
            <div
              className="py-2 flex gap-5 justify-end"
              style={{
                width: "800px",
              }}
            >
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  onJobsLike(num, sessionStorage.getItem("userid"));
                }}
              >
                {jobsLiked ? (
                  <FiHeart
                    style={{
                      color: "pink",
                    }}
                  />
                ) : (
                  <FiHeart />
                )}
              </button>

              <a
                href="#"
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                지원하기
              </a>
            </div>
          </section>

          <div>
            <div
              style={{
                height: "60px",
              }}
            >
              <div className="py-7 flex items-start">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  사는 곳 근처 알바
                </div>
              </div>
            </div>

            <br />
          </div>
          <div className="gap-2">
            <div>
              <ul className="grid grid-cols-2">
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                        marginTop: "25px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <JobsHeader />
        <div
          style={{
            width: "780px",
            margin: "0 auto",
          }}
        >
          <div className="mt-5 relative">
            {imgs[0] != undefined ? (
              <Slider {...settings}>
                {imgs[0] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[0]} alt="" />
                  </div>
                )}
                {imgs[1] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[1]} alt="" />
                  </div>
                )}{" "}
                {imgs[2] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[2]} alt="" />
                  </div>
                )}{" "}
                {imgs[3] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[3]} alt="" />
                  </div>
                )}{" "}
                {imgs[4] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[4]} alt="" />
                  </div>
                )}{" "}
                {imgs[5] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[5]} alt="" />
                  </div>
                )}{" "}
                {imgs[6] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[6]} alt="" />
                  </div>
                )}{" "}
                {imgs[7] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[7]} alt="" />
                  </div>
                )}{" "}
                {imgs[8] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[8]} alt="" />
                  </div>
                )}{" "}
                {imgs[9] == undefined ? (
                  ""
                ) : (
                  <div>
                    <img src={imgs[9]} alt="" />
                  </div>
                )}
              </Slider>
            ) : (
              ""
            )}
          </div>
          <section className="mt-6 flex justify-end gap-3">
            <div
              className="flex"
              style={{
                width: "700px",
              }}
            >
              <div
                className="avatar items-center"
                style={{
                  width: "3.5rem",
                }}
              >
                <div className="w-12 rounded-full">
                  {articleWriter.profileImage != null ? (
                    <img src={articleWriter.profileImage} />
                  ) : (
                    <FaCarrot
                      style={{
                        color: "#fc9d39",
                        fontSize: "3rem",
                        transform: "translate(0%,0%)",
                        border: "0.1px #fc9d39 solid",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                className="flex justify-center flex-col"
                style={{
                  width: "500px",
                }}
              >
                <div className="font-bold ">
                  {articleWriter.nickname == "닉네임 없음"
                    ? articleWriter.username
                    : articleWriter.nickname}
                </div>
                <div className="text-sm">{articleWriter.address}</div>
              </div>
            </div>
            <div
              style={{
                width: "200px",
              }}
            >
              <div className="flex gap-2">
                <div>
                  <div
                    className="font-bold flex justify-end p-1 "
                    style={{
                      color: "green",
                    }}
                  >
                    {articleWriter.temp}
                  </div>
                  <progress
                    className="flex progress progress-success w-32"
                    value="40"
                    max="100"
                  ></progress>
                </div>
                <div
                  className="flex"
                  style={{
                    color: "green",
                    fontSize: "1.75rem",
                  }}
                >
                  <BsFillEmojiSmileFill />
                </div>
              </div>
              <div
                className="text-sm flex justify-end"
                style={{
                  color: "gray",
                }}
              >
                매너온도
              </div>
            </div>
          </section>
          <br />
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div className="mt-6">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.25rem",
                }}
              >
                {jobArticle.jobSubject}
              </div>
              <div className="flex gap-2">
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {jobArticle.jobName}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "gray",
                  }}
                >
                  {jobArticle.createDate}
                </div>
              </div>
            </div>
            <br />
          </section>
          <section>
            <div
              className="font-bold pb-2 mt-9"
              style={{
                fontSize: "1.2rem",
              }}
            >
              정보
            </div>

            <ul
              className="flex flex-col gap-6 mb-11"
              style={{
                fontSize: "1.3rem",
              }}
            >
              <li className="flex gap-4">
                <AiOutlineDollar className="mt-2" />
                <span>
                  {jobArticle.jobCategory} {jobArticle.jobPrice}원
                </span>
              </li>
              <li className="flex gap-4">
                <BiMap className="mt-2" />
                <span>{jobArticle.jobPlace}</span>
              </li>
              <li className="flex gap-4">
                <BsCalendarEvent className="mt-2" />
                <span>
                  {jobArticle.jobDay == "월화수목금"
                    ? "월~금"
                    : jobArticle.jobDay}{" "}
                  협의
                </span>
              </li>
              <li className="flex gap-4">
                <AiOutlineClockCircle className="mt-2" />
                <span>
                  {" "}
                  {jobArticle.jobStartTime}~{jobArticle.jobEndTime}
                </span>
              </li>
            </ul>
          </section>
          <section>
            <div
              className="font-bold pb-1"
              style={{
                fontSize: "1.2rem",
              }}
            >
              상세 내용
            </div>
            <div
              style={{
                height: "350px",
                border: "1px gray solid",
              }}
            >
              {jobArticle.jobContent}
            </div>
          </section>
          <div
            className="flex gap-4 align-center font-bold mt-2 pb-11"
            style={{
              fontSize: "1rem",
              height: "30px",
            }}
          >
            <div>지원자 {jobArticle.jobVolunteer}</div>
            <div>관심 {jobArticle.jobLike}</div>
            <div>조회수 {jobArticle.jobCheck}</div>
          </div>

          {/* map */}
          <div>
            <div
              className="font-bold pt-2"
              style={{
                fontSize: "1.2rem",
              }}
            >
              주소
            </div>
            <div
              style={{
                height: "200px",
                border: "1px gray solid",
              }}
            ></div>
          </div>
          <section>
            <div className="py-2 flex gap-5 justify-end" style={{}}>
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  alert("로그인 후 사용할 수 있는 기능입니다.");
                }}
              >
                <FiHeart />
              </button>

              <button
                onClick={() => {
                  alert("로그인 후 사용할 수 있는 기능입니다.");
                }}
                className="rounded p-2 font-bold flex justify-center"
                style={{
                  width: "300px",
                  color: "white",
                  backgroundColor: "#fc9d39",
                }}
              >
                지원하기
              </button>
            </div>
          </section>

          <div>
            <div
              style={{
                height: "60px",
              }}
            >
              <div className="py-7 flex items-start">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  사는 곳 근처 알바
                </div>
              </div>
            </div>

            <br />
          </div>
          <div className="gap-2">
            <div>
              <ul className="grid grid-cols-2">
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li
                  className="flex  items-center gap-4"
                  style={{
                    height: "120px",
                  }}
                >
                  <a href="#" className="flex-col flex justify-center">
                    <div className="img1">
                      <img
                        src="https://dnvefa72aowie.cloudfront.net/jobs/article/14115542/1665623315426/job-post-2115755419.jpeg?q=95&s=1440x1440&t=inside"
                        alt=""
                      />
                    </div>
                  </a>
                  <a href="">
                    <div
                      style={{
                        height: "120px",
                        marginTop: "25px",
                      }}
                    >
                      <div style={{}}>
                        <span>주방이모 파트타임 오전 6시~오전 10시(4시간)</span>
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "#73777B",
                          paddingTop: "5px",
                        }}
                      >
                        <span>밥을짓는홍여사 . 부평동</span>
                      </div>
                      <div className="font-bold pt-1">
                        <span>시급 10,100</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
};

export default Jobspost;
