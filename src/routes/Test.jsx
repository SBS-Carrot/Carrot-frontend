// 아마존 s3 bucket 만들기 관련게시물가면 유용한것 더 많음
// https://velog.io/@jinseoit/AWS-S3-bucket
// S3에 이미지 업로드 구현하기 (백엔드)
// https://velog.io/@modsiw/Spring-Spring-Boot-gradle-S3-React.js-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-1-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B5%AC%ED%98%84
import { useState } from "react";
import Header from "../layouts/Header";
import axios from "axios";
const Test = () => {
  const [category, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: "",
  });
  const [id, setId] = useState("");
  const onChange = (e) => {
    setContent(e.target.files[0]);
  };
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
        url: `http://localhost:8083/createProductImages`,
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
        url: `http://localhost:8083/createProductImages/${id}`,
        method: "POST",
        data: {
          file: showImages,
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
        style={{
          width: "850px",
          margin: "0 auto",
          height: "700px",
          border: "1px black solid",
          borderRadius: "10px",
          position: "relative",
          marginTop: "3rem",
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
                width: "300px",
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
                marginBottom: "20px",
              }}
            />
          </div>
          <div
          // className={classes.addPicture}
          >
            <label
              htmlFor="input-file"
              // className={classes.addButton}
              onChange={handleAddImages}
            >
              <input
                type="file"
                id="input-file"
                multiple
                // className={classes.addButton}
              />

              <span
                style={{
                  color: "#ffa445",
                  fontWeight: "bolder",
                }}
              >
                사진은 최대 10장까지 추가할 수 있습니다.
              </span>
            </label>
            <ul className="grid grid-cols-5 gap-5 pl-4">
              {showImages.map((image, id) => (
                <div
                  key={id}
                  style={{
                    width: "130px",
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
          {/* <div className="formbox ">
            <form
              onSubmit={onSubmit}
              style={{
                display: "inline-block",
              }}
            >
              <div id="uploadDiv">
                <input
                  id="fileAdd"
                  type="file"
                  onChange={onChange}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="flex justify-center mt-5 mb-5">
                <input
                  type="submit"
                  multiple="multiple"
                  value="업로드하기"
                  className="btn"
                />
              </div>
            </form>
          </div> */}
          {/*  */}
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
