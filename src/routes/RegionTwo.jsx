import React from "react";
import { Routes, useParams } from "react-router-dom";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
const RegionTwo = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const { addressTwo } = useParams();
  if (logined) {
    return (
      <div>
        <LoginedHeader setLogined={setLogined} />
        <span>{addressTwo}입니다.</span>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <span>{addressTwo}입니다.</span>
        <Footer />
      </div>
    );
  }
};

export default RegionTwo;
