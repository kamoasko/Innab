import React, { useState } from "react";
import styles from "./trainings-menu.module.css";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TrainingsMenu = ({ categories }) => {
  const [trainingMenu, setTraininMenu] = useState(false);

  const openTrainingMenu = () => {
    setTraininMenu((prev) => !prev);
  };

  return (
    <ul
      className={`${styles.trainingMenu} trainingMenu flex flexDirectionColumn`}
    >
      {categories.map((category) => (
        <li className={trainingMenu ? "opened" : ""} key={category.id}>
          <div onClick={openTrainingMenu} className="flex alignItemsCenter">
            {category.title} {trainingMenu ? <FaMinus /> : <FaPlus />}
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
};

export default TrainingsMenu;
