import React from "react";
import styles from "../../pages/ContactPage/contact-page.module.css";
import SocialNetworks from "../SocialNetworks";
import { useParams } from "react-router";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";

const ContactSection = React.memo(({ h2, title }) => {
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);
  const adresses = infos && infos[0]?.address[lang]?.split("/");

  return (
    <div className={`${styles.contactWrapper} flex alignItemsCenter`}>
      {status === "pending" && (
        <Box sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" width={"100%"} height={"100vh"} />
        </Box>
      )}
      {status === "error" && <p>{error}</p>}

      {status === "success" && (
        <div
          className={`${styles.contactMap} flex flexDirectionColumn`}
          dangerouslySetInnerHTML={{
            __html: infos[0].map,
          }}
        />
      )}

      <div className={`${styles.contactInfos} flex flexDirectionColumn`}>
        {h2 && <h2>{title}</h2>}
        {status === "success" && (
          <ul className="flex flexDirectionColumn">
            <li>
              {adresses &&
                adresses.map((address, index) => <p key={index}>{address}</p>)}
            </li>
            <li>
              {infos[0].phone1} / {infos[0].phone2}
            </li>
            <li>
              {infos[0].email1} / {infos[0].email2}
            </li>
          </ul>
        )}
        <SocialNetworks gap={"2.4rem"} />
      </div>
    </div>
  );
});

export default ContactSection;
