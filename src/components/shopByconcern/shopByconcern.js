import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import "./shopByconcern.css";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
export const ShopByconcern = () => {
  const { getProductsByType } = useContext(ProductContext);
  const featureProducts = getProductsByType("Shop by Concern");
  console.log(featureProducts);
  if (!featureProducts.length) return <div>Loading...</div>;

  // if (dataLoading) return <div>Loading...</div>;
  // if (dataError) return <div>Error: {dataError.message}</div>;

  return (
    <div className="shop-by-concern">
      <div className="shop-by-concern-header">
        <div
          style={{ width: "44%", height: "2px", backgroundColor: "#9C4A1A" }}
        ></div>
        <div>Shop by Concern</div>
        <div
          style={{ width: "44%", height: "2px", backgroundColor: "#9C4A1A" }}
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
        className="concernSwiper"
      >
        {featureProducts.map((concern, index) => (
          <SwiperSlide key={concern.id}>
            <div className="carousel-concern-inner">
              <div key={index} className="concern-product-image">
                <Link to={`/productDetails/${concern.id}`}>
                  <img
                    src={concern.imageUrl}
                    alt={concern.title}
                    width={"40px"}
                    height={"40px"}
                  />
                </Link>
              </div>
              <div className="concern-product-name">{concern.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
