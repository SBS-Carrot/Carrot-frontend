import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import Jobs from "./routes/Jobs";
import Realty from "./routes/Realty";
import HotArticles from "./routes/HotArticles";
import Login from "./routes/Login";
import Join from "./routes/Join";
import Jobspost from "./components/Jobspost";
import JobsWrite from "./components/JobsWrite";
import ProductPost from "./components/ProductPost";
import Realtypost from "./components/Realtypost";
import ProductWrite from "./components/ProductWrite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RealtyWrite from "./components/RealtyWrite";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "./recoil/auth";
import MyPage from "./routes/MyPage";
import axios from "axios";
import Security from "./routes/Security";
import ArticleControl from "./routes/ArticleControl";
import AllProduct from "./components/AllProduct";
import AllJobs from "./components/AllJobs";
import AllRealty from "./components/AllRealty";
import ChangePassword from "./routes/ChangePassword";
import Board from "./routes/Board";
import ProductEdit from "./components/ProductEdit";
import BoardWrite from "./components/BoardWrite";
import Chat from "./routes/Chat";
import BoardPost from "./components/BoardPost";
import JobsApplyWrite from "./components/JobsApplyWrite";
import Alert from "./components/Alert";
import RealtySearch from "./components/RealtySearch";
import JobsSearch from "./components/JobsSearch";
import JobsApply from "./components/JobsApplyWrite";
import JobsApplyView from "./components/JobsApplyView";
import ChatList from "./routes/ChatList";
import JobsEdit from "./components/JobsEdit";
import BoardEdit from "./components/BoardEdit";
import Search from "./routes/Search";
import SearchEmpty from "./routes/SearchEmpty";
import RealtyEdit from "./components/RealtyEdit";
import { BACKEND_URL } from "./config/config";

function App() {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [liked, setLiked] = useState(false);
  const [jobsLiked, setJobsLiked] = useState(false);
  const [realtyLiked, setRealtyLiked] = useState(false);
  const [boardLiked, setBoardLiked] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);

  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  const [replyToggle, setReplyToggle] = useState(false);
  const onReplyMenuToggle = () => {
    setReplyToggle(!replyToggle);
  };

  const [replyDelete, setReplyDelete] = useState(false);
  const onReplyDeleteT = () => {
    setReplyDelete(!replyDelete);
  };

  const [deleteToggle, setDeleteTogge] = useState(false);
  const onDeleteToggle = () => {
    setDeleteTogge(!deleteToggle);
  };

  const [editToggle, setEditToggle] = useState(false);
  const onEditToggle = () => {
    setEditToggle(!editToggle);
  };

  useEffect(() => {
    if (sessionStorage.getItem("userid") == null) {
      setLogined(false);
    }
  }, []);

  const onLike = async (articleid, userid) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}:8083/likeProduct/${articleid}`,
        method: "GET",
        params: {
          productId: articleid,
          userid,
        },
      });
      setLiked(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onJobsLike = async (articleid, userid) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}:8083/likeJob/${articleid}`,
        method: "GET",
        params: {
          jobId: articleid,
          userid,
        },
      });
      setJobsLiked(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onRealtyLike = async (articleid, userid) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}:8083/likeRealty/${articleid}`,
        method: "GET",
        params: {
          realtyId: articleid,
          userid,
        },
      });
      setRealtyLiked(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onBoardLike = async (articleid, userid) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}:8083/likeBoard/${articleid}`,
        method: "GET",
        params: {
          boardId: articleid,
          userid,
        },
      });
      setBoardLiked(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onRemove = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/productDelete/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onRemoveJobs = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/jobsDelete/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onRemoveRealty = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/realtyDelete/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveBoard = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/boardDelete/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveReply = async (replyId) => {
    try {
      await axios({
        url: `http://localhost:8083/replyDelete/${replyId}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/trust"
          element={<Trust logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/jobs"
          element={<Jobs logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/hot_articles"
          element={<HotArticles logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/realty"
          element={<Realty logined={logined} setLogined={setLogined} />}
        />
        <Route path="/join" element={<Join />} />

        <Route path="/login" element={<Login logined={logined} />} />
        <Route
          path="/mypage"
          element={<MyPage logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/security"
          element={<Security logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/articleControl"
          element={<ArticleControl logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/chatList"
          element={<ChatList logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/allProduct"
          element={<AllProduct logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/productPost/:num"
          element={
            <ProductPost
              logined={logined}
              setLogined={setLogined}
              onLike={onLike}
              liked={liked}
              setLiked={setLiked}
              menuToggle={menuToggle}
              onMenuToggle={onMenuToggle}
              setMenuToggle={setMenuToggle}
              deleteToggle={deleteToggle}
              onDeleteToggle={onDeleteToggle}
              onRemove={onRemove}
              editToggle={editToggle}
              onEditToggle={onEditToggle}
            />
          }
        />
        <Route
          path="/productWrite"
          element={<ProductWrite logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/productedit/:num"
          element={<ProductEdit logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/allJobs"
          element={<AllJobs logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/jobspost/:num"
          element={
            <Jobspost
              logined={logined}
              setLogined={setLogined}
              onJobsLike={onJobsLike}
              jobsLiked={jobsLiked}
              setJobsLiked={setJobsLiked}
              menuToggle={menuToggle}
              onMenuToggle={onMenuToggle}
              setMenuToggle={setMenuToggle}
              deleteToggle={deleteToggle}
              onDeleteToggle={onDeleteToggle}
              onRemoveJobs={onRemoveJobs}
              editToggle={editToggle}
              onEditToggle={onEditToggle}
            />
          }
        />
        <Route
          path="/jobsedit/:num"
          element={<JobsEdit logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/jobsWrite"
          element={<JobsWrite logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/jobssearch/:search"
          element={<JobsSearch logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/allrealty"
          element={<AllRealty logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/realtypost/:num"
          element={
            <Realtypost
              logined={logined}
              setLogined={setLogined}
              setRealtyLiked={setRealtyLiked}
              realtyLiked={realtyLiked}
              onRealtyLike={onRealtyLike}
              menuToggle={menuToggle}
              onMenuToggle={onMenuToggle}
              setMenuToggle={setMenuToggle}
              deleteToggle={deleteToggle}
              onDeleteToggle={onDeleteToggle}
              onRemoveRealty={onRemoveRealty}
              editToggle={editToggle}
              onEditToggle={onEditToggle}
            />
          }
        />
        <Route
          path="/realtyWrite"
          element={<RealtyWrite logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/realtysearch/:search"
          element={<RealtySearch logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/realtyEdit/:num"
          element={<RealtyEdit logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/changepassword"
          element={<ChangePassword logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/board"
          element={<Board logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/BoardWrite"
          element={<BoardWrite logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/chat/:roomId"
          element={<Chat logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/boardpost/:num"
          element={
            <BoardPost
              logined={logined}
              setLogined={setLogined}
              setRealtyLiked={setRealtyLiked}
              realtyLiked={realtyLiked}
              onRealtyLike={onRealtyLike}
              menuToggle={menuToggle}
              onMenuToggle={onMenuToggle}
              replyToggle={replyToggle}
              onReplyMenuToggle={onReplyMenuToggle}
              setReplyToggle={setReplyToggle}
              setMenuToggle={setMenuToggle}
              deleteToggle={deleteToggle}
              onDeleteToggle={onDeleteToggle}
              replyDelete={replyDelete}
              onReplyDeleteT={onReplyDeleteT}
              onRemoveReply={onRemoveReply}
              onRemoveBoard={onRemoveBoard}
              editToggle={editToggle}
              onEditToggle={onEditToggle}
              boardLiked={boardLiked}
              onBoardLike={onBoardLike}
              setBoardLiked={setBoardLiked}
            />
          }
        />
        <Route
          path="/JobsApplyWrite/:num"
          element={<JobsApplyWrite logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="JobsApplyView/:num"
          element={<JobsApplyView logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/boardedit/:num"
          element={<BoardEdit logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/JobsApply/:num"
          element={<JobsApply logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/search/:search"
          element={<Search logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/search"
          element={<SearchEmpty logined={logined} setLogined={setLogined} />}
        />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
