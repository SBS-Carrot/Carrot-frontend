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

import Articles from "./routes/Articles";

import Test from "./routes/Test";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/hot_articles" element={<HotArticles />} />
        <Route path="/region/:address" element={<Region />} />
        <Route path="/region/:address/:addressTwo" element={<RegionTwo />} />
        <Route path="/realty" element={<Realty />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />

        <Route path="/articles/:num" element={<Articles />} />

        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
