import React from "react";
import { Routes, useParams } from "react-router-dom";
import Header from "../layouts/Header";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Region = () => {
  const navigate = useNavigate();
  const { address } = useParams();
  return (
    <div>
      <Header />
      <span>{address} 입니다.</span>
    </div>
  );
};

export default Region;
