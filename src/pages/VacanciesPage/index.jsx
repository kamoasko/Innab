import React from "react";
import styles from "./vacancies.module.css";
import PageTitle from "../../components/pageTitle";
import CustomizedAccordions from "../../components/accordion";

const VacanciesPage = () => {
  return (
    <section className={styles.vanancies}>
      <div className="container">
        <PageTitle title={"Vakansiyalar"} />
        <div
          className={`${styles.vananciesWrapper} vacancyW flex flexDirectionColumn`}
        >
          <CustomizedAccordions />
        </div>
      </div>
    </section>
  );
};

export default VacanciesPage;
