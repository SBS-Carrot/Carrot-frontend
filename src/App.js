import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import Jobs from "./routes/Jobs";
import Realty from "./routes/Realty";
import HotArticles from "./routes/HotArticles";
import Region from "./routes/Region";
import Login from "./routes/Login";
import RegionTwo from "./routes/RegionTwo";
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
import JobsApply from "./components/JobsApply";

function App() {
  const [listening, setListening] = useState(false);
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  let eventSource = undefined;

  const onDatas = (target) => {
    setDatas(target);
  };
  //알림예시 항해99 프론트 https://github.com/HangHae99-FinalProject/FinalProject-React/blob/master/src/components/Alert.js
  //알림예시 항해99 백 https://github.com/HangHae99-FinalProject/FinalProject-Spring/blob/master/src/main/java/com/hanghae99/finalproject/sse/service/NotificationService.java

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource("http://localhost:8083/sse");

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        data.push(event.data);
        console.log(data);
      };
      onDatas(data);
      //   eventSource.addEventListener("Progress", (event) => {
      //     const result = JSON.parse(event.data);
      //     console.log("received:", result);
      //   });

      eventSource.onerror = (event) => {
        console.log(event.target);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("SSE closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log("event closed");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect");
    setDatas(data);
  }, [data]);
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [liked, setLiked] = useState(false);
  const [jobsLiked, setJobsLiked] = useState(false);
  const [realtyLiked, setRealtyLiked] = useState(false);

  const [menuToggle, setMenuToggle] = useState(false);
  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
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
  const onLogin = async (idValue, pwValue) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/loginUser`,
        method: "POST",
        data: {
          userid: idValue,
          password: pwValue,
        },
      });
      if (data.data == false) {
        alert("로그인 정보가 일치하지 않습니다.");
      } else {
        const logined = data.data.substring(0, 4);
        const userid = data.data.substring(4);
        sessionStorage.setItem("isLogined", logined);
        sessionStorage.setItem("userid", userid);
        setLogined(sessionStorage.getItem("isLogined"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onLike = async (articleid, userid) => {
    try {
      const data = await axios({
        url: `http://localhost:8083/likeProduct/${articleid}`,
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
        url: `http://localhost:8083/likeJob/${articleid}`,
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
        url: `http://localhost:8083/likeRealty/${articleid}`,
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
          path="/region/:address"
          element={<Region logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/region/:address/:addressTwo"
          element={<RegionTwo logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/realty"
          element={<Realty logined={logined} setLogined={setLogined} />}
        />
        <Route path="/join" element={<Join />} />

        <Route
          path="/login"
          element={<Login onLogin={onLogin} logined={logined} />}
        />
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
          path="/jobsWrite"
          element={<JobsWrite logined={logined} setLogined={setLogined} />}
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
          path="/boardpost"
          element={<BoardPost logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/JobsApply/:num"
          element={<JobsApply logined={logined} setLogined={setLogined} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
