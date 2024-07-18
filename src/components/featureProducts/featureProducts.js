import React, { useEffect, useContext } from "react";
import "./featureProducts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel } from "../carousel/carousel";
import { ProductContext } from "../../context/ProductContext"; // Import the correct context
import { Link } from "react-router-dom";
export const Featureproducts = () => {
  const { getProductsByType } = useContext(ProductContext);
  const featureProducts = getProductsByType("Shop by Category");
  console.log(featureProducts);
  if (!featureProducts.length) return <div>Loading...</div>;

  return (
    <div className="feature-products">
      <div className="feature-product-heading">
        <div
          style={{ width: "43%", height: "2px", backgroundColor: "#9C4A1A" }}
        ></div>
        <div>Shop by Category</div>
        <div
          style={{ width: "43%", height: "2px", backgroundColor: "#9C4A1A" }}
        ></div>
      </div>
      <div className="feature-product-carousel">
        <Carousel featureProducts={featureProducts} />
      </div>
    </div>
  );
};
