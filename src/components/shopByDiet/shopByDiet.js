import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import GlutenFreeIcon from "../../assets/images/gluttenfree.jpg";
// import VeganIcon from '../../assets/images/Vegan.svg';
// import KetoIcon from '../../assets/images/keto.svg';
// import SugarFreeIcon from '../../assets/images/SugarFree.svg';
// import DiabeticFriendlyIcon from '../../assets/images/Diabeticfriendly (1).svg';
import "./shopByDiet.css";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
// const dietProducts = [
//   {
//     productId: "19818919881",
//     productName: "Gluten-Free",
//     productImage: GlutenFreeIcon
//   },{
//     productId: "19818919881",
//     productName: "Vegan",
//     productImage: GlutenFreeIcon
//   },
//   {
//     productId: "19818919881",
//     productName: "Keto",
//     productImage: GlutenFreeIcon
//   },{
//     productId: "19818919881",
//     productName: "Sugar-Free",
//     productImage: GlutenFreeIcon
//   },
//   {
//     productId: "19818919881",
//     productName: "Diabetic-Friendly",
//     productImage: GlutenFreeIcon
//   }
// ]

export const ShopByDiet = () => {
  const { bannerData, dataLoading, dataError } = useContext(AuthContext);
  const { getProductsByType } = useContext(ProductContext);
  const featureProducts = getProductsByType("Shop by Diet");
  console.log(featureProducts);
  if (!featureProducts.length) return <div>Loading...</div>;

  return (
    <div className="shop-by-diet">
      <div className="shop-by-diet-header">
        <div
          style={{ width: "45%", height: "2px", backgroundColor: "#9C4A1A" }}
        ></div>
        <div>Shop by Diet</div>
        <div
          style={{ width: "45%", height: "2px", backgroundColor: "#9C4A1A" }}
        ></div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        hashNavigation={{
          watchState: true,
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="dietSwiper"
      >
        {featureProducts?.map((diet, index) => {
          return (
            <SwiperSlide key={diet.id}>
              <div className="carousel-diet-inner">
                <div key={index} className="diet-product-image">
                  {/* <div className='image-circle' style={{height:"100px",width:"100px",borderRadius:"50%",backgroundColor:"transparent",border: " 2px solid #9C4A1A",padding: "8px"}}> */}
                  <Link to={`/productDetails/${diet.id}`}>
                    <img
                      src={diet.imageUrl}
                      alt={diet.description}
                      width={"40px"}
                      height={"40px"}
                    />
                  </Link>
                </div>
                {/* </div> */}
                <div className="diet-product-name">{diet.name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
