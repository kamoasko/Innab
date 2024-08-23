import React, { useEffect, useState } from "react";
import styles from "./video-lessons.module.css";
import PageTitle from "../../components/pageTitle";
import Tabs from "../../components/tabs";
import Contact from "../../components/Contact";
import { Outlet, useParams } from "react-router";
import VideoGrid from "../../components/videosGrid";

const VideoLessons = () => {
  const menus = [
    {
      id: 18,
      title: "Data analitika",
      seo_title: "Data analitika",
      seo_keywords: "",
      seo_description: "",
      seo_links: null,
      seo_scripts: null,
      slug: "data-analitika",
    },
    {
      id: 19,
      title: "Mühasibatlıq",
      seo_title: "Mühasibatlıq",
      seo_keywords: "",
      seo_description: "",
      seo_links: null,
      seo_scripts: null,
      slug: "muhasibatliq",
    },
    {
      id: 20,
      title: "Komputer bacarıqları",
      seo_title: "Komputer bacarıqları",
      seo_keywords: "",
      seo_description: "",
      seo_links: null,
      seo_scripts: null,
      slug: "komputer-bacariqlari",
    },
    {
      id: 21,
      title: "Faydalı mövzular",
      seo_title: "Faydalı mövzular",
      seo_keywords: "",
      seo_description: "",
      seo_links: null,
      seo_scripts: null,
      slug: "faydali-movzular",
    },
  ];

  return (
    <>
      <section className={styles.videoLessons}>
        <div className="container">
          <PageTitle title={"Video dərslər"} />
          <ul className="flex alignItemsCenter tabsMenu">
            {menus.map((menu) => (
              <Tabs
                key={menu.id}
                title={menu.title}
                to={`useful-for-you/video-lessons/${menu.slug}`}
                categoryId={menu.id}
              />
            ))}
          </ul>
          <VideoGrid />
          <Outlet />
        </div>
      </section>

      <Contact
        title={"Sualın var?"}
        subTitle={[
          "Hardan başlamaqda tərəddüd edirsənsə ",
          <strong>bizə zəng elə</strong>,
        ]}
      />
    </>
  );
};

export default VideoLessons;
