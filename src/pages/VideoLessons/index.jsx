import React, { Suspense, useState, useEffect } from "react";
import styles from "./video-lessons.module.css";
import { Outlet, useParams } from "react-router";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useVideoLessonCategory } from "../../features/videoLessons/videoLessonSlice";
import { useMenus } from "../../features/menus/useMenu";
import { useTrainingCategories } from "../../features/categories/useCategory";
import { useTranslations } from "../../features/translations/translations";
import { Helmet } from "react-helmet-async";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));
const Tabs = React.lazy(() => import("../../components/tabs"));

const VideoLessons = () => {
  const { lang } = useParams();
  const { data: videoCategories, status, error } = useVideoLessonCategory(lang);
  const { data: menus } = useMenus(lang);
  const [categoryId, setCategoryId] = useState(null);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);

  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const handleTabClick = (id) => {
    setCategoryId(id);
  };

  const isDetailPage = location.pathname.includes(
    location.pathname.split("/")[5]
  );

  useEffect(() => {
    if (status === "success" && videoCategories.length > 0) {
      setCategoryId(videoCategories[0].id);
    }
  }, [status, videoCategories]);

  const currentCategory = videoCategories?.find(
    (category) => category.id === categoryId
  );

  return (
    <>
      <Helmet>
        <title>
          {currentCategory ? currentCategory?.seo_title : "Video dərslər"}
        </title>
        <meta
          name="description"
          content={
            currentCategory
              ? currentCategory?.seo_description
              : "Video dərslər səhifəsi"
          }
        />
        <meta
          name="keywords"
          content={currentCategory && currentCategory?.seo_keywords}
        />
        {(currentCategory && currentCategory?.seo_links) || (
          <link
            rel="canonical"
            href={`useful-for-you/blog/${
              currentCategory && currentCategory?.slug
            }`}
          />
        )}
        {currentCategory ? (
          currentCategory?.seo_scripts
        ) : (
          <script type="application/ld+json"></script>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Skeleton variant="rectangular" width={"100%"} height={"100vh"} />
        }
      >
        <section className={styles.videoLessons}>
          <div className="container">
            <PageTitle
              title={translations && getTranslation("video_lessons_title")}
            />
            <ul className="flex alignItemsCenter tabsMenu tbMenu">
              {status === "pending" && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  {[...Array(4)].map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width={180}
                      height={58}
                      className={styles.tab}
                      sx={{ borderRadius: "4.8rem" }}
                    />
                  ))}
                </Box>
              )}
              {status === "error" && <Box>{error}</Box>}
              {status === "success" &&
                !isDetailPage &&
                videoCategories.map((category) => (
                  <Tabs
                    key={category.id}
                    title={category.title}
                    to={`/${lang}/useful-for-you/video-lessons/${category.slug}`}
                    onClick={() => handleTabClick(category.id)}
                  />
                ))}
            </ul>
            <Outlet context={{ categoryId }} />
          </div>
        </section>

        <Contact
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
      </Suspense>
    </>
  );
};

export default VideoLessons;
