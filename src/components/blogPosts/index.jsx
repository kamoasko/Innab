import styles from "../../pages/DetailPage/details.module.css";
import blogImg from "../../assets/images/bloq/blog.jpeg";
import { FaChevronDown } from "react-icons/fa6";
import Button from "../Button";
import { useState } from "react";

const BlogPosts = ({ blogs, blogContent }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={styles.detailMain}>
      <div className={`${styles.detailMainTop} flex`}>
        <div className={styles.detailFigure}>
          <img loading="lazy" src={blogImg} alt="" />
        </div>
        <div className={styles.detailTopics}>
          {blogContent && (
            <div
              className={`${styles.detailTopic} detailTopic ${
                isActive ? "active" : ""
              }`}
            >
              <div
                onClick={handleToggleActive}
                className="flex alignItemsCenter justifyContentBetween"
              >
                <h3>{blogContent.title}</h3>

                <FaChevronDown />
              </div>
              <ul className="flex flexDirectionColumn">
                {blogContent?.content?.map((blog, index) => (
                  <li key={blog.id} className="flex flexDirectionColumn">
                    <span>
                      1.{index + 1} {blog.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Button component title={"Abunə ol"} />
    </div>
  );
};

export default BlogPosts;
