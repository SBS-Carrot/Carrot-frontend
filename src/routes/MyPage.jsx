import { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { MdAddAPhoto } from "react-icons/md";
import { FaCarrot } from "react-icons/fa";

const MyPage = ({ setLogined }) => {
  const [uploadedImg, setUploadedImg] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const handleAddImages = (event) => {
    if (uploadedImg.length > 1) {
      setUploadedImg([]);
      setUploadedImg(event.target.value);

      const imageLists = event.target.files;
      //이미지 미리보기기능
      let imageUrlLists = [...showImages];

      const currentImageUrl = URL.createObjectURL(imageLists[0]);
      imageUrlLists.pop();
      imageUrlLists.push(currentImageUrl);
      setShowImages(imageUrlLists);
      event.target.files = [];
      return;
    }
    const imageLists = event.target.files;
    //이미지 미리보기기능
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setShowImages(imageUrlLists);
    setUploadedImg(event.target.value);
  };

  const handleDeleteImage = () => {
    setUploadedImg([]);
    setShowImages([]);
  };
  return (
    <div>
      <LoginedHeader setLogined={setLogined} />
      <div
        style={{
          width: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            height: "40px",
            position: "sticky",
            top: "0%",
            borderBottom: "1px #bcbcbc solid",
            borderTop: "1px #bcbcbc solid",
            zIndex: "9999",
            display: "flex",
          }}
        >
          <ul
            className="flex flex-row items-center gap-5 ml-4"
            style={{
              fontWeight: "bolder",
            }}
          >
            <li>내 프로필</li>
            <li>보안설정</li>
            <li>게시글 관리</li>
          </ul>
        </div>
        <div style={{}}>
          <div className="mt-10">
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: "bolder",
              }}
            >
              프로필 수정
            </h2>
            <h2
              style={{
                marginTop: "10px",
                color: "gray",
              }}
            >
              당근마켓 대표 이미지와 닉네임을 변경할 수 있습니다.
            </h2>
            <section
              style={{
                borderTop: "1px #d5d5d5 solid",
                borderBottom: "1px #d5d5d5 solid",
                width: "100%",
                height: "350px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "65%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                프로필사진
                <div></div>
                <div>사진변경</div>
                <div>삭제</div>
              </div>
              <div
                style={{
                  height: "35%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {" "}
                닉네임
                <div> input닉네임 </div>
                <div></div>
              </div>
            </section>
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
              <ul className="grid grid-cols-5 gap-4 pl-4">
                {uploadedImg[0] == "" ? (
                  <div
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
                      src={showImages[0]}
                      alt=""
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
                      onClick={() => handleDeleteImage()}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "110px",
                      height: "100px",
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                      marginBottom: "20px",
                      border: "1px #d5d5d5 solid",
                    }}
                  >
                    <FaCarrot
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        color: "#fc9d39",
                      }}
                    />
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
