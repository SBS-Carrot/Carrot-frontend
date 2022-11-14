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
function App() {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [liked, setLiked] = useState(false);
  const [jobsLiked, setJobsLiked] = useState(false);
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
          path="/productPost/:num"
          element={
            <ProductPost
              logined={logined}
              setLogined={setLogined}
              onLike={onLike}
              liked={liked}
              setLiked={setLiked}
            />
          }
        />
        <Route
          path="/productWrite"
          element={<ProductWrite logined={logined} setLogined={setLogined} />}
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
            />
          }
        />
        <Route
          path="/jobsWrite"
          element={<JobsWrite logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/realtypost/:num"
          element={<Realtypost logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/realtyWrite"
          element={<RealtyWrite logined={logined} setLogined={setLogined} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
