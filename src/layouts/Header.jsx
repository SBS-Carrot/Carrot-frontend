import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";

const Header = () => {
  const [logined, setLogined] = useRecoilState(authenticatedState);

  return (
    <div>
      <span>헤드입니다</span>
    </div>
  );
};

export default Header;
