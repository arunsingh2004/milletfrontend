import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import "./ShopBycustomization.css";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
export const ShopBycustomization = () => {
  // const { bannerData, dataLoading, dataError } = useContext(AuthContext);
  const { bannerData, dataLoading, dataError } = useContext(AuthContext);
  const { getProductsByType } = useContext(ProductContext);
  const featureProducts = getProductsByType("Shop by Customization");
  console.log(featureProducts);
  if (!featureProducts.length) return <div>Loading...</div>;

  return (
    <div className="shop-by-customize">
      <div className="shop-by-customize-header">
        <div
          style={{ width: "42%", height: "2px", backgroundColor: "#9C4A1A" }}
        ></div>
        <div>Shop by Customization</div>
        <div
          style={{ width: "42%", height: "2px", backgroundColor: "#9C4A1A" }}
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
        className="customizeSwiper"
      >
        {featureProducts.map((customize, index) => (
          <SwiperSlide key={customize.id}>
            <div className="carousel-customize-inner">
              <div key={index} className="customize-product-image">
                <Link to={`/productDetails/${customize.id}`}>
                  <img
                    src={customize.imageUrl}
                    alt={customize.title}
                    width={"40px"}
                    height={"40px"}
                  />
                </Link>
              </div>
              <div className="customize-product-name">{customize.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
