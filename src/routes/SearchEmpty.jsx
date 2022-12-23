import { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchEmpty = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    if (e.target.value.length > 10) {
      return;
    }
    setSearch(e.target.value);
  };
  const onMove = () => {
    navigate(`/search/${search}`);
  };
  return (
    <div>
      <LoginedHeader logined={logined} setLogined={setLogined} />
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
                //   setType("product");
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
                //   setType("jobs");
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
                //   setType("realty");
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
                //   setType("board");
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
};

export default SearchEmpty;
