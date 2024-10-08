import React, { Suspense, useState } from "react";
import styles from "./news-page.module.css";
import { Outlet, useParams } from "react-router";
import { Box, Pagination, Skeleton } from "@mui/material";
import { useGetNews } from "../../features/news/useNews";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/useCategory";
import { useTranslations } from "../../features/translations/translations";

const Contact = React.lazy(() => import("../../components/Contact"));
const NewsCard = React.lazy(() => import("../../components/newsCard"));
const PageTitle = React.lazy(() => import("../../components/pageTitle"));

const NewsPage = () => {
  const { lang } = useParams();
  const [page, setPage] = useState(1);
  const { data: news, status, error } = useGetNews(lang, page);
  const { data: pagination } = useGetNews(lang, page);

  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);

  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

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
            <link rel="canonical" href={`/${lang}/news`} />
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
              <link rel="canonical" href={`/${lang}/news`} />
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
            <Skeleton variant="rectangular" height={"100vh"} width={"100%"} />
          </Box>
        }
      >
        <section className={styles.news}>
          <div className="container">
            <PageTitle
              title={
                isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={100} />
                ) : (
                  translations && getTranslation("news_page_title")
                )
              }
            />
            <div className={styles.newsGrid}>
              {status === "pending" &&
                [...Array(6)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={406}
                    height={398}
                    sx={{ borderRadius: "2rem" }}
                  />
                ))}
              {status === "error" && <Box>{error}</Box>}
              {status === "success" &&
                pagination?.pagination &&
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
              count={pagination?.pagination?.last_page}
              size="large"
              page={page || 3}
              onChange={handlePageChange}
            />
          </div>
        </section>
        <Contact
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
        <Outlet />
      </Suspense>
    </>
  );
};

export default NewsPage;
