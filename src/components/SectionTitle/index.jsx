import React from "react";
import "../../general.css";

const SectionTitle = ({ title, about, corporative }) => {
  const color = corporative ? "var(--color-main)" : "initial";

  return (
    <div className={about ? "sectionTitle stA" : "sectionTitle"}>
      <h2 style={{ color: color }}>{title}</h2>
    </div>
  );
};

export default SectionTitle;
