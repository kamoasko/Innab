import React, { useEffect, useRef } from "react";
import styles from "../../pages/Homepage/home.module.css";
import PartnersCard from "../PartnersCard";
import SectionTitle from "../SectionTitle";
import { useOutletContext, useParams } from "react-router";
import PartnersSlider from "../sliders/partnersSlider";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../../features/partners/partnersSlice";
import { Box, CircularProgress } from "@mui/material";

const PartnersSection = ({ onClick, partnersTitle }) => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { partners, status, error } = useSelector((state) => state.partners);

  const { width } = useWindowDimensions();
  const { partnersRef } = useOutletContext();

  useEffect(() => {
    dispatch(fetchPartners(lang));
  }, [lang, dispatch]);

  return (
    <section
      className={`${styles.partners} partners`}
      ref={partnersRef}
      id="#partners"
    >
      <SectionTitle title={partnersTitle} />
      <div className="container">
        {status === "loading" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {status === "failed" && <Box>{error}</Box>}
        {status === "succeeded" && (
          <>
            {width >= 1024 ? (
              <div className={styles.partnersGrid}>
                {partners.map((partner) => (
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
