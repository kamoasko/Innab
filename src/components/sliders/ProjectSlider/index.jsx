import React, { useEffect, useRef } from "react";
import styles from "../../../pages/Homepage/home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation } from "swiper/modules";
import ProjectCard from "../../ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchProjects } from "../../../features/project/projectSlice";
import { Box, CircularProgress } from "@mui/material";

const ProjectSliders = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { projects, status, error } = useSelector((state) => state.projects);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProjects(lang));
  }, [lang, dispatch]);

  return (
    <div className="projectSliderWrapper">
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && <Box>{error}</Box>}
      <Swiper
        slidesPerView={3}
        spaceBetween={32}
        className="projectSlider"
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          280: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {status === "succeeded" &&
          projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard
                title={project.title}
                text={project.card_description}
                icon={project.image}
                to={project.slug}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <button ref={prevRef} className="flexCenter customBtn prevBtn">
        <FaChevronLeft />
      </button>
      <button ref={nextRef} className="flexCenter customBtn nextBtn">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProjectSliders;
