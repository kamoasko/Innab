import React, { Suspense, useState } from "react";
import styles from "./blogs.module.css";
import { Box, Skeleton } from "@mui/material";
import { Outlet, useParams } from "react-router";
import { useBlogCategories } from "../../features/blogCategories/blogCategorySlice";
import { useMenus } from "../../features/menus/useMenu";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Tabs = React.lazy(() => import("../../components/tabs"));
const Contact = React.lazy(() => import("../../components/Contact"));

const BlogPage = () => {
  const { lang } = useParams();
  const { data: blogCategories, status, error } = useBlogCategories(lang);
  const { data: menus } = useMenus(lang);
  const [categoryId, setCategoryId] = useState(null);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const handleTabClick = (id) => {
    setCategoryId(id);
  };

  return (
    <Suspense
      fallback={
        <Box>
          <Skeleton variant="rectangular" height={48} />
        </Box>
      }
    >
      <section className={styles.blogs}>
        <div className="container">
          <PageTitle title={"Bloq"} />
          <ul className="flex alignItemsCenter tabsMenu">
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
                  to={`/${lang}/${parentMenu[5]?.slug}/${usefulMenu[1]?.slug}/${blogCategory.slug}`}
                  onClick={() => handleTabClick(blogCategory.id)}
                />
              ))}
          </ul>
          <Outlet context={{ categoryId }} />
        </div>
      </section>
      <Contact
        apply
        title={"Sualın var?"}
        subTitle={[
          "Hardan başlamaqda tərəddüd edirsənsə ",
          <strong>bizə zəng elə</strong>,
        ]}
      />
    </Suspense>
  );
};

export default BlogPage;
