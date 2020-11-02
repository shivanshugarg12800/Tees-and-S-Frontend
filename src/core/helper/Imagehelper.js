import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  return (
    <img
      src={imageUrl}
      alt=""
      style={{ maxHeight: "400px", maxWidth: "100%" }}
      className=" card-img-top mb-3 rounded"
    />
  );
};
export default ImageHelper;
