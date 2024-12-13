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
            <li className="flex flexDirectionColumn contact__addresses">
              {adresses &&
                adresses.map((address, index) => <p key={index}>{address}</p>)}
            </li>
            <li className="contact__list--item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M11.7597 12.7158C12.8882 11.5872 14.6647 11.4832 15.846 12.4764L16.6996 13.1955C17.6737 14.0153 17.7728 15.4931 16.9192 16.4953C16.4537 17.0339 15.7985 17.3722 15.0899 17.4398C12.3624 17.8072 9.50111 16.4929 6.50448 13.496C3.50785 10.4991 2.19281 7.63683 2.56016 4.90992C2.57925 4.69656 2.62359 4.48622 2.69224 4.2833C2.8511 3.81717 3.13153 3.40191 3.50455 3.08043C4.50756 2.2276 5.98441 2.32584 6.80414 3.30086L7.52234 4.15451C8.51709 5.33427 8.4139 7.11175 7.28542 8.24033L6.67289 8.85208C6.50958 9.0157 6.45611 9.25924 6.53585 9.47623C6.75874 10.0855 7.32752 10.8467 8.24054 11.7598C9.15439 12.6737 9.91552 13.2417 10.5239 13.4654C10.741 13.545 10.9846 13.4912 11.148 13.3276L11.7597 12.7158Z"
                  fill="#3138E3"
                />
              </svg>
              <span>
                {infos[0].phone1}
              </span>
              <span>
                {infos[0].phone2}
              </span>
            </li>
            <li className="contact__list--item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.3346 7.62413V13.6497C18.3346 14.795 18.2154 15.2104 17.9914 15.6291C17.7675 16.0478 17.4389 16.3764 17.0202 16.6004C16.6014 16.8243 16.1861 16.9436 15.0408 16.9436H4.96185C3.81649 16.9436 3.40116 16.8243 2.98244 16.6004C2.56371 16.3764 2.2351 16.0478 2.01116 15.6291C1.78722 15.2104 1.66797 14.795 1.66797 13.6497V7.62413L10.0013 11.4948L18.3346 7.62413ZM15.0408 3.05469C16.1861 3.05469 16.6014 3.17394 17.0202 3.39788C17.4389 3.62182 17.7675 3.95043 17.9914 4.36916C18.1335 4.63474 18.2334 4.89895 18.2875 5.34894L10.0013 9.19789L1.71528 5.34753C1.76941 4.8984 1.86927 4.63446 2.01116 4.36916C2.2351 3.95043 2.56371 3.62182 2.98244 3.39788C3.40116 3.17394 3.81649 3.05469 4.96185 3.05469H15.0408Z"
                  fill="#3138E3"
                />
              </svg>
              <span>
                {infos[0].email1}
              </span>
              <span>
                {infos[0].email2}
              </span>
            </li>
          </ul>
        )}
        <SocialNetworks gap={"2.4rem"} />
      </div>
    </div>
  );
});

export default ContactSection;
