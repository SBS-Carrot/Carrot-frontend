import { useEffect } from "react";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import { MdAddAPhoto } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";

const RealtyWrite = ({ logined, setLogined }) => {
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
  const [completeToggle, setCompleteToggle] = useState(false);
  const [shortdealingToggle, setShortDealingToggle] = useState(false);
  const [monthlydealingToggle, setMonthlyDealingToggle] = useState(false);
  const [depositdealingToggle, setDepositDealingToggle] = useState(false);
  const [dealingToggle, setDealingToggle] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [id, setId] = useState("");
  const [who, setWho] = useState("");
  const [loan, setLoan] = useState("");
  const [pet, setPet] = useState("");
  const [parking, setParking] = useState("");
  const [elevator, setElevator] = useState("");
  const [move, setMove] = useState("");
  const [inside, setInside] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [category, setCategory] = useState(""); //매물종류
  const [spaceValue, setSpaceValue] = useState(""); //실평수
  //면적
  const [areaValue, setAreaValue] = useState("");
  //방
  const [roomValue, setRoomValue] = useState("");
  //욕실
  const [bathValue, setBathValue] = useState("");
  //주소
  const [addressValue, setAddressValue] = useState("");
  //전체층
  const [wholeValue, setWholeValue] = useState("");
  //해당층
  const [floorValue, setFloorValue] = useState("");
  //매물 설명
  const [contentValue, setContentValue] = useState("");
  //보증금
  const [depositValue, setDepositValue] = useState("");
  //월세
  const [monthlyValue, setMonthlyValue] = useState("");
  //임대 기간, 조건
  const [shortTerm, setShortTerm] = useState("");
  //보증금 조정 가격
  const [depositChangePrice, setDepositChangePrice] = useState("");
  //보증금 조정가격 설명
  const [depositChange, setDepositChange] = useState("");
  //관리비 가격
  const [costValue, setCostValue] = useState("");
  //관리비 설명
  const [costContent, setCostContent] = useState("");
  //전세, 매매 가격
  const [salePrice, setSalePrice] = useState("");
  //카테고리 단기, 월세, 전세, 매매
  const [deal, setDeal] = useState("");

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
  const onMoveDateChange = (e) => {
    setMoveDate(e.target.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const onSpaceChange = (e) => {
    setSpaceValue(e.target.value);
  };
  const onAreaChange = (e) => {
    setAreaValue(e.target.value);
  };
  const onRoomChange = (e) => {
    setRoomValue(e.target.value);
  };
  const onBathChange = (e) => {
    setBathValue(e.target.value);
  };
  const onAddressChange = (e) => {
    setAddressValue(e.target.value);
  };
  const onWholeChange = (e) => {
    setWholeValue(e.target.value);
  };
  const onFloorChange = (e) => {
    setFloorValue(e.target.value);
  };
  const onContentChange = (e) => {
    setContentValue(e.target.value);
  };
  const onDepositValue = (e) => {
    setDepositValue(e.target.value);
  };
  const onMonthlyValue = (e) => {
    setMonthlyValue(e.target.value);
  };

  const onCostValue = (e) => {
    setCostValue(e.target.value);
  };

  const onCostContent = (e) => {
    setCostContent(e.target.value);
  };

  const onSalePrice = (e) => {
    setSalePrice(e.target.value);
  };

  const onShortTerm = (e) => {
    setShortTerm(e.target.value);
  };

  const onChangePrice = (e) => {
    setDepositChangePrice(e.target.value);
  };

  const onDepositChange = (e) => {
    setDepositChange(e.target.value);
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

  const onShortDealing = () => {
    setShortDealingToggle(true);
    setMonthlyDealingToggle(false);
    setDepositDealingToggle(false);
    setDealingToggle(false);
    setDeal("단기");
  };

  const onMonthlyDealing = () => {
    setShortDealingToggle(false);
    setMonthlyDealingToggle(true);
    setDepositDealingToggle(false);
    setDealingToggle(false);
    setDeal("월세");
  };

  const onDepositDealing = () => {
    setShortDealingToggle(false);
    setMonthlyDealingToggle(false);
    setDepositDealingToggle(true);
    setDealingToggle(false);
    setDeal("전세");
  };

  const onDealing = () => {
    setShortDealingToggle(false);
    setMonthlyDealingToggle(false);
    setDepositDealingToggle(false);
    setDealingToggle(true);
    setDeal("매매");
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
    who,
    loan,
    pet,
    parking,
    elevator,
    move,
    inside,
    moveDate,
    category,
    spaceValue,
    areaValue,
    roomValue,
    bathValue,
    addressValue,
    wholeValue,
    floorValue,
    contentValue,
    depositValue,
    monthlyValue,
    shortTerm,
    depositChangePrice,
    depositChange,
    costValue,
    costContent,
    salePrice,
    deal
  ) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/createRealty`,
        method: "POST",
        data: {
          realtyWho: who,
          realtyCategory: category,
          realtySpace: spaceValue,
          realtyArea: areaValue,
          realtyRoom: roomValue,
          realtyBath: bathValue,
          realtyAddress: addressValue,
          realtyWhole: wholeValue,
          realtyFloor: floorValue,
          realtyMove: move,
          realtyMoveDate: moveDate,
          realtyLoan: loan,
          realtyPet: pet,
          realtyParking: parking,
          realtyElevator: elevator,
          realtyInside: inside,
          realtyContent: contentValue,
          realtyDeposit: depositValue,
          realtyMonthly: monthlyValue,
          realtyShortTerm: shortTerm,
          realtyChangePrice: depositChangePrice,
          realtyDepositChange: depositChange,
          realtyCost: costValue,
          realtyCostContent: costContent,
          realtySalePrice: salePrice,
          realtyDeal: deal,
        },
      });

      setId(data.data.realtyId);
      onCompleteChange();
    } catch (e) {
      console.log(e);
    }
  };

  // 사진있을때
  const onSubmits = async (
    who,
    loan,
    pet,
    parking,
    elevator,
    move,
    inside,
    moveDate,
    category,
    spaceValue,
    areaValue,
    roomValue,
    bathValue,
    addressValue,
    wholeValue,
    floorValue,
    contentValue,
    depositValue,
    monthlyValue,
    shortTerm,
    depositChangePrice,
    depositChange,
    costValue,
    costContent,
    salePrice,
    deal,
    uploadedImg
  ) => {
    try {
      const formData = new FormData();
      const realtyDto = {
        realtyWho: who,
        realtyCategory: category,
        realtySpace: spaceValue,
        realtyArea: areaValue,
        realtyRoom: roomValue,
        realtyBath: bathValue,
        realtyAddress: addressValue,
        realtyWhole: wholeValue,
        realtyFloor: floorValue,
        realtyMove: move,
        realtyMoveDate: moveDate,
        realtyLoan: loan,
        realtyPet: pet,
        realtyParking: parking,
        realtyElevator: elevator,
        realtyInside: inside,
        realtyContent: contentValue,
        realtyDeposit: depositValue,
        realtyMonthly: monthlyValue,
        realtyShortTerm: shortTerm,
        realtyChangePrice: depositChangePrice,
        realtyDepositChange: depositChange,
        realtyCost: costValue,
        realtyCostContent: costContent,
        realtySalePrice: salePrice,
        realtyDeal: deal,
      };

      const json = JSON.stringify(realtyDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("realtyDto", blob);
      for (let i = 0; i < uploadedImg.length; i++) {
        formData.append("file", uploadedImg[i]);
      }
      const data2 = await axios({
        headers: {
          "Content-Type": `application/json`,
        },
        url: `http://localhost:8083/createRealtyImages`,
        method: "POST",
        data: formData,
      });
      setId(data2.data.realtyId);

      onCompleteChange();
    } catch (e) {
      console.log(e);
      window.alert("게시물 작성에 실패했습니다.");
    }
  };

  return (
    <div>
      <LoginedRealtyHeader setLogined={setLogined} />
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
                  value="세입자"
                  checked={who === "세입자"}
                  onChange={whoRadioButton}
                />
                세입자
              </div>
              <div>
                <input
                  className="mr-1"
                  type="radio"
                  value="집주인"
                  checked={who === "집주인"}
                  onChange={whoRadioButton}
                />
                집주인
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold">매물 종류</div>
            <select
              value={category}
              onChange={onCategoryChange}
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <option value="매물종류 선택">매물종류선택</option>
              <option value="원룸">원룸</option>
              <option value="투룸 이상">투룸 이상</option>
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
                  value={spaceValue}
                  onChange={onSpaceChange}
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
                  value={areaValue}
                  onChange={onAreaChange}
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
                  value={roomValue}
                  onChange={onRoomChange}
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
                  value={bathValue}
                  onChange={onBathChange}
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
              value={addressValue}
              onChange={onAddressChange}
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
                  value={wholeValue}
                  onChange={onWholeChange}
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
                  value={floorValue}
                  onChange={onFloorChange}
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
                value="즉시 가능"
                checked={move === "즉시 가능"}
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
                      value="날짜지정"
                      checked={move === "날짜지정"}
                      onChange={moveRadioButton}
                    />
                    날짜 지정
                    <div
                      style={{
                        marginLeft: "15px",
                      }}
                    >
                      <input
                        type="date"
                        value={moveDate}
                        onChange={onMoveDateChange}
                      />
                    </div>
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

            <ul className="grid grid-cols-4 gap-11 pl-3 ">
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
          <div className="flex gap-3 mt-1 mb-2">
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button
                onClick={() => {
                  onShortDealing();
                }}
              >
                단기
              </button>
            </div>
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button
                onClick={() => {
                  onMonthlyDealing();
                }}
              >
                월세
              </button>
            </div>
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button
                onClick={() => {
                  onDepositDealing();
                }}
              >
                전세
              </button>
            </div>
            <div
              className="p-2 rounded-lg text-sm"
              style={{
                border: "1px #d5d5d5 solid",
              }}
            >
              <button
                onClick={() => {
                  onDealing();
                }}
              >
                매매
              </button>
            </div>
          </div>
          {shortdealingToggle && (
            <div
              className="rounded-lg mb-2"
              style={{
                border: "1px #d5d5d5 solid",
                width: "350px",
                height: "240px",
              }}
            >
              <span className="pl-1 font-bold text-sm">단기(1년미만)</span>
              <span className="ml-2">
                <span
                  className="font-bold rounded-lg"
                  style={{
                    padding: "0.1rem",
                    fontSize: "12px",
                    border: "1px #fdcc99 solid",
                    backgroundColor: "#fdcc99",
                    color: "#fd8c16",
                  }}
                >
                  가장 선호하는 방식
                </span>
              </span>
              <div className="pl-1 mb-1 flex gap-2">
                <div>
                  <span className="text-sm">보증금</span>{" "}
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
                      value={depositValue}
                      onChange={onDepositValue}
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    />
                    만원
                  </div>
                </div>
                <div>
                  <span className="text-sm">월세</span>
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
                      value={monthlyValue}
                      onChange={onMonthlyValue}
                      placeholder="0"
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    />
                    만원
                  </div>
                </div>
              </div>
              <div className="pl-1">
                <input
                  className="rounded-md text-sm"
                  style={{
                    border: "1px #d5d5d5 solid",
                    width: "340px",
                    height: "40px",
                  }}
                  type="text"
                  value={shortTerm}
                  onChange={onShortTerm}
                  placeholder="단기임대 기간, 조건에 대해 설명해주세요."
                />
              </div>

              <div className="pl-1 ">
                <div className=" mt-2 mb-1 text-sm font-bold">관리비(선택)</div>
                <div
                  className="mb-1 rounded-md"
                  style={{
                    border: "1px #d5d5d5 solid",
                    width: "340px",
                  }}
                >
                  <input
                    className="ml-1 rounded-md"
                    type="number"
                    value={costValue}
                    onChange={onCostValue}
                    placeholder="0"
                    style={{
                      width: "300px",
                      height: "30px",
                    }}
                  />
                  만원
                </div>
                <div>
                  <input
                    className="pl-1 text-sm rounded-md"
                    style={{
                      border: "1px #d5d5d5 solid",
                      width: "340px",
                      height: "40px",
                    }}
                    type="text"
                    value={costContent}
                    onChange={onCostContent}
                    placeholder="관리비 설명(ex. 전기, 수도, 인터넷 포함등)"
                  />
                </div>
              </div>
            </div>
          )}
          {monthlydealingToggle && (
            <div
              className="rounded-lg mb-2"
              style={{
                border: "1px #d5d5d5 solid",
                width: "350px",
                height: "190px",
              }}
            >
              <span className="pl-1 font-bold text-sm">월세</span>
              <span className="ml-2">
                <span
                  className="font-bold rounded-lg"
                  style={{
                    padding: "0.1rem",
                    fontSize: "12px",
                    border: "1px #fdcc99 solid",
                    backgroundColor: "#fdcc99",
                    color: "#fd8c16",
                  }}
                >
                  가장 선호하는 방식
                </span>
              </span>
              <div className="pl-1 mb-1 flex gap-2">
                <div>
                  <span className="text-sm">보증금</span>{" "}
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
                      value={depositValue}
                      onChange={onDepositValue}
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    />
                    만원
                  </div>
                </div>
                <div>
                  <span className="text-sm">월세</span>
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
                      value={monthlyValue}
                      onChange={onMonthlyValue}
                      placeholder="0"
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    />
                    만원
                  </div>
                </div>
              </div>

              <div className="pl-1 ">
                <div className=" mt-2 mb-1 text-sm font-bold">
                  보증금 조정 가능
                </div>
                <div
                  className="mb-1 rounded-md"
                  style={{
                    border: "1px #d5d5d5 solid",
                    width: "340px",
                  }}
                >
                  <input
                    className="ml-1 rounded-md"
                    type="number"
                    value={depositChangePrice}
                    onChange={onChangePrice}
                    placeholder="0"
                    style={{
                      width: "300px",
                      height: "30px",
                    }}
                  />
                  만원
                </div>
                <div>
                  <input
                    className=" pl-1 text-sm rounded-md"
                    style={{
                      border: "1px #d5d5d5 solid",
                      width: "340px",
                      height: "40px",
                    }}
                    type="text"
                    value={depositChange}
                    onChange={onDepositChange}
                    placeholder="보증금 조정시 금액을 설명해주세요."
                  />
                </div>
              </div>
            </div>
          )}
          {depositdealingToggle && (
            <div
              className="pl-1 rounded-lg mb-2"
              style={{
                border: "1px #d5d5d5 solid",
                width: "350px",
                height: "158px",
              }}
            >
              <span className=" font-bold text-sm">전세</span>
              <span className="ml-2">
                <span
                  className="font-bold rounded-lg"
                  style={{
                    padding: "0.1rem",
                    fontSize: "12px",
                    border: "1px #fdcc99 solid",
                    backgroundColor: "#fdcc99",
                    color: "#fd8c16",
                  }}
                >
                  가장 선호하는 방식
                </span>
              </span>
              <div className=" text-sm">가격</div>{" "}
              <div
                className=" mb-1 rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "340px",
                }}
              >
                <input
                  className="ml-1 rounded-md"
                  type="number"
                  value={salePrice}
                  onChange={onSalePrice}
                  placeholder="0"
                  style={{
                    width: "300px",
                    height: "30px",
                  }}
                />
                만원
              </div>
              <div>
                <div className=" mt-2 mb-1 text-sm font-bold">
                  보증금 조정 가능
                </div>

                <div>
                  <input
                    className="text-sm rounded-md"
                    style={{
                      border: "1px #d5d5d5 solid",
                      width: "340px",
                      height: "40px",
                    }}
                    type="text"
                    value={depositChange}
                    onChange={onDepositChange}
                    placeholder="보증금 조정시 금액을 설명해주세요."
                  />
                </div>
              </div>
            </div>
          )}
          {dealingToggle && (
            <div
              className="pl-1 rounded-lg mb-2"
              style={{
                border: "1px #d5d5d5 solid",
                width: "350px",
                height: "85px",
              }}
            >
              <span className=" font-bold text-sm">매매</span>
              <span className="ml-2">
                <span
                  className="font-bold rounded-lg"
                  style={{
                    padding: "0.1rem",
                    fontSize: "12px",
                    border: "1px #fdcc99 solid",
                    backgroundColor: "#fdcc99",
                    color: "#fd8c16",
                  }}
                >
                  가장 선호하는 방식
                </span>
              </span>
              <div className=" text-sm">가격</div>{" "}
              <div
                className=" mb-1 rounded-md"
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "340px",
                }}
              >
                <input
                  className="ml-1 rounded-md"
                  type="number"
                  value={salePrice}
                  onChange={onSalePrice}
                  placeholder="0"
                  style={{
                    width: "300px",
                    height: "30px",
                  }}
                />
                만원
              </div>
            </div>
          )}
          <div className="font-bold">대출</div>
          <div className="flex gap-2 mb-4">
            <div>
              <input
                className="mr-1"
                type="radio"
                value="가능"
                checked={loan === "가능"}
                onChange={loanRadioButton}
              />
              가능
            </div>

            <div>
              <input
                className="mr-1"
                type="radio"
                value="불가능"
                checked={loan === "불가능"}
                onChange={loanRadioButton}
              />
              불가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="확인필요"
                checked={loan === "확인필요"}
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
                value="가능"
                checked={pet === "가능"}
                onChange={petRadioButton}
              />
              가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="불가능"
                checked={pet === "불가능"}
                onChange={petRadioButton}
              />
              불가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="확인필요"
                checked={pet === "확인필요"}
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
                value="가능"
                checked={parking === "가능"}
                onChange={parkingRadioButton}
              />
              가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="불가능"
                checked={parking === "불가능"}
                onChange={parkingRadioButton}
              />
              불가능
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="확인필요"
                checked={parking === "확인필요"}
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
                value="있음"
                checked={elevator === "있음"}
                onChange={elevatorRadioButton}
              />
              있음
            </div>
            <div>
              <input
                className="mr-1"
                type="radio"
                value="없음"
                checked={elevator === "없음"}
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
              <textarea
                className="pb-44"
                cols="30"
                rows="10"
                placeholder="이 매물의 특징이 있다면 알려주세요."
                value={contentValue}
                onChange={onContentChange}
                style={{
                  border: "1px #d5d5d5 solid",
                  width: "400px",
                  height: "250px",
                  maxHeight: "250px",
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
              onSubmit(
                who,
                loan,
                pet,
                parking,
                elevator,
                move,
                inside,
                moveDate,
                category,
                spaceValue,
                areaValue,
                roomValue,
                bathValue,
                addressValue,
                wholeValue,
                floorValue,
                contentValue,
                depositValue,
                monthlyValue,
                shortTerm,
                depositChangePrice,
                depositChange,
                costValue,
                costContent,
                salePrice,
                deal
              );
            } else {
              onSubmits(
                who,
                loan,
                pet,
                parking,
                elevator,
                move,
                inside,
                moveDate,
                category,
                spaceValue,
                areaValue,
                roomValue,
                bathValue,
                addressValue,
                wholeValue,
                floorValue,
                contentValue,
                depositValue,
                monthlyValue,
                shortTerm,
                depositChangePrice,
                depositChange,
                costValue,
                costContent,
                salePrice,
                deal,
                uploadedImg
              );
            }
          }}
          style={{
            marginTop: "15px",
            outline: "1px #ffa445 solid",
            borderRadius: "10px",
            padding: "15px",
            fontWeight: "bolder",
            color: "white",
            fontSize: "1.1rem",
            backgroundColor: "#FFB26B",
            marginLeft: "18%",
            width: "1000px",
          }}
        >
          글쓰기
        </button>
      </div>
      {completeToggle && (
        <div
          style={{
            position: "absolute",
            transform: "translate(265%,-160%)",
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
