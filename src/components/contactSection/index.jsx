import React from "react";
import styles from "../../pages/ContactPage/contact-page.module.css";
import SocialNetworks from "../SocialNetworks";
import { useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";

const ContactSection = React.memo(({ h2, title }) => {
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);

  return (
    <div className={`${styles.contactWrapper} flex alignItemsCenter`}>
      {status === "pending" && (
        <Box sx={{ width: "100%" }}>
          <CircularProgress
            sx={{ width: "2rem !important", height: "2rem !important" }}
          />
        </Box>
      )}
      {status === "error" && <p>{error}</p>}

      {status === "success" && (
        <div
          className={styles.contactMap}
          dangerouslySetInnerHTML={{
            __html: infos.map,
          }}
        />
      )}

      <div className={`${styles.contactInfos} flex flexDirectionColumn`}>
        {h2 && <h2>{title}</h2>}
        {status === "success" && (
          <ul className="flex flexDirectionColumn">
            <li>{infos.address}</li>
            <li>
              {infos.phone1} / {infos.phone2}
            </li>
            <li>
              {infos.email1} / {infos.email2}
            </li>
          </ul>
        )}
        <SocialNetworks contact gap={"2.4rem"} />
      </div>
    </div>
  );
});

export default ContactSection;
