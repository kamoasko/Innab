import React, { Suspense } from "react";
import styles from "../../pages/VideoLessons/video-lessons.module.css";
import { Box, Skeleton } from "@mui/material";
import { useParams, useOutletContext } from "react-router-dom";
import { useVideoLessons } from "../../features/videoLessons/videoLessonSlice";

const VideoLessonCard = React.lazy(() => import("../videoLessonCard"));

const VideoGrid = React.memo(() => {
  const { lang } = useParams();
  const { categoryId } = useOutletContext();
  const {
    data: videoLessons,
    status,
    error,
  } = useVideoLessons(lang, categoryId);

  return (
    <Suspense
      fallback={
        <Box>
          <Skeleton variant="rectangular" height={332} />
        </Box>
      }
    >
      <div className={styles.videoLessonsGrid}>
        {status === "pending" &&
          [...Array(3)].map((_, index) => (
            <Skeleton
              animation="pulse"
              key={index}
              variant="rectangular"
              width={400}
              height={456}
              className={styles.blogCard}
              sx={{ borderRadius: "1.6rem" }}
            />
          ))}
        {status === "error" && <Box>{error}</Box>}
        {status === "success" &&
          videoLessons.map((video) => (
            <VideoLessonCard
              key={video.id}
              img={video.image}
              title={video.title}
              det={video.short_description}
              to={video.slug}
            />
          ))}
      </div>
    </Suspense>
  );
});

export default VideoGrid;
