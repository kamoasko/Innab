import React, { Suspense, useEffect, useRef, useState } from "react";
import styles from "./details.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useOutletContext, useParams } from "react-router";
import {
  useVideoLessonCategory,
  useVideoLessonContent,
} from "../../features/videoLessons/videoLessonSlice";
import { Box, Skeleton } from "@mui/material";
import axios from "axios";
import { useBlogCategories } from "../../features/blogCategories/blogCategorySlice";
import { useBlogContent, useBlogPosts } from "../../features/blog/blogSlice";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";

const TrainingsMenu = React.lazy(() =>
  import("../../components/trainingsMenu")
);
const Button = React.lazy(() => import("../../components/Button"));
const BlogPosts = React.lazy(() => import("../../components/blogPosts"));

const DetailPage = ({ blog, pageTitle }) => {
  const { categoryId: contextCategoryId } = useOutletContext();
  const { lang, videoSlug, blogSlug, categoryId } = useParams();
  const {
    data: content,
    status,
    error,
  } = blog
    ? useBlogContent(lang, blogSlug)
    : useVideoLessonContent(lang, videoSlug);

  const { data: category } = blog
    ? useBlogCategories(lang, blogSlug)
    : useVideoLessonCategory(lang, videoSlug);

  const { data: posts } = blog ? useBlogPosts(lang, contextCategoryId) : "";

  const [isOpened, setIsOpened] = useState({});
  const [playlistData, setPlaylistData] = useState(null);
  const { data: menus } = useMenus(lang);

  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const toggleLesson = (lessonId) => {
    setIsOpened((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const links = content?.links;
  const videoId = links?.link;
  const apiKey = "AIzaSyAcNaMFfPRTTcuOI5JHkrDC8ZrzDAb4ELQ";
  const [videoLessonId, setVideoLessonId] = useState(videoId);
  const iframeRef = useRef(videoId);

  const handleVideoId = (id) => {
    setVideoLessonId(id);

    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${id}?autoplay=0`;
    } else {
      iframeRef.current.src = `https://www.youtube.com/embed/${id}?autoplay=0`;
    }
  };

  const convertDuration = (duration) => {
    const match = duration.match(
      /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );
    const days = match[1] ? parseInt(match[1], 10) : 0;
    const hours = match[2] ? parseInt(match[2], 10) : 0;
    const minutes = match[3] ? parseInt(match[3], 10) : 0;
    const seconds = match[4] ? parseInt(match[4], 10) : 0;

    const totalHours = days * 24 + hours;
    const totalMinutes = totalHours * 60 + minutes;
    const totalSeconds = totalMinutes * 60 + seconds;

    const formattedHours = String(Math.floor(totalSeconds / 3600)).padStart(
      2,
      "0"
    );
    const formattedMinutes = String(
      Math.floor((totalSeconds % 3600) / 60)
    ).padStart(2, "0");
    const formattedSeconds = String(totalSeconds % 60).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const playlistId = "PLEmd2D4NKfm6vbuyGBI2C43QdQ6LzlM0b";
      let nextPageToken = null;
      let allVideos = [];

      do {
        try {
          const playlistResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50${
              nextPageToken ? `&pageToken=${nextPageToken}` : ""
            }`
          );

          const videoIds = playlistResponse.data.items.map(
            (item) => item.snippet.resourceId.videoId
          );

          const videoDetailsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(
              ","
            )}&key=${apiKey}`
          );

          const videosWithDurations = playlistResponse.data.items.map(
            (item, index) => ({
              ...item,
              duration: convertDuration(
                videoDetailsResponse.data.items[index].contentDetails.duration
              ),
            })
          );

          allVideos = allVideos.concat(videosWithDurations);
          nextPageToken = playlistResponse.data.nextPageToken;
        } catch (error) {
          console.error("Error fetching playlist data:", error);
          break;
        }
      } while (nextPageToken);

      setPlaylistData(allVideos);
    };

    fetchPlaylistData();
  }, [videoId, videoLessonId]);

  return (
    <>
      {blog ? (
        <Helmet>
          <title>{content?.seo_title || "Bloq"}</title>
          <meta
            name="description"
            content={content?.seo_description || "Bloq"}
          />
          <meta name="keywords" content={content?.seo_keywords || "Bloq"} />
          {content?.seo_links || (
            <link
              rel="canonical"
              href={`/${lang}/${parentMenu[5]?.slug}/${usefulMenu[1]?.slug}/${content?.slug}`}
            />
          )}
          {content?.seo_scripts || <script type="application/ld+json"></script>}
        </Helmet>
      ) : (
        content?.data?.map((lesson) => (
          <Helmet key={lesson.id}>
            <title>{lesson.seo_title || "Video dərslər"}</title>
            <meta
              name="description"
              content={lesson.seo_description || "Video dərslər"}
            />
            <meta
              name="keywords"
              content={lesson.seo_keywords || "Video dərslər"}
            />
            {lesson.seo_links || (
              <link
                rel="canonical"
                href={`/${lang}/${parentMenu[5]?.slug}/${usefulMenu[0]?.slug}/${lesson?.slug}`}
              />
            )}
            {lesson.seo_scripts || <script type="application/ld+json"></script>}
          </Helmet>
        ))
      )}
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
        <section className={styles.detail}>
          <div className="container">
            <div className={`${styles.detailWrapper} flex`}>
              <TrainingsMenu vidCat={category} />

              {blog ? (
                <BlogPosts blogContent={content} blogs={posts} />
              ) : (
                <div className={styles.detailMain}>
                  {status === "pending" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100% !important",
                          height: "100% !important",
                        }}
                      />
                    </Box>
                  )}
                  {status === "error" && <Box>{error}</Box>}
                  <div className={`${styles.detailMainTop} flex`}>
                    <div className={styles.detailFigure}>
                      <iframe
                        ref={iframeRef}
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className={styles.detailTopics}>
                      {status === "success" &&
                        content.data.map((lesson) => (
                          <div
                            className={`${styles.detailTopic} detailTopic ${
                              isOpened[lesson.id] ? "active" : ""
                            }`}
                            key={lesson.id}
                          >
                            <div
                              onClick={() => toggleLesson(lesson.id)}
                              className="flex alignItemsCenter justifyContentBetween"
                            >
                              <h3>{lesson.title}</h3>
                              <FaChevronDown />
                            </div>
                            <ul className="flex flexDirectionColumn">
                              {lesson.links.map((link, index) => (
                                <li
                                  className="flex flexDirectionColumn"
                                  onClick={() => handleVideoId(link.link)}
                                  key={link.id}
                                >
                                  <span>
                                    1.{index + 1}. {link.title}
                                  </span>
                                  <span className="flex alignItemsCenter">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.34222 5.56891C5.67298 5.32891 4.95557 5.73887 4.81714 6.4404C4.71839 6.94086 4.66667 7.45804 4.66667 7.98695C4.66667 8.52661 4.72051 9.05406 4.82322 9.56399C4.96414 10.2636 5.68085 10.6709 6.34858 10.4307C7.31662 10.0826 8.19641 9.54862 8.94569 8.87176C9.46255 8.40484 9.46255 7.59711 8.94569 7.1302C8.19477 6.45184 7.31276 5.91697 6.34222 5.56891ZM5.986 6.71622C5.90775 7.12707 5.86667 7.55181 5.86667 7.98695C5.86667 8.43133 5.90952 8.86489 5.99105 9.28387C6.78069 8.99286 7.50119 8.55453 8.11939 8.00098C7.49987 7.44624 6.77762 7.00722 5.986 6.71622Z"
                                        fill="currentColor"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.60363 14H10.5478C11.6071 14 12.1117 13.9145 12.6245 13.6403C13.0617 13.4065 13.4084 13.0599 13.6423 12.6227C13.9166 12.1099 14.0021 11.6054 14.0021 10.5463V5.45375C14.0021 4.39457 13.9166 3.89005 13.6423 3.37725C13.4084 2.94012 13.0617 2.59348 12.6245 2.35972C12.1117 2.0855 11.6071 2 10.5478 2H7.60224C7.58788 2 7.57345 2 7.55896 2H5.4543C4.39494 2 3.89039 2.0855 3.37754 2.35972C2.94036 2.59348 2.59365 2.94012 2.35982 3.37725C2.08552 3.89005 2 4.39457 2 5.45375V10.5463C2 11.6054 2.08552 12.1099 2.35982 12.6227C2.59365 13.0599 2.94036 13.4065 3.37754 13.6403C3.89039 13.9145 4.39494 14 5.4543 14H7.55892C7.57389 14 7.58879 14 7.60363 14ZM9.01702 3.2298C8.65803 3.20047 8.19665 3.2 7.53335 3.2L5.4543 3.2C4.45024 3.2 4.18947 3.28636 3.94338 3.41794C3.7153 3.53989 3.53991 3.71526 3.41795 3.94326C3.28637 4.18925 3.2 4.44991 3.2 5.45375V10.5463C3.2 11.5501 3.28637 11.8108 3.41795 12.0567C3.53991 12.2847 3.7153 12.4601 3.94338 12.5821C4.18947 12.7136 4.45024 12.8 5.4543 12.8H7.53331C8.19662 12.8 8.65802 12.7995 9.01701 12.7702C9.369 12.7414 9.56939 12.688 9.72027 12.6111C10.0464 12.4449 10.3116 12.1797 10.4778 11.8536C10.5546 11.7027 10.6081 11.5023 10.6369 11.1503C10.6662 10.7914 10.6667 10.33 10.6667 9.66667V6.33333C10.6667 5.67004 10.6662 5.20865 10.6369 4.84966C10.6081 4.49768 10.5546 4.2973 10.4778 4.14642C10.3116 3.82027 10.0464 3.5551 9.72027 3.38892C9.56938 3.31204 9.369 3.25856 9.01702 3.2298ZM11.3187 12.7738C11.4037 12.6551 11.4801 12.5297 11.547 12.3984C11.7244 12.0501 11.7981 11.6742 11.8329 11.2481C11.8667 10.8344 11.8667 10.3239 11.8667 9.69228V6.30773C11.8667 5.67606 11.8667 5.16556 11.8329 4.75195C11.7981 4.32575 11.7244 3.94987 11.547 3.60163C11.4801 3.47035 11.4037 3.34491 11.3187 3.22617C11.7205 3.26119 11.8929 3.3293 12.0587 3.41794C12.2868 3.53989 12.4622 3.71526 12.5841 3.94326C12.7157 4.18925 12.8021 4.44991 12.8021 5.45375V10.5463C12.8021 11.5501 12.7157 11.8108 12.5841 12.0567C12.4622 12.2847 12.2868 12.4601 12.0587 12.5821C11.8929 12.6707 11.7205 12.7388 11.3187 12.7738Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    {(playlistData &&
                                      playlistData.find(
                                        (item) =>
                                          item.snippet.resourceId.videoId ===
                                          link.link
                                      )?.duration) ||
                                      "00:00:00"}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                  <Button component title={"Abunə ol"} />
                </div>
              )}
            </div>
          </div>
        </section>

        {blog && (
          <div className={styles.detailAbout}>
            <div className="container">
              {content?.content?.map((blog) => (
                <div key={blog.id}>
                  <div
                    className={styles.detailAboutText}
                    dangerouslySetInnerHTML={{
                      __html: blog.text,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
};

export default DetailPage;
