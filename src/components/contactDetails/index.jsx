import React from "react";
import styles from "../Contact/contact.module.css";
import { Link, useParams } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useTranslations } from "../../features/translations/translations";

const ContactDetails = ({ marginLeft, email, mail }) => {
  const { width } = useWindowDimensions();
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);
  const { data: translations, isLoading } = useTranslations("site");

  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  return (
    <>
      {status === "pending" && (
        <Box sx={{ width: "100%" }} className="flex flexDirectionColumn">
          <Skeleton variant="text" width={200} height={20} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={200} height={20} />
          <Skeleton variant="text" width={100} height={20} />
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
                  {translations && getTranslation("individual_phone")}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton
                      width={30}
                      height={20}
                      variant="text"
                      sx={{ display: "inline-block" }}
                    />
                  )}
                  {translations && getTranslation("phone_word")}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && getTranslation("corporate_phone")}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton
                      width={30}
                      height={20}
                      variant="text"
                      sx={{ display: "inline-block" }}
                    />
                  )}
                  {translations && getTranslation("phone_word")}
                  <Link to={`tel:${infos.phone2}`}>{infos.phone2}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && getTranslation("project_phone")}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton
                      width={30}
                      height={20}
                      variant="text"
                      sx={{ display: "inline-block" }}
                    />
                  )}
                  {translations && getTranslation("phone_word")}{" "}
                  <Link to={`tel:${infos.phone2}`}>{infos.phone2}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton
                      width={30}
                      height={20}
                      variant="text"
                      sx={{ display: "inline-block" }}
                    />
                  )}
                  {mail}{" "}
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
                  {translations && getTranslation("individual_phone")}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton
                      width={30}
                      height={20}
                      variant="text"
                      sx={{ display: "inline-block" }}
                    />
                  )}
                  {translations && getTranslation("phone_word")}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && getTranslation("corporate_phone")}
                </span>
                <span>
                  {isLoading && (
                    <Skeleton
                      width={30}
                      height={20}
                      variant="text"
                      sx={{ display: "inline-block" }}
                    />
                  )}
                  {translations && getTranslation("phone_word")}{" "}
                  <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  {isLoading && (
                    <Skeleton width={150} height={20} variant="text" />
                  )}
                  {translations && getTranslation("project_phone")}
                </span>
                <span>
                  {mail}
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
