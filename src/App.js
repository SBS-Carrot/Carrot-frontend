import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import Jobs from "./routes/Jobs";
import HotArticles from "./routes/HotArticles";
import Region from "./routes/Region";
import RegionTwo from "./routes/RegionTwo";
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
      </Routes>
    </Router>
  );
}

export default App;
