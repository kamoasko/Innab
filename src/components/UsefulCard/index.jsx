import React from "react";
import styles from "../../pages/Homepage/home.module.css";
import { Link } from "react-router-dom";

const UsefulCard = ({ to, title, icon }) => {
  return (
    <article className={styles.usefulCard}>
      <Link className="flexCenter flexDirectionColumn" to={to}>
        {icon}
        <h3>{title}</h3>
      </Link>
    </article>
  );
};

export default UsefulCard;
