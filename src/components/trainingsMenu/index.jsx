import React, { useState } from "react";
import styles from "./trainings-menu.module.css";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TrainingsMenu = () => {
  const [trainingMenu, setTraininMenu] = useState(false);

  const openTrainingMenu = () => {
    setTraininMenu((prev) => !prev);
  };

  return (
    <ul
      className={`${styles.trainingMenu} trainingMenu flex flexDirectionColumn`}
    >
      <li className={trainingMenu ? "opened" : ""}>
        <div onClick={openTrainingMenu} className="flex alignItemsCenter">
          Data analitika {trainingMenu ? <FaMinus /> : <FaPlus />}
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
      <li className={trainingMenu ? "opened" : ""}>
        <div onClick={openTrainingMenu} className="flex alignItemsCenter">
          Kompüter bacarıqları {trainingMenu ? <FaMinus /> : <FaPlus />}
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
        </ul>
      </li>
    </ul>
  );
};

export default TrainingsMenu;
