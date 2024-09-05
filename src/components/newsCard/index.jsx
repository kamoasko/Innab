import React from "react";
import styles from "../../pages/NewsPage/news-page.module.css";
import { Link } from "react-router-dom";

const NewsCard = React.memo(({ title, img, desc, date, to }) => {
  return (
    <article className={`${styles.newsCard} flex flexDirectionColumn`}>
      <Link to={to}>
        <div className={`${styles.newsCardImg} flex flexDirection`}>
          <img loading="lazy" src={img} alt="" />
        </div>
        <div className={`${styles.NewsCardContent}`}>
          <h4>{title}</h4>
          <time dateTime={date}>{date}</time>
          <p>{desc}</p>
        </div>
      </Link>
    </article>
  );
});

export default NewsCard;
