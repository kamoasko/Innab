import React from "react";
import styles from "./contact.module.css";
import ContactForm from "./contactForm";
import ContactDetails from "../contactDetails";

const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className="container">
        <div className={`${styles.contactWrapper} flex justifyContentBetween`}>
          <div className={styles.contactContent}>
            <div className={`${styles.contactTitle} flex flexDirectionColumn`}>
              <h2>Sualın var?</h2>
              <p>
                Hardan başlamaqda tərəddüd edirsənsə <span>bizə zəng elə</span>
              </p>
            </div>
            <ContactDetails marginLeft={"4.4rem"} />
          </div>
          <div className={styles.contactForm}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
