import React, { useEffect } from "react";
import styles from "../Contact/contact.module.css";
import { Link, useParams } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { Box, CircularProgress } from "@mui/material";

const ContactDetails = ({ marginLeft, email }) => {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const { lang } = useParams();
  const { infos, status, error } = useSelector((state) => state.infos);

  useEffect(() => {
    dispatch(fetchSiteInfos(lang));
  }, [lang, dispatch]);

  return (
    <>
      {status === "loading" && (
        <Box sx={{ width: "100%" }}>
          <CircularProgress
            sx={{ width: "2rem !important", height: "2rem !important" }}
          />
        </Box>
      )}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <>
          {email ? (
            <ul
              className={`${styles.contactDetails} flex flexDirectionColumn`}
              style={{ marginLeft: marginLeft }}
            >
              <li className="flex flexDirectionColumn">
                <span>Fiziki şəxslər üçün</span>
                <span>
                  Tel: <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>Korporativ müştərilər üçün</span>
                <span>
                  Tel: <Link to={`tel:${infos.phone2}`}>{infos.phone2}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  DMA, Technest, Qaçqınkom və digər dövlətlə əməkdaşlıq
                  layihələri üçün
                </span>
                <span>
                  Tel: <Link to={`tel:${infos.phone2}`}>{infos.phone2}</Link>
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
                <span>Fiziki şəxslər üçün</span>
                <span>
                  Tel: <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>Korporativ müştərilər üçün</span>
                <span>
                  Tel: <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
                </span>
              </li>
              <li className="flex flexDirectionColumn">
                <span>
                  DMA, Technest, Qaçqınkom və digər dövlətlə əməkdaşlıq
                  layihələri üçün
                </span>
                <span>
                  Tel: <Link to={`tel:${infos.phone1}`}>{infos.phone1}</Link>
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
