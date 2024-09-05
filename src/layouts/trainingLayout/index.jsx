import styles from "../../pages/Homepage/home.module.css";
import { useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import TrainingsNavbar from "../../components/trainingsNavbar";
import HomeTrainings from "../../components/homeTrainings";
import { useTrainingCategories } from "../../features/categories/categorySlice";

const TrainingLayout = () => {
  const { lang } = useParams();
  const {
    data: trainingsCategories,
    error: trainingsError,
    status: trainingStatus,
  } = useTrainingCategories(lang);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    ? selectedCategory.trainings
    : trainingsCategories[0]?.trainings || [];

  return (
    <>
      <nav className={styles.trainingsNavbar}>
        <ul
          className={`${styles.trainingsNavbarMenu} tnMenu flex alignItemsCenter justifyContentBetween`}
        >
          {trainingsCategories?.map((training) => (
            <li key={training.id}>
              <Link
                className={`flexCenter flexDirectionColumn ${
                  activeCategory?.id === training.id ? "active" : ""
                }`}
                onClick={() => handleCategorySelect(training)}
              >
                <h3>{training.title}</h3>{" "}
                <span>&#123; {training.subtitle} &#125;</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <HomeTrainings trainings={selectedTrainings} />
    </>
  );
};

export default TrainingLayout;
