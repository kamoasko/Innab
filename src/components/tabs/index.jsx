import React from "react";
import styles from "./tabs.module.css";
import { NavLink } from "react-router-dom";

const Tabs = React.memo(({ title, to, onClick, isActive }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={`${styles.tab} tab flexCenter ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        <span>{title}</span>
        <div></div>
      </NavLink>
    </li>
  );
});

export default Tabs;
