import React, { Suspense, useEffect } from "react";
import styles from "./news-detail.module.css";
import newsImg from "../../assets/images/news/news-img.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { fetchNews, fetchNewsDetail } from "../../features/news/newsSlice";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";

const Contact = React.lazy(() => import("../../components/Contact"));
const NewsCard = React.lazy(() => import("../../components/newsCard"));
const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Button = React.lazy(() => import("../../components/Button"));

const NewsDetail = () => {
  const dispatch = useDispatch();
  const { lang, slug } = useParams();
  const { news, detailedNews, status, error } = useSelector(
    (state) => state.news
  );

  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);

  useEffect(() => {
    dispatch(fetchNewsDetail({ lang, slug }));
    dispatch(fetchNews(lang));
  }, [lang, slug, dispatch]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return <Box>{error}</Box>;
  }

  return (
    <>
      <Helmet>
        <title>{detailedNews?.seo_title}</title>
        <meta name="description" content={detailedNews?.seo_description} />
        <meta name="keywords" content={detailedNews?.seo_keywords} />
        {detailedNews?.seo_links || (
          <link rel="canonical" href={`/${lang}/${detailedNews?.slug}`} />
        )}
        {detailedNews?.seo_scripts || (
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
            {status === "loading" && (
              <>
                <div
                  className={`${styles.newsDetailWrapper} flex alignItemsCenter justifyContentBetween`}
                >
                  <div
                    className={`${styles.newsDetailWrapperContent} flex flexDirectionColumn justifyContentBetween`}
                  >
                    <Skeleton variant="rectangular" />
                    <Skeleton variant="rectangular" />
                  </div>
                  <div className={styles.newsDetailImg}>
                    <Skeleton variant="rectangular" />
                  </div>
                </div>
                <div className={styles.newsDetailText}>
                  <Skeleton variant="rectangular" />
                </div>
              </>
            )}
            {status === "succeeded" && (
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
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles.newsDetailText}>
                  {detailedNews?.text}
                </div>
                {/* <div
             className={`${styles.newsDetailParagraphs} flex flexDirectionColumn`}
           >
             <div>
               <h3>
                 <strong>Frontend developer</strong> kimdir?
               </h3>
               <p>
                 Frontend proqramçılar nə edir? Frontend proqramçı kimdir?
                 Onlar veb saytların vəya mobil tətbiqlərin vizual hissəsini,
                 interfeyslərini proqramlaşdırır. Siz hər hansı bir veb-sayta
                 daxil olduqda, saytda gördüyünüz bütün vizual elementlər
                 front-end proqramçıların işi hesab edilir. Bunların doğru
                 işləməsi və lazımi yerə yönlənməsi kimi məsələlər isə
                 backend proqramçıların işi hesab olunur.    Dizayn edilmiş
                 maketi frontend proqramçı kodlama vasitəsilə hazırlayır,
                 bütün elementlərin və vizual effektlərin işləməsini də bu
                 mütəxəssislər təmin edir. Frontend mütəxəssisin digər bir
                 öhdəliyi isə hazırladığı səhifələri bütün ekran ölçülərinə
                 uyğunlaşdırmaq, responsivliyi təmin etməkdir: telefonlar,
                 kompüter monitorları, noutbuklar, planşetlər, televizorlar
                 və s. Bu tip responsivlik problemləri istifadəçi təcrübəsinə
                 mənfi təsir etdiyi üçün frontend developer tərəfindən
                 diqqətlə yoxlanılır
               </p>
             </div>
           </div> */}
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
              {status === "succeeded" &&
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
        />
      </Suspense>
    </>
  );
};

export default NewsDetail;
