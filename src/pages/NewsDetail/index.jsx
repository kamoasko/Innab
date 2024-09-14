import React, { Suspense, useEffect } from "react";
import styles from "./news-detail.module.css";
import newsImg from "../../assets/images/news/news-img.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useGetNews, useGetNewsDetail } from "../../features/news/newsSlice";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/categorySlice";

const Contact = React.lazy(() => import("../../components/Contact"));
const NewsCard = React.lazy(() => import("../../components/newsCard"));
const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Button = React.lazy(() => import("../../components/Button"));

const NewsDetail = () => {
  const { lang, slug } = useParams();
  const { data: news, status, error } = useGetNews(lang);

  const {
    data: detailedNews,
    status: detailedNewsStatus,
    error: detailedNewsError,
  } = useGetNewsDetail(lang, slug);

  const { data: menus } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);

  return (
    <>
      <Helmet>
        <title>{detailedNews && detailedNews?.seo_title}</title>
        <meta
          name="description"
          content={detailedNews && detailedNews?.seo_description}
        />
        <meta
          name="keywords"
          content={detailedNews && detailedNews?.seo_keywords}
        />
        {detailedNews?.seo_links || (
          <link
            rel="canonical"
            href={`/${lang}/${detailedNews && detailedNews?.slug}`}
          />
        )}
        {(detailedNews && detailedNews?.seo_scripts) || (
          <script type="application/ld+json"></script>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
        <section className={styles.newsDetail}>
          <div className="container">
            <PageTitle title={"Xəbərlər"} />
            {detailedNewsStatus === "error" && <Box>{detailedNewsError}</Box>}
            {detailedNewsStatus === "pending" && (
              <>
                <div
                  className={`${styles.newsDetailWrapper} flex alignItemsCenter justifyContentBetween`}
                >
                  <div
                    className={`${styles.newsDetailWrapperContent} flex flexDirectionColumn justifyContentBetween`}
                  >
                    <Skeleton variant="rectangular" height={50} />
                    <Skeleton variant="rectangular" height={50} />
                  </div>
                  <div className={styles.newsDetailImg}>
                    <Skeleton variant="rectangular" height={371} />
                  </div>
                </div>
                <div className={styles.newsDetailText}>
                  <Skeleton variant="rectangular" height={600} />
                </div>
              </>
            )}
            {detailedNewsStatus === "success" && (
              <>
                <div
                  className={`${styles.newsDetailWrapper} flex alignItemsCenter justifyContentBetween`}
                >
                  <div
                    className={`${styles.newsDetailWrapperContent} flex flexDirectionColumn justifyContentBetween`}
                  >
                    <h2>{detailedNews?.title}</h2>
                    <time dateTime={detailedNews?.published_at?.slice(0, 10)}>
                      {detailedNews?.published_at?.slice(0, 10)}
                    </time>
                  </div>
                  <div className={styles.newsDetailImg}>
                    <img
                      loading="lazy"
                      src={detailedNews?.image || newsImg}
                      alt={detailedNews?.title}
                    />
                  </div>
                </div>
                <div className={styles.newsDetailText}>
                  {detailedNews?.text}
                </div>
              </>
            )}
          </div>
        </section>

        <section className={styles.otherNews}>
          <div className="container">
            <div className={styles.otherNewsTitle}>
              <h2>Digər xəbərlər</h2>
            </div>
            <div className={`${styles.otherNewsWrapper} flexCenter`}>
              {status === "pending" &&
                [...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={406}
                    height={398}
                    sx={{ borderRadius: "2rem" }}
                  />
                ))}
              {status === "error" && <Box>{error}</Box>}
              {news &&
                news?.data
                  ?.slice(0, 3)
                  ?.map((post) => (
                    <NewsCard
                      key={post.id}
                      title={post.title}
                      date={post.published_at?.slice(0, 10)}
                      img={post.image}
                      desc={post.short_description}
                      to={`/${lang}/${parentMenu[7]?.slug}/${post.slug}`}
                    />
                  ))}
            </div>
            <Button
              title={"Hamısına bax"}
              borderRadius={"6.3rem"}
              to={`/${lang}/${parentMenu[7]?.slug}`}
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
      </Suspense>
    </>
  );
};

export default NewsDetail;
