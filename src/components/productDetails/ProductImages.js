import React from "react";
// import "./ProductImages.css";

const ProductImages = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="product-images">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Product Image ${index + 1}`}
          className="product-image"
        />
      ))}
    </div>
  );
};

export default ProductImages;
