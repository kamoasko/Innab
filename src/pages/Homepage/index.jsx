import React, { Suspense, useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import { useParams } from "react-router-dom";
import { useMenus } from "../../features/menus/useMenu";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/categorySlice";
import {
  BlogSvg,
  CalculatorSvg,
  ScholarshipSvg,
  SeminarSvg,
  VideoLessonSvg,
  WorkshopSvg,
} from "../../components/usefulCardSvgs/usefulCardSvgs";
import { useBlogCategories } from "../../features/blogCategories/blogCategorySlice";
import { useVideoLessonCategory } from "../../features/videoLessons/videoLessonSlice";
import { useTranslations } from "../../features/translations/translations";

const Contact = React.lazy(() => import("../../components/Contact"));
const Customers = React.lazy(() => import("../../components/Customers"));
const UsefulCard = React.lazy(() => import("../../components/UsefulCard"));
const ProjectSliders = React.lazy(() =>
  import("../../components/sliders/ProjectSlider")
);
const Button = React.lazy(() => import("../../components/Button"));
const SectionTitle = React.lazy(() => import("../../components/SectionTitle"));
const StatsCounter = React.lazy(() => import("../../components/statsCounter"));
const PartnersSection = React.lazy(() =>
  import("../../components/partnersSection")
);
const TrainingLayout = React.lazy(() => import("../../layouts/trainingLayout"));

const Homepage = () => {
  const { lang } = useParams();
  const contactRef = useRef(null);
  const { data: infos } = useSiteInfos(lang);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const { data: videoCategories } = useVideoLessonCategory(lang);
  const { data: blogCategories } = useBlogCategories(lang);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);

  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const handleScrollToContact = () => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const keywords = [
    "homepage_title",
    "home_trainings_title",
    "home_partners_title",
    "home_project_title",
    "home_useful_title",
    "home_customers_title",
    "customers_text",
  ];
  const {
    data: translations,
    isLoading,
    error,
  } = useTranslations(lang, "site", keywords);

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"İnnab - Ana səhifə"}</title>
            <meta name="description" content={"İnnab - Ana səhifə"} />
            <meta name="keywords" content={"İnnab - Ana səhifə"} />
            <link rel="canonical" href={`/${lang}`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{parentMenu[8]?.seo_title}</title>
            <meta name="description" content={parentMenu[8]?.seo_description} />
            <meta name="keywords" content={parentMenu[8]?.seo_keywords} />
            {parentMenu[8]?.seo_links || (
              <link rel="canonical" href={`/${lang}`} />
            )}
            {parentMenu[8]?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={500} />
          </Box>
        }
      >
        <section
          className={styles.hero}
          style={{
            background: `
          linear-gradient(180deg, var(--color-main) 3%, rgba(0, 0, 0, 0.3) 100%), 
          linear-gradient(270deg, rgba(0, 0, 0, 0.3) 5%, rgba(5, 5, 5, 0.1) 10%),
          linear-gradient(45deg, rgba(0, 0, 0, 0.3) 5%, rgba(5, 5, 5, 0.1) 10%),
          url(${infos?.header_image}) rgba(247, 247, 254, 0.87) center / cover no-repeat
        `,
          }}
        >
          <div className="container" style={{ height: "100%" }}>
            <div className={`${styles.heroWrapper} flex flexDirectionColumn`}>
              <div
                className={`${styles.heroTitle} flex flexDirectionColumn alignItemsCenter`}
              >
                <h1>
                  {isLoading && (
                    <Skeleton variant="text" width={500} height={100} />
                  )}
                  {translations && translations["homepage_title"]}
                </h1>

                <Button
                  title={"Müraciət et"}
                  component
                  onClick={handleScrollToContact}
                  color="orange"
                />
              </div>

              <StatsCounter />
            </div>
          </div>
        </section>

        <section className={`${styles.trainings} trainings`}>
          <SectionTitle
            title={
              isLoading ? (
                <Skeleton
                  variant="text"
                  width={200}
                  height={60}
                  sx={{ margin: "0 auto" }}
                />
              ) : (
                translations && translations["home_trainings_title"]
              )
            }
          />
          <div className="container">
            <TrainingLayout />
          </div>
        </section>

        <PartnersSection
          onClick={handleScrollToContact}
          partnersTitle={
            isLoading ? (
              <Skeleton
                variant="text"
                height={60}
                width={200}
                sx={{ margin: "0 auto" }}
              />
            ) : (
              translations && translations["home_partners_title"]
            )
          }
        />

        <section className={styles.projects}>
          <SectionTitle
            title={
              isLoading ? (
                <Skeleton
                  variant="text"
                  height={60}
                  width={200}
                  sx={{ margin: "0 auto" }}
                />
              ) : (
                translations && translations["home_project_title"]
              )
            }
          />
          <div className="container">
            <ProjectSliders />
          </div>
        </section>

        <section className={styles.useful}>
          <SectionTitle
            title={
              isLoading ? (
                <Skeleton
                  variant="text"
                  height={60}
                  width={200}
                  sx={{ margin: "0 auto" }}
                />
              ) : (
                translations && translations["home_useful_title"]
              )
            }
          />
          <div className="container">
            {usefulMenu && parentMenu && (
              <div className={styles.usefulGrid}>
                <UsefulCard
                  title={usefulMenu[0]?.title}
                  icon={<VideoLessonSvg />}
                  to={`${parentMenu[5]?.slug}/${usefulMenu[0]?.slug}/${
                    videoCategories && videoCategories[0]?.slug
                  }`}
                />
                <UsefulCard
                  title={usefulMenu[1]?.title}
                  icon={<BlogSvg />}
                  to={`${parentMenu[5]?.slug}/${usefulMenu[1]?.slug}/${
                    blogCategories && blogCategories[0]?.slug
                  }`}
                />
                <UsefulCard
                  title={usefulMenu[5]?.title}
                  icon={<CalculatorSvg />}
                  to={`${parentMenu[5]?.slug}/${usefulMenu[5]?.slug}`}
                />
                <UsefulCard
                  title={usefulMenu[2]?.title}
                  icon={<SeminarSvg />}
                  to={`${parentMenu[5]?.slug}/${usefulMenu[2]?.slug}`}
                />
                <UsefulCard
                  title={usefulMenu[4]?.title}
                  icon={<WorkshopSvg />}
                  to={`${parentMenu[5]?.slug}/${usefulMenu[4]?.slug}`}
                />
                <UsefulCard
                  title={usefulMenu[3]?.title}
                  icon={<ScholarshipSvg />}
                  to={`${parentMenu[5]?.slug}/${usefulMenu[3]?.slug}`}
                />
              </div>
            )}
          </div>
        </section>

        <Customers
          homepage
          customersTitle={
            isLoading ? (
              <Skeleton
                variant="text"
                height={60}
                width={200}
                sx={{ margin: "0 auto" }}
              />
            ) : (
              translations && translations["home_customers_title"]
            )
          }
          text={
            isLoading ? (
              <>
                <Skeleton
                  variant="text"
                  width={800}
                  height={20}
                  sx={{ margin: "0 auto" }}
                />
                <Skeleton
                  variant="text"
                  width={600}
                  height={20}
                  sx={{ margin: "0 auto" }}
                />
                <Skeleton
                  variant="text"
                  width={300}
                  height={20}
                  sx={{ margin: "0 auto" }}
                />
              </>
            ) : (
              translations && translations["customers_text"]
            )
          }
        />

        <Contact
          title={"Sualın var?"}
          subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
          contactRef={contactRef}
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
      </Suspense>
    </>
  );
};

export default Homepage;
