import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import "../styles/Home.css";
import { AiFillHome, AiFillFileText, AiFillMessage } from "react-icons/ai";

const Home = () => {
  const logined = useRecoilValue(authenticatedState);
  return (
    <div>
      <Header />
      <div className="background1 flex items-center">
        <div
          className="flex"
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div className="flex justify-center flex-col">
            <div
              className="font-bold"
              style={{
                fontSize: "2.5rem",
              }}
            >
              <div
                style={{
                  width: "300px",
                }}
              >
                당신 근처의
              </div>
              <div>당근마켓</div>
            </div>
            <div
              className="mt-8"
              style={{
                width: "330px",
              }}
            >
              <div>중고 거래부터 동네 정보까지, 이웃과 함께해</div>
              <div>가깝고 따듯한 당신의 근처를 만들어요.</div>
            </div>
          </div>
          <div>
            <div className="firstimg">
              <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <section className="flex items-center">
        <div
          className="flex"
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div className="secondimg">
            <img
              src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp"
              alt=""
            />
          </div>
          <div className="flex justify-center flex-col">
            <div
              className="font-bold"
              style={{
                width: "400px",
                fontSize: "2.5rem",
              }}
            >
              <div>우리 동네</div>
              <div>중고 직거래 마켓</div>
            </div>
            <div
              className="my-9"
              style={{
                width: "420px",
              }}
            >
              동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
            </div>
            <div className="font-bold flex justify-center">
              <div
                className="mr-8 bg-gray-200"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
              >
                <a href="">인기매물 보기</a>
              </div>
              <div
                className="mr-8 bg-gray-200"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
              >
                <a href="">믿을 수 있는 중고거래</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="background2 flex  ">
        <div
          className="flex "
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            className="flex justify-center flex-col pr-10"
            style={{
              width: "450px",
            }}
          >
            <div
              className="font-bold"
              style={{
                fontSize: "2.3rem",
              }}
            >
              <div>이웃과 함께하는</div>
              <div>동네생활</div>
            </div>

            <h1 className="py-5">
              우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
            </h1>
            <ul
              className="flex mt-11 gap-8"
              style={{
                fontSize: "0.75rem",
                width: "480px",
              }}
            >
              <li>
                <div
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  <AiFillHome />
                </div>
                <div className="font-bold mb-2 mt-3">우리동네질문</div>
                <span>궁금한 게 있을 땐 이웃에게 물어보세요.</span>
              </li>
              <li>
                <div
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  <AiFillFileText />
                </div>
                <div className="font-bold mb-2 mt-3">우리분실센터</div>
                <span>무언가를 잃어버렸을 때, 함께 찾을 수 있어요.</span>
              </li>
              <li>
                <div
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  <AiFillMessage />
                </div>
                <div className="font-bold mb-2 mt-3">동네모임</div>
                <span>관심사가 비슷한 이웃과 온오프라인으로 만나요.</span>
              </li>
            </ul>
          </div>
          <div className="thirdimg relative">
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: "10%",
                left: "10%",
              }}
            >
              <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-91a2286453bdf82dea16a7f0ee4ceb9dd325eae0e5a2a9967ba72c344bf8f2fc.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

//https://goddaehee.tistory.com/274 Branch 기초생성 및 이동
//https://goddaehee.tistory.com/275?category=381481 Branch 병합

//branch - master, test 두종류.
//master에서 작업 후 git add, commit ,push.
//git switch test해서 test branch로 이동 후 git pull origin master
//test branch에서 작업 후 git add, commit, git push origin test
//git switch master해서 master로 이동, git pull origin test.
