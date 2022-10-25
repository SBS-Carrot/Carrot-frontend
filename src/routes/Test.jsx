import { useState } from "react";
import Header from "../layouts/Header";
import axios from "axios";
const Test = () => {
  const [name, setName] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [countValue, setCountValue] = useState("");

  const onpriceChange = (e) => {
    setPriceValue(e.target.value);
  };
  const oncountChange = (e) => {
    setCountValue(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (name, priceValue, countValue) => {
    try {
      const data = await axios.post(`http://localhost:8083/createProduct`, {
        productName: name,
        productPrice: priceValue,
        productStock: countValue,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Header />
      <div
        style={{
          width: "800px",
          margin: "0 auto",
          height: "600px",
          border: "1px black solid",
          borderRadius: "10px",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="상품이름"
            value={name}
            onChange={onNameChange}
            style={{
              border: "1px black solid",
              borderRadius: "10px",
            }}
          />
          <input
            type="text"
            placeholder="상품가격"
            value={priceValue}
            onChange={onpriceChange}
            style={{
              border: "1px black solid",
              borderRadius: "10px",
            }}
          />
          <input
            type="text"
            placeholder="상품갯수"
            value={countValue}
            onChange={oncountChange}
            style={{
              border: "1px black solid",
              borderRadius: "10px",
            }}
          />
          <button
            onClick={() => {
              onSubmit(name, priceValue, countValue);
            }}
          >
            데이터전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
