import { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import Header from "../layouts/Header";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import BoardHeader from "../layouts/BoardHeader";
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import JobsHeader from "../layouts/JobsHeader";
import RealtyHeader from "../layouts/RealtyHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/Search.css";
const SearchEmpty = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState(sessionStorage.getItem("type") || "product");
  const onSearch = (e) => {
    if (e.target.value.length > 10) {
      return;
    }
    setSearch(e.target.value);
  };
  const onMove = () => {
    navigate(`/search/${search}`);
  };

  if (type == "jobs") {
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
                value={search}
                onChange={onSearch}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                autoFocus
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onMove();
                  }
                }}
              />
              <div>"" 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  border: "1px #ffa445 solid",

                  padding: "5px 10px",
                }}
                onClick={() => {
                  //   onSearch("product");
                  setType("product");
                  sessionStorage.setItem("type", "product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  padding: "6px 11px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  //   onSearch("jobs");
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
                  //   onSearch("realty");
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
                  //   onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          "검색 결과가 없습니다."
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
                value={search}
                onChange={onSearch}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                autoFocus
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onMove();
                  }
                }}
              />
              <div>"" 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  //   onSearch("product");
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
                  //   onSearch("jobs");
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  padding: "6px 11px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  //   onSearch("realty");
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
                  //   onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          "검색 결과가 없습니다."
        </div>
        <Footer />
      </div>
    );
  } else if (type == "board") {
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
                value={search}
                onChange={onSearch}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                autoFocus
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onMove();
                  }
                }}
              />
              <div>"" 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  //   onSearch("product");
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
                  //   onSearch("jobs");
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
                  //   onSearch("realty");
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
                  //   onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          "검색 결과가 없습니다."
        </div>
        <Footer />
      </div>
    );
  } else {
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
                value={search}
                onChange={onSearch}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                autoFocus
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    onMove();
                  }
                }}
              />
              <div>"" 검색 결과입니다.</div>
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
                  //   onSearch("product");
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
                  //   onSearch("jobs");
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
                  //   onSearch("realty");
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
                  //   onSearch("board");
                  setType("board");
                  sessionStorage.setItem("type", "board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          "검색 결과가 없습니다."
        </div>
        <Footer />
      </div>
    );
  }
};

export default SearchEmpty;
