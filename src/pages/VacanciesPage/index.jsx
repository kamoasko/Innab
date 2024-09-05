import React, { Suspense } from "react";
import styles from "./vacancies.module.css";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";
import { useParams } from "react-router";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const CustomizedAccordions = React.lazy(() =>
  import("../../components/accordion")
);

const VacanciesPage = () => {
  const { lang } = useParams();
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const aboutMenu = menus?.filter((menu) => menu.parent_id === 3);

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Vakansiyalar"}</title>
            <meta name="description" content={"Vakansiyalar"} />
            <meta name="keywords" content={"Vakansiyalar"} />
            <link rel="canonical" href={`/${lang}/haqqimizda/vakansiyalar`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{aboutMenu[1]?.seo_title}</title>
            <meta name="description" content={aboutMenu[1]?.seo_description} />
            <meta name="keywords" content={aboutMenu[1]?.seo_keywords} />
            {aboutMenu[1]?.seo_links || (
              <link
                rel="canonical"
                href={`/${lang}/${parentMenu[0]?.slug}/${aboutMenu[1]?.slug}`}
              />
            )}
            {aboutMenu[1]?.seo_scripts || (
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
        <section className={styles.vanancies}>
          <div className="container">
            <PageTitle title={"Vakansiyalar"} />
            <div
              className={`${styles.vananciesWrapper} vacancyW flex flexDirectionColumn`}
            >
              <CustomizedAccordions />
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default VacanciesPage;
