import React from "react";
import { useState } from "react";
import JobsHeader from "../layouts/JobsHeader";
import axios from "axios";
import { MdAddAPhoto } from "react-icons/md";

const JobsWrite = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("시급");
  const [priceValue, setPriceValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [placeValue, setPlaceValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState("");
  const [endTimeValue, setEndTimeValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [day, setDay] = useState("");
  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [id, setId] = useState("");
  // https://velog.io/@kingth/react-input-%EA%B0%80%EA%B2%A9%ED%91%9C%EC%8B%9C-3%EC%9E%90%EB%A6%AC-%EB%A7%88%EB%8B%A4-%EC%BD%A4%EB%A7%88
  // 가격에 , 찍기
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
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const onContentChange = (e) => {
    setContentValue(e.target.value);
  };
  const onSubjectChange = (e) => {
    setSubjectValue(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onPlaceChange = (e) => {
    setPlaceValue(e.target.value);
  };
  const onStartTimeChange = (e) => {
    setStartTimeValue(e.target.value);
  };
  const onEndTimeChange = (e) => {
    setEndTimeValue(e.target.value);
  };

  const onMonChange = () => {
    setMon(!mon);
    onDayChange(mon, "월");
  };
  const onTueChange = () => {
    setTue(!tue);
    onDayChange(tue, "화");
  };
  const onWedChange = () => {
    setWed(!wed);
    onDayChange(wed, "수");
  };
  const onThuChange = () => {
    setThu(!thu);
    onDayChange(thu, "목");
  };
  const onFriChange = () => {
    setFri(!fri);
    onDayChange(fri, "금");
  };
  const onSatChange = () => {
    setSat(!sat);
    onDayChange(sat, "토");
  };
  const onSunChange = () => {
    setSun(!sun);
    onDayChange(sun, "일");
  };
  const onDayChange = (addDay, days) => {
    let result = day.indexOf(days);
    if (!addDay) {
      setDay(day + days);
    } else {
      let a = day.slice(0, result);
      let b = "";
      if (result + 1 <= day.length) {
        b = day.slice(result + 1);
      }
      setDay(a + b);
    }
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
      // https://velog.io/@hhhminme/Axios%EC%97%90%EC%84%9C-Post-%EC%8B%9C-Contenttypeapplicationoctet-streamnotsupported-%ED%95%B8%EB%93%A4%EB%A7%81415-%EC%97%90%EB%9F%AC
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
      <JobsHeader />
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
              value={category}
              onChange={() => {}}
            >
              <option value="시급">시급</option>
              <option value="일급">일급</option>
              <option value="월급">월급</option>
            </select>
            <div
              style={{
                border: "1px #d5d5d5 solid",
                width: "140px",
              }}
            >
              <input
                value={priceValue}
                onChange={(e) => setPriceValue(onPriceChange(e.target.value))}
                type="text"
                placeholder="9,160"
                style={{ width: "120px" }}
              />
              원
            </div>
          </div>

          <div>
            <div className="pt-2">일하는 요일</div>
            <div className="flex my-2 gap-2">
              {mon === false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onMonChange();
                    }}
                  >
                    월
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onMonChange();
                    }}
                  >
                    월
                  </button>
                </div>
              )}
              {tue === false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onTueChange();
                    }}
                  >
                    화
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onTueChange();
                    }}
                  >
                    화
                  </button>
                </div>
              )}
              {wed === false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onWedChange();
                    }}
                  >
                    수
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onWedChange();
                    }}
                  >
                    수
                  </button>
                </div>
              )}
              {thu === false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onThuChange();
                    }}
                  >
                    목
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onThuChange();
                    }}
                  >
                    목
                  </button>
                </div>
              )}
              {fri == false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onFriChange();
                    }}
                  >
                    금
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onFriChange();
                    }}
                  >
                    금
                  </button>
                </div>
              )}
              {sat == false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onSatChange();
                    }}
                  >
                    토
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onSatChange();
                    }}
                  >
                    토
                  </button>
                </div>
              )}
              {sun == false ? (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px #d5d5d5 solid",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onSunChange();
                    }}
                  >
                    일
                  </button>
                </div>
              ) : (
                <div
                  className="flex  rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffa445",
                    color: "white",
                  }}
                >
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onSunChange();
                    }}
                  >
                    일
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            {" "}
            <div className="pt-1">일하는 시간</div>
            <select
              value={startTimeValue}
              onChange={onStartTimeChange}
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
              value={endTimeValue}
              onChange={onEndTimeChange}
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
                value={name}
                onChange={onNameChange}
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
                if (showImages.length == 0) {
                  onSubmit(
                    subjectValue,
                    category,
                    priceValue,
                    day,
                    startTimeValue,
                    endTimeValue,
                    name,
                    placeValue,
                    contentValue
                  );
                  onCompleteChange();
                } else {
                  onSubmits(
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
