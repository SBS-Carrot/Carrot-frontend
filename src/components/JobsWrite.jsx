import React from "react";
import { useState } from "react";
import Header from "../layouts/Header";
import axios from "axios";
import { MdAddAPhoto } from "react-icons/md";
import { buildTimeValue } from "@testing-library/user-event/dist/utils";

const JobsWrite = () => {
  const [category, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [placeValue, setPlaceValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [day, setDay] = useState([]);
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
  const onPlaceChange = (e) => {
    setPlaceValue(e.target.value);
  };
  const onTimeChange = (e) => {
    setTimeValue(e.target.value);
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

  const onSubmit = async (
    subjectValue,
    contentValue,
    category,
    priceValue,
    placeValue,
    timeValue
  ) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/createProduct`,
        method: "POST",
        data: {
          jobSubject: subjectValue,
          jobCategory: category,
          jobPrice: priceValue,
          jobPlace: placeValue,
          jobTime: timeValue,
          jobContent: contentValue,
        },
      });
      setId(data.data.productId);
    } catch (e) {
      console.log(e);
    }
  };

  const DayArray = (e) => {
    console.log(e.target.value);
    setDay([...e.target.value, ...day]);
    console.log(day);
  };

  const DayDelete = (id) => {
    //요일 삭제
    for (let i = 0; i < day.length; i++) {
      if (id == i) {
        day.splic(id, 1);
      }
    }
  };

  const onSubmits = async (
    subjectValue,
    contentValue,
    category,
    priceValue,
    placeValue,
    timeValue,
    showImages
  ) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/createJobs`,
        method: "POST",
        data: {
          jobSubject: subjectValue,
          jobCategory: category,
          jobPrice: priceValue,
          jobPlace: placeValue,
          jobTime: timeValue,
          jobContent: contentValue,
        },
      });
      setId(data.data.subjectId);

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
          알바공고 쓰기
        </span>
      </div>
      <div
        className="flex justify-center "
        style={{
          width: "850px",
          margin: "0 auto",
          height: "1000px",
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
            <div className="pb-1">제목</div>
            <div className="pb-2">
              <input
                type="text"
                placeholder="구인 내용 요약"
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
          <div>임금</div>
          <div className="pt-1 flex gap-3">
            <select
              style={{
                border: "1px #d5d5d5 solid",
                width: "35%",
              }}
            >
              <option value="시급">시급</option>
              <option value="월급">월급</option>
              <option value="일급">일급</option>
              <option value="시급">시급</option>
            </select>
            <div
              style={{
                border: "1px #d5d5d5 solid",
                width: "140px",
              }}
            >
              <input
                value={priceValue}
                onChange={onPriceChange}
                type="number"
                placeholder="9,160"
                style={{ width: "120px" }}
              />
              원
            </div>
          </div>

          <div>
            <div className="pt-2">일하는 요일</div>
            <div className="flex my-2 gap-2">
              <button
                onClick={() => {
                  DayArray();
                }}
                className="flex  rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  월
                </div>
              </button>
              <button
                className="flex  rounded-full"
                onChange={DayArray}
                // onClick={() => DayArray()}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  화
                </div>
              </button>{" "}
              <button
                className="flex  rounded-full"
                onChange={DayArray}
                // onClick={() => DayArray()}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  수
                </div>
              </button>{" "}
              <button
                className="flex  rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  목
                </div>
              </button>{" "}
              <button
                className="flex  rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  금
                </div>
              </button>{" "}
              <button
                className="flex  rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  토
                </div>
              </button>{" "}
              <button
                className="flex  rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px #d5d5d5 solid",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {" "}
                  일
                </div>
              </button>
            </div>
          </div>
          <div>
            {" "}
            <div className="pt-1">일하는 시간</div>
            <select
              value={timeValue}
              onChange={onTimeChange}
              style={{
                border: "1px #d5d5d5 solid",
                width: "100px",
              }}
            >
              <option value="24:00">00:00</option>
              <option value="01:00">01:00</option>
              <option value="02:00">02:00</option>
              <option value="03:00">03:00</option>
              <option value="04:00">04:00</option>
              <option value="05:00">05:00</option>
              <option value="06:00">06:00</option>
              <option value="07:00">07:00</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option value="22:00">22:00</option>
              <option value="23:00">23:00</option>
            </select>
            <span> ~ </span>
            <select
              style={{
                width: "100px",
                border: "1px #d5d5d5 solid",
              }}
            >
              <option value="24:00">00:00</option>
              <option value="01:00">01:00</option>
              <option value="02:00">02:00</option>
              <option value="03:00">03:00</option>
              <option value="04:00">04:00</option>
              <option value="05:00">05:00</option>
              <option value="06:00">06:00</option>
              <option value="07:00">07:00</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option value="22:00">22:00</option>
              <option value="23:00">23:00</option>
            </select>
          </div>
          <div className="pt-2">
            <div className="font-bold">일할 장소에 대해 알려주세요</div>
            <div className="pt-1">
              <div> 상호명</div>
              <input
                value={category}
                onChange={onCategoryChange}
                type="text"
                placeholder="예) 당근가게"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "400px",
                }}
              />
            </div>
            <div className="pt-1">
              <div> 주소</div>
              <input
                value={placeValue}
                onChange={onPlaceChange}
                type="text"
                placeholder="어디에서 일하나요?"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div>
            <div className="pt-3">내용</div>
            <div>
              <input
                type="text"
                placeholder="예) 업무예시, 근무 여건, 지원자가 갖추어야 할 능력, 우대 사항 등"
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
            일하는 공간이나 일과 관련된 사진을 올려보세요. (최대 10장까지)
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
              작성완료
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
                href={`/jobspost/${id}`}
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

export default JobsWrite;
