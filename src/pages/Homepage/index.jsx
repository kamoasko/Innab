import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CountUp from "react-countup";
import styles from "./home.module.css";
import hero from "../../assets/images/homepage/hero.jpeg";
import stats1 from "../../assets/images/homepage/təlim_növü1.svg";
import stats2 from "../../assets/images/homepage/işlə_təmin1.svg";
import stats3 from "../../assets/images/homepage/tələbə1.svg";
import stats4 from "../../assets/images/homepage/təcrübə1.svg";
import stats5 from "../../assets/images/homepage/video.svg";
import stats6 from "../../assets/images/homepage/partnyor2.svg";
import stats7 from "../../assets/images/homepage/məqalə1.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SectionTitle from "../../components/SectionTitle";
import { NavLink, useOutletContext } from "react-router-dom";
import sql from "../../assets/images/homepage/SQL.png";
import mysql from "../../assets/images/homepage/mysql.png";
import partnerCardBg from "../../assets/images/homepage/partners.jpeg";
import partnerCardBg1 from "../../assets/images/homepage/partners1.png";
import partnerCardBg2 from "../../assets/images/homepage/partners2.jpeg";
import TrainingsCard from "../../components/TrainingsCard";
import PartnersCard from "../../components/PartnersCard";
import ProjectSliders from "../../components/sliders/ProjectSlider";
import UsefulCard from "../../components/UsefulCard";
import Customers from "../../components/Customers";
import Contact from "../../components/Contact";
import Button from "../../components/Button";
import CounterSlider from "../../components/sliders/counterSlider";
import PartnersSlider from "../../components/sliders/partnersSlider";

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

const Homepage = () => {
  const { height, width } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  const [paginationContent, setPaginationContent] = useState("");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const statsRef = useRef(null);
  const swiperRef = useRef(null);
  const { partnersRef } = useOutletContext();

  const formatCount = (count) => {
    if (count >= 1000 && width <= 1024) {
      return `${(count / 1000).toFixed(0)}k`;
    }
    return count;
  };

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

            <div
              className={`${styles.statistics} stats flex alignItemsCenter justifyContentBetween`}
              ref={statsRef}
            >
              {width >= 1024 ? (
                <>
                  {statisticsData.map((stat, index) => (
                    <div
                      key={index}
                      className={`${styles.statisticsCard} ${
                        styles[stat.className]
                      }`}
                    >
                      <div>
                        <img src={stat.img} alt="" />
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
                  ))}
                </>
              ) : (
                <CounterSlider
                  // onSlideChange={onSlideChange}
                  onSwiperInit={onSwiperInit}
                  formatCount={formatCount}
                  isVisible={isVisible}
                />
              )}
            </div>
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
      <section
        className={`${styles.partners} partners`}
        ref={partnersRef}
        id="#partners"
      >
        <SectionTitle title={"Partnyorlar"} />
        <div className="container">
          {width >= 1024 ? (
            <div className={styles.partnersGrid}>
              <PartnersCard
                cardtTitle={"Technest layihəsi."}
                text={
                  "İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"
                }
                img={partnerCardBg}
              />
              <PartnersCard
                cardtTitle={"Technest layihəsi."}
                text={
                  "İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"
                }
                img={partnerCardBg1}
              />
              <PartnersCard
                cardtTitle={"Technest layihəsi."}
                text={
                  "İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"
                }
                img={partnerCardBg2}
              />
              <PartnersCard
                cardtTitle={"Technest layihəsi."}
                text={
                  "İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"
                }
              />
              <PartnersCard
                cardtTitle={"Technest layihəsi."}
                text={
                  "İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"
                }
              />
              <PartnersCard
                cardtTitle={"Technest layihəsi."}
                text={
                  "İRİA ilə əməkdaşlıq çərçivəsində təqaüd proqramının icrası"
                }
              />
            </div>
          ) : (
            <PartnersSlider />
          )}
        </div>
      </section>
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
            />
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
            />
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
            />
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
            />
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
            />
          </div>
        </div>
      </section>

      <Customers homepage />
      <Contact
        title={"Sualın var?"}
        subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
      />
    </>
  );
};

export default Homepage;
