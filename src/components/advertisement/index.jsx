import React from "react";
import styles from "./advertisement.module.css";
import Button from "../Button";

const Advertisement = ({ speakers = [], time, location, adsImg }) => {
  return (
    <article
      className={`${styles.advertisement} flex alignItemsCenter justifyContentBetween`}
    >
      <div
        className={`${styles.advertisementDetails} flex flexDirectionColumn`}
      >
        <ul className="flex flexDirectionColumn">
          <li className="flex flexDirectionColumn">
            <h3>Spikerlər</h3>
            <div className="flex">
              {speakers.map((speaker, index) => (
                <>
                  <p key={index}>{speaker}</p>
                </>
              ))}
            </div>
          </li>
          <li className="flex flexDirectionColumn">
            <h3>Tarix</h3>
            <time dateTime={time}>{time}</time>
          </li>
          <li className="flex flexDirectionColumn">
            <h3>Məkan</h3>
            <p>{location}</p>
          </li>
        </ul>
        <Button title={"Qoşul"} borderRadius={"7rem"} />
      </div>
      <div className={styles.advertisementimg}>
        <img src={adsImg} alt="" />
        <Button title={"Qoşul"} borderRadius={"7rem"} />
      </div>
    </article>
  );
};

export default Advertisement;
