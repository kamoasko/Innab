import React, { Suspense } from "react";
import styles from "./career-center.module.css";
import career from "../../assets/images/career-center/career.png";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import {
  useProjectOrCareer,
  useProOrCarContent,
} from "../../features/project/projectSlice";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));

const CareerCenter = ({ page }) => {
  const { lang, slug } = useParams();
  const { data: projects } = useProjectOrCareer(lang);
  const {
    data: projectContent,
    status,
    error,
  } = useProOrCarContent(lang, slug);

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
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
        <section className={styles.career}>
          <div className="container">
            <PageTitle title={"Karyera mərkəzi"} />
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
          title={"Sualın var?"}
          subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
          apiEndpoint={
            "https://admin.innab.coder.az/api/carrier_and_schoolarship/post"
          }
        />
      </Suspense>
    </>
  );
};

export default CareerCenter;
