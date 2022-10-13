import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import Jobs from "./routes/Jobs";
import HotArticles from "./routes/HotArticles";
import Region from "./routes/Region";
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
      </Routes>
    </Router>
  );
}

export default App;
