import React, { useState } from "react";
import styles from "./trainings-menu.module.css";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TrainingsMenu = React.memo(({ vidCat, lang, slug, subData }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const toggleTrainingMenu = (categoryId) => {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };

  return (
    <ul
      className={`${styles.trainingMenu} trainingMenu flex flexDirectionColumn`}
    >
      {subData
        ? vidCat?.map((category) => (
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
                  {category?.subData?.map((post) => (
                    <li key={post.id}>
                      <Link
                        to={`/${lang}/${slug}/${category.slug}/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        : vidCat?.map((category) => (
            <li>
              <Link
                to={`/${lang}/${slug}/${category.slug}/${category.subData[0]?.slug}`}
              >
                {category.title}
              </Link>
            </li>
          ))}
    </ul>
  );
});

export default TrainingsMenu;
