import React, { Suspense, useRef } from "react";
import styles from "./projects.module.css";
import playStore from "../../assets/icons/google-play-icon.svg";
import { Link, useParams } from "react-router-dom";
import { FaApple } from "react-icons/fa6";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import {
  useProjectOrCareer,
  useProOrCarContent,
} from "../../features/project/projectSlice";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Button = React.lazy(() => import("../../components/Button"));
const Contact = React.lazy(() => import("../../components/Contact"));

const Projects = ({ book }) => {
  const contactRef = useRef(null);
  const { lang, slug } = useParams();
  const { data: projects } = useProjectOrCareer(lang);
  const {
    data: projectContent,
    status,
    error,
  } = useProOrCarContent(lang, slug);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (status === "pending") {
    return (
      <Box>
        <Skeleton variant="rectangular" height={800} sx={{ width: "100%" }} />
      </Box>
    );
  }

  if (status === "error") {
    return <Box>{error}</Box>;
  }

  return (
    <>
      <Helmet>
        {projectContent && (
          <>
            <title>{projectContent?.seo_title}</title>
            <meta
              name="description"
              content={projectContent?.seo_description}
            />
            <meta name="keywords" content={projectContent?.seo_keywords} />
            {projectContent?.seo_links}
            {projectContent?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={50} />
          </Box>
        }
      >
        <div className="pageTop">
          <div className="container">
            <PageTitle title={"Lahiyələr"} />
          </div>
        </div>
        <section className={styles.project}>
          <div className="container">
            <div
              className={`${styles.projectWrapper} flex justifyContentBetween`}
            >
              <div className={styles.projectDetail}>
                <h2>{projectContent && projectContent?.title}</h2>
                {projectContent && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: projectContent?.text,
                    }}
                  />
                )}
              </div>
              {projectContent && projectContent.mobile_title && (
                <div className={styles.projectLeft}>
                  <h2>{projectContent?.title}</h2>
                  <article className={styles.projectCard}>
                    <picture className={styles.projectCardImg}>
                      <img
                        loading="lazy"
                        src={projectContent?.product_image}
                        alt={projectContent?.title}
                      />
                    </picture>
                    <div className={styles.projectCardDet}>
                      <h4>{projectContent?.mobile_title}</h4>
                      <div>{projectContent?.mobile_description}</div>
                      <h5>{projectContent?.product_price}</h5>
                      <Button
                        component
                        title={"Sifariş ver"}
                        borderRadius={"7.8rem"}
                        onClick={scrollToContact}
                      />
                    </div>
                  </article>
                </div>
              )}
            </div>
          </div>
        </section>
        {projectContent && projectContent.mobile_product_qr && (
          <section className={styles.mobileBook}>
            <div className="container">
              <div
                className={`${styles.mobileBookWrapper} flex alignItemsCenter justifyContentBetween`}
              >
                <div className={styles.mobileBookDet}>
                  <div
                    className={`${styles.mobileBookContent} flex flexDirectionColumn`}
                  >
                    <h2>Mobil Kitab</h2>
                    <div>{projectContent?.mobile_qr_text}</div>
                  </div>
                  <figure
                    className={`${styles.mobileBookQr} flex alignItemsCenter`}
                  >
                    <picture>
                      <img
                        loading="lazy"
                        src={projectContent?.mobile_product_qr}
                        alt="Mobil Kitab QR"
                      />
                    </picture>
                    <figcaption>
                      Telefonunuzun kamerası ilə QR codu scan edin.
                    </figcaption>
                  </figure>
                </div>
                <div
                  className={`${styles.mobileBookLeft} flex alignItemsCenter`}
                >
                  <div
                    className={`${styles.mobileBookDownload} flex flexDirectionColumn`}
                  >
                    <div>
                      Google Play və App store vasitəsilə telefonunza yükləyə
                      biləraiz
                    </div>
                    <div className="flex flexDirectionColumn">
                      <Link to={""} className="flexCenter">
                        <img loading="lazy" src={playStore} alt="Google Play" />
                        Google Play
                      </Link>
                      <Link to={""} className="flexCenter">
                        <FaApple />
                        App Store
                      </Link>
                    </div>
                  </div>
                  <picture className={styles.mobileBookImg}>
                    <img
                      loading="lazy"
                      src={projectContent?.mobile_product_image}
                      alt="Mobil Kitab"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </section>
        )}

        <Contact
          title={"Sualın var?"}
          subTitle={[
            "Hardan başlamaqda tərəddüd edirsənsə ",
            <strong>bizə zəng elə</strong>,
          ]}
          contactRef={contactRef}
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={projects && projects}
        />
      </Suspense>
    </>
  );
};

export default Projects;
