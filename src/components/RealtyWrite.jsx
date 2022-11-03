import React from "react";
import RealtyHeader from "../layouts/RealtyHeader";
import { MdAddAPhoto } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

const RealtyWrite = () => {
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [id, setId] = useState("");
  const [X, setX] = useState([]);

  const WhoClickRadioButton = (e) => {
    setX(e.target.value);
  };

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
  // 사진없을때
  const onSubmit = async (
    subjectValue,
    category,
    priceValue,
    day,
    startTimeValue,
    endTimeValue,
    name,
    placeValue,
    contentValue
  ) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/createJobs`,
        method: "POST",
        data: {
          jobSubject: subjectValue,
          jobCategory: category,
          jobPrice: priceValue,
          jobDay: day,
          jobStartTime: startTimeValue,
          jobEndTime: endTimeValue,
          jobName: name,
          jobPlace: placeValue,
          jobContent: contentValue,
        },
      });
      onCompleteChange();
      setId(data.data.jobid);
    } catch (e) {
      console.log(e);
    }
  };
  // 사진있을때
  const onSubmits = async (
    subjectValue,
    category,
    priceValue,
    day,
    startTimeValue,
    endTimeValue,
    name,
    placeValue,
    contentValue,
    uploadedImg
  ) => {
    try {
      const formData = new FormData();
      const jobDto = {
        jobSubject: subjectValue,
        jobCategory: category,
        jobPrice: priceValue,
        jobDay: day,
        jobStartTime: startTimeValue,
        jobEndTime: endTimeValue,
        jobName: name,
        jobPlace: placeValue,
        jobContent: contentValue,
      };

      const json = JSON.stringify(jobDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("jobDto", blob);
      for (let i = 0; i < uploadedImg.length; i++) {
        formData.append("file", uploadedImg[i]);
      }
      const data2 = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://localhost:8083/createJobsImages`,
        method: "POST",
        data: formData,
      });
      setId(data2.data.jobid);
      onCompleteChange();
    } catch (e) {
      console.log(e);
      window.alert("게시물 작성에 실패했습니다.");
    }
  };
  return (
    <div>
      <RealtyHeader />
      <div
        className="pt-5 mb-2"
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
          부동산 직거래 글쓰기
        </span>
      </div>
      <div
        className="font-bold"
        style={{
          width: "850px",
          margin: "0 auto",
          fontSize: "1.1rem",
        }}
      >
        <span
          className="mr-1"
          style={{
            color: "orange",
          }}
        >
          중개수수료 없는
        </span>
        <span>부동산 직거래에는 개인의 매물만 올려주세요.</span>
      </div>
      <section
        className="flex"
        style={{
          width: "850px",
          hegith: "1000px",
          margin: "0 auto",
        }}
      >
        <section
          className="mt-3"
          style={{
            width: "430px",
            position: "relative",
          }}
        >
          <div className="mb-4">
            <div className="font-bold">이 글을 쓰시는 분은 누구인가요?</div>
            <div className="flex gap-2">
              <div>
                <input
                  className="mr-1"
                  type="radio"
                  value="1"
                  checked={X === "1"}
                  onChange={WhoClickRadioButton}
                />
                세입자
              </div>
              <div>
                <input
                  className="mr-1"
                  type="radio"
                  value="2"
                  checked={X === "2"}
                  onChange={WhoClickRadioButton}
                />
                집주인
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold">매물 종류</div>
            <select
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <option value="매물종류 선택">매물종류선택</option>
              <option value="원룸">원룸</option>
              <option value="빌라(투룸 이상)">빌라(투룸 이상)</option>
              <option value="아파트">아파트</option>
              <option value="상가">상가</option>
              <option value="기타(사무실, 주택, 토지 등)">
                기타(사무실, 주택, 토지 등)
              </option>
            </select>
          </div>
          <div className="font-bold">실평수(전용면적)</div>
          <div className="mb-4 flex gap-2">
            <div>
              <span className="text-sm">실평수</span>{" "}
              <div
                className="rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "140px",
                }}
              >
                <input
                  className="ml-1"
                  type="number"
                  placeholder="0"
                  style={{
                    width: "110px",
                    height: "30px",
                  }}
                />
                평
              </div>
            </div>
            <div>
              <span className="text-sm">전용 면적</span>
              <div
                className="rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "140px",
                }}
              >
                <input
                  className="ml-1"
                  type="number"
                  placeholder="0"
                  style={{
                    width: "110px",
                    height: "30px",
                  }}
                />
                ㎡
              </div>
            </div>
          </div>
          <div className="font-bold">방/욕실수</div>
          <div className="mb-4 flex gap-2">
            <div>
              <span className="text-sm">방 개수</span>{" "}
              <div
                className="rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "140px",
                }}
              >
                <input
                  className="ml-1"
                  type="number"
                  placeholder="0"
                  style={{
                    width: "110px",
                    height: "30px",
                  }}
                />
                개
              </div>
            </div>
            <div>
              <span className="text-sm">욕실 개수</span>
              <div
                className="rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "140px",
                }}
              >
                <input
                  className="ml-1"
                  type="number"
                  placeholder="0"
                  style={{
                    width: "110px",
                    height: "30px",
                  }}
                />
                개
              </div>
            </div>
          </div>
          <div className="font-bold">주소</div>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="주소 입력"
              style={{
                border: "1px #d5d5d5 solid",
                width: "400px",
                height: "30px",
              }}
            />
          </div>
          <div className="font-bold">층</div>
          <div className="mb-4 flex gap-2">
            <div>
              <span className="text-sm">전체 층</span>{" "}
              <div
                className="rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "140px",
                }}
              >
                <input
                  className="ml-1"
                  type="number"
                  placeholder="0"
                  style={{
                    width: "110px",
                    height: "30px",
                  }}
                />
                층
              </div>
            </div>
            <div>
              <span className="text-sm">해당 층</span>
              <div
                className="rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "140px",
                }}
              >
                <input
                  className="ml-1"
                  type="number"
                  placeholder="0"
                  style={{
                    width: "110px",
                    height: "30px",
                  }}
                />
                층
              </div>
            </div>
          </div>
          <div className="font-bold">입주 가능일</div>
          <div className="flex gap-4">
            <div>즉시 가능</div>
            <div>
              날짜 지정 <input type="date" />
            </div>
          </div>
          <div className="font-bold">사진</div>
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
                width: "80px",
                height: "80px",
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
                    fontSize: "2.54rem",
                    cursor: "pointer",
                    margin: "1.1rem",
                  }}
                />
              </label>
            </div>

            <ul className="grid grid-cols-3 gap-4 pl-3">
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
              ))}{" "}
            </ul>
          </div>
        </section>
        <section
          className="mt-3"
          style={{
            width: "420px",
            position: "relative",
          }}
        >
          <div className="font-bold">선호하는 거래 방식</div>
          <div className="flex gap-3 mt-1 mb-4">
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button>단기</button>
            </div>
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button>월세</button>
            </div>
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button>전세</button>
            </div>
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button>매매</button>
            </div>
          </div>
          <div className="font-bold">대출</div>
          <div className="flex gap-2 mb-4">
            <div>가능</div>
            <div>불가능</div>
            <div>확인필요</div>
          </div>
          <div className="font-bold">반려동물</div>
          <div className="flex gap-2 mb-4">
            <div>가능</div>
            <div>불가능</div>
            <div>확인필요</div>
          </div>
          <div className="font-bold">주차</div>
          <div className="flex gap-2 mb-4">
            <div>가능</div>
            <div>불가능</div>
            <div>확인필요</div>
          </div>
          <div className="font-bold">엘리베이터</div>
          <div className="flex gap-2 mb-4">
            <div>있음</div>
            <div>없음</div>
          </div>
          <div className="font-bold">내부시설</div>
          <section>
            <div>복층</div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default RealtyWrite;
