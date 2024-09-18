import React, { Suspense } from "react";
import styles from "./career-center.module.css";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { useProOrCarContent } from "../../features/project/projectSlice";
import { useTranslations } from "../../features/translations/translations";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));

const CareerCenter = ({ page }) => {
  const { lang, slug } = useParams();
  const {
    data: projectContent,
    status,
    error,
  } = useProOrCarContent(lang, slug);

  const keywords = ["career_page_title"];
  const { data: translations, isLoading } = useTranslations(
    lang,
    "site",
    keywords
  );

  if (status === "pending") {
    return (
      <Box>
        <Skeleton
          variant="rectangular"
          height={"100vh"}
          sx={{ width: "100%" }}
        />
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
            <Skeleton variant="rectangular" height={"100vh"} width={"100%"} />
          </Box>
        }
      >
        <section className={styles.career}>
          <div className="container">
            <PageTitle
              title={
                isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={100} />
                ) : (
                  translations && translations["career_page_title"]
                )
              }
            />
            <div
              className={`${styles.careerWrapper} ${
                page ? styles.cw1 : ""
              } flex alignItemsCenter`}
            >
              <picture className={styles.careerImg}>
                <img
                  loading="lazy"
                  src={projectContent && projectContent?.product_image}
                  alt={projectContent && projectContent?.title}
                />
              </picture>
              <div
                className={`${styles.careerDetails} flex flexDirectionColumn`}
              >
                <h2>{projectContent && projectContent?.title}</h2>
                <picture>
                  <img
                    loading="lazy"
                    src={projectContent && projectContent?.product_image}
                    alt={projectContent && projectContent?.title}
                  />
                </picture>
                {projectContent && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: projectContent?.text,
                    }}
                  />
                )}
              </div>
            </div>

            {projectContent && (
              <div
                className={styles.careerRequirements}
                dangerouslySetInnerHTML={{
                  __html: projectContent?.requirements,
                }}
              />
            )}
          </div>
        </section>
        <Contact
          apply
          apiEndpoint={
            "https://admin.innab.coder.az/api/carrier_and_schoolarship/post"
          }
        />
      </Suspense>
    </>
  );
};

export default CareerCenter;
