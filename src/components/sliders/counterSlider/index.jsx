import React from "react";
import styles from "../../../pages/Homepage/home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CountUp from "react-countup";
import stats1 from "../../../assets/images/homepage/təlim_növü1.svg";
import stats2 from "../../../assets/images/homepage/işlə_təmin1.svg";
import stats3 from "../../../assets/images/homepage/tələbə1.svg";
import stats4 from "../../../assets/images/homepage/təcrübə1.svg";
import stats5 from "../../../assets/images/homepage/video.svg";
import stats6 from "../../../assets/images/homepage/partnyor2.svg";
import stats7 from "../../../assets/images/homepage/məqalə1.svg";

const statisticsData = [
  { img: stats1, count: 25, label: "Təlim növü", className: "statsCard1" },
  {
    img: stats2,
    count: 25,
    label: "İşlə təmin sayı",
    className: "statsCard2",
  },
  {
    img: stats3,
    count: 15000,
    label: "Maariflənən tələbə",
    className: "statsCard3",
  },
  { img: stats4, count: 8, label: "İllik təcrübə", className: "statsCard4" },
  {
    img: stats5,
    count: 900,
    label: "Öyrədici video",
    className: "statsCard3",
  },
  {
    img: stats6,
    count: 200,
    label: "Partnyorlar",
    className: "statsCard2",
  },
  { img: stats7, count: 200, label: "Məqalə", className: "statsCard1" },
];

const CounterSlider = ({
  onSwiperInit,
  onSlideChange,
  formatCount,
  isVisible,
}) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={5}
      loop={true}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      breakpoints={{
        280: {
          slidesPerView: 2,
        },
        330: {
          slidesPerView: 3,
        },
        375: {
          slidesPerView: 3,
        },
        650: {
          slidesPerView: 4,
        },
        820: {
          slidesPerView: 5,
        },
      }}
      onInit={onSwiperInit}
      onSlideChange={onSlideChange}
    >
      {statisticsData.map((stat, index) => (
        <SwiperSlide key={index}>
          <div className={`${styles.statisticsCard}`}>
            <div>
              <img loading="lazy" src={stat.img} alt="" />
            </div>
            <p>
              {isVisible ? (
                <CountUp
                  end={stat.count}
                  duration={2}
                  formattingFn={formatCount}
                />
              ) : (
                0
              )}
              +
            </p>
            <span>{stat.label}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CounterSlider;
