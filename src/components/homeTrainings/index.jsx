import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "../../pages/Homepage/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import TrainingsCard from "../TrainingsCard";
import { Scrollbar } from "swiper/modules";
import { useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useParams } from "react-router";

const HomeTrainings = ({ trainings }) => {
  const { width } = useWindowDimensions();
  const { lang } = useParams();
  const [paginationContent, setPaginationContent] = useState("");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  const onSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    updatePagination(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const onSlideChange = (swiper) => {
    updatePagination(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const updatePagination = (swiper) => {
    const currentIndex = swiper.realIndex + 1;
    const totalSlides = swiper.slides.length;
    setPaginationContent(`${currentIndex}/${totalSlides}`);
  };

  const handlePrevClick = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNextClick = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <>
      {width >= 1024 ? (
        <Swiper
          className="trainingSlider"
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          modules={[Scrollbar]}
          onInit={onSwiperInit}
          onSlideChange={onSlideChange}
        >
          <SwiperSlide>
            <div className={styles.trainingsGrid}>
              {trainings.map((training) => (
                <TrainingsCard
                  key={training.id}
                  img={training.icon}
                  title={training.top_text_title}
                  desc={training.short_description}
                />
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={18}
          className="trainingSlider"
          loop={true}
          breakpoints={{
            280: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 2,
            },
            480: {
              spaceBetween: 18,
            },
            767: {
              slidesPerView: 3,
            },
          }}
        >
          {trainings.map((training) => (
            <SwiperSlide key={training.id}>
              <TrainingsCard
                img={training.icon}
                title={training.top_text_title}
                desc={training.short_description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="customPagination">
        <button
          className="prevTraining"
          onClick={handlePrevClick}
          disabled={isBeginning}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="16"
            viewBox="0 0 56 16"
            fill="none"
          >
            <path
              d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM56 7L1 7V9L56 9V7Z"
              fill="#E4E4E4"
            />
          </svg>
        </button>
        <div className="customPagNumbers">{paginationContent}</div>
        <button
          className="nextTraining"
          onClick={handleNextClick}
          disabled={isEnd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="16"
            viewBox="0 0 56 16"
            fill="none"
          >
            <path
              d="M55.7071 8.70711C56.0976 8.31659 56.0976 7.68342 55.7071 7.2929L49.3431 0.928937C48.9526 0.538412 48.3195 0.538412 47.9289 0.928936C47.5384 1.31946 47.5384 1.95263 47.9289 2.34315L53.5858 8L47.9289 13.6569C47.5384 14.0474 47.5384 14.6805 47.9289 15.0711C48.3195 15.4616 48.9526 15.4616 49.3431 15.0711L55.7071 8.70711ZM-8.74228e-08 9L55 9L55 7L8.74228e-08 7L-8.74228e-08 9Z"
              fill="#3138E3"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HomeTrainings;
