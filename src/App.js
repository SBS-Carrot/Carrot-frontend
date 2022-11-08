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
import ProductPost from "./routes/ProductPost";
import Realtypost from "./components/Realtypost";
import Product from "./routes/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RealtyWrite from "./components/RealtyWrite";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "./recoil/auth";

function App() {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  useEffect(() => {
    setLogined(sessionStorage.getItem("isLogined"));
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home logined={logined} />} />
        <Route path="/trust" element={<Trust logined={logined} />} />
        <Route path="/jobs" element={<Jobs logined={logined} />} />
        <Route
          path="/hot_articles"
          element={<HotArticles logined={logined} />}
        />
        <Route path="/region/:address" element={<Region logined={logined} />} />
        <Route
          path="/region/:address/:addressTwo"
          element={<RegionTwo logined={logined} />}
        />
        <Route path="/realty" element={<Realty logined={logined} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/productPost/:num"
          element={<ProductPost logined={logined} />}
        />
        <Route path="/productWrite" element={<Product logined={logined} />} />
        <Route path="/jobspost/:num" element={<Jobspost logined={logined} />} />
        <Route path="/jobsWrite" element={<JobsWrite logined={logined} />} />
        <Route path="/realtypost" element={<Realtypost logined={logined} />} />
        <Route
          path="/realtyWrite"
          element={<RealtyWrite logined={logined} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
