import React from "react";
import styles from "../../pages/Homepage/home.module.css";
import { Link, useParams } from "react-router-dom";

const TrainingsNavbar = ({ trainingsCategory, handleTrainingId }) => {
  const { lang } = useParams();
  
  return (
    <nav className={styles.trainingsNavbar}>
      <ul
        className={`${styles.trainingsNavbarMenu} tnMenu flex alignItemsCenter justifyContentBetween`}
      >
        {trainingsCategory?.map((training) => (
          <li key={training.id}>
            <Link
              to={`/${lang}/telimler/${training.slug || "#"}`}
              className={`flexCenter flexDirectionColumn`}
             >
              <h3>{training.title}</h3> <span>&#123; inData &#125;</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TrainingsNavbar;
