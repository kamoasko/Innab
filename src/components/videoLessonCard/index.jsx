import React from "react";
import styles from "../../pages/VideoLessons/video-lessons.module.css";
import { Link } from "react-router-dom";

const VideoLessonCard = ({ to, img, title, det }) => {
  return (
    <article className={styles.videoLessonCard}>
      <Link className="flex flexDirectionColumn" to={to}>
        <div className={styles.videoCardImg}>
          <img loading="lazy" src={img} alt={title} />
        </div>
        <div
          className={`${styles.videoLessonContent} flex flexDirectionColumn justifyContentBetween`}
        >
          <h4>{title}</h4>
          <p>{det}</p>
        </div>
      </Link>
    </article>
  );
};

export default VideoLessonCard;
