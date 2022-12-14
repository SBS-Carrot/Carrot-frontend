import Footer from "../layouts/Footer";
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JobsApplyPaging from "./JobsApplyPaging";

const JobsApplyView = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const moveHome = () => {
    navigate("/");
    window.alert("게시글 작성자만 가능한 기능입니다.");
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(4);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let now = new Date();
  const year = now.getFullYear();

  const { num } = useParams();
  const [apply, setApply] = useState([]);

  const onApply = (data) => {
    setApply(data);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:8083/Jobs/${num}`,
          method: "get",
        });
        if (data.data.jobUserid != sessionStorage.getItem("userid")) {
          moveHome();
        }
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getJobApply`,
          method: "Get",
          params: { num },
        });
        onApply(data.data);
        setCurrentPosts(data.data.reverse().slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setCurrentPosts(apply.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);
  return (
    <div>
      <LoginedJobsHeader logined={logined} setLogined={setLogined} />
      <section>
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bolder",
          }}
        >
          알바 공고에 대한 지원자 보기
        </h1>
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          <a href={`/jobspost/${num}`}>해당 게시글 보기</a>
        </h2>
        <ul
          style={{
            border: "1px #ffa445 solid",
            borderRadius: "15px",
            width: "1000px",
            margin: "0 auto",
            height: "600px",
            paddingTop: "10px",
          }}
        >
          {currentPosts.map((app, index) => (
            <li
              key={index}
              style={{
                width: "100%",
                height: "150px",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: "150px",
                    height: "130px",
                  }}
                >
                  {app.imgURL != null ? (
                    <img
                      src={app.imgURL}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "fill",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "1px black solid",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span>사진이 없어요!</span>
                    </div>
                  )}
                </div>
                <div
                  className="gap-1"
                  style={{
                    paddingLeft: "10px",
                    paddingTop: "15px",
                  }}
                >
                  <div>이름 : {app.name}</div>
                  <div>연락처 : {app.phoneValue}</div>
                  <div>나이 : 만 {year - app.year}세</div>
                  <div>성별 : {app.gender}</div>
                </div>
                <div
                  style={{
                    paddingLeft: "15px",
                    paddingTop: "15px",
                    width: "66%",
                    maxHeight: "190px",
                  }}
                >
                  자기소개 : {app.introduce}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <JobsApplyPaging
          totalCount={apply.length}
          page={page}
          postPerPage={postPerPage}
          pageRangeDisplayed={5}
          handlePageChange={handlePageChange}
        />
      </section>
      <Footer />
    </div>
  );
};

export default JobsApplyView;
