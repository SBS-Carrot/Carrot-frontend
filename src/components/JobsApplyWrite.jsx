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
import LoginedJobsHeader from "../layouts/LoginedJobsHeader";
import { BACKEND_URL } from "../config/config";
import { FaCarrot } from "react-icons/fa";
const JobsApply = ({ logined, setLogined }) => {
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
  const [gender, setGender] = useState("선택해주세요");
  const [year, setYear] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [name, setName] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const [user, setUser] = useState("");
  const userid = sessionStorage.getItem("userid");
  const [phoneValue, setPhoneValue] = useState("");
  const [image, setImage] = useState("");
  const onUser = (data) => {
    setUser(data);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getUser/${userid}`,
          method: "GET",
        });
        onUser(data.data);
        setPhoneValue(data.data.phone);
        setName(data.data.username);
        setImage(data.data.profileImage);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const [id, setId] = useState("");
  const onIntroduceChange = (e) => {
    if (e.target.value.length > 199) {
      return;
    }
    setIntroduce(e.target.value);
  };
  const onPhoneChange = (str) => {
    setPhoneValue(str);
  };

  const onYearChange = (e) => {
    if (e.target.value.length > 4) {
      return;
    }
    setYear(e.target.value);
  };

  const onNameChange = (e) => {
    if (e.target.value.length > 10) {
      return;
    }
    setName(e.target.value);
  };
  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  const onCompleteChange = () => {
    setCompleteToggle(!completeToggle);
  };

  const onSubmit = async (name, phoneValue, gender, year, introduce) => {
    try {
      const applyCheck = await axios({
        url: `http://${BACKEND_URL}:8083/checkApply/${num}`,
        method: "GET",
        params: { userid },
      });
      if (applyCheck.data) {
        alert("이미 지원하셨습니다.");
        return;
      }
      const applyJobsDto = {
        name,
        phoneValue,
        gender,
        year,
        introduce,
        userid,
      };
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/applyJobs/${num}`,
        method: "POST",
        data: applyJobsDto,
      });
      onCompleteChange();
      //알림
      const url = "/jobsApplyView/" + num;
      const data1 = await axios({
        url: `http://${BACKEND_URL}:8083/Jobs/${num}`,
        method: "get",
      });
      const yourid = data1.data.jobUserid;
      const notificationRequestDto = {
        content: "알바 지원",
        url,
        notificationType: "APPLY",
        userid: yourid,
        sender: userid,
      };
      const data2 = axios({
        url: `http://${BACKEND_URL}:8083/addApplyNotification`,
        method: "POST",
        data: notificationRequestDto,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <LoginedJobsHeader setLogined={setLogined} />
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
          알바 지원하기
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
            <div>이름</div>
            <div>
              <input
                type="text"
                placeholder="실명을 입력해주세요"
                value={name}
                onChange={onNameChange}
                style={{
                  border: "1px  #d5d5d5 solid",
                  height: "40px",
                  width: "600px",
                }}
              />
            </div>
          </div>

          <div className="pt-4">
            <div> 연락처</div>
            <input
              type="text"
              value={phoneValue}
              onChange={(e) => setPhoneValue(onPhoneChange(e.target.value))}
              style={{
                border: "1px  #d5d5d5 solid",
                width: "35%",
              }}
            />
          </div>

          <div className="pt-4">
            <div> 성별</div>
            <select
              value={gender}
              onChange={onGenderChange}
              style={{
                border: "1px #d5d5d5 solid",
                width: "35%",
              }}
            >
              <option value="선택해주세요">선택해주세요</option>
              <option value="여성">여성</option>
              <option value="남성">남성</option>
            </select>
          </div>

          <div className="pt-4">
            <div> 태어난 연도</div>
            <input
              type="text"
              placeholder="태어난 연도를 숫자 4자리로 입력해 주세요"
              value={year}
              onChange={onYearChange}
              style={{
                border: "1px  #d5d5d5 solid",
                width: "45%",
              }}
            />
          </div>
          <div>
            <div className="pt-4">자기소개</div>
            <div>
              <textarea
                cols="30"
                rows="10"
                placeholder="본인이 일했던 경험과 할 수 있는 업무에 대해 소개해 주세요. (200자 이내)"
                value={introduce}
                onChange={onIntroduceChange}
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "100%",
                  height: "130px",
                  paddingLeft: "5px",
                  maxHeight: "200px",
                }}
              />
            </div>
          </div>
          <div
            className="pt-4"
            style={{
              width: "150px",
              height: "150px",
            }}
          >
            <div>사진</div>
            {image == null ? (
              <div
                style={{
                  position: "relative",
                  marginLeft: "10px",
                }}
              >
                <FaCarrot
                  style={{
                    width: "130px",
                    height: "130px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                    color: "#fc9d39",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "120%",
                    width: "240px",
                    border: "1px gray solid",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href="/mypage"
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                    }}
                  >
                    사진을 추가하러 가볼까요?
                  </a>
                </div>
              </div>
            ) : (
              <img
                src={image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
            )}
          </div>

          <div>
            <button
              onClick={() => {
                if (gender == "선택해주세요") {
                  alert("성별을 선택해 주세요");
                } else if (name.length == 0) {
                  alert("이름을 입력해 주세요");
                } else if (introduce.length == 0) {
                  alert("자기소개를 입력해 주세요");
                } else if (year.length < 4) {
                  alert("연도를 입력해 주세요 (ex 1999)");
                } else {
                  onSubmit(name, phoneValue, gender, year, introduce);
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
                margin: "0px auto",
                marginTop: "45px",
                width: "750px",
              }}
            >
              알바 지원완료
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
                href={`/jobspost/${num}`}
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
                알바 지원이
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

export default JobsApply;
