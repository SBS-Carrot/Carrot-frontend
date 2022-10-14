import React, { useState } from "react";
import Home1 from "./routes/Home1";
import Realty from "./routes/Realty";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/realty" element={<Realty />} />
      </Routes>
    </Router>
  );
}

export default App;
