import React from "react";
import styles from "../../pages/Homepage/home.module.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ title, text, icon, to }) => {
  return (
    <Link
      to={to}
      className={`${styles.projectsCard} flex flexDirectionColumn alignItemsCenter justifyContentBetween`}
    >
      <div className={styles.projectsCardDet}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className={`${styles.projectsCardIcon} flexCenter projectsCardS`}>
        <div className="flexCenter">
          <div className="flexCenter">{icon}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
