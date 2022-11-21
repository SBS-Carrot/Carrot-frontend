import React from "react";
import JobsHeader from "../layouts/JobsHeader";
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import "../styles/Jobs.css";
import Footer from "../layouts/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { FaCarrot } from "react-icons/fa";
import JobsPaging from "./JobsPaging";
const AllJobs = ({ logined, setLogined }) => {
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const navigate = useNavigate();
  const { num } = useParams();
  const [Jobs, setJobs] = useState([]);
  const { Router } = useParams();
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(6);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

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

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = await axios({
          url: `http://localhost:8083/jobs`,
          method: "GET",
        });
        onJobs(data.data);
        setCurrentPosts(data.data.slice(0, 6));
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);

  useEffect(() => {
    setCurrentPosts(Jobs.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);

  if (logined) {
    return (
      <div>
        <LoginedJobsHeader setLogined={setLogined} />
        <div
          style={{
            backgroundColor: "orange",
          }}
        >
          <div
            style={{
              width: "1000px",
              margin: "0 auto",
              height: "500px",
            }}
          >
            <div
              style={{
                width: "600px",
                margin: "0 auto",
                paddingTop: "65px",
              }}
            >
              <h1
                style={{
                  fontSize: "2.1rem",
                  color: "white",
                  fontWeight: "bolder",
                  width: "300px",
                  marginTop: "-40px",
                  marginLeft: "-20px",
                }}
              >
                우리 동네에서 찾는 당근알바
              </h1>
              <img
                src="https://www.daangn.com/_next/static/media/jobs_hero_daangn_3x.8b217530.png"
                alt=""
                style={{
                  marginTop: "-58px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div className="flex gap-24">
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                paddingTop: "5rem",
                paddingLeft: "5rem",

                whiteSpace: "nowrap",
              }}
            >
              모든 당근알바
            </h1>

            <span
              href={`/jobsWrite`}
              className="flex items-end justify-end "
              style={{
                width: "60%",
              }}
            >
              <a
                href={`/jobsWrite`}
                className="rounded-md p-2"
                style={{
                  backgroundColor: "#fc9d39",
                  color: "white",
                }}
              >
                {" "}
                알바 구하기
              </a>
            </span>
          </div>
          <h2
            style={{
              display: "inline",

              fontSize: "1.5rem",
              paddingLeft: "5rem",
              whiteSpace: "nowrap",
              fontWeight: "bolder",
            }}
          >
            <a href="/jobs">＞ 인기알바 보러가기 </a>
          </h2>
          <ul
            style={{
              paddingTop: "3rem",
              paddingLeft: "5rem",
            }}
            className="grid grid-cols-2 jobBox"
          >
            {currentPosts.map((job, index) => (
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
                          className="JobNameBox"
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
          <div
            style={{
              backgroundColor: "#e6f3ff",
              height: "150px",
              width: "880px",
              margin: "0 auto",
              borderRadius: "15px",

              marginTop: "20px",
              position: "relative",
            }}
          >
            <a href="#">
              <div className="">
                <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    width: "270px",
                    paddingTop: "2rem",
                    paddingLeft: "2rem",
                  }}
                >
                  이웃의 일손을 빠르게
                </h1>
                <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    width: "450px",
                    paddingLeft: "2rem",
                  }}
                >
                  당근알바에서 바로 찾아보세요!
                </h1>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "80%",
                  top: "3%",
                }}
              >
                <img src="https://i.postimg.cc/HkQh8THv/123.png" alt="" />
              </div>
            </a>
          </div>
          <JobsPaging
            totalCount={Jobs.length}
            page={page}
            postPerPage={postPerPage}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
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
            backgroundColor: "orange",
          }}
        >
          <div
            style={{
              width: "1000px",
              margin: "0 auto",
              height: "500px",
            }}
          >
            <div
              style={{
                width: "600px",
                margin: "0 auto",
                paddingTop: "65px",
              }}
            >
              <h1
                style={{
                  fontSize: "2.1rem",
                  color: "white",
                  fontWeight: "bolder",
                  width: "300px",
                  marginTop: "-40px",
                  marginLeft: "-20px",
                }}
              >
                우리 동네에서 찾는 당근알바
              </h1>
              <img
                src="https://www.daangn.com/_next/static/media/jobs_hero_daangn_3x.8b217530.png"
                alt=""
                style={{
                  marginTop: "-58px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div className="flex gap-24">
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                paddingTop: "5rem",
                paddingLeft: "5rem",

                whiteSpace: "nowrap",
              }}
            >
              모든 당근알바
            </h1>

            <span
              href={`/jobsWrite`}
              className="flex items-end justify-end "
              style={{
                width: "60%",
              }}
            >
              <a
                href={`/jobsWrite`}
                className="rounded-md p-2"
                style={{
                  backgroundColor: "#fc9d39",
                  color: "white",
                }}
              >
                {" "}
                알바 구하기
              </a>
            </span>
          </div>
          <h2
            style={{
              display: "inline",

              fontSize: "1.5rem",
              paddingLeft: "5rem",
              whiteSpace: "nowrap",
              fontWeight: "bolder",
            }}
          >
            <a href="/jobs">＞ 인기알바 보러가기 </a>
          </h2>
          <ul
            style={{
              paddingTop: "3rem",
              paddingLeft: "5rem",
            }}
            className="grid grid-cols-2 jobBox"
          >
            {currentPosts.map((job, index) => (
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
          <div
            style={{
              backgroundColor: "#e6f3ff",
              height: "150px",
              width: "880px",
              margin: "0 auto",
              borderRadius: "15px",

              marginTop: "20px",
              position: "relative",
            }}
          >
            <a href="#">
              <div className="">
                <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    width: "270px",
                    paddingTop: "2rem",
                    paddingLeft: "2rem",
                  }}
                >
                  이웃의 일손을 빠르게
                </h1>
                <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    width: "450px",
                    paddingLeft: "2rem",
                  }}
                >
                  당근알바에서 바로 찾아보세요!
                </h1>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "80%",
                  top: "3%",
                }}
              >
                <img src="https://i.postimg.cc/HkQh8THv/123.png" alt="" />
              </div>
            </a>
          </div>
          <JobsPaging
            totalCount={Jobs.length}
            page={page}
            postPerPage={postPerPage}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
        </div>
        <Footer />
      </div>
    );
  }
};

export default AllJobs;
