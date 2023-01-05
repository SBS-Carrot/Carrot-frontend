// 아마존 s3 bucket 만들기 관련게시물가면 유용한것 더 많음
// https://velog.io/@jinseoit/AWS-S3-bucket
// S3에 이미지 업로드 구현하기 (백엔드)
// https://velog.io/@modsiw/Spring-Spring-Boot-gradle-S3-React.js-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-1-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B5%AC%ED%98%84
import { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import axios from "axios";
import { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
import { data } from "autoprefixer";
const ProductEdit = ({ logined, setLogined }) => {
  const { num } = useParams();
  const navigate = useNavigate();
  const moveBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!logined) {
      window.alert("로그인 후 사용할 수 있는 기능입니다.");
      moveBack();
    }
  }, []);
  const [category, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState([]);
  const [dealAddress, setDealAddress] = useState("");
  const onDealAddress = (e) => {
    setDealAddress(e.target.value);
  };
  const [id, setId] = useState("");
  const onChange = (e) => {
    setContent(e.target.files[0]);
  };
  const onPriceChange = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };
  const onContentChange = (e) => {
    setContentValue(e.target.value);
  };
  const onSubjectChange = (e) => {
    if (e.target.value.length > 20) {
      return;
    }
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
    setUploadedImg([...event.target.files, ...uploadedImg]);

    const imageLists = event.target.files;

    //이미지 미리보기기능
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
    // console.log(imageUrlLists);
    console.log("업로드", imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    //img 배열 삭제
    for (let i = 0; i < uploadedImg.length; i++) {
      if (id == i) {
        uploadedImg.splice(i, 1);
      }
    }
    //미리보기 삭제
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  //수정함
  const onEdit = async (
    subjectValue,
    contentValue,
    category,
    priceValue,
    dealAddress
  ) => {
    try {
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/productEdit/${num}`,
        method: "POST",
        data: {
          productCategory: category,
          productPrice: priceValue,
          productSubject: subjectValue,
          productContent: contentValue,
          productDealAddress: dealAddress,
        },
      });
      onCompleteChange();
      setId(data.data.productId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/product/${num}`,
          method: "GET",
        });
        //console.log(data.data);
        setSubjectValue(data.data.productSubject);
        setCategoryValue(data.data.productCategory);
        setPriceValue(data.data.productPrice);
        setDealAddress(data.data.productDealAddress);
        setContentValue(data.data.productContent);
      } catch (e) {
        console.log(e);
      }
      try {
        const data1 = await axios({
          url: `http://${BACKEND_URL}:8083/getProductWithImage/${num}`,
          method: "GET",
        });
        console.log("data1 :", data1.data);
        setShowImages(data1.data.images);
        //setUploadedImg(data1.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const onEdits = async (
    subjectValue,
    contentValue,
    category,
    priceValue,
    uploadedImg,
    dealAddress
  ) => {
    try {
      const formData = new FormData();
      const productDto = {
        productCategory: category,
        productPrice: priceValue,
        productSubject: subjectValue,
        productContent: contentValue,
        productDealAddress: dealAddress,
      };
      // https://velog.io/@hhhminme/Axios%EC%97%90%EC%84%9C-Post-%EC%8B%9C-Contenttypeapplicationoctet-streamnotsupported-%ED%95%B8%EB%93%A4%EB%A7%81415-%EC%97%90%EB%9F%AC
      const json = JSON.stringify(productDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("productDto", blob);
      uploadedImg.reverse();
      for (let i = 0; i < uploadedImg.length; i++) {
        formData.append("file", uploadedImg[i]);
      }
      const data2 = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://${BACKEND_URL}:8083/productImageEdit/${num}`,
        method: "POST",
        data: formData,
      });
      setId(data2.data.productId);
      onCompleteChange();
    } catch (e) {
      console.log(e);
      window.alert("게시물 작성에 실패했습니다.");
    }
  };

  return (
    <div>
      <LoginedHeader setLogined={setLogined} />
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
          중고거래 수정하기
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
              onChange={(e) => setPriceValue(onPriceChange(e.target.value))}
              style={{
                border: "1px  #d5d5d5 solid",
                width: "35%",
              }}
            />
          </div>
          <div className="pt-4">
            <div> 거래장소</div>
            <input
              type="text"
              placeholder="거래할 장소를 입력해주세요."
              value={dealAddress}
              onChange={onDealAddress}
              style={{
                border: "1px  #d5d5d5 solid",
                width: "60%",
                height: "30px",
              }}
            />
          </div>
          <div>
            <div className="pt-4">내용</div>
            <div>
              <textarea
                cols="30"
                rows="10"
                placeholder="게시글 내용을 작성해주세요. (가품 및 판매금지 물품은 게시가 제한될 수 있어요)"
                value={contentValue}
                onChange={onContentChange}
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "100%",
                  height: "120px",
                  paddingLeft: "5px",
                  maxHeight: "200px",
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
                  accept="image/*"
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
                if (uploadedImg.length == 0) {
                  onEdit(
                    subjectValue,
                    contentValue,
                    category,
                    priceValue,
                    dealAddress
                  );
                } else {
                  onEdits(
                    subjectValue,
                    contentValue,
                    category,
                    priceValue,
                    uploadedImg,
                    dealAddress
                  );
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
                margin: "15px auto",
                width: "750px",
              }}
            >
              판매게시글 수정완료
            </button>
          </div>
          {completeToggle && (
            <div
              style={{
                position: "absolute",
                transform: "translate(80%,-150%)",
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
                href={`/productpost/${num}`}
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
                게시글 수정이
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

export default ProductEdit;
