import React from "react";
import RealtyHeader from "../layouts/RealtyHeader";
import { MdAddAPhoto } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { getValue } from "@testing-library/user-event/dist/utils";

const RealtyWrite = () => {
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [id, setId] = useState("");
  const [who, setWho] = useState([]);
  const [loan, setLoan] = useState([]);
  const [pet, setPet] = useState([]);
  const [parking, setParking] = useState([]);
  const [elevator, setElevator] = useState([]);
  const [dateToggle, setDateToggle] = useState(false);
  const [move, setMove] = useState([]);
  const [inside, setInside] = useState("");

  //값 넣기
  const [categroy, setCateogry] = useState(""); //매물종류
  //실평수
  //면적
  //방
  //욕실
  //주소
  //전체층
  //해당층
  //입주가능일
  //대출
  //반려동물
  //주차
  //엘리베이터
  //내부시설
  //매물 설명

  const Inside_List = [
    { id: 0, data: "복층" },
    { id: 1, data: "에어컨" },
    { id: 2, data: "침대" },
    { id: 3, data: "냉장고" },
    { id: 4, data: "세탁기" },
    { id: 5, data: "가스렌지" },
    { id: 6, data: "옥탑" },
    { id: 7, data: "인덕션" },
  ];
  const onCheckInside = (checked, item) => {
    if (checked) {
      setInside([...inside, item]);
    } else {
      setInside(inside.filter((el) => el !== item));
    }
  };

  const moveRadioButton = (e) => {
    setMove(e.target.value);
  };
  const whoRadioButton = (e) => {
    setWho(e.target.value);
  };
  const loanRadioButton = (e) => {
    setLoan(e.target.value);
  };

  const petRadioButton = (e) => {
    setPet(e.target.value);
  };
  const parkingRadioButton = (e) => {
    setParking(e.target.value);
  };
  const elevatorRadioButton = (e) => {
    setElevator(e.target.value);
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
          width: "1000px",
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
        className="flex gap-28"
        style={{
          width: "1000px",
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
                  checked={who === "1"}
                  onChange={whoRadioButton}
                />
                세입자
              </div>
              <div>
                <input
                  className="mr-1"
                  type="radio"
                  value="2"
                  checked={who === "2"}
                  onChange={whoRadioButton}
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
            <div>
              <input
                className="mr-1"
                type="radio"
                value="1"
                checked={move === "1"}
                onChange={moveRadioButton}
              />
              즉시 가능
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <input
                      className="mr-1"
                      type="radio"
                      value="2"
                      checked={move === "2"}
                      onChange={moveRadioButton}
                    />
                    날짜지정
                  </div>
                  <div
                    style={{
                      marginLeft: "15px",
                    }}
                  >
                    <input type="date" />
                  </div>
                </div>
              </div>
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

            <ul className="grid grid-cols-5 gap-4 pl-3 ">
              {showImages.map((image, id) => (
                <div
                  key={id}
                  style={{
                    width: "90px",
                    height: "90px",
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    marginBottom: "20px",
                  }}
                >
                  <div>
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
                  </div>
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
            <div>
              <input
                className="mr-1"
                type="radio"
                value="1"
                checked={loan === "1"}
                onChange={loanRadioButton}
              />
              가능
            </div>

            <div>
              <input
                className="mr-1"
                type="radio"
                value="2"
                checked={loan === "2"}
                onChange={loanRadioButton}
              />
              불가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="3"
                checked={loan === "3"}
                onChange={loanRadioButton}
              />
              확인필요
            </div>
          </div>
          <div className="font-bold">반려동물</div>
          <div className="flex gap-2 mb-4">
            <div>
              <input
                className="mr-1"
                type="radio"
                value="1"
                checked={pet === "1"}
                onChange={petRadioButton}
              />
              가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="2"
                checked={pet === "2"}
                onChange={petRadioButton}
              />
              불가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="3"
                checked={pet === "3"}
                onChange={petRadioButton}
              />
              확인필요
            </div>
          </div>
          <div className="font-bold">주차</div>
          <div className="flex gap-2 mb-4">
            <div>
              <input
                className="mr-1"
                type="radio"
                value="1"
                checked={parking === "1"}
                onChange={parkingRadioButton}
              />
              가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="2"
                checked={parking === "2"}
                onChange={parkingRadioButton}
              />
              불가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="3"
                checked={parking === "3"}
                onChange={parkingRadioButton}
              />
              확인필요
            </div>
          </div>
          <div className="font-bold">엘리베이터</div>
          <div className="flex gap-2 mb-4">
            <div>
              <input
                className="mr-1"
                type="radio"
                value="1"
                checked={elevator === "1"}
                onChange={elevatorRadioButton}
              />
              있음
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="2"
                checked={elevator === "2"}
                onChange={elevatorRadioButton}
              />
              없음
            </div>
          </div>
          <div className="font-bold">내부시설</div>
          <section>
            <div className="grid grid-cols-2 mb-4 gap-2">
              {Inside_List.map((item) => {
                return (
                  <label key={item.id}>
                    <input
                      className="mr-2"
                      type="checkbox"
                      value={item.data}
                      onChange={(e) => {
                        onCheckInside(e.target.checked, e.target.value);
                      }}
                      checked={inside.includes(item.data) ? true : false}
                    />
                    {item.data}
                  </label>
                );
              })}
            </div>
          </section>
          <div>
            <div className="font-bold">매물 설명</div>
            <div className="flex gap-2 mb-4">
              <input
                className="pb-56"
                type="text"
                placeholder="이 매물의 특징이 있다면 알려주세요."
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "400px",
                  height: "250px",
                }}
              />
            </div>
          </div>
        </section>
      </section>
      <div>
        <button
          onClick={() => {
            if (showImages.length == 0) {
              onSubmit();
              onCompleteChange();
            } else {
              onSubmits();
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
            bottom: "-14%",
            left: "50%",
            width: "1000px",
            transform: "translateX(-50%)",
          }}
        >
          글쓰기
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
            href={`/realtypost/${id}`}
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
  );
};

export default RealtyWrite;
