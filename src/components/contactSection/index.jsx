import React, { useEffect } from "react";
import styles from "../../pages/ContactPage/contact-page.module.css";
import SocialNetworks from "../SocialNetworks";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { Box, CircularProgress } from "@mui/material";

const ContactSection = ({ h2 }) => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { infos, status, error } = useSelector((state) => state.infos);

  useEffect(() => {
    dispatch(fetchSiteInfos(lang));
  }, [lang, dispatch]);

  return (
    <div className={`${styles.contactWrapper} flex alignItemsCenter`}>
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
          <div className={styles.contactMap}>
            <iframe
              src={infos.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={`${styles.contactInfos} flex flexDirectionColumn`}>
            {h2 && <h2>Əlaqə</h2>}
            <ul className="flex flexDirectionColumn">
              <li>
                Nərimanov rayonu, Fətəli Xan Xoyski 118 A (Talassemiya
                Mərkəzinin yanında, Gənclik və Nərimanov metrolarının
                yaxınlığında)
              </li>
              <li>+994 50 290 61 21 / +994 12 465 20 71</li>
              <li>contact@innab.org / info@innab.org</li>
            </ul>
            <SocialNetworks gap={"2.4rem"} />
          </div>
        </>
      )}
    </div>
  );
};

export default ContactSection;
