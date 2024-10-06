import React from "react";
import styles from "../../pages/Homepage/home.module.css";
import Button from "../Button";

const PartnersCard = ({ cardtTitle, text, img, onClick, buttonTitle }) => {
  return (
    <div
      className={`${styles.partnersCard} flex flexDirectionColumn justifyContentBetween`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(49, 56, 227), rgba(0, 0, 0, 0)),  url(${img})`,
      }}
    >
      <div className={styles.partnersCardDet}>
        <h3>{cardtTitle}</h3>
        <p>{text}</p>
      </div>
      <Button title={buttonTitle} component onClick={onClick} />
    </div>
  );
};

export default PartnersCard;
