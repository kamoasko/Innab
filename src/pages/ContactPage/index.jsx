import React, { useEffect } from "react";
import styles from "./contact-page.module.css";
import PageTitle from "../../components/pageTitle";
import ContactSection from "../../components/contactSection";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../i18n";
import { useParams } from "react-router";

const ContactPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    const fetchTranslations = async () => {
      await changeLanguage(lang, "form", "name_surname_label");
      // await changeLanguage(
      //   "az",
      //   "contact",
      //   "Hardan başlamanda tərəddüd edirsə bizə zəng elə"
      // );
    };

    fetchTranslations();
  }, []);

  return (
    <>
      <section className={styles.contact}>
        <div className="container">
          <PageTitle title={"Əlaqə"} />
          <div className={styles.contactTitle}>
            <h2>
              {t("name_surname_label")}
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
