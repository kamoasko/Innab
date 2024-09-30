import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./home.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import StatsCounter from "../../components/statsCounter";
import { useMenus } from "../../features/menus/useMenu";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/useCategory";
import {
  BlogSvg,
  CalculatorSvg,
  ScholarshipSvg,
  SeminarSvg,
  VideoLessonSvg,
  WorkshopSvg,
} from "../../components/usefulCardSvgs/usefulCardSvgs";
import { useBlogCategories } from "../../features/blogCategories/useBlogCategory";
import { useVideoLessonCategory } from "../../features/videoLessons/videoLessonSlice";
import { useTranslations } from "../../features/translations/translations";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";

const TrainingLayout = React.lazy(() =>
  import("../../layouts/trainingLayout").then((module) => ({
    default: module.default,
    translations: module.translations, // Assuming translations are exported from the module
  }))
);
const PartnersSection = React.lazy(() =>
  import("../../components/partnersSection").then((module) => ({
    default: memo(module.default), // Memoize the exported component
    translations: module.translations,
  }))
);
const ProjectSliders = React.lazy(() =>
  import("../../components/sliders/ProjectSlider").then((module) => ({
    default: module.default,
    translations: module.translations, // Assuming translations are exported from the module
  }))
);
const UsefulCard = React.lazy(() =>
  import("../../components/UsefulCard").then((module) => ({
    default: module.default,
    translations: module.translations, // Assuming translations are exported from the module
  }))
);
const Customers = React.lazy(() =>
  import("../../components/Customers").then((module) => ({
    default: memo(module.default),
    translations: module.translations, // Assuming translations are exported from the module
  }))
);
const Contact = React.lazy(() =>
  import("../../components/Contact").then((module) => ({
    default: memo(module.default),
    translations: module.translations, // Assuming translations are exported from the module
  }))
);

const Homepage = () => {
  const { lang } = useParams();
  const contactRef = useRef(null);
  const { useFullRef } = useOutletContext();
  const { data: infos } = useSiteInfos(lang);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const { data: videoCategories } = useVideoLessonCategory(lang);
  const { data: blogCategories } = useBlogCategories(lang);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings = useMemo(
    () =>
      categories &&
      categories?.map((category) => category.subData)?.flat(Infinity),
    [categories]
  );

  const parentMenu = useMemo(
    () => menus?.filter((menu) => menu.parent_id === 0),
    [menus]
  );
  const usefulMenu = useMemo(
    () => menus?.filter((menu) => menu.parent_id === 8),
    [menus]
  );

  const handleScrollToContact = useCallback(() => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  function stripHtml(html) {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"İnnab - Ana səhifə"}</title>
            <meta name="description" content="İnnab - Ana səhifə" />
            <meta name="keywords" content="İnnab - Ana səhifə" />
            <link rel="canonical" href={`/${lang}`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{parentMenu[8]?.seo_title}</title>
            <meta
              name="description"
              content={stripHtml(parentMenu[8]?.seo_description)}
            />
            <meta
              name="keywords"
              content={stripHtml(parentMenu[8]?.seo_keywords)}
            />
            {parentMenu[8]?.seo_links || (
              <link rel="canonical" href={`/${lang}`} />
            )}
            {parentMenu[8]?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
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
                {translations && getTranslation("homepage_title")}
              </h1>

              <Button
                title={translations && getTranslation("s_apply_button")}
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
              translations && getTranslation("home_trainings_title")
            )
          }
        />
        <div className="container">
          <Suspense
            fallback={
              <Box>
                <Skeleton
                  variant="rectangular"
                  height={"100%"}
                  width={"100%"}
                />
              </Box>
            }
          >
            <TrainingLayout />
          </Suspense>
        </div>
      </section>

      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          </Box>
        }
      >
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
              translations && getTranslation("home_partners_title")
            )
          }
        />
      </Suspense>
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
              translations && getTranslation("home_project_title")
            )
          }
        />
        <div className="container">
          <Suspense
            fallback={
              <Box>
                <Skeleton
                  variant="rectangular"
                  height={"100%"}
                  width={"100%"}
                />
              </Box>
            }
          >
            <ProjectSliders />
          </Suspense>
        </div>
      </section>

      <section className={styles.useful} ref={useFullRef}>
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
              translations && getTranslation("home_useful_title")
            )
          }
        />
        <div className="container">
          {usefulMenu && parentMenu && (
            <div className={styles.usefulGrid}>
              <Suspense
                fallback={
                  <Box>
                    <Skeleton
                      variant="rectangular"
                      height={"100%"}
                      width={"100%"}
                    />
                  </Box>
                }
              >
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
              </Suspense>
            </div>
          )}
        </div>
      </section>

      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          </Box>
        }
      >
        <Customers homepage />
      </Suspense>

      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          </Box>
        }
      >
        <Contact
          contactRef={contactRef}
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
      </Suspense>
    </>
  );
};

export default Homepage;
