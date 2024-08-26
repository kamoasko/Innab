import React, { Suspense, useEffect, useState } from "react";
import styles from "./blogs.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { Outlet, useParams } from "react-router";
import { fetchBlogCategory } from "../../features/blogCategories/blogCategorySlice";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Tabs = React.lazy(() => import("../../components/tabs"));
const Contact = React.lazy(() => import("../../components/Contact"));

const BlogPage = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { blogCategories, status, error } = useSelector(
    (state) => state.blogCategories
  );
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogCategory({ lang }));
  }, [lang, dispatch]);

  const handleTabClick = (id) => {
    setCategoryId(id);
    dispatch(fetchBlogCategory({ lang, categoryId: id }));
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <section className={styles.blogs}>
        <div className="container">
          <PageTitle title={"Bloq"} />
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
              blogCategories.map((blogCategory) => (
                <Tabs
                  key={blogCategory.id}
                  title={blogCategory.title}
                  to={`/${lang}/useful-for-you/blog/${blogCategory.slug}`}
                  onClick={() => handleTabClick(blogCategory.id)}
                />
              ))}
          </ul>
          <Outlet context={{ categoryId }} />
        </div>
      </section>
      <Contact
        apply
        title={"Sualın var?"}
        subTitle={[
          "Hardan başlamaqda tərəddüd edirsənsə ",
          <strong>bizə zəng elə</strong>,
        ]}
      />
    </Suspense>
  );
};

export default BlogPage;
