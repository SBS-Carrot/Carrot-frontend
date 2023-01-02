import React from "react";
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import Footer from "../layouts/Footer";
import { FaCarrot } from "react-icons/fa";
import JobsPaging from "./JobsPaging";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { useState, useEffect } from "react";

const JobsSearch = ({ logined, setLogined }) => {
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const navigate = useNavigate();
  const [Jobs, setJobs] = useState([]);

  //검색
  const { search } = useParams();
  const [search1, setSearch1] = useState(search); //첫번째 검색 저장
  const [search2, setSearch2] = useState(search);
  const onSearch1 = (e) => {
    setSearch1(e.target.value);
  };
  const [jobsSearch, setJobsSearch] = useState([]);

  const onJobsSearch = (data) => {
    const datas = data.reverse();
    setJobsSearch((prev) => datas);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}:8083/jobssearch/${search}`,
          method: "GET",
        });
        onJobsSearch(data.data);
        console.log(data.data);
        setCurrentPosts(data.data.slice(0, 6));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const Search = async (job) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}:8083/jobssearch/${job}`,
        method: "GET",
      });
      setSearch2(job);

      onJobsSearch(data.data);
      setCurrentPosts(data.data.slice(0, 6));
    } catch (e) {
      console.log(e);
    }
  };

  //페이징
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(6);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const moveJobs = async (id) => {
    try {
      await axios({
        url: `${BACKEND_URL}:8083/jobsCheck/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/jobspost/${id}`);
  };

  useEffect(() => {
    setCurrentPosts(Jobs.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);

  return (
    <div>
      <LoginedJobsHeader logined={logined} setLogined={setLogined} />
      <div
        style={{
          width: "1000px",
          margin: "0 auto",
        }}
      >
        <div className="mt-8 flex items-center gap-1 justify-end">
          {" "}
          <AiOutlineSearch
            style={{
              fontSize: "1.4rem",
            }}
          />
          <div>
            <input
              type="text"
              placeholder="동네를 검색해보세요."
              value={search1}
              onChange={onSearch1}
              style={{
                border: "1px #d5d5d5 solid",
                width: "265px",
                height: "30px",
              }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  Search(search1);
                }
              }}
            />
          </div>
        </div>

        <div className="flex gap-24">
          {search == search2 ? (
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                paddingLeft: "5rem",
                whiteSpace: "nowrap",
              }}
            >
              "{search}" 당근알바
            </h1>
          ) : (
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                paddingLeft: "5rem",
                whiteSpace: "nowrap",
              }}
            >
              "{search2}" 당근알바
            </h1>
          )}

          <span
            href={`/jobsWrite`}
            className="flex items-end justify-end "
            style={{
              width: "65%",
            }}
          >
            <a
              href={`/jobsWrite`}
              className="rounded-md"
              style={{
                padding: "10px",
                backgroundColor: "#fc9d39",
                color: "white",
              }}
            >
              {" "}
              알바 구하기
            </a>
          </span>
        </div>

        <ul
          style={{
            paddingTop: "1rem",
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
};

export default JobsSearch;
