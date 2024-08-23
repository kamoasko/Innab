import React from "react";
import styles from "./tabs.module.css";
import { NavLink } from "react-router-dom";

const Tabs = ({ title, to, categoryId }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={`${styles.tab} flexCenter`}
        data-category-id={categoryId}
      >
        <span>{title}</span>
        <div></div>
      </NavLink>
    </li>
  );
};

export default Tabs;
