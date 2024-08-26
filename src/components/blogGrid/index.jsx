import React, { Suspense, useEffect } from "react";
import styles from "../../pages/BlogPage/blogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router";
import { fetchBlogPosts } from "../../features/blog/blogSlice";
import { Box, CircularProgress } from "@mui/material";

const BlogCard = React.lazy(() => import("../../components/blogCard"));

const BlogGrid = () => {
  const dispatch = useDispatch();
  const { lang, slug } = useParams();
  const { categoryId } = useOutletContext();
  const { posts, status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchBlogPosts({ lang, categoryId }));
    }
  }, [lang, categoryId, dispatch]);

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
        {status === "failed" && <Box>{error}</Box>}
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
    </Suspense>
  );
};

export default BlogGrid;
