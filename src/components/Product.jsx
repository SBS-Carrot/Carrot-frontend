import React from "react";
import axios from "axios";
import { FaCarrot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Product = ({ posts, loading }) => {
  const navigate = useNavigate();
  if (loading) {
    return <h2>...loading</h2>;
  }
  const moveProduct = async (id) => {
    try {
      await axios({
        url: `http://localhost:8083/productView/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/productpost/${id}`);
  };
  return (
    <ul className="grid grid-cols-4">
      {posts.map((product, index) => (
        <li key={index}>
          <button
            onClick={() => {
              moveProduct(product.productId);
            }}
          >
            <div
              style={{
                paddingTop: "3rem",
                paddingLeft: "10px",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "15px",

                  marginBottom: "10px",
                }}
              >
                {product.profileImage != null ? (
                  <img
                    src={product.profileImage}
                    alt=""
                    style={{
                      borderRadius: "15px",
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      display: "block",
                    }}
                  />
                ) : (
                  <FaCarrot
                    style={{
                      color: "#fc9d39",
                      fontSize: "10rem",
                      transform: "translate(12.5%,12.5%)",
                      border: "0.1px #fc9d39 solid",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
              <div
                className="ellipsis_1"
                style={{
                  width: "200px",
                  height: "25px",
                  textAlign: "start",
                }}
              >
                <span>{product.productSubject}</span>
              </div>
              <div className="flex ">
                <span
                  className="ellipsis_1"
                  style={{
                    fontWeight: "bold",
                    width: "100px",
                    height: "20px",

                    textAlign: "start",
                  }}
                >
                  {product.productPrice}원
                </span>
              </div>
              <div
                className="flex"
                style={{
                  fontSize: "0.9rem",
                }}
              >
                <span>부산 진구 부전동</span>
              </div>
              <div
                className="flex"
                style={{
                  paddingBottom: "3rem",
                  fontSize: "0.8rem",
                  color: "gray",
                }}
              >
                <span>관심 {product.productLike}</span>
                &nbsp; ·&nbsp;
                <span>채팅 {product.productChatting}</span>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Product;
