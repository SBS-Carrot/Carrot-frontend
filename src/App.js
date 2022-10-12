import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trust" element={<Trust />} />
      </Routes>
    </Router>
  );
}

export default App;
