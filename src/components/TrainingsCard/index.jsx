import React from "react";
import "./trainingCard.css";
import { Link } from "react-router-dom";

const TrainingsCard = ({ title, desc, img, to }) => {
  return (
    <article className="trainingsCard">
      <Link className="active" to={to}>
        <div className="trainingsImg">
          <img src={img} alt="" />
        </div>
        <div className="trainingsCardDet">
          <h4>{title}</h4>
          <p>{desc} </p>
        </div>
      </Link>
    </article>
  );
};

export default TrainingsCard;
