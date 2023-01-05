// 아마존 s3 bucket 만들기 관련게시물가면 유용한것 더 많음
// https://velog.io/@jinseoit/AWS-S3-bucket
// S3에 이미지 업로드 구현하기 (백엔드)
// https://velog.io/@modsiw/Spring-Spring-Boot-gradle-S3-React.js-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-1-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B5%AC%ED%98%84
import { useState } from "react";
import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import axios from "axios";
import { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import WriteMap from "./WriteMap";
import { BiMap } from "react-icons/bi";
import { BACKEND_URL } from "../config/config";

const BoardWrite = ({ logined, setLogined }) => {
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
  const [contentValue, setContentValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [boardAddress, setDealAddress] = useState("");
  const onDealAddress = (e) => {
    setDealAddress(e.target.value);
  };
  const [id, setId] = useState("");

  const onContentChange = (e) => {
    if (e.target.value.length > 200) {
      return;
    }
    setContentValue(e.target.value);
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

  const [addressDetail, setAddressDetail] = useState(""); // 상세주소로 받음!!

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "480px",
    height: "500px",
    padding: "7px",
  };

  const onSubmit = async (contentValue, category, addressDetail) => {
    try {
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/createBoard`,
        method: "POST",
        data: {
          boardCategory: category,
          boardContent: contentValue,
          boardAddress: addressDetail,
          boardUserid: sessionStorage.getItem("userid"),
        },
      });
      onCompleteChange();

      setId(data.data.boardId);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmits = async (
    contentValue,
    category,
    uploadedImg,
    addressDetail
  ) => {
    try {
      const formData = new FormData();
      const boardDto = {
        boardCategory: category,
        boardContent: contentValue,
        boardAddress: addressDetail,
        boardUserid: sessionStorage.getItem("userid"),
      };
      // https://velog.io/@hhhminme/Axios%EC%97%90%EC%84%9C-Post-%EC%8B%9C-Contenttypeapplicationoctet-streamnotsupported-%ED%95%B8%EB%93%A4%EB%A7%81415-%EC%97%90%EB%9F%AC
      const json = JSON.stringify(boardDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("boardDto", blob);
      uploadedImg.reverse();
      for (let i = 0; i < uploadedImg.length; i++) {
        formData.append("file", uploadedImg[i]);
      }
      const data2 = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://${BACKEND_URL}:8083/createBoardImages`,
        method: "POST",
        data: formData,
      });
      setId(data2.data.boardId);
      onCompleteChange();
    } catch (e) {
      console.log(e);
      window.alert("게시물 작성에 실패했습니다.");
    }
  };
  return (
    <div>
      <LoginedBoardHeader setLogined={setLogined} />
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
          동네생활 글쓰기
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
            <div>내용</div>
            <div className="mt-1">
              <textarea
                cols="30"
                rows="10"
                placeholder="우리 동네 관련된 질문이나 이야기를 해보세요."
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
          <div className="pt-2">
            <select
              value={category}
              onChange={onCategoryChange}
              style={{
                border: "1px #d5d5d5 solid",
                width: "35%",
              }}
            >
              <option value="게시글의 주제">게시글의 주제</option>
              <option value="동네 질문">동네 질문</option>
              <option value="동네 카페">동네 카페</option>
            </select>
          </div>

          <div className="pt-4">
            <div> 장소 검색</div>
            <span className="flex mt-2">
              <div className="gap-2">
                <input
                  type="text"
                  placeholder="이웃과 공유하고 싶은 장소를 검색해보세요."
                  value={addressDetail}
                  onChange={onCompletePost}
                  style={{
                    border: "1px #d5d5d5 solid",
                    width: "400px",
                    height: "30px",
                    marginBottom: "10px",
                  }}
                  disabled
                />
              </div>
              <button
                className="mb-2"
                type="button"
                style={{
                  height: "30px",
                  fontSize: "1.5rem",
                  marginRight: "5px",
                }}
                onClick={() => {
                  onChangeOpenPost();
                }}
              >
                <BiMap />
              </button>
            </span>
            {isOpenPost && (
              <span>
                <DaumPostcode
                  style={postCodeStyle}
                  autoClose
                  onComplete={onCompletePost}
                />
              </span>
            )}
            <WriteMap searchPlace={addressDetail} />
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
                  onSubmit(contentValue, category, addressDetail);
                } else {
                  onSubmits(contentValue, category, uploadedImg, addressDetail);
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
              게시글 작성완료
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
                href={`/boardpost/${id}`}
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

export default BoardWrite;
