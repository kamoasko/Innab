import React, { useEffect, useRef } from "react";
import styles from "./projects.module.css";
import PageTitle from "../../components/pageTitle";
import projectImg from "../../assets/images/projects/project.png";
import Button from "../../components/Button";
import qrCode from "../../assets/images/projects/qrcode.png";
import qrCodeApp from "../../assets/images/projects/qrcodeapp.png";
import playStore from "../../assets/icons/google-play-icon.svg";
import { Link, useParams } from "react-router-dom";
import { FaApple } from "react-icons/fa6";
import Contact from "../../components/Contact";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectContent } from "../../features/project/projectSlice";

const Projects = ({ book }) => {
  const contactRef = useRef(null);
  const dispatch = useDispatch();
  const { lang, projectSlug } = useParams();
  const { projectContent, status, error } = useSelector(
    (state) => state.projects
  );

  console.log(projectSlug);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchProjectContent({ lang, projectSlug }));
  }, [lang, projectSlug, dispatch]);

  return (
    <>
      <div className="pageTop">
        <div className="container">
          <PageTitle title={"Lahiyələr"} />
        </div>
      </div>
      <section className={styles.project}>
        <div className="container">
          <div
            className={`${styles.projectWrapper} flex justifyContentBetween`}
          >
            <div className={styles.projectDetail}>
              <h2>"55 dərsə Excel" kitabı</h2>
              <div>
                Müasir iş dünyasında sektorundan asılı olmayaraq dövlət və özəl
                müəssisələrdə, habelə fiziki şəxslər tərəfindən ən çox istifadə
                edilən proqramlardan biri Excel proqramıdır. Excel vasitəsi ilə
                məlumatların saxlanılması, emal edilməsi, hesabatlılığın təmin
                edilməsi, müxtəlif hesablamaların aparılması, işlərin təqib
                edilməsi yerinə yetirilir. Proqramın çox funksiyalı olmasına
                nəzərən interfeysinin rahat olması istifadəçilər tərəfindən daha
                çox sevilməsinə səbəb olub. Təsadüfi deyil ki, “Excel”
                proqramını yüksək səviyyədə bilən şəxslərin uzunmüddətli dövrdə
                işsiz olması halına rast gəlinmir. Bundan əlavə bu proqram
                təminatını yüksək səviyyədə bilən işçilərin vəzifə artımları da
                digərlərinə nəzərən daha tez olur. Excel derslerini bu mükəmməl
                kitab ilə indi çox asanlıqla öyrənə bilərsiniz. <br /> <br />{" "}
                Excel üzrə ən çox satılan praktiki kitabın və Excellə bağlı
                ölkəmizdə bir çox ilklərə imza atan (“Alo Excel”, “Excelin
                Atası”, “55 dərsə Excel” video dərsliyi) İnnab komandası
                tərəfindən artıq 5-ci dəfə “55 dərsə Excel” kitabı nəşr
                edilmişdir. Exceli bu stolüstü kitab vasitəsi ilə tam öyrənə
                bilərsiniz. <br /> <br /> Kitabda 0-dan başlayaraq mükəmmələ
                doğru Excelin bütün əmrləri, menyuları (Macro xaric), 222
                funksiyası izah edilmişdir. Kitabın 5-ci nəşrində 2022-ci ildə
                yenilənən funksiyalar haqqında da ətraflı məlumat verilmişdir.
                Kitabın mündəricatı ilə və bəzi nümunələrlə linklərdən tanış ola
                bilərsiniz.
              </div>
            </div>
            {book && (
              <div className={styles.projectLeft}>
                <h2>"55 dərsə Excel" kitabı</h2>
                <article className={styles.projectCard}>
                  <picture className={styles.projectCardImg}>
                    <img src={projectImg} alt="" />
                  </picture>
                  <div className={styles.projectCardDet}>
                    <h4>"55 dərsə Excel" kitabı</h4>
                    <div>Excelin sirrlərini bu kitabdan öyrənin!</div>
                    <h5>25 AZN</h5>
                    <Button
                      component
                      title={"Sifariş ver"}
                      borderRadius={"7.8rem"}
                      onClick={scrollToContact}
                    />
                  </div>
                </article>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className={styles.mobileBook}>
        <div className="container">
          <div
            className={`${styles.mobileBookWrapper} flex alignItemsCenter justifyContentBetween`}
          >
            <div className={styles.mobileBookDet}>
              <div
                className={`${styles.mobileBookContent} flex flexDirectionColumn`}
              >
                <h2>Mobil Kitab</h2>
                <div>
                  Ölkədə ilk dəfə Excel öyrənmək istəyənlər və Excel
                  istifadəçiləri üçün yaradılmış mobil tətbiqdir. Mobil tətbiqdə
                  Excelə aid Financial, Logical, Text, Date & Time, Lookup &
                  References, Math & Trig, Statistical funksiyaları və Exceldə
                  mövcud olan xəta tipləri yer almışdır.
                </div>
              </div>
              <figure
                className={`${styles.mobileBookQr} flex alignItemsCenter`}
              >
                <picture>
                  <img src={qrCode} alt="" />
                </picture>
                <figcaption>
                  Telefonunuzun kamerası ilə QR codu scan edin.
                </figcaption>
              </figure>
            </div>
            <div className={`${styles.mobileBookLeft} flex alignItemsCenter`}>
              <div
                className={`${styles.mobileBookDownload} flex flexDirectionColumn`}
              >
                <div>
                  Google Play və App store vasitəsilə telefonunza yükləyə
                  biləraiz
                </div>
                <div className="flex flexDirectionColumn">
                  <Link to={""} className="flexCenter">
                    <img src={playStore} alt="" />
                    Google Play
                  </Link>
                  <Link to={""} className="flexCenter">
                    <FaApple />
                    App Store
                  </Link>
                </div>
              </div>
              <picture className={styles.mobileBookImg}>
                <img src={qrCodeApp} alt="" />
              </picture>
            </div>
          </div>
        </div>
      </section>
      <Contact
        title={"Sualın var?"}
        subTitle={[
          "Hardan başlamaqda tərəddüd edirsənsə ",
          <strong>bizə zəng elə</strong>,
        ]}
        contactRef={contactRef}
      />
    </>
  );
};

export default Projects;
