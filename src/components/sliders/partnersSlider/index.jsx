import React, { useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersCard from "../../PartnersCard";
import { Autoplay } from "swiper/modules";
import partnerCardBg from "../../../assets/images/homepage/partners.jpeg";
import partnerCardBg1 from "../../../assets/images/homepage/partners1.png";
import partnerCardBg2 from "../../../assets/images/homepage/partners2.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchPartners } from "../../../features/partners/partnersSlice";

const PartnersSlider = ({ partnerSlider, onclick }) => {
  // const dispatch = useDispatch();
  // const { lang } = useParams();
  // const { partners, status, error } = useSelector((state) => state.partners);

  // useEffect(() => {
  //   dispatch(fetchPartners(lang));
  // }, [lang, dispatch]);

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
