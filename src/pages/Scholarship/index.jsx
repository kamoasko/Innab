import React, { Suspense, useRef } from "react";
import styles from "./internships.module.css";
import { useParams } from "react-router";
import { useScholarshipProgram } from "../../features/scholarshipProgram/useScholarshipProgram";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";
import { useTranslations } from "../../features/translations/translations";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { imgUrl } from "../../imgUrl";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const UsefulPageCard = React.lazy(() =>
  import("../../components/usefulPageCard")
);
const PartnersCard = React.lazy(() => import("../../components/PartnersCard"));
const Contact = React.lazy(() => import("../../components/Contact"));

const Scholarships = () => {
  const { lang } = useParams();
  const { data: programs, status, error } = useScholarshipProgram(lang);
  const { data: siteInfo } = useSiteInfos(lang);
  const contactRef = useRef(null);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const handleScrollToContact = () => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Təqaüd proqramları"}</title>
            <meta name="description" content={"Təqaüd proqramları"} />
            <meta name="keywords" content={"Təqaüd proqramları"} />
            <link
              rel="canonical"
              href={`/${lang}/useful-for-you/scholarships-programs`}
            />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{usefulMenu[3]?.seo_title}</title>
            <meta name="description" content={usefulMenu[3]?.seo_description} />
            <meta name="keywords" content={usefulMenu[3]?.seo_keywords} />
            {usefulMenu[3]?.seo_links || (
              <link
                rel="canonical"
                href={`/${lang}/useful-for-you/scholarships-programs`}
              />
            )}
            {usefulMenu[3]?.seo_scripts || (
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
        <section className={styles.internships}>
          <div className="container">
            <PageTitle
              title={
                isLoading ? (
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={100}
                    sx={{ borderRadius: "0.8rem" }}
                  />
                ) : (
                  translations && getTranslation("scholarship_page_title")
                )
              }
            />
            <UsefulPageCard
              desc={
                isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={200} />
                ) : (
                  translations && getTranslation("scholarships_top_text")
                )
              }
              icon={siteInfo && `${imgUrl}/${siteInfo[0]?.vebinar_icon.url}`}
            />
          </div>
        </section>
        <section className={styles.activePrograms}>
          <div className="container">
            <div className={styles.activeProgramsTitle}>
              <h2>
                {isLoading ? (
                  <Skeleton variant="text" height={60} width={200} />
                ) : (
                  translations && getTranslation("active_scholarships")
                )}
              </h2>
            </div>
            <div className={styles.programsGrid}>
              {status === "pending" &&
                [...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={410}
                    height={360}
                    sx={{ borderRadius: "2.4rem" }}
                  />
                ))}
              {status === "error" && <Box>{error}</Box>}
              {status === "success" &&
                programs?.map((program) => (
                  <PartnersCard
                    key={program.id}
                    cardtTitle={program.name}
                    text={program.short_description}
                    img={program.image}
                    onClick={handleScrollToContact}
                    buttonTitle={
                      translations && getTranslation("s_apply_button")
                    }
                  />
                ))}
            </div>
          </div>
        </section>
        <Contact
          apply
          contactRef={contactRef}
          apiEndpoint={
            "https://admin.innab.coder.az/api/carrier_and_schoolarship/post"
          }
        />
      </Suspense>
    </>
  );
};

export default Scholarships;
