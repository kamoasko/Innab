import React from "react";
import styles from "../Contact/contact.module.css";
import { Link, useParams } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useTranslations } from "../../features/translations/translations";

const ContactDetails = ({ marginLeft, email }) => {
  const { width } = useWindowDimensions();
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);
  const keywords = [
    "individual_phone",
    "corporate_phone",
    "project_phone",
    "phone_word",
  ];

  const { data: translations, isLoading } = useTranslations(
    lang,
    "site",
    keywords
  );

  return (
    <>
      {status === "pending" && (
        <Box sx={{ width: "100%" }}>
          <CircularProgress
            sx={{ width: "2rem !important", height: "2rem !important" }}
          />
        </Box>
      )}
      {status === "error" && <p>{error}</p>}
      {status === "success" && (
        <>
          {email ? (
            <ul
              className={`${styles.contactDetails} flex flexDirectionColumn`}
              style={{ marginLeft: marginLeft }}
            >
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton variant="text" width={150} height={20} />
                  )}
                  {translations && translations["individual_phone"]}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton width={100} height={20} variant="text" />
                  )}
                  {translations && translations["phone_word"]}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && translations["corporate_phone"]}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton width={100} height={20} variant="text" />
                  )}
                  {translations && translations["phone_word"]}
                  <Link to={`tel:${infos.phone2}`}>{infos.phone2}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && translations["project_phone"]}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton width={100} height={20} variant="text" />
                  )}
                  {translations && translations["phone_word"]}
                  <Link to={`tel:${infos.phone2}`}>{infos.phone2}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  <Link to={`mailto:${infos.email2}`}>{infos.email2}</Link>
                </span>
              </li>
            </ul>
          ) : !email && width > 768 ? (
            <ul
              className={`${styles.contactDetails} flex flexDirectionColumn`}
              style={{ marginLeft: marginLeft }}
            >
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton variant="text" width={150} height={20} />
                  )}
                  {translations && translations["individual_phone"]}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton width={100} height={20} variant="text" />
                  )}
                  {translations && translations["phone_word"]}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && translations["corporate_phone"]}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton width={100} height={20} variant="text" />
                  )}
                  {translations && translations["phone_word"]}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && translations["project_phone"]}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton width={100} height={20} variant="text" />
                  )}
                  {translations && translations["phone_word"]}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
            </ul>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default ContactDetails;
