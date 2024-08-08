import React from "react";
import styles from "./video-lessons.module.css";
import PageTitle from "../../components/pageTitle";
import Tabs from "../../components/tabs";
import VideoLessonCard from "../../components/videoLessonCard";
import videoImg from "../../assets/images/videoLessons/video-lesson.jpeg";
import Contact from "../../components/Contact";

const VideoLessons = () => {
  const menus = [
    "Data analitika",
    "Mühasibatlıq",
    "Komputer bacarıqları",
    "Faydalı mövzular",
  ];

  return (
    <>
      <section className={styles.videoLessons}>
        <div className="container">
          <PageTitle title={"Video dərslər"} />
          <ul className="flex alignItemsCenter tabsMenu">
            {menus.map((menu, index) => (
              <Tabs key={index} title={menu} />
            ))}
          </ul>
          <div className={styles.videoLessonsGrid}>
            <VideoLessonCard
              img={videoImg}
              title={"55 Dərsə Excel"}
              det={
                "Exceli A-dan Z-ə öyrən.Excel, Paste Special: Values, Formulas, Formats, Comments Excel kursları zamanı 100-dən çox praktiki test ilə bilik və barcarıqlarınız yoxlanılacaq."
              }
            />
            <VideoLessonCard
              img={videoImg}
              title={"55 Dərsə Excel"}
              det={
                "Exceli A-dan Z-ə öyrən.Excel, Paste Special: Values, Formulas, Formats, Comments Excel kursları zamanı 100-dən çox praktiki test ilə bilik və barcarıqlarınız yoxlanılacaq."
              }
            />
            <VideoLessonCard
              img={videoImg}
              title={"55 Dərsə Excel"}
              det={
                "Exceli A-dan Z-ə öyrən.Excel, Paste Special: Values, Formulas, Formats, Comments Excel kursları zamanı 100-dən çox praktiki test ilə bilik və barcarıqlarınız yoxlanılacaq."
              }
            />
            <VideoLessonCard
              img={videoImg}
              title={"55 Dərsə Excel"}
              det={
                "Exceli A-dan Z-ə öyrən.Excel, Paste Special: Values, Formulas, Formats, Comments Excel kursları zamanı 100-dən çox praktiki test ilə bilik və barcarıqlarınız yoxlanılacaq."
              }
            />
            <VideoLessonCard
              img={videoImg}
              title={"55 Dərsə Excel"}
              det={
                "Exceli A-dan Z-ə öyrən.Excel, Paste Special: Values, Formulas, Formats, Comments Excel kursları zamanı 100-dən çox praktiki test ilə bilik və barcarıqlarınız yoxlanılacaq."
              }
            />
            <VideoLessonCard
              img={videoImg}
              title={"55 Dərsə Excel"}
              det={
                "Exceli A-dan Z-ə öyrən.Excel, Paste Special: Values, Formulas, Formats, Comments Excel kursları zamanı 100-dən çox praktiki test ilə bilik və barcarıqlarınız yoxlanılacaq."
              }
            />
          </div>
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
