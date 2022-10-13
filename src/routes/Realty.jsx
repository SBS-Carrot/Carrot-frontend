import React from "react";
import Header from "../layouts/Header";
import "../styles/Realty.css";
import { AiOutlineRight } from "react-icons/ai";

const Realty = () => {
  return (
    <div>
      <Header />
      <section>
        <div
          style={{
            width: "800px",
            margin: "0 auto",
          }}
        >
          <div
            className="font-bold"
            style={{
              fontSize: "1.5rem",
              paddingTop: "5%",
            }}
          >
            인기 부동산 직거래 게시글
          </div>
          <div>
            <ul className="grid grid-cols-2">
              <li className="flex  items-center gap-4">
                <a href="#" className="flex-col flex justify-center">
                  <div className="img1">
                    <img
                      src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                      alt=""
                    />
                  </div>
                </a>
                <a
                  href="#"
                  className="img1"
                  style={{
                    width: "350px",
                  }}
                >
                  <div>
                    <a href="#">상가 150만원/30만원 - 1층</a>
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "#73777B",
                    }}
                  >
                    <a href="#">동인동2가</a>
                  </div>
                  <div className="font-bold">
                    <a href="#">월세 150 / 30</a>
                  </div>
                </a>
              </li>
              <li className="flex  items-center gap-4">
                <a href="#" className="flex-col flex justify-center">
                  <div className="img1">
                    <img
                      src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                      alt=""
                    />
                  </div>
                </a>
                <a
                  href="#"
                  className="img1"
                  style={{
                    width: "350px",
                  }}
                >
                  <div>
                    <a href="#">상가 150만원/30만원 - 1층</a>
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "#73777B",
                    }}
                  >
                    <a href="#">동인동2가</a>
                  </div>
                  <div className="font-bold">
                    <a href="#">월세 150 / 30</a>
                  </div>
                </a>
              </li>
              <li className="flex  items-center gap-4">
                <a href="#" className="flex-col flex justify-center">
                  <div className="img1">
                    <img
                      src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                      alt=""
                    />
                  </div>
                </a>
                <a
                  href="#"
                  className="img1"
                  style={{
                    width: "350px",
                  }}
                >
                  <div>
                    <a href="#">상가 150만원/30만원 - 1층</a>
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "#73777B",
                    }}
                  >
                    <a href="#">동인동2가</a>
                  </div>
                  <div className="font-bold">
                    <a href="#">월세 150 / 30</a>
                  </div>
                </a>
              </li>
              <li className="flex  items-center gap-4">
                <a href="#" className="flex-col flex justify-center">
                  <div className="img1">
                    <img
                      src="https://dnvefa72aowie.cloudfront.net/realty/realty/articles/e31df6ca67b7e6390cb4e019f9a614ec44caafec9956f6b46eb2392846213809_1661999723295.jpeg?q=95&s=1440x1440&t=inside"
                      alt=""
                    />
                  </div>
                </a>
                <a
                  href="#"
                  className="img1"
                  style={{
                    width: "350px",
                  }}
                >
                  <div>
                    <a href="#">상가 150만원/30만원 - 1층</a>
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "#73777B",
                    }}
                  >
                    <a href="#">동인동2가</a>
                  </div>
                  <div className="font-bold">
                    <a href="#">월세 150 / 30</a>
                  </div>
                </a>
              </li>
            </ul>
            <div
              className="rounded-xl font-bold p-8"
              style={{
                marginTop: "8%",
                fontSize: "1.25rem",

                backgroundColor: "#EEEEEE",
              }}
            >
              <div>
                <a href="#">복비 없이 투명한 투명한 부동산 직거래</a>
              </div>
              <div>
                <a href="#">당근마켓 내 근처 탭에서 바로 찾아보세요!</a>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Realty;
