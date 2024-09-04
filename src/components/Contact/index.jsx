import React from "react";
import styles from "./contact.module.css";
import ContactForm from "./contactForm";
import ContactDetails from "../contactDetails";

const Contact = ({
  apply,
  join,
  title,
  subTitle,
  training,
  contactRef,
  apiEndpoint,
}) => {
  return (
    <section ref={contactRef} className={styles.contact}>
      <div className="container">
        <div
          className={`${styles.contactWrapper} ${
            training ? styles.contactTraning : ""
          } flex justifyContentBetween`}
        >
          <div className={styles.contactContent}>
            <div
              className={`${styles.contactTitle} ${
                join ? styles.cti : ""
              } flex flexDirectionColumn`}
            >
              <h2>{title}</h2>
              <p>{subTitle}</p>
            </div>
            <ContactDetails marginLeft={"4.4rem"} />
          </div>
          <div className={styles.contactForm}>
            <ContactForm apply={apply} join={join} apiEndpoint={apiEndpoint} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
