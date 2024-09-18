import React from "react";
import styles from "./contact.module.css";
import ContactForm from "./contactForm";
import ContactDetails from "../contactDetails";
import { useParams } from "react-router";
import { useTranslations } from "../../features/translations/translations";
import { Skeleton } from "@mui/material";

const Contact = ({
  apply,
  join,
  categories,
  training,
  contactRef,
  apiEndpoint,
}) => {
  const { lang } = useParams();
  const keywords = [
    "form_title",
    "form_subtitle",
    "form_title_2",
    "form_subtitle_2",
  ];

  const { data: translations, isLoading } = useTranslations(
    lang,
    "form",
    keywords
  );

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
              <h2>
                {isLoading && (
                  <Skeleton variant="text" width={300} height={"100%"} />
                )}
                {translations &&
                  (join
                    ? translations["form_title_2"]
                    : translations["form_title"])}
              </h2>
              <p>
                {isLoading && (
                  <Skeleton variant="text" width={"100%"} height={"100%"} />
                )}
                {translations &&
                  (join
                    ? translations["form_subtitle_2"]
                    : translations["form_subtitle"])}
              </p>
            </div>
            <ContactDetails marginLeft={"4.4rem"} />
          </div>
          <div className={styles.contactForm}>
            <ContactForm
              apply={apply}
              join={join}
              apiEndpoint={apiEndpoint}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
