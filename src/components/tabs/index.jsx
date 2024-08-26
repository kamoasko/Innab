import React from "react";
import styles from "./tabs.module.css";
import { NavLink } from "react-router-dom";

const Tabs = React.memo(({ title, to, categoryId, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={`${styles.tab} tab flexCenter`}
        data-category-id={categoryId}
        onClick={onClick} // Handle click to trigger categoryId update
      >
        <span>{title}</span>
        <div></div>
      </NavLink>
    </li>
  );
});

export default Tabs;
