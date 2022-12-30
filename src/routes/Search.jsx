import { useState, useEffect } from "react";
import Footer from "../layouts/Footer";
import LoginedHeader from "../layouts/LoginedHeader";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaCarrot } from "react-icons/fa";
import ProductPaging from "../components/ProductPaging";
import RealtyPaging from "../components/RealtyPaging";
import JobsPaging from "../components/JobsPaging";
import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillLike, AiOutlineCaretRight } from "react-icons/ai";
import { FiMessageCircle, FiCheckCircle } from "react-icons/fi";
import Header from "../layouts/Header";
import JobsHeader from "../layouts/JobsHeader";
import RealtyHeader from "../layouts/RealtyHeader";
import BoardHeader from "../layouts/BoardHeader";
const Search = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const { search } = useParams(); //초기검색어
  const [searchValue, setSearchValue] = useState(search); //검색어
  const [search2, setSearch2] = useState(search);

  //검색어 수정
  const onSearchChange1 = (data) => {
    if (data.length > 10) {
      return;
    }
    setSearchValue((prev) => data);
    setSearch2(data);
  };

  useEffect(() => {
    move(searchValue);
  }, [searchValue]);

  useEffect(() => {
    onSearchChange1(search);
    onSearch(type);
  }, [search]);

  const onSearchValueChange = (e) => {
    if (e.target.value.length > 10) {
      return;
    }

    setSearchValue(e.target.value);
  }; //검색어 수정
  const move = (e) => {
    navigate(`/search/${e}`);
  };
  useEffect(() => {
    move(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue((prev) => search);
  }, [search]);

  //최초 데이터 불러오기
  useEffect(() => {
    onSearch(type);
  }, []);
  const [type, setType] = useState(sessionStorage.getItem("type") || "product");
  //타입 변경

  //여기부터 Product
  const [searchList, setSearchList] = useState([]);
  const onSearchChange = (e) => {
    setSearchList(e);
  };
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(8);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  useEffect(() => {
    setCurrentPosts(searchList.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);

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
  const [jsearchList, setJSearchList] = useState([]);
  const onJSearchChange = (e) => {
    setJSearchList(e);
  };
  const [jpage, setJPage] = useState(1);
  const [jcurrentPosts, setJCurrentPosts] = useState([]);
  const jhandlePageChange = (page) => {
    setJPage(page);
  };
  const [jpostPerPage] = useState(6);
  const jindexOfLastPost = jpage * jpostPerPage;
  const jindexOfFirstPost = jindexOfLastPost - jpostPerPage;
  useEffect(() => {
    setJCurrentPosts(jsearchList.slice(jindexOfFirstPost, jindexOfLastPost));
  }, [jindexOfFirstPost, jindexOfLastPost, jpage]);

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

  //여기부터 Realty
  const [rsearchList, setRSearchList] = useState([]);
  const onRSearchChange = (e) => {
    setRSearchList(e);
  };
  const [rpage, setRPage] = useState(1);
  const [rcurrentPosts, setRCurrentPosts] = useState([]);
  const rhandlePageChange = (page) => {
    setRPage(page);
  };
  const [rpostPerPage] = useState(6);
  const rindexOfLastPost = rpage * rpostPerPage;
  const rindexOfFirstPost = rindexOfLastPost - rpostPerPage;
  useEffect(() => {
    setRCurrentPosts(rsearchList.slice(rindexOfFirstPost, rindexOfLastPost));
  }, [rindexOfFirstPost, rindexOfLastPost, rpage]);

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

  //여기부터 Board
  const [bsearchList, setBSearchList] = useState([]);
  const [board, setBoard] = useState([]);
  const onBSearchChange = (e) => {
    setBSearchList(e);
  };
  const movePost = async (id, writer) => {
    try {
      if (sessionStorage.getItem("userid") == writer) {
        navigate(`/boardpost/${id}`);
      } else {
        await axios({
          url: `http://localhost:8083/boardView/${id}`,
          method: "POST",
        });
        navigate(`/boardpost/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onBoard = (data) => {
    setBoard(data.reverse().slice(0, 7));
  };

  //게시판 스크롤
  const [target, setTarget] = useState(null); // 관찰대상 target
  const [isLoaded, setIsLoaded] = useState(false); // Load 중인가를 판별하는 boolean
  // 요청이 여러번 가는 것을 방지하기 위해서
  const [stop, setStop] = useState(false); // 마지막 데이터까지 다 불러온 경우 더이상 요청을 보내지 않기 위해서
  // 마지막 부분까지 가버릴 때 계속 요청을 보내는 것 방지
  const [num, setNum] = useState(1);
  let observer;
  useEffect(() => {
    if (target && !stop) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target, isLoaded]);

  // isLoaded가 변할 때 실행
  useEffect(() => {
    // isLoaded가 true일 때 + 마지막 페이지가 아닌 경우 = 요청보내기
    if (isLoaded && !stop) {
      //api 카페만 몇개 불러오는지에 대한 주소 새로 만들어야함.
      //초기값 7개 , 스크롤 내릴 때마다 그 다음 7개에 대한 인덱스만 가져와야함
      axios.get(`http://localhost:8083/boards?num=${num}`).then((res) => {
        // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
        setBoard((board) => board.concat(res.data));
        setNum(num + 1);
        // 다음 요청 전까지 요청 그만 보내도록 false로 변경
        setIsLoaded(false);

        if (res.data.length == 0) {
          // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면 -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
          setStop(true);
        }
      });
    }
  }, [isLoaded]);

  const getMoreItem = () => {
    // 데이터를 받아오도록 true 로 변경
    setIsLoaded(true);
  };

  // callback
  const onIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !isLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target);
      // 데이터 불러오기
      getMoreItem();
      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target);
    }
  };
  // 게시판 스크롤 끝

  //타입에 따른 검색결과 요청하기
  const onSearch = async (type) => {
    try {
      if (type == "product") {
        const data = await axios({
          url: `http://localhost:8083/searchProduct`,
          method: "POST",
          data: {
            searchWord: search,
          },
        });

        onSearchChange(data.data);
        setCurrentPosts(data.data.slice(0, 8));
      } else if (type == "realty") {
        const data = await axios({
          url: `http://localhost:8083/searchRealty`,
          method: "POST",
          data: {
            searchWord: search,
          },
        });

        onRSearchChange(data.data);
        setRCurrentPosts(data.data.slice(0, 6));
      } else if (type == "jobs") {
        const data = await axios({
          url: `http://localhost:8083/searchJobs`,
          method: "POST",
          data: {
            searchWord: search,
          },
        });

        onJSearchChange(data.data);
        setJCurrentPosts(data.data.slice(0, 6));
      } else if (type == "board") {
        const data = await axios({
          url: `http://localhost:8083/searchBoard`,
          method: "POST",
          data: {
            searchWord: search,
          },
        });
        onBSearchChange(data.data);
        onBoard(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (type == "product") {
    return (
      <div>
        {logined == "true" ? (
          <LoginedHeader logined={logined} setLogined={setLogined} />
        ) : (
          <Header logined={logined} setLogined={setLogined} />
        )}

        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            border: "1px #ffb412 solid",
            height: "780px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="" style={{}}>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="물품이나 동네를 검색해 보세요"
                value={searchValue}
                onChange={onSearchValueChange}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    setType("product");
                    onSearch("product");
                  }
                }}
                autoFocus
              />
              <div>"{search2}" 중고거래 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  padding: "6px 11px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  onSearch("product");
                  setType("product");
                  sessionStorage.setItem("type", "product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("jobs");
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("realty");
                  setType("realty");
                  sessionStorage.setItem("type", "realty");
                }}
              >
                부동산
              </button>
              <button
                className="boardToggleButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  borderRight: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          {searchList.length == 0 ? (
            "검색 결과가 없습니다."
          ) : (
            <div>
              <ul
                className="grid grid-cols-4"
                style={{
                  height: "680px",
                }}
              >
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

              <ProductPaging
                totalCount={searchList.length}
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={5}
                handlePageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  } else if (type == "jobs") {
    return (
      <div>
        {logined == "true" ? (
          <LoginedJobsHeader logined={logined} setLogined={setLogined} />
        ) : (
          <JobsHeader logined={logined} setLogined={setLogined} />
        )}

        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            border: "1px #ffb412 solid",
            height: "780px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="" style={{}}>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="물품이나 동네를 검색해 보세요"
                value={searchValue}
                onChange={onSearchValueChange}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onSearch("jobs");
                  }
                }}
              />
              <div>"{search2}" 알바 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  padding: "5px 10px",
                  border: "1px #ffa445 solid",
                }}
                onClick={() => {
                  onSearch("product");
                  setType("product");
                  sessionStorage.setItem("type", "product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  padding: "5px 10px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  onSearch("jobs");
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("realty");
                  setType("realty");
                  sessionStorage.setItem("type", "realty");
                }}
              >
                부동산
              </button>
              <button
                className="boardToggleButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  borderRight: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          {jsearchList.length == 0 ? (
            "검색 결과가 없습니다."
          ) : (
            <div>
              <ul
                style={{
                  paddingTop: "1rem",
                  height: "580px",
                }}
                className="grid grid-cols-2 jobBox"
              >
                {jcurrentPosts.map((job, index) => (
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

              <JobsPaging
                totalCount={jsearchList.length}
                page={jpage}
                postPerPage={jpostPerPage}
                pageRangeDisplayed={5}
                handlePageChange={jhandlePageChange}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  } else if (type == "realty") {
    return (
      <div>
        {logined == "true" ? (
          <LoginedRealtyHeader logined={logined} setLogined={setLogined} />
        ) : (
          <RealtyHeader logined={logined} setLogined={setLogined} />
        )}
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            border: "1px #ffb412 solid",
            height: "780px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="" style={{}}>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="물품이나 동네를 검색해 보세요"
                value={searchValue}
                onChange={onSearchValueChange}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onSearch("realty");
                  }
                }}
              />
              <div>"{search2}" 부동산 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  padding: "5px 10px",
                  border: "1px #ffa445 solid",
                }}
                onClick={() => {
                  onSearch("product");
                  setType("product");
                  sessionStorage.setItem("type", "product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("jobs");
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  onSearch("realty");
                  setType("realty");
                  sessionStorage.setItem("type", "realty");
                }}
              >
                부동산
              </button>
              <button
                className="boardToggleButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  borderRight: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
            {rsearchList.length == 0 ? (
              "검색 결과가 없습니다."
            ) : (
              <div>
                <ul
                  className="grid grid-cols-2 gap-5"
                  style={{
                    height: "480px",
                  }}
                >
                  {rcurrentPosts.map((realty, index) => (
                    <li
                      key={index}
                      style={{
                        width: "360px",
                        height: "120px",
                        marginTop: "20px",
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
                              minWidth: "120px",
                              maxWidth: "120px",
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
                                  paddingRight: "3px",
                                }}
                              >
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length >= 7 ? (
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
                                          width: "25px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                          marginLeft: "3px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                        {realty.realtySalePrice.charAt(2)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(3) !=
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
                                          width: "15px",
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
                                  {realty.realtyDealing}
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
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length >= 7 ? (
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
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
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
                                  {realty.realtyDealing}
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
                <div>
                  <RealtyPaging
                    totalCount={rsearchList.length}
                    page={page}
                    postPerPage={rpostPerPage}
                    pageRangeDisplayed={6}
                    handlePageChange={rhandlePageChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        {logined == "true" ? (
          <LoginedBoardHeader logined={logined} setLogined={setLogined} />
        ) : (
          <BoardHeader logined={logined} setLogined={setLogined} />
        )}
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            border: "1px #ffb412 solid",

            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="" style={{}}>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="물품이나 동네를 검색해 보세요"
                value={searchValue}
                onChange={onSearchValueChange}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onSearch("board");
                  }
                }}
              />
              <div>"{search2}" 게시판 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  padding: "5px 10px",
                  border: "1px #ffa445 solid",
                }}
                onClick={() => {
                  onSearch("product");
                  setType("product");
                  sessionStorage.setItem("type", "product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("jobs");
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  onSearch("realty");
                  setType("realty");
                  sessionStorage.setItem("type", "realty");
                }}
              >
                부동산
              </button>
              <button
                className="boardToggleButton"
                style={{
                  padding: "6px 11px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          {bsearchList.length == 0 ? (
            "검색 결과가 없습니다."
          ) : (
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <ul>
                {board.map((que, index) => (
                  <li key={index}>
                    <div
                      className=" pt-2 mb-2"
                      style={{
                        border: "1px rgb(209, 209, 209) solid",
                      }}
                    >
                      <div className="p-3">
                        <div className="pb-3">
                          <span
                            className="rounded-lg p-1"
                            style={{
                              backgroundColor: "rgb(209, 209, 209)",
                            }}
                          >
                            {que.boardCategory}
                          </span>
                        </div>

                        <div
                          className="flex gap-1"
                          onClick={() => {
                            movePost(que.boardId);
                          }}
                          style={{
                            minHeight: "40px",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          <span
                            className="font-bold"
                            style={{
                              color: "orange",
                            }}
                          >
                            Q
                          </span>
                          <div>{que.boardContent}</div>
                        </div>

                        <div
                          className="mt-1 flex justify-between"
                          style={{
                            color: "gray",
                          }}
                        >
                          <span>{que.boardUserid}</span>
                          <span>{que.createDate}</span>
                        </div>
                      </div>
                      <hr />
                      <div className="flex p-2 justify-between">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1">
                            <span>
                              <FiCheckCircle />
                            </span>
                            <span>궁금해요</span>
                          </button>
                          <button
                            className="flex items-center gap-1"
                            onClick={() => {
                              movePost(que.boardId);
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.2rem",
                              }}
                            >
                              <FiMessageCircle />
                            </span>
                            {que.boardChattingNum > 0 ? (
                              <div>
                                <span>댓글</span>
                                <span> {que.boardChattingNum}</span>
                              </div>
                            ) : (
                              <span> 댓글쓰기</span>
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className="rounded-full"
                            style={{
                              color: "white",
                              padding: "2px",
                              backgroundColor: "orange",
                            }}
                          >
                            <AiFillLike />
                          </span>
                          {que.boardAgree}
                        </div>
                      </div>
                      <div ref={setTarget} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
};

export default Search;
