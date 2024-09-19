import React, { useEffect } from "react";
import styles from "../../pages/Homepage/home.module.css";
import PartnersCard from "../PartnersCard";
import SectionTitle from "../SectionTitle";
import { useOutletContext, useParams } from "react-router";
import PartnersSlider from "../sliders/partnersSlider";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useGetPartners } from "../../features/partners/partnersSlice";
import { Box, Skeleton } from "@mui/material";

const PartnersSection = ({ onClick, partnersTitle }) => {
  const { lang } = useParams();
  const { data: partners, status, error } = useGetPartners(lang);

  const { width } = useWindowDimensions();
  const { partnersRef } = useOutletContext();

  return (
    <section
      className={`${styles.partners} partners`}
      ref={partnersRef}
      id="#partners"
    >
      <SectionTitle title={partnersTitle} />
      <div className="container">
        {status === "pending" && (
          <Box className={styles.partnersGrid}>
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                component={"div"}
                variant="rectangular"
                width={"100%"}
                height={360}
                className={`${styles.partnersCard} flex flexDirectionColumn justifyContentBetween`}
              />
            ))}
          </Box>
        )}
        {status === "error" && <Box>{error}</Box>}
        {status === "success" && (
          <>
            {width >= 1024 ? (
              <div className={styles.partnersGrid}>
                {partners?.map((partner) => (
                  <PartnersCard
                    key={partner.id}
                    cardtTitle={partner.name}
                    text={partner.short_description}
                    img={partner.image}
                    onClick={onClick}
                  />
                ))}
              </div>
            ) : (
              <PartnersSlider onclick={onClick} partnerSlider={partners} />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
