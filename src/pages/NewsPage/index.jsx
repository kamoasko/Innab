import React from "react";
import styles from "./news-page.module.css";
import PageTitle from "../../components/pageTitle";
import NewsCard from "../../components/newsCard";
import Contact from "../../components/Contact";
import newsImg from "../../assets/images/news/news-img.jpeg";
import { Outlet } from "react-router";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router/dist";
import { useEffect } from "react";
import { fetchNews } from "../../features/news/newsSlice";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { news, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews(lang));
  }, [lang, dispatch]);

  return (
    <>
      <section className={styles.news}>
        <div className="container">
          <PageTitle title={"Xəbərlər"} />
          <div className={styles.newsGrid}>
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
              news.map((post) => (
                <NewsCard
                  key={post.id}
                  title={post.title}
                  date={post.published_at.slice(0, 10)}
                  desc={post.short_description}
                  img={post.image}
                  to={`/${lang}/news/${post.slug}`}
                />
              ))}
          </div>
          <Pagination
            className="flex justifyContentCenter"
            sx={{ marginTop: "7.2rem", fontSize: "1.6rem" }}
            count={4}
            size="large"
          />
        </div>
      </section>
      <Contact
        title={"Sualın var?"}
        subTitle={[
          "Hardan başlamaqda tərəddüd edirsənsə ",
          <strong>bizə zəng elə</strong>,
        ]}
      />
      <Outlet />
    </>
  );
};

export default NewsPage;
