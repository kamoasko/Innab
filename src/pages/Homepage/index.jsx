import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "./home.module.css";
import hero from "../../assets/images/homepage/hero.jpeg";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SectionTitle from "../../components/SectionTitle";
import { NavLink } from "react-router-dom";
import sql from "../../assets/images/homepage/SQL.png";
import mysql from "../../assets/images/homepage/mysql.png";
import TrainingsCard from "../../components/TrainingsCard";
import ProjectSliders from "../../components/sliders/ProjectSlider";
import UsefulCard from "../../components/UsefulCard";
import Customers from "../../components/Customers";
import Contact from "../../components/Contact";
import Button from "../../components/Button";
import StatsCounter from "../../components/statsCounter";
import PartnersSection from "../../components/partnersSection";

const Homepage = () => {
  const { width } = useWindowDimensions();
  const [paginationContent, setPaginationContent] = useState("");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);
  const contactRef = useRef(null);

  const handleScrollToContact = () => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  };

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
      <section
        className={styles.hero}
        style={{
          background: `
            linear-gradient(180deg, var(--color-main) 3%, rgba(0, 0, 0, 0.3) 100%), 
            linear-gradient(270deg, rgba(0, 0, 0, 0.3) 5%, rgba(5, 5, 5, 0.1) 10%),
            linear-gradient(45deg, rgba(0, 0, 0, 0.3) 5%, rgba(5, 5, 5, 0.1) 10%),
            url(${hero}) rgba(247, 247, 254, 0.87) center / cover no-repeat
          `,
        }}
      >
        <div className="container" style={{ height: "100%" }}>
          <div className={`${styles.heroWrapper} flex flexDirectionColumn`}>
            <div
              className={`${styles.heroTitle} flex flexDirectionColumn alignItemsCenter`}
            >
              <h1>Peşəkar inkişafınız üçün fərdi və korporativ təlimlər.</h1>
              <Button title={"Müraciət et"} to={"#contact"} color="orange" />
            </div>

            <StatsCounter />
          </div>
        </div>
      </section>
      <section className={`${styles.trainings} trainings`}>
        <SectionTitle title={"Təlimlər"} />
        <div className="container">
          <nav className={styles.trainingsNavbar}>
            <ul
              className={`${styles.trainingsNavbarMenu} tnMenu flex alignItemsCenter justifyContentBetween`}
            >
              <li>
                <NavLink className="flexCenter flexDirectionColumn">
                  <h3>Data analitika</h3> <span>&#123; inData &#125;</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="flexCenter flexDirectionColumn">
                  <h3>Mühasibatlıq</h3> <span>&#123; inFinance &#125;</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="flexCenter flexDirectionColumn">
                  <h3> Kompüter bilikləri</h3>
                  <span>&#123; inOffice &#125;</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="flexCenter flexDirectionColumn">
                  <h3>İnsan resursları</h3> <span>&#123; inHR &#125;</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="flexCenter flexDirectionColumn">
                  <h3>Yumşaq səriştələr</h3>
                  <span>&#123; İnSoftSkills &#125;</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="flexCenter flexDirectionColumn">
                  <h3>Digər təlimlər</h3> <span>&#123; İnBusiness &#125;</span>
                </NavLink>
              </li>
            </ul>
          </nav>

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
                  <TrainingsCard
                    img={sql}
                    title={"SQL"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={sql}
                    title={"SQL"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.trainingsGrid}>
                  <TrainingsCard
                    img={sql}
                    title={"SQL"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={sql}
                    title={"SQL"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                  <TrainingsCard
                    img={mysql}
                    title={"Ms Excel"}
                    desc={
                      "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                    }
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          ) : (
            <Swiper
              slidesPerView={3}
              spaceBetween={18}
              className="trainingSlider"
              loop={true}
              // modules={[Autoplay]}
              // autoplay={{ delay: 3000 }}
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
              <SwiperSlide>
                <TrainingsCard
                  img={sql}
                  title={"SQL"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={sql}
                  title={"SQL"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <TrainingsCard
                  img={mysql}
                  title={"Ms Excel"}
                  desc={
                    "SQL kursları ilə sizə Data Analitkasını başqa bir aspektdən öyrənəcəksiniz. SQL kurslarında iştirak edərək siz, Data"
                  }
                />
              </SwiperSlide>
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
        </div>
      </section>

      <PartnersSection onClick={handleScrollToContact} />

      <section className={styles.projects}>
        <SectionTitle title={"Lahiyələr"} />
        <div className="container">
          <ProjectSliders />
        </div>
      </section>
      <section className={styles.useful}>
        <SectionTitle title={"Sizə faydalı"} />
        <div className="container">
          <div className={styles.usefulGrid}>
            <UsefulCard
              title={"Video dərslər"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.4 17H45.6C45.6487 17 45.6975 17 45.7463 17C46.7385 16.9998 47.7596 16.9996 48.6344 17.0711C49.6106 17.1509 50.8358 17.344 52.0859 17.9809C53.7794 18.8438 55.1562 20.2206 56.0191 21.9141C56.6561 23.1642 56.8492 24.3894 56.9289 25.3656C57.0004 26.2404 57.0002 27.2616 57 28.2538V43.7462C57.0002 44.7384 57.0004 45.7596 56.9289 46.6344C56.8492 47.6106 56.6561 48.8358 56.0191 50.0859C55.1562 51.7794 53.7794 53.1562 52.0859 54.0191C50.8358 54.656 49.6106 54.8491 48.6344 54.9289C47.7596 55.0004 46.7385 55.0002 45.7463 55C45.6975 55 45.6487 55 45.6 55H18.4C18.3514 55 18.3026 55 18.2538 55C17.2616 55.0002 16.2405 55.0004 15.3657 54.9289C14.3895 54.8491 13.1643 54.656 11.9141 54.0191C10.2207 53.1562 8.84384 51.7794 7.98098 50.0859C7.34399 48.8358 7.1509 47.6106 7.07114 46.6344C6.99966 45.7596 6.99984 44.7385 7.00002 43.7463C7.00003 43.6974 7.00003 43.6487 7.00003 43.6V28.4C7.00003 28.3513 7.00003 28.3026 7.00002 28.2537C6.99984 27.2615 6.99966 26.2404 7.07114 25.3656C7.1509 24.3894 7.34399 23.1642 7.98098 21.9141C8.84384 20.2206 10.2207 18.8438 11.9141 17.9809C13.1643 17.344 14.3895 17.1509 15.3657 17.0711C16.2405 16.9996 17.2616 16.9998 18.2537 17C18.3026 17 18.3514 17 18.4 17ZM12.436 24.184C12 25.0397 12 26.1598 12 28.4V43.6C12 45.8402 12 46.9603 12.436 47.816C12.8195 48.5686 13.4314 49.1805 14.1841 49.564C15.0397 50 16.1598 50 18.4 50H45.6C47.8402 50 48.9604 50 49.816 49.564C50.5686 49.1805 51.1806 48.5686 51.5641 47.816C52 46.9603 52 45.8402 52 43.6V28.4C52 26.1598 52 25.0397 51.5641 24.184C51.1806 23.4314 50.5686 22.8195 49.816 22.436C48.9604 22 47.8402 22 45.6 22H18.4C16.1598 22 15.0397 22 14.1841 22.436C13.4314 22.8195 12.8195 23.4314 12.436 24.184Z"
                    fill="#b0b0b0"
                  />
                  <path
                    d="M18 12C18 9.79086 19.7909 8 22 8H42C44.2092 8 46 9.79086 46 12V13H18V12Z"
                    fill="#b0b0b0"
                  />
                  <path
                    d="M29.198 28.3479C29.0118 28.2259 28.7941 28.1609 28.5715 28.1609C27.9403 28.1609 27.4286 28.6725 27.4286 29.3037V41.1396C27.4286 41.3517 27.4876 41.5595 27.5989 41.7399C27.9305 42.277 28.6346 42.4437 29.1717 42.1122L38.4714 36.3721C38.6138 36.2842 38.7352 36.1661 38.8269 36.0261C39.173 35.4982 39.0255 34.7898 38.4976 34.4438L29.198 28.3479Z"
                    fill="#b0b0b0"
                  />
                </svg>
              }
              to={"useful-for-you/video-lessons/data-analitika"}
            />
            <UsefulCard
              title={"Bloq"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M40.2066 6.85742C45.1964 6.85742 47.5958 7.32077 50.0888 8.65404C52.3495 9.8631 54.1375 11.651 55.3465 13.9118C56.6798 16.4048 57.1431 18.8042 57.1431 23.7939V40.2066C57.1431 45.1964 56.6798 47.5958 55.3465 50.0888C54.1375 52.3495 52.3495 54.1375 50.0888 55.3465C47.5958 56.6798 45.1964 57.1431 40.2066 57.1431H23.7939C18.8042 57.1431 16.4048 56.6798 13.9118 55.3465C11.651 54.1375 9.8631 52.3495 8.65404 50.0888C7.32077 47.5958 6.85742 45.1964 6.85742 40.2066V23.7939C6.85742 18.8042 7.32077 16.4048 8.65404 13.9118C9.8631 11.651 11.651 9.8631 13.9118 8.65404C16.4048 7.32077 18.8042 6.85742 23.7939 6.85742H40.2066ZM40.2066 11.4289H23.7939C19.4943 11.4289 17.8079 11.7545 16.0677 12.6852C14.6036 13.4682 13.4682 14.6036 12.6852 16.0677C11.7545 17.8079 11.4289 19.4943 11.4289 23.7939V40.2066C11.4289 44.5062 11.7545 46.1927 12.6852 47.9329C13.4682 49.397 14.6036 50.5324 16.0677 51.3154C17.8079 52.246 19.4943 52.5717 23.7939 52.5717H40.2066C44.5062 52.5717 46.1927 52.246 47.9329 51.3154C49.397 50.5324 50.5324 49.397 51.3154 47.9329C52.246 46.1927 52.5717 44.5062 52.5717 40.2066V23.7939C52.5717 19.4943 52.246 17.8079 51.3154 16.0677C50.5324 14.6036 49.397 13.4682 47.9329 12.6852C46.1927 11.7545 44.5062 11.4289 40.2066 11.4289ZM29.7146 40.0003C30.9769 40.0003 32.0003 41.0236 32.0003 42.286C32.0003 43.5484 30.9769 44.5717 29.7146 44.5717H20.5717C19.3093 44.5717 18.286 43.5484 18.286 42.286C18.286 41.0236 19.3093 40.0003 20.5717 40.0003H29.7146ZM43.4288 29.7146C44.6912 29.7146 45.7146 30.7379 45.7146 32.0003C45.7146 33.2626 44.6912 34.286 43.4288 34.286H20.5717C19.3093 34.286 18.286 33.2626 18.286 32.0003C18.286 30.7379 19.3093 29.7146 20.5717 29.7146H43.4288ZM43.4288 19.4289C44.6912 19.4289 45.7146 20.4522 45.7146 21.7146C45.7146 22.9769 44.6912 24.0003 43.4288 24.0003H20.5717C19.3093 24.0003 18.286 22.9769 18.286 21.7146C18.286 20.4522 19.3093 19.4289 20.5717 19.4289H43.4288Z"
                    fill="#B0B0B0"
                  />
                </svg>
              }
              to={"useful-for-you/blog/data-analitika"}
            />
            <UsefulCard
              title={"Karyera kakulyatoru"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                >
                  <g clipPath="url(#clip0_860_15051)">
                    <path
                      d="M0.615412 25.3116V5.88096C0.570874 5.17843 0.676305 4.47444 0.924694 3.81577C1.17308 3.15711 1.55876 2.55882 2.0561 2.06063C2.55345 1.56244 3.15106 1.17575 3.80931 0.926241C4.46755 0.676731 5.17137 0.570117 5.87398 0.613459H31.6381C32.3407 0.568921 33.0446 0.674352 33.7033 0.922741C34.362 1.17113 34.9603 1.55678 35.4585 2.05412C35.9566 2.55147 36.3433 3.14911 36.5928 3.80735C36.8424 4.4656 36.949 5.16939 36.9056 5.872V17.0072C36.9266 17.3446 36.8421 17.6802 36.664 17.9674C36.4858 18.2547 36.2228 18.4795 35.9113 18.6107C35.6189 18.7565 35.2878 18.8055 34.9657 18.7507C34.6437 18.696 34.3474 18.5403 34.1196 18.3062C33.9322 18.1294 33.7867 17.913 33.6937 17.6727C33.6007 17.4325 33.5626 17.1745 33.5821 16.9176C33.5821 13.2447 33.5821 9.56882 33.5821 5.88993C33.5821 4.52826 32.9729 3.91012 31.6023 3.91012H5.90085C4.52127 3.91012 3.9121 4.51034 3.9121 5.88096V44.8497C3.87052 45.1165 3.89264 45.3893 3.97667 45.6458C4.06071 45.9024 4.20428 46.1354 4.39561 46.3259C4.58695 46.5163 4.82063 46.6588 5.07757 46.7417C5.33451 46.8245 5.60742 46.8454 5.87398 46.8026H21.9004C22.1799 46.7783 22.4611 46.8253 22.7175 46.9392C22.9738 47.0532 23.1971 47.2304 23.3663 47.4542C23.5355 47.678 23.6451 47.9411 23.6849 48.2189C23.7246 48.4966 23.6932 48.7799 23.5936 49.0422C23.4719 49.357 23.2561 49.6267 22.9755 49.8143C22.6949 50.0018 22.3633 50.0983 22.0258 50.0903C20.9061 50.0903 19.7952 50.0903 18.6754 50.0903H5.83814C5.14004 50.1282 4.44183 50.0181 3.78924 49.7673C3.13665 49.5165 2.54441 49.1306 2.05132 48.635C1.55824 48.1394 1.17543 47.5452 0.927975 46.8913C0.680524 46.2374 0.574006 45.5386 0.615412 44.8407V25.3116Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M35.231 50.1C32.2937 50.0947 29.4239 49.218 26.985 47.5809C24.5462 45.9438 22.6478 43.6199 21.5303 40.9034C20.4128 38.1869 20.1263 35.1999 20.7072 32.3206C21.2881 29.4412 22.7102 26.7989 24.7935 24.7282C26.8768 22.6574 29.5277 21.2513 32.4105 20.6878C35.2933 20.1243 38.2785 20.4288 40.9882 21.5627C43.6979 22.6966 46.0103 24.609 47.6326 27.0577C49.2549 29.5064 50.1143 32.3814 50.1019 35.3187C50.0782 39.2472 48.501 43.0067 45.7148 45.7762C42.9285 48.5456 39.1595 50.1001 35.231 50.1ZM35.231 46.7944C37.516 46.7979 39.7507 46.1235 41.6522 44.8564C43.5537 43.5893 45.0365 41.7866 45.913 39.6764C46.7894 37.5662 47.0201 35.2434 46.5759 33.002C46.1316 30.7607 45.0324 28.7015 43.4173 27.0851C41.8022 25.4688 39.7439 24.3679 37.5028 23.9219C35.2618 23.4759 32.9388 23.7048 30.8279 24.5797C28.717 25.4545 26.9132 26.9359 25.6446 28.8364C24.3761 30.7369 23.6999 32.9711 23.7017 35.2561C23.7064 38.3148 24.9235 41.2468 27.0864 43.4097C29.2492 45.5725 32.1813 46.7896 35.24 46.7944H35.231Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M18.7109 20.4134H9.11652C8.85926 20.4506 8.59684 20.4275 8.35006 20.3458C8.10327 20.2642 7.87886 20.1262 7.69461 19.9428C7.51036 19.7594 7.37133 19.5357 7.2885 19.2893C7.20566 19.0429 7.18131 18.7806 7.21736 18.5231C7.21736 15.3818 7.21736 12.2374 7.21736 9.09002C7.18464 8.83598 7.21093 8.57781 7.29418 8.33558C7.37743 8.09335 7.51539 7.87359 7.69737 7.69334C7.87935 7.5131 8.10045 7.37724 8.34347 7.2963C8.58648 7.21537 8.84487 7.19155 9.09859 7.2267H28.4217C28.6751 7.1934 28.9327 7.21849 29.1749 7.30008C29.417 7.38166 29.6374 7.51759 29.8189 7.69742C30.0005 7.87725 30.1385 8.09623 30.2224 8.33761C30.3063 8.57898 30.3339 8.83635 30.303 9.09002V18.5321C30.3249 18.7784 30.2914 19.0264 30.205 19.2581C30.1187 19.4897 29.9816 19.6991 29.8038 19.8709C29.626 20.0427 29.412 20.1725 29.1775 20.2509C28.943 20.3293 28.694 20.3542 28.4486 20.3238L18.7109 20.4134ZM10.5319 17.0719H26.9615V10.5413H10.5319V17.0719Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M9.67271 28.6537C9.35917 28.6537 9.05458 28.6537 8.77687 28.6537C8.3618 28.6221 7.97408 28.4345 7.69158 28.1288C7.40909 27.823 7.25274 27.4217 7.25395 27.0054C7.25101 26.5889 7.40846 26.1872 7.69366 25.8837C7.97886 25.5801 8.36996 25.398 8.78584 25.375C9.38306 25.375 10.0012 25.375 10.6402 25.375C11.0552 25.4057 11.4433 25.5922 11.7265 25.8971C12.0097 26.202 12.1671 26.6027 12.1671 27.0188C12.1671 27.435 12.0097 27.8357 11.7265 28.1406C11.4433 28.4455 11.0552 28.632 10.6402 28.6627C10.3356 28.6627 10.0221 28.6627 9.74436 28.6627L9.67271 28.6537Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M16.2834 28.6529H15.3876C14.9621 28.6368 14.5591 28.4576 14.2622 28.1524C13.9653 27.8472 13.7973 27.4393 13.793 27.0136C13.7904 26.5879 13.9534 26.1779 14.2476 25.8702C14.5419 25.5626 14.9443 25.3815 15.3696 25.3652C15.9669 25.3652 16.5641 25.3652 17.1613 25.3652C17.5961 25.3652 18.0131 25.5379 18.3205 25.8454C18.628 26.1528 18.8007 26.5698 18.8007 27.0046C18.8007 27.4394 18.628 27.8564 18.3205 28.1638C18.0131 28.4713 17.5961 28.644 17.1613 28.644C16.9194 28.6709 16.588 28.6529 16.2834 28.6529Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M9.75268 30.3107C10.0393 30.3107 10.335 30.3107 10.6485 30.3107C11.0739 30.3314 11.475 30.5151 11.7686 30.8237C12.0622 31.1323 12.2257 31.5421 12.2252 31.968C12.2213 32.3846 12.0588 32.7841 11.771 33.0852C11.4831 33.3864 11.0914 33.5667 10.6754 33.5895C10.0578 33.6253 9.43861 33.6253 8.821 33.5895C8.38621 33.5895 7.96923 33.4167 7.66179 33.1093C7.35435 32.8019 7.18164 32.3849 7.18164 31.9501C7.18164 31.5153 7.35435 31.0983 7.66179 30.7909C7.96923 30.4834 8.38621 30.3107 8.821 30.3107C9.08975 30.2928 9.4033 30.3107 9.75268 30.3107Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M16.2659 30.3125C16.5705 30.3125 16.884 30.3125 17.1617 30.3125C17.5767 30.3431 17.9648 30.5296 18.248 30.8345C18.5312 31.1394 18.6886 31.5402 18.6886 31.9563C18.6886 32.3725 18.5312 32.7732 18.248 33.0781C17.9648 33.3831 17.5767 33.5695 17.1617 33.6002C16.544 33.6316 15.9251 33.6316 15.3074 33.6002C14.8726 33.6002 14.4556 33.4275 14.1481 33.12C13.8407 32.8126 13.668 32.3956 13.668 31.9608C13.668 31.526 13.8407 31.109 14.1481 30.8016C14.4556 30.4942 14.8726 30.3215 15.3074 30.3215C15.6747 30.2946 15.9703 30.3125 16.2659 30.3125Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M9.68056 38.5514C9.3939 38.5514 9.09827 38.5514 8.78473 38.5514C8.36972 38.5207 7.98164 38.3342 7.69843 38.0293C7.41522 37.7244 7.25781 37.3237 7.25781 36.9075C7.25781 36.4914 7.41522 36.0906 7.69843 35.7857C7.98164 35.4808 8.36972 35.2943 8.78473 35.2637C9.38195 35.2637 9.97918 35.2637 10.5764 35.2637C10.9914 35.2943 11.3795 35.4808 11.6627 35.7857C11.9459 36.0906 12.1033 36.4914 12.1033 36.9075C12.1033 37.3237 11.9459 37.7244 11.6627 38.0293C11.3795 38.3342 10.9914 38.5207 10.5764 38.5514C10.3076 38.5604 9.99411 38.5514 9.68056 38.5514Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M16.2746 38.5459C15.97 38.5459 15.6565 38.5459 15.3788 38.5459C14.9628 38.5166 14.5731 38.3315 14.2875 38.0277C14.002 37.7238 13.8414 37.3235 13.8379 36.9065C13.8349 36.4891 13.9921 36.0864 14.277 35.7814C14.562 35.4764 14.9531 35.2923 15.3698 35.2671C16.0024 35.2313 16.6364 35.2313 17.269 35.2671C17.6763 35.2962 18.0579 35.4772 18.3382 35.7741C18.6185 36.071 18.7772 36.4623 18.7829 36.8707C18.7892 37.2881 18.6377 37.6926 18.3587 38.0031C18.0797 38.3137 17.6937 38.5075 17.2779 38.5459C16.9554 38.5459 16.6329 38.5459 16.3015 38.5459H16.2746Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M9.67194 43.4995C9.36736 43.4995 9.05382 43.4995 8.77611 43.4995C8.34132 43.4995 7.92434 43.3267 7.6169 43.0193C7.30945 42.7119 7.13672 42.2949 7.13672 41.8601C7.13672 41.4253 7.30945 41.0083 7.6169 40.7009C7.92434 40.3934 8.34132 40.2207 8.77611 40.2207C9.40319 40.2207 10.0482 40.2207 10.6753 40.2207C11.0805 40.2631 11.4557 40.4541 11.7284 40.7569C12.0011 41.0596 12.152 41.4526 12.152 41.8601C12.152 42.2675 12.0011 42.6606 11.7284 42.9633C11.4557 43.266 11.0805 43.457 10.6753 43.4995C10.3528 43.4995 10.0213 43.4995 9.69882 43.4995H9.67194Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M16.2754 43.4995C15.9619 43.4995 15.6483 43.4995 15.3796 43.4995C14.9644 43.4701 14.5758 43.2847 14.2917 42.9807C14.0075 42.6766 13.8489 42.2763 13.8477 41.8601C13.8446 41.4427 14.0018 41.04 14.2868 40.735C14.5718 40.43 14.9629 40.2459 15.3796 40.2207C16.0156 40.2207 16.6517 40.2207 17.2877 40.2207C17.6942 40.2541 18.0736 40.4378 18.3519 40.736C18.6302 41.0342 18.7874 41.4254 18.7927 41.8332C18.7988 42.2497 18.647 42.6531 18.3678 42.9622C18.0886 43.2713 17.7027 43.4633 17.2877 43.4995C16.9652 43.4995 16.6337 43.4995 16.3112 43.4995H16.2754Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M40.2109 31.8067C40.2323 32.2439 40.0791 32.6716 39.7851 32.9958C39.4911 33.3201 39.0803 33.5143 38.6432 33.5356C38.206 33.557 37.7783 33.4039 37.454 33.1099C37.1298 32.8159 36.9356 32.4051 36.9142 31.9679C36.9158 31.6393 36.8192 31.3177 36.6366 31.0444C36.4541 30.7711 36.1941 30.5586 35.8899 30.4342C35.5857 30.3098 35.2513 30.2791 34.9295 30.3462C34.6078 30.4133 34.3135 30.575 34.0843 30.8106C33.8552 31.0461 33.7017 31.3448 33.6436 31.6683C33.5854 31.9918 33.6253 32.3252 33.7581 32.6258C33.8909 32.9265 34.1105 33.1805 34.3888 33.3554C34.667 33.5303 34.9912 33.618 35.3196 33.6073C36.437 33.6232 37.5163 34.0157 38.3829 34.7213C39.2494 35.4269 39.8525 36.4043 40.0944 37.4952C40.339 38.6124 40.1866 39.7799 39.6634 40.7969C39.1402 41.8139 38.2789 42.6167 37.2278 43.0673C37.1264 43.1012 37.0394 43.1682 36.9809 43.2576C36.9224 43.347 36.8957 43.4536 36.9053 43.56C36.9053 43.9948 36.7326 44.4118 36.4251 44.7192C36.1177 45.0267 35.7007 45.1994 35.2659 45.1994C34.8311 45.1994 34.4141 45.0267 34.1067 44.7192C33.7992 44.4118 33.6265 43.9948 33.6265 43.56C33.63 43.4453 33.5961 43.3325 33.5298 43.2388C33.4635 43.145 33.3686 43.0754 33.2592 43.0404C32.407 42.6782 31.6768 42.0786 31.1559 41.3131C30.6349 40.5475 30.345 39.6482 30.3209 38.7225C30.3013 38.5017 30.3265 38.2791 30.395 38.0683C30.4634 37.8574 30.5737 37.6625 30.7192 37.4952C30.8648 37.3279 31.0425 37.1917 31.2419 37.0948C31.4413 36.9978 31.6582 36.942 31.8796 36.9309C32.1037 36.9212 32.3273 36.9569 32.5372 37.0357C32.7471 37.1146 32.939 37.235 33.1012 37.3897C33.2635 37.5445 33.3929 37.7303 33.4816 37.9363C33.5703 38.1422 33.6166 38.3639 33.6176 38.5882C33.6223 38.9965 33.7775 39.3887 34.0536 39.6896C34.3297 39.9905 34.7072 40.1788 35.1136 40.2186C35.3379 40.2411 35.5645 40.2174 35.7792 40.1489C35.994 40.0804 36.1925 39.9685 36.3623 39.8203C36.5321 39.672 36.6697 39.4905 36.7666 39.2869C36.8635 39.0834 36.9176 38.8621 36.9256 38.6368C36.9336 38.4115 36.8953 38.187 36.813 37.9771C36.7308 37.7672 36.6063 37.5764 36.4474 37.4165C36.2885 37.2566 36.0985 37.131 35.8891 37.0475C35.6797 36.964 35.4554 36.9243 35.2301 36.9309C34.1116 36.9195 33.0301 36.5285 32.1628 35.8221C31.2956 35.1156 30.694 34.1356 30.4566 33.0425C30.2193 31.9494 30.3602 30.8081 30.8564 29.8056C31.3525 28.8031 32.1745 27.9988 33.1876 27.5246C33.3229 27.4845 33.4408 27.3999 33.5221 27.2844C33.6034 27.169 33.6433 27.0295 33.6355 26.8885C33.666 26.4782 33.8505 26.0945 34.152 25.8145C34.4536 25.5345 34.8499 25.3789 35.2614 25.3789C35.6729 25.3789 36.0692 25.5345 36.3708 25.8145C36.6723 26.0945 36.8569 26.4782 36.8874 26.8885C36.8795 27.0295 36.9195 27.169 37.0008 27.2844C37.082 27.3999 37.1999 27.4845 37.3353 27.5246C38.1641 27.9021 38.8718 28.5023 39.3795 29.2584C39.8872 30.0145 40.175 30.8967 40.2109 31.8067Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.895833"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_860_15051">
                      <rect
                        width="50.3817"
                        height="50.3817"
                        fill="white"
                        transform="translate(0.167969 0.167969)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              to={"useful-for-you/career-calculator"}
            />
            <UsefulCard
              title={"Seminar & Vebinar"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="64"
                  viewBox="0 0 44 64"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3711_9460)">
                    <path
                      d="M3.16206 23.3288C3.16206 21.6644 3.1787 20.0965 3.16206 18.5202C3.13662 17.9894 3.24437 17.4607 3.47548 16.9822C3.70659 16.5037 4.05374 16.0906 4.48529 15.7805C5.25926 15.188 6.0249 14.5821 6.76558 13.9497C6.96418 13.7594 7.09758 13.5112 7.14674 13.2406C7.28821 12.1271 8.1454 11.3315 9.21065 11.3664C9.72356 11.3983 10.206 11.6209 10.563 11.9905C10.92 12.3602 11.1258 12.8501 11.1397 13.3638C11.1409 13.6416 11.0834 13.9164 10.9709 14.1704C10.8584 14.4244 10.6935 14.6517 10.487 14.8375C10.2805 15.0233 10.037 15.1633 9.77261 15.2484C9.50818 15.3334 9.22876 15.3617 8.95266 15.3312C8.76246 15.3059 8.56901 15.3234 8.38644 15.3824C8.20386 15.4414 8.03679 15.5405 7.8974 15.6724C7.16505 16.2849 6.3994 16.8508 5.67703 17.4799C5.44568 17.6813 5.19767 18.0126 5.18935 18.2922C5.14441 19.9483 5.16605 21.6061 5.16605 23.2972H10.1211C10.2792 19.226 11.9603 15.9736 15.2809 13.5186C14.0342 11.2899 13.7562 8.95133 14.6634 6.5279C15.2561 4.91555 16.3688 3.54641 17.8258 2.63643C19.2813 1.70905 20.9982 1.27865 22.719 1.40979C24.4398 1.54094 26.0716 2.22656 27.3697 3.36379C29.7199 5.4277 31.2196 9.35579 28.951 13.5169C32.2149 15.927 33.9343 19.176 34.0891 23.3371H34.7665C37.0968 23.3371 39.422 23.3371 41.7422 23.3371C42.7109 23.3371 43.0372 23.67 43.0388 24.6554C43.0388 25.8604 43.0505 27.0655 43.0388 28.2705C43.0189 30.0199 41.7506 31.2882 40.0045 31.3132C39.3022 31.3215 38.6014 31.3132 37.8691 31.3132C36.0099 39.9516 34.169 48.5501 32.3082 57.2352C33.2702 57.2352 34.1923 57.2169 35.1127 57.2352C35.8936 57.2595 36.6338 57.5886 37.1749 58.1521C37.716 58.7156 38.0148 59.4686 38.0074 60.2498C38 61.0309 37.6869 61.7781 37.1353 62.3312C36.5836 62.8844 35.8373 63.1994 35.0562 63.2089C32.8774 63.2239 30.697 63.2089 28.5165 63.2089C22.1018 63.2089 15.6865 63.2089 9.27057 63.2089C7.62776 63.2089 6.34447 62.0987 6.16804 60.5591C6.12165 60.1449 6.16222 59.7255 6.28714 59.3278C6.41205 58.9302 6.61858 58.5629 6.8935 58.2496C7.16843 57.9363 7.50571 57.6838 7.88378 57.5083C8.26185 57.3328 8.67239 57.2381 9.08915 57.2302C9.9996 57.2086 10.9117 57.2302 11.8937 57.2302C10.0379 48.5751 8.19534 39.9599 6.34115 31.3015C5.63043 31.3015 4.94967 31.3015 4.26891 31.3015C2.44634 31.2849 1.18303 30.0215 1.16971 28.1973C1.16139 27.0538 1.16971 25.912 1.16971 24.7702C1.16971 23.6284 1.44768 23.3338 2.59115 23.3255C2.7526 23.3271 2.91738 23.3288 3.16206 23.3288ZM30.2692 57.2053L35.8101 31.3315H8.39174L13.9327 57.2053H30.2692ZM41.0365 25.3644H3.16206V27.8245C3.16206 29.0462 3.43003 29.3108 4.66006 29.3125H39.5318C39.6983 29.3125 39.8647 29.3125 40.0312 29.3125C40.6254 29.2709 41.0132 28.918 41.0298 28.3305C41.0548 27.3584 41.0298 26.3847 41.0298 25.3694L41.0365 25.3644ZM32.0818 23.3055C31.9403 19.7869 30.4922 17.0572 27.6444 15.0349C26.0432 16.4829 24.2356 17.2552 22.0901 17.2636C19.9447 17.2719 18.0955 16.5096 16.4959 15.0732C13.6847 17.1288 12.2416 19.8351 12.1268 23.3055H32.0818ZM22.0069 15.3511C25.4789 15.2945 28.1204 12.6414 28.0721 9.25926C28.0406 7.67291 27.3813 6.16382 26.2386 5.06299C25.096 3.96215 23.5634 3.35946 21.9769 3.38709C18.673 3.43869 16.0548 6.19501 16.1181 9.55553C16.1813 12.7496 18.8811 15.4027 22.0069 15.3511ZM22.0935 61.2216H34.7432C35.5755 61.2216 36.0482 60.862 36.0482 60.2229C36.0482 59.5838 35.5854 59.2242 34.7432 59.2242H9.64174C9.4342 59.2108 9.22589 59.2158 9.01924 59.2392C8.48329 59.3357 8.15872 59.6686 8.15872 60.2196C8.15872 60.7705 8.49161 61.1017 9.01924 61.1999C9.22578 61.2247 9.43417 61.2302 9.64174 61.2166L22.0935 61.2216Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="1.33333"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M33.1978 34.1356C32.9049 35.5237 32.6552 36.7205 32.3989 37.9155C31.2482 43.2861 30.0964 48.6568 28.9435 54.0274C28.9135 54.1688 28.8802 54.3103 28.8386 54.4501C28.7736 54.7144 28.6085 54.9431 28.378 55.0878C28.1476 55.2325 27.8699 55.282 27.6036 55.2258C27.0693 55.1076 26.7497 54.58 26.8762 53.9691C27.1925 52.4461 27.522 50.9282 27.8483 49.4069C28.9257 44.3825 30.0026 39.3564 31.079 34.3287C31.2554 33.5064 31.8679 33.052 32.4754 33.3733C32.7983 33.5414 33.0064 33.9259 33.1978 34.1356Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.84038"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3711_9460">
                      <rect
                        width="42.8711"
                        height="62.8295"
                        fill="white"
                        transform="translate(0.666992 0.888672)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              to={"useful-for-you/seminar-and-webinar"}
            />
            <UsefulCard
              title={"Workshoplar"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3711_10846)">
                    <path
                      d="M34.7943 46.5036H17.1976C17.1976 46.6898 17.1976 46.8508 17.1976 47.0105C17.2117 47.4362 17.1395 47.8603 16.9854 48.2573C16.8312 48.6543 16.5984 49.016 16.3008 49.3206C16.0032 49.6253 15.647 49.8665 15.2537 50.0299C14.8604 50.1932 14.4381 50.2753 14.0122 50.2711C11.0592 50.2857 8.10221 50.2051 5.15182 50.3002C3.14133 50.3649 1.10444 48.6844 1.7658 46.0508C2.42716 43.4173 4.06275 41.6695 6.68972 40.8827C6.77948 40.8563 6.86397 40.8141 6.98145 40.7678C5.27458 39.5217 4.48253 37.9006 4.93136 35.8519C5.38019 33.8031 6.77948 32.6559 8.80581 32.2388V19.698H5.16898C2.6463 19.6914 1.19024 17.8855 1.78164 15.4367C2.41396 12.8203 4.04426 11.1121 6.62767 10.3188C6.70688 10.2937 6.78608 10.2726 6.86397 10.2448C6.90521 10.2254 6.94492 10.2029 6.98277 10.1775C5.5716 9.18877 4.78219 7.86605 4.81651 6.1341C4.8228 5.53037 4.95239 4.9343 5.19733 4.38245C5.44226 3.83061 5.79738 3.33464 6.24089 2.92497C6.67897 2.50409 7.19616 2.17425 7.76254 1.95454C8.32892 1.73483 8.93324 1.6296 9.54054 1.64495C10.1479 1.66029 10.7461 1.79591 11.3006 2.04394C11.8552 2.29198 12.3551 2.64751 12.7713 3.08998C14.7251 5.15327 14.399 7.83173 11.8803 10.2184C13.0591 10.5181 14.1363 11.0105 14.9865 11.8646C15.4818 12.3901 15.9335 12.9552 16.3369 13.5543C16.4993 13.7827 16.6418 13.8843 16.923 13.883C22.9787 13.8768 29.0344 13.872 35.09 13.8685C35.2564 13.8685 35.5019 13.7787 35.5732 13.652C36.5857 11.8593 38.1011 10.7372 40.1552 10.2066C38.5935 9.10429 37.8107 7.64823 37.9876 5.76447C38.0405 5.17776 38.2101 4.60754 38.4865 4.08728C38.7628 3.56703 39.1403 3.10723 39.5968 2.73488C40.5265 1.94768 41.7299 1.56027 42.9443 1.65722C44.1587 1.75417 45.2854 2.32761 46.0784 3.25235C47.5398 4.93282 47.8883 8.10234 45.0224 10.196C45.3365 10.2976 45.6296 10.3716 45.9081 10.4838C48.4691 11.5174 49.9568 13.4091 50.337 16.1337C50.3892 16.548 50.358 16.9684 50.2454 17.3704C50.1328 17.7724 49.941 18.1479 49.6813 18.4748C49.4216 18.8016 49.0992 19.0733 48.733 19.2738C48.3668 19.4744 47.9643 19.5997 47.549 19.6425C46.7965 19.7204 46.0322 19.6848 45.2745 19.6927C44.5999 19.6993 43.9254 19.6927 43.2059 19.6927V32.2335C45.1953 32.6427 46.5933 33.7872 47.0553 35.8241C47.5173 37.861 46.7292 39.4966 45.0171 40.756C45.1596 40.8088 45.2705 40.8537 45.3841 40.888C48.209 41.812 49.8723 43.7301 50.3251 46.6607C50.6076 48.4851 49.1555 50.2329 47.3048 50.254C44.1524 50.2883 41.0001 50.283 37.849 50.254C36.1633 50.2381 34.8049 48.8019 34.7943 47.1148C34.793 46.9247 34.7943 46.7307 34.7943 46.5036ZM40.0007 40.6754C38.4087 39.5072 37.6312 37.8808 38.084 35.8294C38.5368 33.778 39.9453 32.6612 41.9241 32.2335V19.6927C41.4872 19.6927 41.0925 19.6927 40.6978 19.6927C39.6589 19.6808 38.6147 19.7283 37.5824 19.6386C36.811 19.563 36.0964 19.1996 35.5809 18.6208C35.0654 18.042 34.787 17.2902 34.8009 16.5152C34.8277 16.0376 34.8796 15.5617 34.9567 15.0896H17.0035C17.0352 15.2387 17.0537 15.3536 17.0827 15.4618C17.7032 17.9225 15.9396 19.8379 13.5911 19.7059C12.5879 19.6478 11.5793 19.6953 10.5734 19.698C10.3992 19.698 10.2249 19.7125 10.0546 19.7204V32.2467C12.1113 32.7272 13.4578 33.8955 13.8736 35.6591C14.3753 37.7805 13.6334 39.4636 11.8935 40.7441C11.9353 40.7811 11.9819 40.8122 12.0321 40.8365C14.3026 41.4543 15.8735 42.8536 16.7844 45.0146C16.8412 45.1466 17.1052 45.272 17.2728 45.272C23.0812 45.2852 28.8896 45.2812 34.698 45.2905C35.0095 45.2905 35.16 45.1967 35.2748 44.901C35.7158 43.7724 36.3982 42.7889 37.3989 42.1091C38.2186 41.552 39.1361 41.1414 40.0007 40.6688V40.6754ZM42.5828 18.5139C44.0679 18.5139 45.553 18.5284 47.0381 18.5139C48.3939 18.4954 49.3126 17.4789 49.1503 16.2195C48.8414 13.8434 47.1583 11.9081 44.794 11.4316C43.7379 11.2204 42.6304 11.2455 41.5479 11.2587C38.818 11.2943 36.5976 13.1807 36.059 15.8552C35.7395 17.4393 36.6055 18.5086 38.2318 18.5178C39.6786 18.5178 41.1307 18.5073 42.5828 18.5073V18.5139ZM9.39853 18.5139C10.8836 18.5139 12.3687 18.5244 13.8538 18.5139C15.3389 18.5033 16.2102 17.4578 15.9726 16.0057C15.6003 13.7351 13.9436 11.8738 11.6796 11.4382C10.5285 11.2177 9.31537 11.2177 8.13785 11.2705C6.86643 11.3289 5.65328 11.8207 4.7001 12.6641C3.74692 13.5076 3.11113 14.6518 2.89843 15.9067C2.61857 17.4749 3.47795 18.5007 5.08713 18.5059C6.52734 18.5178 7.9636 18.5073 9.39853 18.5073V18.5139ZM9.39853 49.0897C10.8836 49.0897 12.3687 49.0897 13.8538 49.0897C15.3059 49.0897 16.1891 48.0613 15.9805 46.6396C15.6439 44.34 13.8855 42.3982 11.5859 41.9942C10.4942 41.8015 9.35101 41.8186 8.23686 41.8622C5.499 41.9652 3.38026 43.8582 2.89447 46.5472C2.63045 48.0296 3.49511 49.0857 4.99341 49.091C6.46266 49.087 7.93059 49.0831 9.39853 49.0831V49.0897ZM42.5749 49.0897C44.1089 49.0897 45.6428 49.1055 47.1781 49.0897C47.4633 49.0876 47.7448 49.0248 48.0037 48.9053C48.2627 48.7858 48.4932 48.6125 48.6799 48.3968C48.8666 48.1812 49.0051 47.9282 49.0862 47.6548C49.1673 47.3813 49.1891 47.0938 49.1503 46.8112C48.8453 44.3862 47.0764 42.4034 44.654 41.985C43.5465 41.7936 42.3861 41.8266 41.2535 41.8714C38.6133 41.9797 36.4114 44.0153 36.0154 46.6237C35.7976 48.0494 36.6755 49.0857 38.1196 49.0923C39.6047 49.087 41.0898 49.0831 42.5749 49.0804V49.0897ZM12.8387 36.8274C12.8384 36.1515 12.6379 35.4908 12.2624 34.9288C11.8869 34.3667 11.3534 33.9285 10.7291 33.6695C10.1047 33.4105 9.41767 33.3422 8.75461 33.4734C8.09154 33.6046 7.48219 33.9293 7.00351 34.4065C6.52483 34.8837 6.19827 35.492 6.06507 36.1547C5.93186 36.8173 5.99798 37.5046 6.25508 38.1297C6.51217 38.7548 6.94872 39.2898 7.5096 39.667C8.07047 40.0441 8.73054 40.2467 9.40645 40.2491C9.85672 40.2506 10.3029 40.1633 10.7193 39.992C11.1357 39.8207 11.5143 39.5689 11.8331 39.251C12.152 38.9331 12.405 38.5554 12.5776 38.1395C12.7501 37.7236 12.8388 37.2777 12.8387 36.8274ZM45.9939 36.8274C45.9952 36.1517 45.7963 35.4908 45.4224 34.928C45.0485 34.3652 44.5162 33.9258 43.8928 33.6652C43.2694 33.4046 42.5828 33.3345 41.9195 33.4637C41.2563 33.5929 40.6462 33.9156 40.1663 34.3912C39.6863 34.8668 39.3579 35.4739 39.2226 36.1359C39.0872 36.7978 39.151 37.4851 39.4058 38.1109C39.6607 38.7367 40.0952 39.273 40.6545 39.6521C41.2138 40.0312 41.8728 40.2362 42.5485 40.2411C43.4559 40.2419 44.3269 39.8844 44.9721 39.2463C45.6173 38.6083 45.9845 37.7413 45.9939 36.834V36.8274ZM42.5617 9.64816C43.2368 9.64816 43.8968 9.44807 44.4582 9.07317C45.0196 8.69826 45.4573 8.16537 45.7161 7.54181C45.9748 6.91825 46.0429 6.232 45.9117 5.56976C45.7806 4.90752 45.4561 4.299 44.9793 3.82109C44.5025 3.34317 43.8947 3.01729 43.2328 2.88463C42.5709 2.75197 41.8845 2.81847 41.2603 3.07573C40.6362 3.33299 40.1022 3.76948 39.726 4.33004C39.3498 4.8906 39.1482 5.55009 39.1467 6.22518C39.1458 6.67514 39.2336 7.12085 39.4052 7.53682C39.5767 7.95279 39.8286 8.33086 40.1464 8.6494C40.4642 8.96793 40.8417 9.22068 41.2573 9.39319C41.6729 9.5657 42.1184 9.65459 42.5683 9.65476L42.5617 9.64816ZM12.8387 6.24894C12.8415 5.57236 12.6437 4.91012 12.2701 4.34601C11.8966 3.78189 11.3641 3.34124 10.7401 3.07979C10.116 2.81834 9.42847 2.74784 8.76436 2.87721C8.10026 3.00658 7.48944 3.33 7.00917 3.80657C6.52891 4.28315 6.20078 4.89145 6.06628 5.55454C5.93179 6.21762 5.99697 6.9057 6.25359 7.53174C6.51022 8.15777 6.94674 8.69363 7.50796 9.07153C8.06918 9.44944 8.72986 9.6524 9.40645 9.65476C9.85564 9.65719 10.3009 9.57096 10.7167 9.40098C11.1325 9.23101 11.5106 8.98065 11.8295 8.66425C12.1483 8.34786 12.4016 7.97164 12.5748 7.55717C12.748 7.1427 12.8376 6.69813 12.8387 6.24894Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="1.77778"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M26.7248 38.886C26.2126 38.886 25.6687 38.8702 25.1275 38.8992C25.0553 38.9171 24.9876 38.9498 24.9288 38.9953C24.8699 39.0407 24.8211 39.0979 24.7856 39.1632C24.6008 39.492 24.4635 39.8484 24.2892 40.1837C24.0477 40.6444 23.7005 40.779 23.2173 40.5797C22.2317 40.1634 21.25 39.7366 20.2722 39.2992C19.7693 39.0735 19.6373 38.7329 19.8274 38.2115C19.9844 37.7798 20.3435 37.3178 20.2709 36.9336C20.1983 36.5495 19.6742 36.2736 19.3917 35.9185C19.1647 35.6307 18.9614 35.533 18.6089 35.7139C18.293 35.8541 17.9663 35.9689 17.632 36.0571C17.2017 36.1891 16.8598 36.0452 16.6935 35.6452C16.2534 34.598 15.8354 33.5419 15.4394 32.477C15.2942 32.0915 15.4394 31.7655 15.8051 31.553C15.8341 31.5358 15.8618 31.52 15.8922 31.5054C16.3344 31.2955 16.9482 31.1965 17.174 30.8454C17.3997 30.4942 17.2664 29.891 17.2466 29.3999C17.2384 29.3131 17.2121 29.229 17.1694 29.1531C17.1266 29.0771 17.0684 29.011 16.9984 28.959C16.6776 28.761 16.3146 28.6342 15.978 28.4613C15.5067 28.2211 15.3562 27.8752 15.5556 27.4052C15.9736 26.4046 16.4079 25.4097 16.8585 24.4205C17.0737 23.9427 17.471 23.7328 17.9027 24.0021C18.902 24.6265 19.6267 24.3875 20.3065 23.5123C20.494 23.2707 20.5851 23.1163 20.4584 22.8364C20.3233 22.5185 20.2061 22.1932 20.1072 21.8622C19.9567 21.387 20.098 21.0292 20.5428 20.8471C21.5646 20.4312 22.5916 20.026 23.6252 19.6392C24.0886 19.4663 24.4173 19.622 24.6404 20.0722C24.8635 20.5223 24.9559 21.1137 25.3004 21.3487C25.645 21.5837 26.2245 21.3804 26.701 21.4305C27.0113 21.4635 27.1499 21.3566 27.2555 21.0913C27.3875 20.7705 27.5353 20.459 27.6924 20.1514C27.9353 19.6788 28.2746 19.5349 28.7485 19.7356C29.7509 20.1553 30.748 20.5879 31.7398 21.0332C32.2098 21.2444 32.3404 21.5982 32.1636 22.0893C32.0051 22.5368 31.6355 23.0133 31.716 23.4093C31.7966 23.8054 32.3457 24.0879 32.6401 24.4575C32.8394 24.7057 33.0176 24.7585 33.3001 24.6344C33.6343 24.494 33.9753 24.3706 34.3219 24.2648C34.5137 24.2035 34.7217 24.2165 34.9043 24.3014C35.087 24.3862 35.2311 24.5367 35.308 24.7228C35.7295 25.7472 36.1366 26.7778 36.5291 27.8145C36.6928 28.2501 36.5146 28.5946 36.1014 28.794C35.7463 28.9669 35.3634 29.0857 35.0202 29.2771C34.8787 29.3799 34.7837 29.5347 34.7562 29.7075C34.714 29.9807 34.8024 30.2791 34.7351 30.5418C34.5885 31.112 34.8539 31.3338 35.3384 31.5543C35.7128 31.7197 36.0065 32.0269 36.1549 32.4084C36.3034 32.79 36.2946 33.2148 36.1304 33.5898C35.8109 34.3199 35.4994 35.0538 35.1747 35.7812C34.9027 36.395 34.5437 36.5891 33.9589 36.267C33.1074 35.7957 32.4724 35.8208 31.8309 36.6406C31.5444 37.0062 31.4071 37.2188 31.5867 37.6821C31.7387 38.0879 31.7236 38.5375 31.5447 38.9322C31.3658 39.3269 31.0376 39.6345 30.6323 39.7876C29.9128 40.0649 29.1986 40.3579 28.4779 40.6325C28.2542 40.7164 28.0069 40.712 27.7863 40.6203C27.5657 40.5286 27.3882 40.3565 27.2898 40.1388C27.1221 39.7639 26.9624 39.385 26.7974 39.0075C26.7755 38.9657 26.7513 38.9251 26.7248 38.886ZM28.6297 20.9725C28.4369 21.3685 28.2495 21.7196 28.1016 22.0813C27.8759 22.6239 27.4786 22.7559 26.8515 22.6543C26.3364 22.5786 25.8137 22.5702 25.2965 22.6292C24.7473 22.6807 24.3962 22.5434 24.2034 22.0549C24.049 21.6589 23.8642 21.2853 23.686 20.8853L21.3494 21.8094C21.5052 22.2477 21.6359 22.6371 21.7798 23.0212C21.9501 23.4727 21.8273 23.8133 21.426 24.1314C20.9508 24.519 20.5092 24.946 20.1059 25.408C19.7825 25.771 19.4458 25.8753 19.0168 25.7037C18.6208 25.5466 18.2248 25.3948 17.7997 25.2284L16.7925 27.5386C17.1885 27.7234 17.5357 27.9016 17.8974 28.0534C18.4426 28.2844 18.597 28.6844 18.4479 29.3907C18.3582 29.7938 18.3501 30.2107 18.4241 30.617C18.5561 31.2771 18.4479 31.7074 17.9304 31.9279C17.5278 32.0995 17.1291 32.2803 16.7054 32.4665L17.636 34.799C18.102 34.6354 18.5059 34.4994 18.9059 34.3502C19.3059 34.201 19.6148 34.3278 19.8986 34.6499C20.3369 35.1489 20.795 35.6281 21.2794 36.0822C21.5949 36.3779 21.7217 36.6828 21.554 37.0867C21.3864 37.4907 21.2306 37.9078 21.0603 38.3461L23.3705 39.3507C23.5817 38.9085 23.7665 38.5072 23.9632 38.1098C24.1691 37.6887 24.5282 37.5818 25.0272 37.6544C25.581 37.7353 26.1426 37.7491 26.6997 37.6953C27.2819 37.6399 27.6238 37.8088 27.8152 38.3131C27.9591 38.6893 28.1426 39.051 28.3155 39.4378L30.6507 38.5138C30.4923 38.0663 30.3603 37.6768 30.2177 37.2927C30.0633 36.8755 30.1623 36.5561 30.495 36.2591C30.9899 35.8343 31.461 35.3826 31.9061 34.906C32.2296 34.5456 32.5662 34.4466 32.9939 34.6235C33.3899 34.7819 33.7859 34.9271 34.2057 35.0908L35.2077 32.7886C34.7918 32.5919 34.4249 32.407 34.05 32.242C33.617 32.0519 33.4665 31.7378 33.5074 31.252C33.5642 30.5919 33.5338 29.9226 33.5285 29.2586C33.5285 28.8375 33.6869 28.5537 34.0803 28.39C34.4737 28.2263 34.8618 28.0521 35.2935 27.862C34.9833 27.0699 34.6849 26.3162 34.3694 25.5241C33.9338 25.6773 33.5285 25.8066 33.1325 25.9611C32.6348 26.1551 32.2837 25.9611 31.9365 25.4594C31.6394 25.0477 31.2836 24.6817 30.8804 24.373C30.4448 24.0324 30.2547 23.6958 30.4501 23.2285C30.6204 22.8246 30.7709 22.4114 30.9412 21.9757L28.6297 20.9725Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="1.32009"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M20.8262 30.1471C20.8298 29.1259 21.1359 28.1287 21.7056 27.2812C22.2754 26.4338 23.0834 25.7741 24.0277 25.3853C24.972 24.9966 26.0103 24.8962 27.0116 25.0969C28.0128 25.2976 28.9322 25.7903 29.6538 26.513C30.3753 27.2356 30.8666 28.1558 31.0658 29.1573C31.265 30.1589 31.163 31.197 30.7728 32.1407C30.3827 33.0844 29.7217 33.8914 28.8734 34.4599C28.0251 35.0284 27.0274 35.3329 26.0062 35.335C25.3251 35.3357 24.6505 35.2019 24.0212 34.9413C23.3919 34.6808 22.8203 34.2985 22.339 33.8165C21.8578 33.3346 21.4764 32.7623 21.2168 32.1326C20.9572 31.5029 20.8245 30.8282 20.8262 30.1471ZM22.0143 30.1801C22.0192 30.9666 22.2571 31.7341 22.6978 32.3857C23.1385 33.0372 23.7623 33.5436 24.4906 33.8409C25.2188 34.1383 26.0188 34.2132 26.7896 34.0564C27.5604 33.8995 28.2674 33.5178 28.8215 32.9595C29.3756 32.4012 29.7519 31.6912 29.9029 30.9193C30.0539 30.1473 29.9728 29.3479 29.67 28.622C29.3671 27.896 28.856 27.2761 28.2011 26.8403C27.5462 26.4046 26.777 26.1726 25.9904 26.1736C25.4658 26.1739 24.9465 26.278 24.4623 26.4799C23.9782 26.6817 23.5387 26.9774 23.1693 27.3497C22.7999 27.7221 22.5077 28.1639 22.3097 28.6497C22.1117 29.1354 22.0118 29.6555 22.0156 30.1801H22.0143Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="1.32009"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3711_10846">
                      <rect
                        width="51.5556"
                        height="51.5556"
                        fill="white"
                        transform="translate(0.222656 0.222656)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              to={"useful-for-you/workshops"}
            />
            <UsefulCard
              title={"Təqaüd proqramları"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3711_1386)">
                    <path
                      d="M37.6279 52.5448C36.6639 52.3297 35.6733 52.1929 34.7398 51.8808C32.1424 51.0321 29.8887 49.367 28.3144 47.1336C26.7402 44.9001 25.9296 42.2178 26.0035 39.4863C26.0035 39.3216 26.0035 39.1583 26.0035 39.0879C23.9719 38.8555 21.9481 38.7506 19.9815 38.3602C18.0149 37.9698 16.1067 37.2979 14.1388 36.7309C14.1211 37.1518 14.1273 37.5735 14.1574 37.9937C14.172 38.1265 14.4017 38.2593 14.5558 38.331C15.2111 38.6039 15.7654 39.0739 16.1418 39.6758C16.5182 40.2777 16.6981 40.9819 16.6565 41.6906C16.6228 42.2936 16.4285 42.8767 16.0935 43.3794C15.7586 43.882 15.2954 44.286 14.7518 44.5493C14.2082 44.8126 13.604 44.9257 13.002 44.8769C12.4 44.8281 11.8219 44.6192 11.3279 44.2717C10.8338 43.9243 10.4416 43.451 10.192 42.901C9.94247 42.3509 9.84457 41.7442 9.90849 41.1435C9.9724 40.5429 10.1958 39.9703 10.5555 39.4851C10.9153 38.9999 11.3983 38.6198 11.9544 38.3841C12.366 38.2194 12.4524 37.999 12.4351 37.6099C12.4099 36.9805 12.5998 36.2754 12.3727 35.7403C12.1602 35.2383 11.5215 34.9196 11.078 34.512C9.7169 33.2611 8.9839 31.7592 9.01577 29.855C9.07021 26.6521 9.02374 23.4479 9.041 20.2451C9.041 19.8547 8.92945 19.6634 8.56959 19.5028C6.55916 18.6091 4.57395 17.6596 2.55555 16.7859C1.5676 16.3583 0.829288 15.7634 0.551758 14.6891V13.8924C0.817337 12.8381 1.53972 12.2471 2.5051 11.8116C7.67592 9.47847 12.8255 7.09623 17.9963 4.76046C20.4489 3.65299 22.9321 2.61325 25.4007 1.54297H26.5958C27.184 1.75278 27.7909 1.92275 28.3579 2.18036C32.7842 4.18814 37.2105 6.20521 41.6369 8.23158C44.3298 9.46121 47.0188 10.6988 49.7158 11.9191C50.4939 12.2697 51.0994 12.765 51.3411 13.6135C51.6904 14.8405 51.1233 16.0038 49.8698 16.5761C47.708 17.5764 45.5391 18.5648 43.3631 19.5413C43.059 19.6741 42.9528 19.8334 42.9541 20.168C42.9701 22.5397 42.9701 24.9122 42.9541 27.2856C42.9541 27.6614 43.071 27.8167 43.4216 27.9601C45.8922 28.9441 47.9928 30.677 49.4284 32.9156C50.864 35.1542 51.5625 37.7862 51.426 40.4421C51.2895 43.098 50.3248 45.6444 48.6672 47.7241C47.0097 49.8037 44.7425 51.3121 42.184 52.0375C41.4085 52.2553 40.6051 52.3708 39.815 52.5342L37.6279 52.5448ZM21.3201 15.7156C20.5764 14.069 20.9668 12.7863 22.4634 11.8368C23.2385 11.3514 24.1159 11.0527 25.0262 10.9644C26.7179 10.7838 28.3459 10.9856 29.7641 12.0041C30.6193 12.615 31.173 13.4263 31.0615 14.5271C30.9473 15.6585 30.2355 16.3995 29.2861 16.8895C27.2677 17.9332 25.1909 17.9677 23.1061 17.0833C22.9846 17.0205 22.8493 16.9889 22.7125 16.9914C22.5757 16.994 22.4417 17.0306 22.3226 17.0979C20.0997 18.2386 17.8688 19.3633 15.6406 20.4947C15.5291 20.5518 15.4282 20.6275 15.2861 20.7204C18.4173 22.1506 21.506 23.5475 24.5814 24.9697C25.0179 25.1888 25.4993 25.3038 25.9877 25.3056C26.4761 25.3075 26.9583 25.1961 27.3965 24.9803C34.6132 21.6712 41.8347 18.3714 49.0611 15.0809C49.409 14.9228 49.7251 14.7396 49.7344 14.3094C49.745 13.8526 49.4197 13.6587 49.0532 13.4927C47.4995 12.7916 45.9512 12.0811 44.4055 11.3681C38.7186 8.78044 33.0303 6.18617 27.3407 3.58527C26.4776 3.1869 25.6291 3.14441 24.7553 3.5441C17.459 6.87889 10.1613 10.211 2.8623 13.5405C2.52236 13.6959 2.19835 13.9229 2.28201 14.3027C2.32269 14.4547 2.39364 14.5969 2.49062 14.7208C2.5876 14.8447 2.70859 14.9478 2.84636 15.0238C6.21922 16.5947 9.60801 18.135 12.9981 19.6714C13.1576 19.7371 13.3366 19.7371 13.4961 19.6714C16.0988 18.3674 18.6935 17.0488 21.3201 15.7156ZM38.7274 28.7423C35.8087 28.744 33.0094 29.9013 30.9416 31.9612C28.8737 34.021 27.7056 36.8159 27.6926 39.7346C27.67 45.8522 32.6311 50.8438 38.7274 50.8371C44.7826 50.8371 49.733 45.8774 49.749 39.8156C49.7522 36.8867 48.5936 34.0762 46.5275 32.0003C44.4613 29.9245 41.6563 28.7528 38.7274 28.7423ZM41.2319 20.5545C41.0088 20.6461 40.8335 20.7138 40.6542 20.7935C36.4886 22.6963 32.3164 24.5886 28.1587 26.5114C26.698 27.1886 25.2798 27.1846 23.8138 26.4955C21.158 25.2419 18.4637 24.0415 15.7854 22.8198C15.2622 22.5808 14.7363 22.3484 14.1322 22.0762V33.2385C14.1322 34.735 14.1321 34.7443 15.5251 35.326C18.7824 36.6831 22.1991 37.185 25.7034 37.2395C26.1297 37.2395 26.289 37.1226 26.39 36.7083C27.1253 33.7103 28.929 31.0835 31.463 29.3206C33.9969 27.5578 37.087 26.7799 40.1536 27.1328L41.2319 27.2656V20.5545ZM12.3634 33.4231C12.39 33.3552 12.41 33.285 12.4231 33.2133C12.4231 29.3358 12.4231 25.4584 12.4231 21.5809C12.4231 21.4654 12.3727 21.2848 12.2904 21.2423C11.8017 20.9913 11.2971 20.7722 10.7766 20.5319C10.7572 20.6093 10.7425 20.6877 10.7327 20.7669C10.7327 23.9539 10.7088 27.1302 10.7407 30.3105C10.7566 31.564 11.325 32.5958 12.3634 33.4231ZM25.961 12.5977C25.0475 12.6123 24.1432 12.7717 23.3398 13.2922C22.3691 13.9203 22.3744 14.6612 23.3398 15.3C24.7394 16.2295 27.281 16.2229 28.6806 15.2893C29.6101 14.6692 29.6181 13.915 28.6806 13.3055C27.8626 12.7756 26.9437 12.6097 25.961 12.6004V12.5977ZM14.9687 41.4967C14.9751 41.2706 14.936 41.0456 14.8539 40.8349C14.7717 40.6242 14.6482 40.4321 14.4905 40.2699C14.3329 40.1078 14.1443 39.9789 13.936 39.8909C13.7277 39.8029 13.5038 39.7576 13.2777 39.7576C13.0515 39.7576 12.8276 39.8029 12.6193 39.8909C12.411 39.9789 12.2224 40.1078 12.0648 40.2699C11.9071 40.4321 11.7836 40.6242 11.7014 40.8349C11.6193 41.0456 11.5802 41.2706 11.5866 41.4967C11.5989 41.937 11.7825 42.3551 12.0983 42.6622C12.4141 42.9693 12.8372 43.141 13.2777 43.141C13.7181 43.141 14.1412 42.9693 14.457 42.6622C14.7728 42.3551 14.9564 41.937 14.9687 41.4967Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="1.33333"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M39.5638 33.989C39.5638 35.3713 39.5983 36.662 39.5505 37.9501C39.5226 38.6605 39.6395 39.0576 40.4256 39.3391C42.031 39.9141 43.0402 41.6416 42.9605 43.3121C42.8742 45.134 41.7654 46.6465 40.0617 47.1989C39.6873 47.3197 39.5306 47.4645 39.5518 47.8788C39.5863 48.7273 39.2756 49.1429 38.7059 49.1336C38.1363 49.1243 37.8494 48.7127 37.8734 47.8562C37.8826 47.4817 37.7804 47.3171 37.4033 47.1922C36.0528 46.762 35.1552 45.8365 34.6917 44.498C34.4832 43.8951 34.6705 43.4423 35.1671 43.2657C35.6637 43.0891 36.0674 43.3294 36.2958 43.9363C36.6238 44.81 37.1058 45.308 37.8295 45.5045C37.8459 45.4092 37.8566 45.3129 37.8614 45.2163C37.8614 43.7902 37.8614 42.3627 37.8614 40.9365C37.8614 40.671 37.7963 40.5382 37.5122 40.4505C35.6412 39.849 34.458 38.2356 34.458 36.3672C34.458 34.4989 35.6531 32.9147 37.4936 32.3251C37.7592 32.2401 37.8773 32.1352 37.8601 31.8458C37.8395 31.5818 37.8565 31.3162 37.9105 31.057C37.9452 30.8752 38.0457 30.7127 38.1926 30.6002C38.3396 30.4878 38.5228 30.4334 38.7073 30.4475C39.1322 30.4475 39.5438 30.6998 39.4921 31.1114C39.3686 32.0901 39.9422 32.3437 40.6872 32.6664C41.7322 33.1219 42.3882 34.0129 42.7428 35.1031C42.9287 35.6754 42.7428 36.1362 42.278 36.3048C41.784 36.4841 41.3485 36.2464 41.14 35.6502C40.8903 34.8866 40.407 34.3449 39.5638 33.989ZM39.5916 45.5417C40.1269 45.3525 40.5812 44.9859 40.8793 44.5028C41.1774 44.0196 41.3012 43.4491 41.2303 42.8859C41.1121 41.9032 40.3751 41.0096 39.5916 40.9073V45.5417ZM37.8216 38.6897V34.0514C36.7832 34.4391 36.1086 35.4603 36.1736 36.5C36.2387 37.5398 36.9518 38.4985 37.8216 38.6871V38.6897Z"
                      fill="#B0B0B0"
                      stroke="#B0B0B0"
                      strokeWidth="0.652501"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3711_1386">
                      <rect
                        width="53.3333"
                        height="53.3333"
                        fill="white"
                        transform="translate(0.222656 0.333984)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              to={"useful-for-you/internships"}
            />
          </div>
        </div>
      </section>

      <Customers homepage />
      <Contact
        title={"Sualın var?"}
        subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
        contactRef={contactRef}
      />
    </>
  );
};

export default Homepage;
