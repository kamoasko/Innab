import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "../../pages/Homepage/home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useParams } from "react-router";
import { useStatistics } from "../../features/statistics/statisticSlice";
import CountUp from "react-countup";

const StatisticCard = React.memo(
  ({ stat, isVisible, formatCount, className, lang }) => (
    <div className={`${styles.statisticsCard} ${className}`}>
      <div>
        <img
          loading="lazy"
          src={`https://admin.innab.coder.az/${stat.image.url}`}
          alt={stat.sub_text[lang]}
        />
      </div>
      <p>
        {isVisible ? (
          <CountUp
            end={stat.center_text}
            duration={2}
            formattingFn={formatCount}
          />
        ) : (
          0
        )}
        +
      </p>
      <span>{stat.sub_text.az}</span>
    </div>
  )
);

const StatsCounter = () => {
  const { lang } = useParams();
  const { data: statistics, status, error } = useStatistics(lang);
  const { width } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const formatCount = useCallback(
    (count) => {
      if (count >= 1000 && width <= 1024) {
        return `${(count / 1000).toFixed(0)}k`;
      }
      return count;
    },
    [width]
  );

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

  const cardClasses = useMemo(() => {
    return [
      styles.statsCard1,
      styles.statsCard2,
      styles.statsCard3,
      styles.statsCard4,
      styles.statsCard3,
      styles.statsCard2,
      styles.statsCard1,
    ];
  }, []);

  const getCardClass = (index) => cardClasses[index % cardClasses.length];

  return (
    <div
      className={`${styles.statistics} stats flex alignItemsCenter justifyContentBetween`}
      ref={statsRef}
    >
      {status === "pending" &&
        [...Array(7)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={127}
            height={123}
            className={getCardClass(index)}
            animation="wave"
            sx={{
              borderRadius: "1.06rem",
              zIndex: 1,
              backgroundColor: "var(--color-white)",
              boxShadow: "0px 0px 4.424px 0px rgba(91, 89, 89, 0.13)",
            }}
          />
        ))}
      {status === "error" && <p>{error}</p>}
      {status === "success" && (
        <>
          {width >= 1024 ? (
            statistics.map((stat, index) => (
              <StatisticCard
                key={stat.id}
                stat={stat}
                lang={lang}
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
};

export default StatsCounter;
