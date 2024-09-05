import React from "react";
import styles from "../../pages/Homepage/home.module.css";
import { Link, useParams } from "react-router-dom";

const TrainingsNavbar = ({ trainingsCategory, onCategorySelect }) => {
  const { lang } = useParams();

  return (
    <nav className={styles.trainingsNavbar}>
      <ul
        className={`${styles.trainingsNavbarMenu} tnMenu flex alignItemsCenter justifyContentBetween`}
      >
        {trainingsCategory?.map((training) => (
          <li key={training.id}>
            <Link
              className={`flexCenter flexDirectionColumn`}
              onClick={() => onCategorySelect(training)}
            >
              <h3>{training.title}</h3>{" "}
              <span>&#123; {training.subtitle} &#125;</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TrainingsNavbar;
