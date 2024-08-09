import React from "react";
import styles from "./tabs.module.css";
import { NavLink } from "react-router-dom";

const Tabs = ({ title }) => {
  return (
    <li>
      <NavLink className={`${styles.tab} flexCenter`}>
        <span>{title}</span>
        <div></div>
      </NavLink>
    </li>
  );
};

export default Tabs;
