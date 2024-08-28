import React, { useState } from "react";
import styles from "./trainings-menu.module.css";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TrainingsMenu = React.memo(({ vidCat }) => {
  const [trainingMenu, setTraininMenu] = useState({});

  const openTrainingMenu = (lessonId) => {
    setTraininMenu((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  return (
    <ul
      className={`${styles.trainingMenu} trainingMenu flex flexDirectionColumn`}
    >
      {vidCat?.map((category) => (
        <li className={trainingMenu[category.id] ? "opened" : ""}>
          <div
            onClick={() => openTrainingMenu(category.id)}
            className="flex alignItemsCenter"
          >
            {category.title}{" "}
            {trainingMenu[category.id] ? <FaMinus /> : <FaPlus />}
          </div>
          <ul className="flex flexDirectionColumn">
            <li>
              <Link>Data analitika</Link>
            </li>
            <li>
              <Link>Data analitika</Link>
            </li>
            <li>
              <Link>Data analitika</Link>
            </li>
            <li>
              <Link>Data analitika</Link>
            </li>
            <li>
              <Link>Data analitika</Link>
            </li>
            <li>
              <Link>Data analitika</Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
});

export default TrainingsMenu;
