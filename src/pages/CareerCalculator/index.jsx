import React, { Suspense, useState } from "react";
import styles from "./calculator.module.css";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Box, Skeleton } from "@mui/material";
import { useMenus } from "../../features/menus/useMenu";
import suitcase from "../../assets/icons/money-suitcase.svg";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));
const CareerResults = React.lazy(() =>
  import("../../components/CareerResults")
);
const CareerForm = React.lazy(() => import("../../components/CareerForm"));

const CareerCalculator = () => {
  const [results, setResults] = useState(null);
  const { lang } = useParams();
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const handleResults = (data) => {
    setResults(data);
  };

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Career Calculator"}</title>
            <meta name="description" content={"Career Calculator"} />
            <meta name="keywords" content={"Career Calculator"} />
            <link
              rel="canonical"
              href={`/${lang}/size-faydali/karyera-kalkulyatoru`}
            />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{usefulMenu[5]?.seo_title}</title>
            <meta name="description" content={usefulMenu[5]?.seo_description} />
            <meta name="keywords" content={usefulMenu[5]?.seo_keywords} />
            {menus[0]?.seo_links || (
              <link
                rel="canonical"
                href={`/${lang}/${parentMenu[5]?.slug}/${usefulMenu[5]?.slug}`}
              />
            )}
            {usefulMenu[5]?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
        <div className="pageTop">
          <div className="container">
            <PageTitle title={"Karyera kakulyatoru"} />
          </div>
        </div>
        <section className={styles.calculator}>
          <div className="container">
            <div className={`${styles.calculatorWrapper} flex`}>
              <div className={styles.calculatorForm}>
                <div className={`${styles.calculatorTitle} flex`}>
                  <h2>
                    Gələcək <strong>maaşını</strong> hesabla
                  </h2>
                  <div>
                    <img loading="lazy" src={suitcase} alt="" />
                  </div>
                </div>
                <CareerForm onResults={handleResults} />
              </div>
              <div className={styles.calculatorResults}>
                <CareerResults results={results} />
              </div>
            </div>
          </div>
        </section>
        <Contact
          title={"Sualın var?"}
          subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
        />
      </Suspense>
    </>
  );
};

export default CareerCalculator;
