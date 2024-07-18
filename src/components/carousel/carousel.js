import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./carousel.css";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Carousel = (props) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleMouseEnter = (cardName) => {
    console.log(cardName);
    setActiveCard(cardName);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {props?.featureProducts?.map((item, index) => {
        return (
          <SwiperSlide key={item.id}>
            <div className="carousel-inner">
              <div key={index} className="feature-product-image">
                <Link to={`/productDetails/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.description}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  />
                </Link>

                {JSON.stringify(activeCard == item.id && item?.toBeLaunched) ==
                "true" ? (
                  <div className="to-be-launch-card">To be launched</div>
                ) : null}
              </div>
              <div className="feature-product-name">{item.name}</div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
