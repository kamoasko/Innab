import React, { Suspense } from "react";
import styles from "./privacy.module.css";
import { useParams } from "react-router";
import { useGetPrivacy } from "../../features/privacy/privacySlicer";
import { Box, Skeleton } from "@mui/material";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/categorySlice";
import PageTitle from "../../components/pageTitle";

const Contact = React.lazy(() => import("../../components/Contact"));

const Privacy = () => {
  const { lang } = useParams();
  const { data: privacy, status, error } = useGetPrivacy(lang);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Məxfilik siyasəti"}</title>
            <meta name="description" content={"Məxfilik siyasəti"} />
            <meta name="keywords" content={"Məxfilik siyasəti"} />
            <link rel="canonical" href={`/${lang}/mexfilik-siyaseti`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{parentMenu[9]?.seo_title}</title>
            <meta name="description" content={parentMenu[9]?.seo_description} />
            <meta name="keywords" content={parentMenu[9]?.seo_keywords} />
            {parentMenu[9]?.seo_links || (
              <link rel="canonical" href={`/${lang}/${parentMenu[9]?.slug}`} />
            )}
            {parentMenu[9]?.seo_scripts || (
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
        <section className={styles.privacy}>
          <div className="container">
            {status === "pending" && (
              <>
                <Skeleton
                  className="pagetitle"
                  variant="text"
                  sx={{ width: "100% important", marginTop: "5.6rem" }}
                  width={545}
                  height={80}
                />
                <Box
                  className={styles.privacyContent}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "6rem",
                  }}
                >
                  <Skeleton variant="text" width={200} height={10} />
                  <Skeleton
                    variant="text"
                    sx={{ width: "100% important" }}
                    height={150}
                  />
                  <Skeleton variant="text" width={200} height={10} />
                  <Skeleton
                    variant="text"
                    sx={{ width: "100% important" }}
                    height={150}
                  />
                  <Skeleton variant="text" width={200} height={10} />
                  <Skeleton
                    variant="text"
                    sx={{ width: "100% important" }}
                    height={150}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ width: "100% important" }}
                    height={150}
                  />
                </Box>
              </>
            )}
            {status === "error" && <p>{error}</p>}
            {status === "success" && (
              <>
                <PageTitle title={privacy.page_title} />
                <div
                  className={styles.privacyContent}
                  dangerouslySetInnerHTML={{ __html: privacy.text }}
                />
              </>
            )}
          </div>
        </section>
        <Contact
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
      </Suspense>
    </>
  );
};

export default Privacy;
