import React from "react";
import styles from "../../pages/BlogPage/blogs.module.css";
import { Link } from "react-router-dom";

const BlogCard = ({ to, title, label, det, bg, className }) => {
  return (
    <article className={`${styles.blogCard} ${className}`}>
      <Link
        to={to}
        style={{
          backgroundImage: bg,
        }}
        className="flex flexDirectionColumn justifyContentBetween"
      >
        <span className="flexCenter">{label}</span>
        <div className={`${styles.blogCardContent} flex flexDirectionColumn`}>
          <h4>{title}</h4>
          <p>{det}</p>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
