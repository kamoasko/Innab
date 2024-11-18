import React from "react";
import styles from "../Customers/customers.module.css";
import { Link } from "react-router-dom";

const CustomerCard = ({ img, to }) => {
  return (
    <figure className={styles.customerCard}>
      <Link to={to} target="_blank">
        <picture>
          <img loading="lazy" src={img} alt="" />
        </picture>
      </Link>
    </figure>
  );
};

export default CustomerCard;
