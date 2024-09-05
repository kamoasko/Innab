import React, { Suspense, useEffect } from "react";
import styles from "./about.module.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import logo from "../../assets/images/about-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchAboutCards } from "../../features/about/aboutSlice";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));
const Customers = React.lazy(() => import("../../components/Customers"));
const ContactSection = React.lazy(() =>
  import("../../components/contactSection")
);
const CircleAnimation = React.lazy(() =>
  import("../../components/circleAnimation")
);

const About = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { about, status, error } = useSelector((state) => state.about);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);

  useEffect(() => {
    dispatch(fetchAboutCards(lang));
  }, [lang, dispatch]);

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Haqqımızda"}</title>
            <meta name="description" content={"Haqqımızda"} />
            <meta name="keywords" content={"Haqqımızda"} />
            <link rel="canonical" href={`/${lang}/haqqimizda`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{menus[0]?.seo_title}</title>
            <meta name="description" content={menus[0]?.seo_description} />
            <meta name="keywords" content={menus[0]?.seo_keywords} />
            {menus[0]?.seo_links || (
              <link rel="canonical" href={`/${lang}/${menus[0]?.slug}`} />
            )}
            {menus[0]?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
      <Suspense fallback={<CircularProgress />}>
        <div className="pageTop">
          <div className="container">
            <PageTitle title={"Haqqımızda"} />
          </div>
        </div>

        <section className={styles.timeline}>
          <div className="container">
            <div className={styles.timelineText}>
              <p>
                2015-ci ildə fəaliyyətə başlayan INNAB yüksək texnologiyalar
                sahəsində təcrübəli mütəxəssislər hazırlayan tədris
                müəssisəsidir.
              </p>
            </div>
            <div className={styles.timelineContainer}>
              <VerticalTimeline
                className={styles.timelineWrapper}
                lineColor="#C1C1C1"
              >
                {status === "loading" && <CircularProgress />}
                {status === "failed" && <p>{error}</p>}
                {status === "succeeded" &&
                  about.map((a, index) => (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{
                        borderRadius: "0.8rem",
                        overflow: "hidden",
                        border: "0.2rem solid var(--color-light-grey)",
                        padding: 0,
                        boxShadow: "none",
                      }}
                      // contentArrowStyle={{
                      //   borderRight: "7px solid  rgb(33, 150, 243)",
                      // }}
                      iconStyle={{
                        backgroundColor: "var(--color-black-71)",
                        boxShadow: "none",
                        color: "var(--color-white)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      icon={[<img src={a.icon} />]}
                      key={index}
                    >
                      <article className={styles.timelineCard}>
                        <div className={styles.timelineCardImg}>
                          <img
                            loading="lazy"
                            src={a.image}
                            alt={a.description}
                          />
                          <div className={`${styles.timelineHover} flexCenter`}>
                            <img loading="lazy" src={logo} alt="" />
                          </div>
                        </div>
                        <div className={styles.aboutCardDet}>
                          <h3>{a.date}</h3>
                          <div>{a.description}</div>
                        </div>
                      </article>
                    </VerticalTimelineElement>
                  ))}
              </VerticalTimeline>
            </div>
          </div>
        </section>

        <section className={styles.innab}>
          <div className={styles.innabTitle}>
            <h2>
              Niyə <strong>INNAB?</strong>
            </h2>
            <div>
              Biz danışmırıq, iş görürük. Gördüyümüz iş isə ölkəyə səs salır.
            </div>
          </div>
          <div className="container">
            <div className={styles.innabInteractivity}>
              <CircleAnimation />
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <div className="container">
            <h2>Əlaqə</h2>
            <ContactSection h2 />
          </div>
        </section>

        <Customers about />

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

export default About;
