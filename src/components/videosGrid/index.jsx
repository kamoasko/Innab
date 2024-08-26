import React, { Suspense, useEffect } from "react";
import styles from "../../pages/VideoLessons/video-lessons.module.css";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";
import { fetchVideoLessons } from "../../features/videoLessons/videoLessonSlice";

const VideoLessonCard = React.lazy(() => import("../videoLessonCard"));

const VideoGrid = React.memo(() => {
  const dispatch = useDispatch();
  const { lang, slug } = useParams();
  const { categoryId } = useOutletContext();
  const { videos, status, error } = useSelector((state) => state.videos);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchVideoLessons({ lang, categoryId }));
    }
  }, [lang, categoryId, dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <div className={styles.videoLessonsGrid}>
        {status === "loading" && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
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
              to={`/${lang}/useful-for-you/video-lessons/${slug}/${video.slug}`}
            />
          ))}
      </div>
    </Suspense>
  );
});

export default VideoGrid;
