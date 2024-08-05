import React from "react";
import styles from "../../pages/ContactPage/contact-page.module.css";
import SocialNetworks from "../SocialNetworks";

const ContactSection = () => {
  return (
    <div className={`${styles.contactWrapper} flex alignItemsCenter`}>
      <div className={styles.contactMap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1102.6499994709427!2d49.86174351330314!3d40.40229793397024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9beedfbb45%3A0x901b794894c03182!2s%C4%B0nnab%20Business%20School!5e0!3m2!1sen!2saz!4v1722586862530!5m2!1sen!2saz"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={`${styles.contactInfos} flex flexDirectionColumn`}>
        <ul className="flex flexDirectionColumn">
          <li>
            Nərimanov rayonu, Fətəli Xan Xoyski 118 A (Talassemiya Mərkəzinin
            yanında, Gənclik və Nərimanov metrolarının yaxınlığında)
          </li>
          <li>+994 50 290 61 21 / +994 12 465 20 71</li>
          <li>contact@innab.org / info@innab.org</li>
        </ul>
        <SocialNetworks gap={"2.4rem"} />
      </div>
    </div>
  );
};

export default ContactSection;
