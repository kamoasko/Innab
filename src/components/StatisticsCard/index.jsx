import React from "react";
import styles from "../../pages/Homepage/home.module.css";
import stats1 from "../../assets/images/homepage/təlim_növü1.svg";

const StatisticsCard = () => {
  return (
    <div className={`${styles.statistics} flex alignItemsCenter`}>
      <div className={styles.statisticsCard}>
        <div>
          <img src={stats1} alt="" />
        </div>
        <p>25+</p>
        <span>Təlim növü</span>
      </div>
    </div>
  );
};

export default StatisticsCard;
