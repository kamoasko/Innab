import React from "react";
import styles from "./tabs.module.css";
import { NavLink } from "react-router-dom";

const Tabs = ({ title }) => {
  return (
    <li>
      <NavLink className={`${styles.tab} flexCenter`}>{title}</NavLink>
    </li>
  );
};

export default Tabs;
