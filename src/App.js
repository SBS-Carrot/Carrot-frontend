import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import Jobs from "./routes/Jobs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
  );
}

export default App;
