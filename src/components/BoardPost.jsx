import LoginedBoardHeader from "../layouts/LoginedBoardHeader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "../styles/ProductPost.css";
import {
  BsFillEmojiSmileFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCarrot, FaRegPaperPlane } from "react-icons/fa";
import { SlEmotsmile } from "react-icons/sl";
import { AiFillLike, AiOutlineEnter } from "react-icons/ai";
import {
  FiMessageCircle,
  FiMoreHorizontal,
  FiCheckCircle,
} from "react-icons/fi";
import { CardText } from "reactstrap";

const BoardPost = ({
  logined,
  setLogined,
  onRemoveBoard,
  deleteToggle,
  replyDelete,
  onDeleteToggle,
  onReplyDeleteT,
  menuToggle,
  onMenuToggle,
  replyToggle,
  setReplyToggle,
  onReplyMenuToggle,
  onRemoveReply,
  setMenuToggle,
  editToggle,
  onEditToggle,
  boardLiked,
  setBoardLiked,
  onBoardLike,
}) => {
  const { num } = useParams();
  const [userid, setUserid] = useState(sessionStorage.getItem("userid"));
  const [boardWriter, setBoardWriter] = useState("");
  const [replyNum, setReplyNum] = useState("");
  //댓글
  const [replies, setReplis] = useState([]);
  const [replyValue, setReplyValue] = useState("");
  const onReplyChange = (e) => {
    setReplyValue(e.target.value);
  };

  const navigate = useNavigate();
  const moveBack = () => {
    navigate(-1);
  };

  const boardMove = () => {
    navigate(`/board`);
  };

  const [board, setBoard] = useState("");
  const [images, setImages] = useState([]);
  const onBoardLikes = (data) => {
    setBoardLiked(data);
  };

  const [imgs, setImgs] = useState([
    {
      url: images[0],
    },
    {
      url: images[1],
    },
    {
      url: images[2],
    },
    {
      url: images[3],
    },
    {
      url: images[4],
    },
    {
      url: images[5],
    },
    {
      url: images[6],
    },
    {
      url: images[7],
    },
    {
      url: images[8],
    },
    {
      url: images[9],
    },
  ]);
  const [user, setUser] = useState("");

  const onBoard = (data) => {
    setBoard((prev) => data);
  };

  const submitReply = async () => {
    try {
      const userid = sessionStorage.getItem("userid");

      const data = await axios({
        url: `http://localhost:8083/boardCreateReply/${num}`,
        method: "POST",
        data: {
          boardReply: replyValue,
          replyUserid: userid,
        },
      });
      console.log(data.data);
      if (data.data) {
        window.location.reload(); //새로고침
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const onSubmit = async (num) => {
      let abcd = "";
      try {
        const data = await axios({
          url: `http://localhost:8083/board/${num}`,
          method: "GET",
        });
        abcd = data.data.boardUserid;
        onBoard(data.data);
      } catch {
        console.log("에러");
        window.alert("존재하지 않는 게시글입니다.");
        moveBack();
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getUser/${abcd}`,
          method: "GET",
        });
        setBoardWriter(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getBoardWithImage/${num}`,
          method: "GET",
        });

        setImgs(data.data.images);
        //console.log(data.data);
      } catch (e) {
        console.log(e);
      }

      try {
        const data = await axios({
          url: `http://localhost:8083/getUser/${userid}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/getBoardReply/${num}`,
          method: "GET",
        });
        setReplis(data.data);
        console.log(data.data);
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://localhost:8083/likeBoardCheck/${num}`,
          method: "GET",
          params: {
            boardId: num,
            userid: sessionStorage.getItem("userid"),
          },
        });
        onBoardLikes(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit(num);
  }, []);

  useEffect(() => {
    const onLikeRe = async (num) => {
      try {
        const data = await axios({
          url: `http://localhost:8083/board/${num}`,
          method: "GET",
        });
        onBoard(data.data);
        console.log("댓글", data.data);
      } catch (e) {
        console.log(e);
      }
    };
    onLikeRe(num);
  }, [boardLiked]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };
  if (logined) {
    return (
      <div>
        <LoginedBoardHeader setLogined={setLogined} />
        <div
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <section className="mt-3 flex justify-end gap-3">
            <div
              className="avatar flex justify-center items-center"
              style={{
                width: "3.5rem",
              }}
            >
              <div className="w-12 rounded-full">
                {boardWriter.profileImage != null ? (
                  <img src={boardWriter.profileImage} />
                ) : (
                  <FaCarrot
                    style={{
                      color: "#fc9d39",
                      fontSize: "3rem",
                      transform: "translate(0%,0%)",
                      border: "0.1px #fc9d39 solid",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            </div>

            <div
              className="flex justify-center flex-col"
              style={{
                width: "500px",
              }}
            >
              <div className="font-bold ">
                {boardWriter.nickname == "닉네임 없음"
                  ? boardWriter.username
                  : boardWriter.nickname}
              </div>
              <div className="text-sm">{boardWriter.address}</div>
            </div>

            <div
              style={{
                width: "200px",
              }}
            ></div>
          </section>
          <br />
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div className="mt-3">
              <div className="flex mb-1">
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-between",
                    width: "700px",
                  }}
                >
                  <div>
                    <div
                      className="rounded"
                      style={{
                        padding: "2px",
                        backgroundColor: "rgb(209, 209, 209)",
                      }}
                    >
                      {board.boardCategory}
                    </div>
                  </div>
                  <div>
                    {board.boardUserid === sessionStorage.getItem("userid") ? (
                      <span
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          style={{
                            fontSize: "1.1rem",
                          }}
                          onClick={() => {
                            onMenuToggle();
                          }}
                        >
                          <FiMoreHorizontal />
                        </button>
                        {menuToggle && (
                          <div
                            className="flex flex-col items-center"
                            style={{
                              position: "absolute",
                              width: "50px",
                              height: "50px",
                              left: "-22px",
                            }}
                          >
                            <a href={`/boardedit/${num}`}>수정</a>
                            <button
                              onClick={() => {
                                onDeleteToggle();
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {deleteToggle && (
                  <div
                    className="p-2 rounded-md"
                    style={{
                      width: "250px",
                      height: "80px",
                      border: "1px gray solid",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="flex justify-center">
                      게시물을 삭제하시겠어요?
                    </div>
                    <div className="flex justify-center gap-4 mt-3">
                      <button
                        className=" rounded-md font-bold"
                        style={{
                          padding: "5px",
                          color: "red",
                        }}
                        onClick={() => {
                          onRemoveBoard(num);
                          alert("삭제되었습니다.");
                          setMenuToggle();
                          onDeleteToggle(false);
                          boardMove();
                        }}
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => {
                          onDeleteToggle(false);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                {board.createDate}
              </div>
            </div>
            <br />
            <div>
              <div>{board.boardContent}</div>
            </div>
            <div className="mt-5 relative">
              <div>
                {imgs[0] != undefined ? (
                  <div>
                    <Slider {...settings}>
                      {imgs[0] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[0]} alt="" />
                        </div>
                      )}
                      {imgs[1] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[1]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[2] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[2]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[3] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[3]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[4] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[4]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[5] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[5]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[6] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[6]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[7] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[7]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[8] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[8]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[9] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[9]} alt="" />
                        </div>
                      )}
                    </Slider>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {board.boardAddress == "" ? (
              ""
            ) : (
              <div> 장소: {board.boardAddress}</div>
            )}

            <div
              className="flex text-sm gap-2 my-5"
              style={{
                color: "gray",
              }}
            >
              <span>조회</span>
              <div>{board.boardView}</div>
            </div>
          </section>
          <hr />
          <section>
            <div className="flex p-2 justify-between">
              <div className="flex gap-2">
                {board.boardCategory == "동네 질문" ? (
                  <button
                    onClick={() => {
                      onBoardLike(num, sessionStorage.getItem("userid"));
                    }}
                  >
                    {boardLiked ? (
                      <span
                        className="flex"
                        style={{
                          color: "#ff8200",
                        }}
                      >
                        <span className="flex items-center pr-1">
                          <FiCheckCircle />
                        </span>
                        궁금해요
                      </span>
                    ) : (
                      <span className="flex">
                        <span className="flex items-center pr-1">
                          <FiCheckCircle />
                        </span>
                        궁금해요
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onBoardLike(num, sessionStorage.getItem("userid"));
                    }}
                  >
                    {boardLiked ? (
                      <span
                        className="flex"
                        style={{
                          color: "#ff8200",
                        }}
                      >
                        <span className="flex items-center pr-1">
                          <SlEmotsmile />
                        </span>
                        공감하기
                      </span>
                    ) : (
                      <span className="flex">
                        <span className="flex items-center pr-1">
                          <SlEmotsmile />
                        </span>
                        공감하기
                      </span>
                    )}
                  </button>
                )}

                <button className="flex items-center gap-1">
                  <span
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    <FiMessageCircle />
                  </span>
                  {board.boardChattingNum > 0 ? (
                    <div>
                      <span>댓글</span>
                      <span> {board.boardChattingNum}</span>
                    </div>
                  ) : (
                    <span> 댓글쓰기</span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="rounded-full"
                  style={{
                    color: "white",
                    padding: "2px",
                    backgroundColor: "orange",
                  }}
                >
                  <AiFillLike />
                </span>
                {board.boardAgree}
              </div>
            </div>
            <hr />
            <div>
              {board.boardChattingNum > 0 ? (
                <ul>
                  {replies.map((reply, index) => (
                    <li key={index}>
                      <div className="flex mt-2">
                        <div
                          className="avatar items-start"
                          style={{
                            width: "3.5rem",
                          }}
                        >
                          <div className="w-12 rounded-full">
                            {reply.profileImage != null ? (
                              <img src={reply.profileImage} />
                            ) : (
                              <FaCarrot
                                style={{
                                  color: "#fc9d39",
                                  fontSize: "3rem",
                                  transform: "translate(0%,0%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className="flex justify-center flex-col"
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className="flex gap-1 justify-between">
                            <div className="flex">
                              <div className="font-bold ">
                                {reply.nickname == "닉네임 없음"
                                  ? user.userid
                                  : reply.replyNickname}
                              </div>
                              {board.boardUserid == reply.replyUserid && (
                                <div className="flex items-center">
                                  <div
                                    className="flex justify-center"
                                    style={{
                                      border: "1px gray solid",
                                      width: "44px",
                                      height: "17px",
                                      color: "gray",
                                      fontSize: "0.72rem",
                                    }}
                                  >
                                    작성자
                                  </div>
                                </div>
                              )}
                            </div>
                            {sessionStorage.getItem("userid") ==
                            reply.replyUserid ? (
                              <div
                                style={{
                                  position: "relative",
                                }}
                              >
                                <button
                                  style={{
                                    fontSize: "1.1rem",
                                  }}
                                  onClick={() => {
                                    onReplyMenuToggle();
                                    setReplyNum(reply.id);
                                  }}
                                >
                                  <FiMoreHorizontal />
                                </button>

                                {replyToggle && reply.id == replyNum ? (
                                  <div
                                    className="flex flex-col items-center"
                                    style={{
                                      position: "absolute",
                                      width: "80px",
                                      height: "50px",
                                      left: "-50px",
                                      color: "red",
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        onReplyDeleteT();
                                      }}
                                    >
                                      댓글삭제
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          {replyDelete && reply.id == replyNum ? (
                            <div
                              className="p-2 rounded-md"
                              style={{
                                width: "250px",
                                height: "80px",
                                border: "1px gray solid",
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "white",
                              }}
                            >
                              <div className="flex justify-center">
                                댓글을 삭제하시겠어요?
                              </div>
                              <div className="flex justify-center gap-4 mt-3">
                                <button
                                  className=" rounded-md font-bold"
                                  style={{
                                    padding: "5px",
                                    color: "red",
                                  }}
                                  onClick={() => {
                                    onRemoveReply(reply.id);
                                    alert("삭제되었습니다.");
                                    window.location.reload();
                                  }}
                                >
                                  삭제
                                </button>
                                <button
                                  onClick={() => {
                                    onReplyDeleteT(false);
                                  }}
                                >
                                  취소
                                </button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div
                            style={{
                              fontSize: "0.7rem",
                              color: "gray",
                            }}
                          >
                            {reply.replyUserAddress}
                          </div>
                          <div>{reply.boardReply}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "gray",
                  }}
                >
                  <div>아직 댓글이 없어요.</div>
                  <div>가장 먼저 댓글을 남겨보세요.</div>
                </div>
              )}
              <div className="flex mb-8">
                <input
                  className="rounded-full"
                  type="text"
                  value={replyValue}
                  onChange={onReplyChange}
                  placeholder="댓글을 입력해주세요."
                  style={{
                    backgroundColor: "#e5e5e5",
                    width: "700px",
                    padding: "4px",
                  }}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      submitReply(replyValue);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    submitReply(replyValue);
                  }}
                  className="flex items-center"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  <AiOutlineEnter />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header />

        <div
          style={{
            width: "700px",
            margin: "0 auto",
          }}
        >
          <section className="mt-3 flex justify-end gap-3">
            <div
              className="avatar flex justify-center items-center"
              style={{
                width: "3.5rem",
              }}
            >
              <div className="w-12 rounded-full">
                {boardWriter.profileImage != null ? (
                  <img src={boardWriter.profileImage} />
                ) : (
                  <FaCarrot
                    style={{
                      color: "#fc9d39",
                      fontSize: "3rem",
                      transform: "translate(0%,0%)",
                      border: "0.1px #fc9d39 solid",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            </div>

            <div
              className="flex justify-center flex-col"
              style={{
                width: "500px",
              }}
            >
              <div className="font-bold ">
                {boardWriter.nickname == "닉네임 없음"
                  ? boardWriter.username
                  : boardWriter.nickname}
              </div>
              <div className="text-sm">{boardWriter.address}</div>
            </div>

            <div
              style={{
                width: "200px",
              }}
            ></div>
          </section>
          <br />
          <div
            style={{
              width: "700px",
              borderBottom: "1px #e4e4e4 solid",
            }}
          ></div>
          <section>
            <div className="mt-3">
              <div className="flex mb-1">
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-between",
                    width: "700px",
                  }}
                >
                  <div
                    className="rounded"
                    style={{
                      padding: "2px",
                      backgroundColor: "rgb(209, 209, 209)",
                    }}
                  >
                    {board.boardCategory}
                  </div>
                </div>
              </div>
              <div
                className="text-sm"
                style={{
                  color: "gray",
                }}
              >
                {board.createDate}
              </div>
            </div>
            <br />
            <div>
              <div>{board.boardContent}</div>
            </div>
            <div className="mt-5 relative">
              <div>
                {imgs[0] != undefined ? (
                  <div>
                    <Slider {...settings}>
                      {imgs[0] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[0]} alt="" />
                        </div>
                      )}
                      {imgs[1] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[1]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[2] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[2]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[3] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[3]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[4] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[4]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[5] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[5]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[6] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[6]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[7] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[7]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[8] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[8]} alt="" />
                        </div>
                      )}{" "}
                      {imgs[9] == undefined ? (
                        ""
                      ) : (
                        <div>
                          <img src={imgs[9]} alt="" />
                        </div>
                      )}
                    </Slider>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {board.boardAddress == "" ? (
              ""
            ) : (
              <div> 장소: {board.boardAddress}</div>
            )}

            <div
              className="flex text-sm gap-2 my-5"
              style={{
                color: "gray",
              }}
            >
              <span>조회</span>
              <div>{board.boardView}</div>
            </div>
          </section>
          <hr />
          <section>
            <div className="flex p-2 justify-between">
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1"
                  onClick={() => {
                    alert("로그인 후 이용해주세요.");
                  }}
                >
                  <span>
                    <SlEmotsmile />
                  </span>
                  <span>공감하기</span>
                </button>
                <button className="flex items-center gap-1">
                  <span
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    <FiMessageCircle />
                  </span>
                  {board.boardChattingNum > 0 ? (
                    <div>
                      <span>댓글</span>
                      <span> {board.boardChattingNum}</span>
                    </div>
                  ) : (
                    <span> 댓글쓰기</span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="rounded-full"
                  style={{
                    color: "white",
                    padding: "2px",
                    backgroundColor: "orange",
                  }}
                >
                  <AiFillLike />
                </span>
                {board.boardAgree}
              </div>
            </div>
            <hr />
            <div>
              {board.boardChattingNum > 0 ? (
                <ul>
                  {replies.map((reply, index) => (
                    <li key={index}>
                      <div className="flex mt-2">
                        <div
                          className="avatar items-start"
                          style={{
                            width: "3.5rem",
                          }}
                        >
                          <div className="w-12 rounded-full">
                            {reply.profileImage != null ? (
                              <img src={reply.profileImage} />
                            ) : (
                              <FaCarrot
                                style={{
                                  color: "#fc9d39",
                                  fontSize: "3rem",
                                  transform: "translate(0%,0%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className="flex justify-center flex-col"
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className="flex gap-1 justify-between">
                            <div className="flex">
                              <div className="font-bold ">
                                {reply.nickname == "닉네임 없음"
                                  ? user.userid
                                  : reply.replyNickname}
                              </div>
                              {board.boardUserid == reply.replyUserid && (
                                <div className="flex items-center">
                                  <div
                                    className="flex justify-center"
                                    style={{
                                      border: "1px gray solid",
                                      width: "44px",
                                      height: "17px",
                                      color: "gray",
                                      fontSize: "0.72rem",
                                    }}
                                  >
                                    작성자
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            style={{
                              fontSize: "0.7rem",
                              color: "gray",
                            }}
                          >
                            {reply.replyUserAddress}
                          </div>
                          <div>{reply.boardReply}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "gray",
                  }}
                >
                  <div>아직 댓글이 없어요.</div>
                  <div>가장 먼저 댓글을 남겨보세요.</div>
                </div>
              )}
              <div className="flex mb-8">
                <input
                  className="rounded-full"
                  type="text"
                  value={replyValue}
                  onChange={onReplyChange}
                  placeholder="댓글을 입력해주세요."
                  style={{
                    backgroundColor: "#e5e5e5",
                    width: "700px",
                    padding: "4px",
                  }}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      submitReply(replyValue);
                      alert("로그인 후 댓글을 작성해주세요.");
                    }
                  }}
                />
                <button
                  onClick={() => {
                    submitReply(replyValue);
                  }}
                  className="flex items-center"
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  <AiOutlineEnter />
                </button>
              </div>
            </div>
            {/* <div className="py-2 flex gap-5 justify-end" style={{}}>
              <button
                style={{
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  onLike(num, sessionStorage.getItem("userid"));
                }}
              >
                {liked ? (
                  <FiHeart
                    style={{
                      color: "pink",
                    }}
                  />
                ) : (
                  <FiHeart />
                )}
              </button>
            </div> */}
          </section>
        </div>

        <Footer />
      </div>
    );
  }
};

export default BoardPost;
