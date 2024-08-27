import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomerCard from "../../CustomerCard";
import { Autoplay } from "swiper/modules";

const CustomerSlider = ({ customers }) => {
  return (
    <Swiper
      spaceBetween={20}
      loop={true}
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        280: {
          slidesPerView: 2,
          spaceBetween: 12,
          centeredSlides: true,
        },
        340: {
          slidesPerView: 3,
          spaceBetween: 12,
          centeredSlides: true,
        },
        425: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
        481: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
        1440: {
          slidesPerView: 6,
        },
        1800: {
          slidesPerView: 8,
        },
      }}
    >
      {customers?.map((customer) => (
        <SwiperSlide key={customer.id}>
          <CustomerCard img={customer.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomerSlider;