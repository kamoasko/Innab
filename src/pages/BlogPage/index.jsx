import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogPosts } from "../../features/blog/blogSlice";
import styles from "./blogs.module.css";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Tabs = React.lazy(() => import("../../components/tabs"));
const Contact = React.lazy(() => import("../../components/Contact"));
const BlogCard = React.lazy(() => import("../../components/blogCard"));

const BlogPage = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { posts, status, error } = useSelector((state) => state.blog);
  const { selectedLanguage } = useSelector((state) => state.languages);

  useEffect(() => {
    dispatch(fetchBlogPosts(lang));
  }, [lang, dispatch]); // Refetch when language changes

  const menus = [
    "Data analitika",
    "Mühasibatlıq",
    "Komputer bacarıqları",
    "Faydalı mövzular",
  ];

  const getCardClass = (index) => {
    const classes = [
      styles.defaultBorder,
      styles.greenBorder,
      styles.violetBorder,
      styles.redBorder,
    ];
    return classes[index % classes.length];
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <section className={styles.blogs}>
        <div className="container">
          <PageTitle title={"Bloq"} />
          <ul className="flex alignItemsCenter tabsMenu">
            {menus.map((menu, index) => (
              <Tabs key={index} title={menu} />
            ))}
          </ul>
          <div className={styles.blogGrid}>
            {status === "loading" && <CircularProgress />}
            {status === "failed" && <p>{error}</p>}
            {status === "succeeded" &&
              posts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  label={"Bloq"}
                  bg={post.background_image}
                  title={post.title}
                  det={post.short_description}
                  className={getCardClass(index)}
                  to={post.slug}
                />
              ))}
          </div>
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
