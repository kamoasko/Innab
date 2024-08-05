import React from "react";
import styles from "./blogs.module.css";
import PageTitle from "../../components/pageTitle";
import Tabs from "../../components/tabs";
import Contact from "../../components/Contact";
import BlogCard from "../../components/blogCard";
import blogImg from "../../assets/images/bloq/blog-img.jpeg";

const BlogPage = () => {
  const menus = [
    "Data analitika",
    "Mühasibatlıq",
    "Komputer bacarıqları",
    "Faydalı mövzular",
  ];

  const bgColors = [
    `linear-gradient(15deg, var(--color-main) 20%, rgba(0, 0, 0, 0) 60%), url(${blogImg})`,
    `linear-gradient(15deg, var(--color-green) 20%, rgba(0, 0, 0, 0) 60%), url(${blogImg})`,
    `linear-gradient(15deg, var(--color-violet) 20%, rgba(0, 0, 0, 0) 60%), url(${blogImg})`,
    `linear-gradient(15deg, var(--color-red) 20%, rgba(0, 0, 0, 0) 60%), url(${blogImg})`,
  ];

  const blogPosts = [
    {
      id: 1,
      title: "SQL",
      det: "Böyük həcmli məlumatlar ilə işləmək üçün alternativlərdən biri SQLsorğu dilidir.",
      label: "Bloq",
      img: blogImg,
    },
    {
      id: 2,
      title: "Statistika",
      det: "Statistika riyaziyyatın bir qoludur və əldə edilən məlumatları elmi və praktiki məqsədlər üçün işləyib hazırlamaqla məşğul olur.",
      label: "Bloq",
      img: blogImg,
    },
    {
      id: 3,
      title: "PowerPivot",
      det: "MS Excel gündəlik hesablamaların icra edilməsi və istifadəçi tərəfindən məlumata və hesablamalara birbaşa müdaxilə etmək üçün ən əlverişli hazır proqram paketidir.",
      label: "Bloq",
      img: blogImg,
    },
    {
      id: 4,
      title: "Statistika",
      det: "Statistika riyaziyyatın bir qoludur və əldə edilən məlumatları elmi və praktiki məqsədlər üçün işləyib hazırlamaqla məşğul olur.",
      label: "Bloq",
      img: blogImg,
    },
    {
      id: 5,
      title: "Statistika",
      det: "Statistika riyaziyyatın bir qoludur və əldə edilən məlumatları elmi və praktiki məqsədlər üçün işləyib hazırlamaqla məşğul olur.",
      label: "Bloq",
      img: blogImg,
    },
    {
      id: 6,
      title: "Statistika",
      det: "Statistika riyaziyyatın bir qoludur və əldə edilən məlumatları elmi və praktiki məqsədlər üçün işləyib hazırlamaqla məşğul olur.",
      label: "Bloq",
      img: blogImg,
    },
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
    <>
      <section className={styles.blogs}>
        <div className="container">
          <PageTitle title={"Bloq"} />
          <ul className="flex alignItemsCenter tabsMenu">
            {menus.map((menu, index) => (
              <Tabs key={index} title={menu} />
            ))}
          </ul>
          <div className={styles.blogGrid}>
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                label={post.label}
                bg={`linear-gradient(20deg, var(--color-main) 25%, rgba(0, 0, 0, 0) 60%), url(${blogImg})`}
                title={post.title}
                det={post.det}
                className={getCardClass(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default BlogPage;
