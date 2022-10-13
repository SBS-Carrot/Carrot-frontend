import React, { useState } from "react";
import Home from "./routes/Home";
import Realty from "./routes/Realty";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/realty" element={<Realty />} />
      </Routes>
    </Router>
  );
}

export default App;
