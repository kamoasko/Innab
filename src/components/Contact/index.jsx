import React, { memo, useMemo } from "react";
import styles from "./contact.module.css";
import ContactForm from "./contactForm";
import ContactDetails from "../contactDetails";
import { useParams } from "react-router";
import { useTranslations } from "../../features/translations/translations";
import { Skeleton } from "@mui/material";

const Contact = memo(
  ({
    apply,
    join,
    categories,
    training,
    contactRef,
    apiEndpoint,
    corporative,
  }) => {
    const { lang } = useParams();
    const { data: translations, isLoading } = useTranslations("form");

    const getTranslation = (keyword) => {
      const translation = translations.find((item) => item.keyword === keyword);
      return translation ? translation.value[lang] : keyword;
    };

    return (
      <section ref={contactRef} className={styles.contact} id="contact">
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
                      ? getTranslation("form_title_2")
                      : getTranslation("form_title"))}
                </h2>
                {isLoading && (
                  <Skeleton variant="text" width={"100%"} height={"100%"} />
                )}
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      translations &&
                      (join
                        ? getTranslation("form_subtitle_2")
                        : getTranslation("form_subtitle")),
                  }}
                />
              </div>
              <ContactDetails marginLeft={"4.4rem"} />
            </div>
            <div className={styles.contactForm}>
              <ContactForm
                apply={apply}
                join={join}
                apiEndpoint={apiEndpoint}
                categories={categories}
                corporative={corporative}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default Contact;
