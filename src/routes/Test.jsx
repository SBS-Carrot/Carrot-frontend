import { useState } from "react";
import Header from "../layouts/Header";
import axios from "axios";
import { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";

const Test = () => {
  const [category, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [id, setId] = useState("");
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

  const onCompleteChange = () => {
    setCompleteToggle(!completeToggle);
  };

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
    console.log(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

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
      setId(data.data.productId);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmits = async (
    subjectValue,
    contentValue,
    category,
    priceValue,
    showImages
  ) => {
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
      setId(data.data.productId);

      const data2 = await axios({
        url: `http://localhost:8083/createProductImages/${data.data.productId}`,
        method: "POST",
        data: {
          path: showImages,
        },
      });
      console.log(data2);
      window.alert("사진추가d");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Header />
      <div
        className="pt-5"
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
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
      <div
        className="flex justify-center "
        style={{
          width: "850px",
          margin: "0 auto",
          height: "800px",
          position: "relative",
          marginTop: "1.4rem",
        }}
      >
        <div
          style={{
            width: "750px",
          }}
        >
          <div>
            <div>제목</div>
            <div>
              <input
                type="text"
                placeholder="게시글 제목"
                value={subjectValue}
                onChange={onSubjectChange}
                style={{
                  border: "1px  #d5d5d5 solid",
                  height: "40px",
                  width: "600px",
                }}
              />
            </div>
          </div>
          <div className="pt-4">
            <select
              value={category}
              onChange={onCategoryChange}
              style={{
                border: "1px #d5d5d5 solid",
                width: "35%",
              }}
            >
              <option value="카테고리 선택">카테고리 선택</option>
              <option value="디지털기기">디지털기기</option>
              <option value="생활가전">생활가전</option>
              <option value="인테리어">가구/인테리어</option>
              <option value="생활/주방">생활/주방</option>
              <option value="유아동">유아동</option>
              <option value="유아도서">유아도서</option>
              <option value="여성의류">여성의류</option>
              <option value="여성잡화">여성잡화</option>
              <option value="남성패션/잡화">남성패션/잡화</option>
              <option value="뷰티/미용">뷰티/미용</option>
              <option value="스포츠/레저">스포츠/레저</option>
              <option value="취미/게임/음반">취미/게임/음반</option>
              <option value="도서">도서</option>
              <option value="티켓/교환권">티켓/교환권</option>
              <option value="가공식품">가공식품</option>
              <option value="반려동물용품">반려동물용품</option>
              <option value="식물">식물</option>
              <option value="기타 중고물품">기타 중고물품</option>
              <option value="삽니다">삽니다</option>
            </select>
          </div>
          <div className="pt-4">
            <input
              type="text"
              placeholder="\ 가격"
              value={priceValue}
              onChange={onPriceChange}
              style={{
                border: "1px  #d5d5d5 solid",
                width: "35%",
              }}
            />
          </div>
          <div>
            <div className="pt-4">내용</div>
            <div>
              <input
                type="text"
                placeholder="게시글 내용을 작성해주세요. (가품 및 판매금지 물품은 게시가 제한될 수 있어요)"
                value={contentValue}
                onChange={onContentChange}
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "100%",
                  height: "120px",
                  paddingLeft: "5px",
                }}
              />
            </div>
          </div>
          <div
            className="pt-4"
            style={{
              color: "#ffa445",
              fontWeight: "bolder",
            }}
          >
            사진은 최대 10장까지 추가할 수 있습니다.
          </div>
          <div
            className="flex "
            style={{
              maxWidth: "100%",
            }}
          >
            <div
              className=" rounded-lg"
              style={{
                border: "1px #d5d5d5 solid",
                width: "100px",
                height: "100px",
                color: "#8f8f8f",
              }}
            >
              <label htmlFor="input-file" onChange={handleAddImages}>
                <input
                  type="file"
                  id="input-file"
                  multiple
                  style={{
                    display: "none",
                  }}
                />
                <MdAddAPhoto
                  style={{
                    fontSize: "3rem",
                    cursor: "pointer",
                    margin: "1.5rem",
                  }}
                />
              </label>
            </div>

            <ul className="grid grid-cols-5 gap-4 pl-4">
              {showImages.map((image, id) => (
                <div
                  key={id}
                  style={{
                    width: "110px",
                    height: "100px",
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={image}
                    alt={`${image}-${id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      display: "block",
                    }}
                  />
                  <div />
                  <button
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "-30%",
                    }}
                    onClick={() => handleDeleteImage(id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={() => {
                if (showImages.length == 0) {
                  onSubmit(subjectValue, contentValue, category, priceValue);
                  onCompleteChange();
                } else {
                  onSubmits(
                    subjectValue,
                    contentValue,
                    category,
                    priceValue,
                    showImages
                  );
                  onCompleteChange();
                }
              }}
              style={{
                outline: "1px #ffa445 solid",
                borderRadius: "10px",
                padding: "15px",
                fontWeight: "bolder",
                color: "white",
                fontSize: "1.1rem",
                backgroundColor: "#FFB26B",
                position: "absolute",
                bottom: "7%",
                left: "50%",
                width: "750px",
                transform: "translateX(-50%)",
              }}
            >
              판매게시글 작성완료
            </button>
          </div>
          {completeToggle && (
            <div
              style={{
                position: "absolute",
                transform: "translate(95%,-120%)",
                width: "300px",
                height: "150px",
                justifyContent: "center",
                background: "white",
                outline: "1px #ffa445 solid",
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <a
                href={`/articles/${id}`}
                style={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  color: "#ffa445",
                  fontWeight: "bolder",
                  paddingTop: "10px",
                }}
              >
                {" "}
                게시글 작성이
                <br />
                완료되었습니다.
                <div
                  style={{
                    padding: "10px",
                    outline: "1px #ffa445 solid",
                    borderRadius: "10px",
                    color: "#ffa445",
                    width: "80px",
                    margin: "30px auto",
                  }}
                >
                  확인
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
