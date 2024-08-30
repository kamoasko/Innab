import React from "react";
import styles from "./tabs.module.css";
import { NavLink } from "react-router-dom";

const Tabs = React.memo(({ title, to, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={`${styles.tab} tab flexCenter`}
        onClick={onClick}
      >
        <span>{title}</span>
        <div></div>
      </NavLink>
    </li>
  );
});

export default Tabs;
