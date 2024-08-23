import React, { useEffect, useState } from "react";
import styles from "../../pages/VideoLessons/video-lessons.module.css";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchVideoLessons } from "../../features/videoLessons/videoLessonSlice";
import VideoLessonCard from "../videoLessonCard";

const VideoGrid = () => {
  const dispatch = useDispatch();
  const { lang, slug } = useParams();
  const location = useLocation();
  const { videos, status, error } = useSelector((state) => state.videos);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const findCategoryId = () => {
      const activeTab = document.querySelector(".tabsMenu .active");
      if (activeTab) {
        return activeTab.getAttribute("data-category-id");
      }
      return null;
    };

    const id = findCategoryId();
    if (id) {
      setCategoryId(id);
    }
  }, [location]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchVideoLessons({ lang, categoryId }));
    }
  }, [lang, categoryId, dispatch]);

  return (
    <div className={styles.videoLessonsGrid}>
      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && <Box>{error}</Box>}
      {status === "succeeded" &&
        videos &&
        videos.map((video) => (
          <VideoLessonCard
            key={video.id}
            img={video.image}
            title={video.title}
            det={video.short_description}
            to={`/useful-for-you/video-lessons/${slug}/${video.slug}`}
          />
        ))}
    </div>
  );
};

export default VideoGrid;
