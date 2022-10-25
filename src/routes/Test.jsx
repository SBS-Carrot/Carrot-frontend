import { useState } from "react";
import Header from "../layouts/Header";
import axios from "axios";
const Test = () => {
  const [category, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const onPriceChange = (e) => {
    setPriceValue(e.target.value);
  };
  const onContentChange = (e) => {
    setContentValue(e.target.value);
  };
  const onSubjectChange = (e) => {
    setSubjectValue(e.target.value);
  };
  const onCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };
  //사진 여러개 https://cotak.tistory.com/124

  const onSubmit = async (subjectValue, contentValue, category, priceValue) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/createProduct`,
        method: "POST",
        data: {
          productCategory: category,
          productPrice: priceValue,
          productSubject: subjectValue,
          productContent: contentValue,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Header />
      <div
        style={{
          width: "800px",
          margin: "0 auto",
          height: "600px",
          border: "1px black solid",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bolder",
            }}
          >
            <span
              style={{
                color: "#ffa445",
              }}
            >
              중고거래 글쓰기
            </span>
          </div>
          <div>
            <div
              style={{
                display: "inline-block",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
            >
              제목
            </div>
            <input
              type="text"
              placeholder="게시글 제목"
              value={subjectValue}
              onChange={onSubjectChange}
              style={{
                border: "1px black solid",
                borderRadius: "10px",
              }}
            />
          </div>
          <div
            style={{
              paddingLeft: "10px",
            }}
          >
            내용
          </div>
          <div
            style={{
              paddingLeft: "10px",
            }}
          >
            <input
              type="text"
              placeholder="게시글 내용을 작성해주세요. (가품 및 판매금지 물품은 게시가 제한될 수 있어요)"
              value={contentValue}
              onChange={onContentChange}
              style={{
                border: "1px black solid",
                borderRadius: "10px",
                width: "80%",
                height: "120px",
                paddingLeft: "10px",
              }}
            />
          </div>
          <div
            style={{
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <input
              type="text"
              placeholder="가격"
              value={priceValue}
              onChange={onPriceChange}
              style={{
                border: "1px black solid",
                borderRadius: "10px",
              }}
            />
          </div>
          <div
            style={{
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <input
              type="text"
              placeholder="카테고리 선택"
              value={category}
              onChange={onCategoryChange}
              style={{
                border: "1px black solid",
                borderRadius: "10px",
              }}
            />
          </div>
          <div>사진 업로드하기 (추후 추가)</div>
          <button
            onClick={() => {
              onSubmit(subjectValue, contentValue, category, priceValue);
            }}
            style={{
              outline: "1px #ffa445 solid",
              borderRadius: "10px",
              padding: "15px",
              fontWeight: "bolder",
              color: "#ffa445",
              position: "absolute",
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            판매게시글 작성완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
