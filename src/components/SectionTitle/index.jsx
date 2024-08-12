import React from "react";
import "../../general.css";

const SectionTitle = ({ title, about }) => {
  return (
    <div className={about ? "sectionTitle stA" : "sectionTitle"}>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionTitle;
