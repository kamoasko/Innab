import React, { useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersCard from "../../PartnersCard";
import { Autoplay } from "swiper/modules";

const PartnersSlider = ({ partnerSlider, onclick }) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={32}
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        280: {
          slidesPerView: 1,
          spaceBetween: 18,
        },
        480: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
      }}
    >
      {partnerSlider.map((partner) => (
        <SwiperSlide key={partner.id}>
          <PartnersCard
            cardtTitle={partner.name}
            text={partner.short_description}
            img={partner.image}
            onClick={onclick}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PartnersSlider;
