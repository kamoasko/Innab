import React from "react";
import styles from "./useful-page-card.module.css";

const UsefulPageCard = ({ desc, icon }) => {
  return (
    <article
      className={`${styles.card}  flex alignItemsCenter justifyContentBetween`}
    >
      <div className={styles.cardDesc}>{desc}</div>
      <div className={styles.cardIcon}>{icon}</div>
    </article>
  );
};

export default UsefulPageCard;
