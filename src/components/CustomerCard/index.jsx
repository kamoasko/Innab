import React from "react";
import styles from "../Customers/customers.module.css";

const CustomerCard = ({ img }) => {
  return (
    <figure className={styles.customerCard}>
      <picture>
        <img src={img} alt="" />
      </picture>
    </figure>
  );
};

export default CustomerCard;
