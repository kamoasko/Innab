import React, { useState } from "react";
import styles from "./trainings-menu.module.css";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TrainingsMenu = React.memo(({ vidCat, posts }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const toggleTrainingMenu = (categoryId) => {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };

  return (
    <ul
      className={`${styles.trainingMenu} trainingMenu flex flexDirectionColumn`}
    >
      {vidCat?.map((category) => (
        <li
          key={category.id}
          className={openCategoryId === category.id ? "opened" : ""}
        >
          <div
            onClick={() => toggleTrainingMenu(category.id)}
            className="flex alignItemsCenter"
          >
            {category.title}{" "}
            {openCategoryId === category.id ? <FaMinus /> : <FaPlus />}
          </div>
          {openCategoryId === category.id && (
            <ul className="flex flexDirectionColumn">
              {posts
                ?.filter((post) => post.categoryId === category.id)
                .map((post) => (
                  <li key={post.id}>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </li>
                ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
});

export default TrainingsMenu;
