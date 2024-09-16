import React, { Suspense, useState, useEffect } from "react";
import styles from "./video-lessons.module.css";
import { Outlet, useParams } from "react-router";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useVideoLessonCategory } from "../../features/videoLessons/videoLessonSlice";
import { useMenus } from "../../features/menus/useMenu";
import { useTrainingCategories } from "../../features/categories/categorySlice";

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

  return (
    <Suspense fallback={<CircularProgress />}>
      <section className={styles.videoLessons}>
        <div className="container">
          <PageTitle title={"Video dərslər"} />
          <ul className="flex alignItemsCenter tabsMenu">
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
                  to={`/${lang}/${parentMenu[5]?.slug}/${usefulMenu[0]?.slug}/${category.slug}`}
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
  );
};

export default VideoLessons;
