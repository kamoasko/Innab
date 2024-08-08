import React from "react";
import styles from "./news-page.module.css";
import PageTitle from "../../components/pageTitle";
import NewsCard from "../../components/newsCard";
import Contact from "../../components/Contact";
import newsImg from "../../assets/images/news/news-img.jpeg";
import { Outlet } from "react-router";

const NewsPage = () => {
  return (
    <>
      <section className={styles.news}>
        <div className="container">
          <PageTitle title={"Xəbərlər"} />
          <div className={styles.newsGrid}>
            <NewsCard
              title={"Data Analitika Nədir ?"}
              date={"Fevral 12 ,2024"}
              desc={
                "Data analitika sahəsində mütəxəsis olmaq istəyənlər üçün mükəməl imkanlar İNNAB lorem ipsum sit amet doler"
              }
              img={newsImg}
              to={"1"}
            />

            <NewsCard
              title={"Data Analitika Nədir ?"}
              date={"Fevral 12 ,2024"}
              desc={
                "Data analitika sahəsində mütəxəsis olmaq istəyənlər üçün mükəməl imkanlar İNNAB lorem ipsum sit amet doler"
              }
              img={newsImg}
              to={"2"}
            />

            <NewsCard
              title={"Data Analitika Nədir ?"}
              date={"Fevral 12 ,2024"}
              desc={
                "Data analitika sahəsində mütəxəsis olmaq istəyənlər üçün mükəməl imkanlar İNNAB lorem ipsum sit amet doler"
              }
              img={newsImg}
              to={"3"}
            />
          </div>
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
