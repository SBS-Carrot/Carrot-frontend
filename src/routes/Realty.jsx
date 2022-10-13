import React from "react";
import Header from "../layouts/Header";
import "../styles/Realty.css";

const Realty = () => {
  return (
    <div>
      <Header />
      <section>
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            className="font-bold"
            style={{
              fontSize: "1.5rem",
              paddingTop: "10%",
            }}
          >
            인기 부동산 직거래 게시글
          </div>
          <div>
            <ul className="grid grid-cols-2">
              <li>
                <a href="#">
                  <div className="img1">
                    <img
                      src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                      alt=""
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Realty;
