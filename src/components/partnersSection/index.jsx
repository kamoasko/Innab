import { memo, useCallback } from "react";
import styles from "../../pages/Homepage/home.module.css";
import PartnersCard from "../PartnersCard";
import SectionTitle from "../SectionTitle";
import { useOutletContext, useParams } from "react-router";
import PartnersSlider from "../sliders/partnersSlider";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useGetPartners } from "../../features/partners/partnersSlice";
import { Box, Skeleton } from "@mui/material";

const PartnersSection = memo(({ onClick, partnersTitle, buttonTitle }) => {
  const { lang } = useParams();
  const { data: partners, status, error } = useGetPartners(lang);

  const { width } = useWindowDimensions();
  const { partnersRef } = useOutletContext();

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

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
                    onClick={handleClick}
                    buttonTitle={buttonTitle}
                  />
                ))}
              </div>
            ) : (
              <PartnersSlider
                onclick={handleClick}
                partnerSlider={partners}
                buttonTitle={buttonTitle}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
});

export default PartnersSection;
