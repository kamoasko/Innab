import React, { useEffect, useState } from "react";
import styles from "./trainings-menu.module.css";
import { Link, useLocation } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TrainingsMenu = React.memo(({ vidCat, lang, slug, subData }) => {
  const [isOpened, setIsOpened] = useState({});
  const location = useLocation();
  const activeCategorySlug = location.pathname.split("/")[4];

  const toggleTrainingMenu = (categoryId) => {
    setIsOpened((prevOpened) => ({
      ...prevOpened,
      [categoryId]: !prevOpened[categoryId],
    }));
  };

  useEffect(() => {
    const activeCategorySlug = location.pathname.split("/")[4];
    const activeCategory = vidCat?.find(
      (category) => category.slug === activeCategorySlug
    );

    if (activeCategory) {
      setIsOpened({ [activeCategory.id]: true });
    }
  }, [location.pathname, vidCat]);

  return (
    <ul
      className={`${styles.trainingMenu} trainingMenu flex flexDirectionColumn`}
    >
      {vidCat &&
        vidCat?.map((category) => (
          <li
            key={category.id}
            className={isOpened[category.id] ? "opened" : ""}
          >
            <div
              onClick={() => toggleTrainingMenu(category.id)}
              className="flex alignItemsCenter justifyContentBetween"
            >
              {category.title}{" "}
              {isOpened[category.id] ? <FaMinus /> : <FaPlus />}
            </div>
            {isOpened[category.id] && (
              <ul className="flex flexDirectionColumn">
                {category?.subData?.map((post) => (
                  <li
                    key={post.id}
                    className={
                      location.pathname.split("/")[5] === post.slug
                        ? "active"
                        : ""
                    }
                  >
                    <Link to={`/${lang}/${slug}/${category.slug}/${post.slug}`}>
                      {post.title}
                    </Link>
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
