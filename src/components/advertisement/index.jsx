import React from "react";
import styles from "./advertisement.module.css";
import Button from "../Button";

const Advertisement = ({
  speakers = [],
  speakersTitle,
  time,
  dateTitle,
  location,
  locationTitle,
  adsImg,
  onclick,
  title,
  btnTitle,
}) => {
  return (
    <article
      className={`${styles.advertisement} flex alignItemsCenter justifyContentBetween`}
    >
      <div
        className={`${styles.advertisementDetails} flex flexDirectionColumn`}
      >
        <ul className="flex flexDirectionColumn">
          <li className="flex flexDirectionColumn">
            <h3>{speakersTitle}</h3>
            <div className="flex">
              {speakers.map((speaker, index) => (
                <p key={index}>{speaker}</p>
              ))}
            </div>
          </li>
          <li className="flex flexDirectionColumn">
            <h3>{dateTitle}</h3>
            <time dateTime={time}>{time}</time>
          </li>
          <li className="flex flexDirectionColumn">
            <h3>{locationTitle}</h3>
            <p>{location}</p>
          </li>
        </ul>
        <Button
          title={btnTitle}
          component
          onClick={onclick}
          borderRadius={"7rem"}
        />
      </div>
      <div className={styles.advertisementimg}>
        <img loading="lazy" src={adsImg} alt={title} />
        <Button
          title={btnTitle}
          component
          onClick={onclick}
          borderRadius={"7rem"}
        />
      </div>
    </article>
  );
};

export default Advertisement;
