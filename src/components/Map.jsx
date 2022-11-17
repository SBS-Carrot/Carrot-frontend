/* global kakao */
import React, { useEffect } from "react";
import cn from "classnames";

const { kakao } = window;

const Map = ({ search }) => {
  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(
        37.365264512305174,
        127.10676860117488
      ),
      level: 2,
    };

    let map = new window.kakao.maps.Map(container, options);
    //드래그 막기
    map.setDraggable(false);
    //줌 막기
    map.setZoomable(false);
    console.log("loading kakaomap");
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "780px",
          height: "300px",
        }}
      ></div>
    </div>
  );
};

export default Map;
