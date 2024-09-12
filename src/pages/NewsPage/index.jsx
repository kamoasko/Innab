import React, { Suspense, useState } from "react";
import styles from "./news-page.module.css";
import { Outlet, useParams } from "react-router";
import { Box, CircularProgress, Pagination, Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../../features/news/newsSlice";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/categorySlice";

const Contact = React.lazy(() => import("../../components/Contact"));
const NewsCard = React.lazy(() => import("../../components/newsCard"));
const PageTitle = React.lazy(() => import("../../components/pageTitle"));

const NewsPage = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { news, status, error, pagination } = useSelector(
    (state) => state.news
  );
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchNews({ lang, page }));
  }, [lang, page, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Xəbərlər"}</title>
            <meta name="description" content={"Xəbərlər"} />
            <meta name="keywords" content={"Xəbərlər"} />
            <link rel="canonical" href={`/${lang}/xeberler`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{menus[7]?.seo_title}</title>
            <meta name="description" content={menus[7]?.seo_description} />
            <meta name="keywords" content={menus[7]?.seo_keywords} />
            {menus[7]?.seo_links || (
              <link rel="canonical" href={`/${lang}/${menus[7]?.slug}`} />
            )}
            {menus[0]?.seo_scripts || (
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
        <section className={styles.news}>
          <div className="container">
            <PageTitle title={"Xəbərlər"} />
            <div className={styles.newsGrid}>
              {status === "loading" &&
                [...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={406}
                    height={398}
                    sx={{ borderRadius: "2rem" }}
                  />
                ))}
              {status === "failed" && <Box>{error}</Box>}
              {status === "succeeded" &&
                news?.data?.map((post) => (
                  <NewsCard
                    key={post.id}
                    title={post.title}
                    date={post.published_at.slice(0, 10)}
                    desc={post.short_description}
                    img={post.image}
                    to={post.slug}
                  />
                ))}
            </div>
            <Pagination
              className="flex justifyContentCenter"
              sx={{ marginTop: "7.2rem", fontSize: "1.6rem" }}
              count={pagination.last_page}
              size="large"
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </section>
        <Contact
          title={"Sualın var?"}
          subTitle={[
            "Hardan başlamaqda tərəddüd edirsənsə ",
            <strong>bizə zəng elə</strong>,
          ]}
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
        <Outlet />
      </Suspense>
    </>
  );
};

export default NewsPage;
