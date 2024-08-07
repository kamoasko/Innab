import React from "react";
import styles from "./event-card.module.css";

const EventCard = ({ eventImg, title, date, place }) => {
  return (
    <article className={`${styles.eventCard} flex flexDirectionColumn`}>
      <picture className={styles.eventCardImg}>
        <img src={eventImg} alt="" />
      </picture>
      <div className={`${styles.eventCardDet} flex flexDirectionColumn`}>
        <h4>{title}</h4>
        <time dateTime={date}>{date}</time>
        <p>{place}</p>
      </div>
    </article>
  );
};

export default EventCard;
