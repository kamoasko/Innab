import React from "react";
import styles from "./404.module.css";
import notFound from "../../assets/images/404/404.png";
import Button from "../../components/Button";

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundImg}>
        <img loading="lazy" src={notFound} alt="404 Not Found" />
      </div>
      <h2>Opps! Page Not Found</h2>
      <Button title={"BACK TO HOME"} borderRadius={"7rem"} to={"/"} />
    </div>
  );
};

export default NotFoundPage;
