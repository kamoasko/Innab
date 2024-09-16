import React, { Suspense, useEffect, useState } from "react";
import styles from "./contact-page.module.css";
import { useParams } from "react-router";
import { Box, Skeleton } from "@mui/material";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const ContactSection = React.lazy(() =>
  import("../../components/contactSection")
);

const ContactPage = () => {
  const { lang } = useParams();
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const aboutMenu = menus?.filter((menu) => menu.parent_id === 3);

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Contact"}</title>
            <meta name="description" content={"Contact"} />
            <meta name="keywords" content={"Contact"} />
            <link rel="canonical" href={`/${lang}/haqqimizda/elaqe`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{aboutMenu[2]?.seo_title}</title>
            <meta name="description" content={aboutMenu[2]?.seo_description} />
            <meta name="keywords" content={aboutMenu[2]?.seo_keywords} />
            {aboutMenu[2]?.seo_links || (
              <link
                rel="canonical"
                href={`/${lang}/${parentMenu[0]?.slug}/${aboutMenu[2]?.slug}`}
              />
            )}
            {aboutMenu[2]?.seo_scripts || (
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
        <section className={styles.contact}>
          <div className="container">
            <PageTitle title="Bizimlə əlaqə" />
            <div className={styles.contactTitle}>
              <h2>
                Hardan başlamanda tərəddüd edirsənsə
                <strong> bizə zəng elə</strong>
              </h2>
            </div>
            <ContactSection />
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default ContactPage;
