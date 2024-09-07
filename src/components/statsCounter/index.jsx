import React, { useEffect, useRef, useState } from "react";
import styles from "../../pages/Homepage/home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchStatistics } from "../../features/statistics/statisticSlice";
import CountUp from "react-countup";

const StatisticCard = ({ stat, isVisible, formatCount, className }) => (
  <div className={`${styles.statisticsCard} ${className}`}>
    <div>
      <img loading="lazy" src={stat.icon} alt={stat.text} />
    </div>
    <p>
      {isVisible ? (
        <CountUp end={stat.count} duration={2} formattingFn={formatCount} />
      ) : (
        0
      )}
      +
    </p>
    <span>{stat.text}</span>
  </div>
);

const StatsCounter = React.memo(() => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { statistics, status, error } = useSelector(
    (state) => state.statistics
  );
  const { width } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const formatCount = (count) => {
    if (count >= 1000 && width <= 1024) {
      return `${(count / 1000).toFixed(0)}k`;
    }
    return count;
  };

  useEffect(() => {
    dispatch(fetchStatistics(lang));
  }, [lang, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const getCardClass = (index) => {
    const classes = [
      styles.statsCard1,
      styles.statsCard2,
      styles.statsCard3,
      styles.statsCard4,
      styles.statsCard3,
      styles.statsCard2,
      styles.statsCard1,
    ];
    return classes[index % classes.length];
  };

  return (
    <div
      className={`${styles.statistics} stats flex alignItemsCenter justifyContentBetween`}
      ref={statsRef}
    >
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <>
          {width >= 1024 ? (
            statistics.map((stat, index) => (
              <StatisticCard
                key={stat.id}
                stat={stat}
                isVisible={isVisible}
                formatCount={formatCount}
                className={getCardClass(index)}
              />
            ))
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              loop={true}
              autoplay={{ delay: 3000 }}
              modules={[Autoplay]}
              breakpoints={{
                280: { slidesPerView: 2 },
                330: { slidesPerView: 3 },
                375: { slidesPerView: 3 },
                650: { slidesPerView: 4 },
                820: { slidesPerView: 5 },
              }}
            >
              {statistics.map((stat) => (
                <SwiperSlide key={stat.id}>
                  <StatisticCard
                    stat={stat}
                    isVisible={isVisible}
                    formatCount={formatCount}
                    className={styles.statisticsCard}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </div>
  );
});

export default StatsCounter;
