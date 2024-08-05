import React from "react";
import styles from "./contact-page.module.css";
import PageTitle from "../../components/pageTitle";
import SocialNetworks from "../../components/SocialNetworks";
import ContactSection from "../../components/contactSection";

const ContactPage = () => {
  return (
    <>
      <section className={styles.contact}>
        <div className="container">
          <PageTitle title={"Əlaqə"} />
          <div className={styles.contactTitle}>
            <h2>
              Hardan başlamanda tərəddüd edirsənsə
              <strong> bizə zəng elə</strong>
            </h2>
          </div>
          <ContactSection />
        </div>
      </section>
    </>
  );
};

export default ContactPage;
