import React from "react";
import "../../general.css";
import { Link } from "react-router-dom";

const Button = ({ component, title, borderRadius, to, color, onClick }) => {
  const bgColor =
    color === "orange"
      ? "var(--color-btn)"
      : color === "white"
      ? "var(--color-white)"
      : "var(--color-main)";

  return (
    <>
      {component ? (
        <button
          className="contactBtn btnHover flexCenter"
          onClick={onClick}
          style={{
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            borderColor: bgColor,
          }}
        >
          <span>{title}</span>
          <div className="btnHoverBg"></div>
        </button>
      ) : (
        <Link
          className="contactBtn btnHover flexCenter"
          to={to}
          style={{
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            borderColor: bgColor,
          }}
        >
          <span>{title}</span>
          <div
            className={color === "white" ? "btnHoverBg btnHB" : "btnHoverBg"}
          ></div>
        </Link>
      )}
    </>
  );
};

export default Button;
