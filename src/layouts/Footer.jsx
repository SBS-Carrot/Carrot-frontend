import React from "react";
import { GrApple } from "react-icons/gr";
import { FaGooglePlay } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsFacebook, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div
      style={{
        height: "500px",
        marginTop: "20px",
      }}
    >
      <hr />
      <footer
        className="p-10 flex gap-12"
        style={{
          width: "850px",
          height: "250px",
          margin: "0 auto",
        }}
      >
        <ul
          style={{
            width: "390px",
            display: "flex",
          }}
        >
          <li
            className="flex "
            style={{
              width: "130px",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <a href="#" className=" link-hover">
              중고거래
            </a>
            <a href="#" className=" link-hover">
              동네가게
            </a>
            <a href="#" className=" link-hover">
              당근알바
            </a>
          </li>
          <li
            className="flex "
            style={{
              flexDirection: "column",
              width: "130px",
              justifyContent: "space-around",
            }}
          >
            <a
              href="#"
              className=" link-hover"
              style={{
                marginTop: "-8px",
              }}
            >
              당근 비즈니스
            </a>
            <a
              href="#"
              className=" link-hover"
              style={{
                marginTop: "-15px",
              }}
            >
              채팅하기
            </a>
            <a href="#" className=" link-hover">
              {null}
            </a>
          </li>
          <li
            className="flex"
            style={{
              flexDirection: "column",
              width: "130px",
              justifyContent: "space-around",
            }}
          >
            <a href="#" className=" link-hover">
              자주 묻는 질문
            </a>

            <a href="#" className=" link-hover">
              회사 소개
            </a>
            <a href="#" className=" link-hover">
              인재 채용
            </a>
          </li>
        </ul>
        <div
          style={{
            paddingTop: "15px",
          }}
        >
          <span
            className="font-bold flex"
            style={{
              paddingBottom: "15px",
            }}
          >
            당근마켓 앱 다운로드
          </span>
          <div className="flex gap-8">
            <a
              href="#"
              className="flex items-center gap-2 font-bold rounded-md"
              style={{
                fontSize: "1rem",
                padding: "10px",
                backgroundColor: "#EEEEEE",
              }}
            >
              <GrApple />
              App Store
            </a>

            <a
              href="#"
              className="flex items-center gap-2 font-bold rounded-md"
              style={{
                fontSize: "1rem",
                padding: "10px",
                backgroundColor: "#EEEEEE",
              }}
            >
              <FaGooglePlay />
              Google Play
            </a>
          </div>
        </div>
      </footer>
      <div
        className="flex py-4 border-t  text-base-content border-base-300 gap-4"
        style={{
          width: "800px",
          margin: "0 auto",
        }}
      >
        <div
          className="text-sm "
          style={{
            width: "520px",
            color: "gray",
          }}
        >
          <span className="font-bold">대표</span>
          <span> 김재현, 김용현 </span>
          <span className="font-bold">사업자번호</span>
          <span> 375-87-00088</span>
          <br />
          <span className="font-bold">직업정보제공사업 신고번호 </span>
          <span> 2016-서울서초-0051</span>
          <br />
          <span className="font-bold">주소 </span>
          <span> 서울특별시 구로구 디지털로 30길 28, 609호 (당근서비스)</span>
          <br />
          <span className="font-bold">전화 </span>
          <span>1544-9796 </span>
          <span className="font-bold">고객문의 cs@daangnservice.com</span>
          <br />
          <br />

          <div
            className="font-bold  flex gap-3"
            style={{
              width: "60%",
            }}
          >
            <a href="#" className="link-hover">
              제휴 문의
            </a>
            <a href="#" className="link-hover">
              광고 문의
            </a>
            <a href="#" className="link-hover">
              PR 문의
            </a>
            <a href="#" className="link-hover">
              IR 문의
            </a>
          </div>
          <br />
          <div className="font-bold gap-3 flex">
            <a href="#" className="link-hover">
              이용약관
            </a>
            <a href="#" className="link-hover">
              개인정보처리방침
            </a>
            <a href="#" className="link-hover">
              위치기반서비스 이용약관
            </a>
            <a href="#" className="link-hover">
              이용자보호 비전과 계획
            </a>
          </div>
        </div>

        <div
          className="flex gap-4"
          style={{
            width: "200px",
            fontSize: "1.5rem",
            color: "gray",
          }}
        >
          <a href="#">
            <BsFacebook />
          </a>
          <a href="#">
            <BsYoutube />
          </a>
          <a href="#">
            <AiOutlineInstagram />
          </a>
          <a href="#">
            <BsTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
