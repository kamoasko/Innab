import React, { useEffect } from "react";
import styles from "../../pages/ContactPage/contact-page.module.css";
import SocialNetworks from "../SocialNetworks";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { Box, CircularProgress } from "@mui/material";

const ContactSection = React.memo(({ h2 }) => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { infos, status, error } = useSelector((state) => state.infos);

  useEffect(() => {
    dispatch(fetchSiteInfos(lang));
  }, [lang]);

  return (
    <div className={`${styles.contactWrapper} flex alignItemsCenter`}>
      <div className={styles.contactMap}>
        {status === "loading" && (
          <Box sx={{ width: "100%" }}>
            <CircularProgress
              sx={{ width: "2rem !important", height: "2rem !important" }}
            />
          </Box>
        )}
        {status === "failed" && <p>{error}</p>}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.29481557394!2d49.858944276433256!3d40.40231925651567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9beedfbb45%3A0x901b794894c03182!2s%C4%B0nnab%20Business%20School!5e0!3m2!1sen!2saz!4v1724390619511!5m2!1sen!2saz"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={`${styles.contactInfos} flex flexDirectionColumn`}>
        {h2 && <h2>Əlaqə</h2>}
        <ul className="flex flexDirectionColumn">
          <li>{infos.address}</li>
          <li>
            {infos.phone1} / {infos.phone2}
          </li>
          <li>
            {infos.email1} / {infos.email2}
          </li>
        </ul>
        <SocialNetworks contact gap={"2.4rem"} />
      </div>
    </div>
  );
});

export default ContactSection;
