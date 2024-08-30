import React, { Suspense } from "react";
import styles from "../../pages/BlogPage/blogs.module.css";
import { useOutletContext, useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useBlogPosts } from "../../features/blog/blogSlice";

const BlogCard = React.lazy(() => import("../../components/blogCard"));

const BlogGrid = () => {
  const { lang } = useParams();
  const { categoryId } = useOutletContext();
  const { data: posts, status, error } = useBlogPosts(lang, categoryId);

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
      <div className={styles.blogGrid}>
        {status === "loading" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {status === "error" && <Box>{error.message}</Box>}
        {status === "success" &&
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
    </Suspense>
  );
};

export default BlogGrid;
