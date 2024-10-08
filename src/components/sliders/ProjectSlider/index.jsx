import React, { useRef } from "react";
import styles from "../../../pages/Homepage/home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation } from "swiper/modules";
import ProjectCard from "../../ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useOutletContext, useParams } from "react-router";
import { useProjectOrCareer } from "../../../features/project/projectSlice";
import { Box, Skeleton } from "@mui/material";
import { useMenus } from "../../../features/menus/useMenu";

const ProjectSliders = () => {
  const { lang } = useParams();
  const { data: projects, status, error } = useProjectOrCareer(lang);
  const { data: menus } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { projectsRef } = useOutletContext();

  return (
    <div className="projectSliderWrapper" ref={projectsRef}>
      {status === "pending" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={400}
            height={486}
            sx={{ borderRadius: "1.6rem" }}
          />
        </Box>
      )}
      {status === "error" && <Box>{error}</Box>}
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
        {status === "success" &&
          parentMenu &&
          projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard
                title={project.title}
                text={project.card_description}
                icon={project.image}
                to={`${
                  project.is_corporative === 1 ? "career-center" : "projects"
                }/${project.slug}`}
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
