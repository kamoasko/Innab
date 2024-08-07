import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersCard from "../../PartnersCard";
import { Autoplay } from "swiper/modules";
import partnerCardBg from "../../../assets/images/homepage/partners.jpeg";
import partnerCardBg1 from "../../../assets/images/homepage/partners1.png";
import partnerCardBg2 from "../../../assets/images/homepage/partners2.jpeg";

const PartnersSlider = () => {
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
      <SwiperSlide>
        <PartnersCard
          cardtTitle={"Technest layihəsi."}
          text={"İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"}
          img={partnerCardBg}
        />
      </SwiperSlide>
      <SwiperSlide>
        <PartnersCard
          cardtTitle={"Technest layihəsi."}
          text={"İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"}
          img={partnerCardBg1}
        />
      </SwiperSlide>
      <SwiperSlide>
        <PartnersCard
          cardtTitle={"Technest layihəsi."}
          text={"İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"}
          img={partnerCardBg2}
        />
      </SwiperSlide>
      <SwiperSlide>
        <PartnersCard
          cardtTitle={"Technest layihəsi."}
          text={"İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"}
          img={partnerCardBg2}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default PartnersSlider;
