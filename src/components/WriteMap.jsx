/* global kakao */
import React, { useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";
const { kakao } = window;
// Authorization: KakaoAK 5746dccb1aec4544a4fc066fca39ccc6
const WriteMap = ({ searchPlace }) => {
  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  useEffect(() => {
    if (searchPlace === "") return;
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    var geocoder = new kakao.maps.services.Geocoder();
    const getData = async () => {
      const data = await axios({
        headers: { Authorization: "KakaoAK 5746dccb1aec4544a4fc066fca39ccc6" },
        method: "GET",
        url: `http://dapi.kakao.com/v2/local/search/keyword.json?query=${searchPlace}&page=1&size=15`,
      });
      const placeAddress =
        data.data.meta.same_name.selected_region +
        " " +
        data.data.meta.same_name.keyword;
      geocoder.addressSearch(placeAddress, (result, status) => {
        placesSearchCB(result, status);
      });
    };
    getData();

    // ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [searchPlace]);

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: "400px",
          height: "300px",
          border: "1px #d5d5d5 solid",
        }}
      ></div>
    </div>
  );
};
export default WriteMap;
