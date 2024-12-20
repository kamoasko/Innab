import React, { Suspense, useState } from "react";
import styles from "./blogs.module.css";
import { Box, Skeleton } from "@mui/material";
import { Outlet, useParams, useLocation } from "react-router";
import { useBlogCategories } from "../../features/blogCategories/useBlogCategory";
import { useMenus } from "../../features/menus/useMenu";
import { Helmet } from "react-helmet-async";
import { useTrainingCategories } from "../../features/categories/useCategory";
import { useTranslations } from "../../features/translations/translations";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Tabs = React.lazy(() => import("../../components/tabs"));
const Contact = React.lazy(() => import("../../components/Contact"));

const BlogPage = () => {
  const { lang } = useParams();
  const location = useLocation();
  const { data: blogCategories, status, error } = useBlogCategories(lang);
  const { data: menus } = useMenus(lang);
  const [categoryId, setCategoryId] = useState(5);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);
  const { data: categories } = useTrainingCategories(lang);
  const allTrainings =
    categories &&
    categories?.map((category) => category.subData)?.flat(Infinity);

  const { data: translations } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const handleTabClick = (id) => {
    setCategoryId(id);
  };

  const currentCategory = blogCategories?.find(
    (category) => category.id === categoryId
  );

  const isDetailPage = location.pathname.includes(
    location.pathname.split("/")[5]
  );

  return (
    <>
      <Helmet>
        <title>{currentCategory?.seo_title || "Bloq"}</title>
        <meta
          name="description"
          content={currentCategory?.seo_description || "Bloq səhifəsi"}
        />
        <meta name="keywords" content={currentCategory?.seo_keywords} />
        {currentCategory?.seo_links || (
          <link
            rel="canonical"
            href={`useful-for-you/blog/${currentCategory?.slug}`}
          />
        )}
        {currentCategory?.seo_scripts || (
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
        <section className={styles.blogs}>
          <div className="container">
            <PageTitle
              title={translations && getTranslation("blog_page_title")}
            />
            {!isDetailPage && (
              <ul className="flex alignItemsCenter tabsMenu tbMenu">
                {status === "pending" && (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    {[...Array(4)].map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        width={180}
                        height={58}
                        className={styles.tab}
                        sx={{ borderRadius: "4.8rem" }}
                      />
                    ))}
                  </Box>
                )}
                {status === "error" && <Box>{error}</Box>}
                {status === "success" &&
                  blogCategories.map((blogCategory) => (
                    <Tabs
                      key={blogCategory.id}
                      title={blogCategory.title}
                      to={`/${lang}/useful-for-you/blog/${blogCategory.slug}`}
                      onClick={() => handleTabClick(blogCategory.id)}
                    />
                  ))}
              </ul>
            )}
            <Outlet context={{ categoryId }} />
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

export default BlogPage;
