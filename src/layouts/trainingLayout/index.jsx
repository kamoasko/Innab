import styles from "../../pages/Homepage/home.module.css";
import { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import HomeTrainings from "../../components/homeTrainings";
import { useTrainingCategories } from "../../features/categories/useCategory";

const TrainingLayout = () => {
  const { lang } = useParams();
  const { trainingsRef } = useOutletContext();
  const {
    data: trainingsCategories,
    error: trainingsError,
    status: trainingStatus,
  } = useTrainingCategories(lang);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (trainingStatus === "success" && trainingsCategories.length > 0) {
      setActiveCategory(trainingsCategories[0]);
      setSelectedCategory(trainingsCategories[0]);
    }
  }, [trainingStatus, trainingsCategories]);

  if (trainingStatus === "error") {
    return <div>{trainingsError}</div>;
  }

  if (trainingStatus === "pending") {
    return <div>Loading...</div>;
  }

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSelectedCategory(category);
  };

  const selectedTrainings = selectedCategory
    ? selectedCategory.subData
    : trainingsCategories[0]?.subData || [];

  const selectedSlug = selectedCategory ? selectedCategory.slug : "";

  return (
    <>
      <nav className={styles.trainingsNavbar} ref={trainingsRef}>
        <ul
          className={`${styles.trainingsNavbarMenu} tnMenu flex alignItemsCenter justifyContentBetween`}
        >
          {trainingsCategories?.map((training) => (
            <li key={training.id}>
              <div
                className={`flexCenter flexDirectionColumn ${
                  activeCategory?.id === training.id ? "active" : ""
                }`}
                onClick={() => handleCategorySelect(training)}
              >
                <h3>{training.title}</h3>
                <span>&#123; {training.subtitle} &#125;</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <HomeTrainings trainings={selectedTrainings} link={selectedSlug} />
    </>
  );
};

export default TrainingLayout;
