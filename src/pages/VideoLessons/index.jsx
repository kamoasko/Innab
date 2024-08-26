import React, { Suspense, useEffect, useState } from "react";
import styles from "./video-lessons.module.css";
import { Outlet, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { fetchVideoLessonCategory } from "../../features/videoCategories/videoCategorySlice";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));
const Tabs = React.lazy(() => import("../../components/tabs"));

const VideoLessons = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { categories, status, error } = useSelector(
    (state) => state.videoCategories
  );
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchVideoLessonCategory({ lang }));
  }, [lang, dispatch]);

  const handleTabClick = (id) => {
    setCategoryId(id);
    dispatch(fetchVideoLessonCategory({ lang, categoryId: id }));
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <section className={styles.videoLessons}>
        <div className="container">
          <PageTitle title={"Video dərslər"} />
          <ul className="flex alignItemsCenter tabsMenu">
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
            {status === "succeeded" &&
              categories.map((category) => (
                <Tabs
                  key={category.id}
                  title={category.title}
                  to={`/${lang}/useful-for-you/video-lessons/${category.slug}`}
                  categoryId={category.id}
                  onClick={() => handleTabClick(category.id)}
                />
              ))}
          </ul>
          {/* Pass categoryId as a prop */}
          <Outlet context={{ categoryId }} />
        </div>
      </section>

      <Contact
        title={"Sualın var?"}
        subTitle={[
          "Hardan başlamaqda tərəddüd edirsənsə ",
          <strong>bizə zəng elə</strong>,
        ]}
      />
    </Suspense>
  );
};

export default VideoLessons;
