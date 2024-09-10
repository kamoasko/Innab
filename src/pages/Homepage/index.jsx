import React, { Suspense, useRef } from "react";
import styles from "./home.module.css";
import { useParams } from "react-router-dom";
import { useMenus } from "../../features/menus/useMenu";
import HomeTrainings from "../../components/homeTrainings";
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
    categories?.map((category) => category.trainings)?.flat(Infinity);

  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const handleScrollToContact = () => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  };

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
            <Skeleton variant="rectangular" height={48} />
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
                <h1>Peşəkar inkişafınız üçün fərdi və korporativ təlimlər.</h1>
                <Button title={"Müraciət et"} to={"#contact"} color="orange" />
              </div>

              <StatsCounter />
            </div>
          </div>
        </section>

        <section className={`${styles.trainings} trainings`}>
          <SectionTitle title={"Təlimlər"} />
          <div className="container">
            <TrainingLayout />
          </div>
        </section>

        <PartnersSection onClick={handleScrollToContact} />

        <section className={styles.projects}>
          <SectionTitle title={"Lahiyələr"} />
          <div className="container">
            <ProjectSliders />
          </div>
        </section>

        <section className={styles.useful}>
          <SectionTitle title={"Sizə faydalı"} />
          <div className="container">
            <div className={styles.usefulGrid}>
              <UsefulCard
                title={"Video dərslər"}
                icon={<VideoLessonSvg />}
                to={
                  parentMenu &&
                  usefulMenu &&
                  `${parentMenu[5]?.slug}/${usefulMenu[0]?.slug}/${
                    videoCategories && videoCategories[0]?.slug
                  }`
                }
              />
              <UsefulCard
                title={"Bloq"}
                icon={<BlogSvg />}
                to={
                  parentMenu &&
                  usefulMenu &&
                  `${parentMenu[5]?.slug}/${usefulMenu[1]?.slug}/${
                    blogCategories && blogCategories[0]?.slug
                  }`
                }
              />
              <UsefulCard
                title={"Karyera kakulyatoru"}
                icon={<CalculatorSvg />}
                to={
                  parentMenu &&
                  usefulMenu &&
                  `${parentMenu[5]?.slug}/${usefulMenu[5]?.slug}`
                }
              />
              <UsefulCard
                title={"Seminar & Vebinar"}
                icon={<SeminarSvg />}
                to={
                  parentMenu &&
                  usefulMenu &&
                  `${parentMenu[5]?.slug}/${usefulMenu[2]?.slug}`
                }
              />
              <UsefulCard
                title={"Workshoplar"}
                icon={<WorkshopSvg />}
                to={
                  parentMenu &&
                  usefulMenu &&
                  `${parentMenu[5]?.slug}/${usefulMenu[4]?.slug}`
                }
              />
              <UsefulCard
                title={"Təqaüd proqramları"}
                icon={<ScholarshipSvg />}
                to={
                  parentMenu &&
                  usefulMenu &&
                  `${parentMenu[5]?.slug}/${usefulMenu[3]?.slug}`
                }
              />
            </div>
          </div>
        </section>

        <Customers homepage />

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
