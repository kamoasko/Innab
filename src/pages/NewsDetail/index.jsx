import React from "react";
import styles from "./news-detail.module.css";
import PageTitle from "../../components/pageTitle";
import newsImg from "../../assets/images/news/news-img.jpeg";
import NewsCard from "../../components/newsCard";
import Contact from "../../components/Contact";
import Button from "../../components/Button";

const NewsDetail = () => {
  return (
    <>
      <section className={styles.newsDetail}>
        <div className="container">
          <PageTitle title={"Xəbərlər"} />

          <div
            className={`${styles.newsDetailWrapper} flex alignItemsCenter justifyContentBetween`}
          >
            <div
              className={`${styles.newsDetailWrapperContent} flex flexDirectionColumn justifyContentBetween`}
            >
              <h2>
                Data analitika nədir? -Data analitika KURSU SEÇƏRKƏN NƏLƏRƏ
                DIQQƏT ETMƏLİYİK?
              </h2>
              <time dateTime="Fevral 12 ,2024">Fevral 12 ,2024</time>
            </div>
            <div className={styles.newsDetailImg}>
              <img src={newsImg} alt="" />
            </div>
          </div>
          <div className={styles.newsDetailText}>
            <p>
              Front-end proqramlaşdırma inkişafı veb dünyasına qapı açan və
              istifadəçilərin veb sayt təcrübəsini formalaşdıran vacib sahədir.
              Bu sahə yerli bazarda da inkişaf etdiyi üçün peşəkar olmaq
              istəyənlər bu haqda maraqlanır yaxud uyğun frontend
              kursu axtarışına çıxır. Bəs kimdir frontend developer?
            </p>
          </div>
          <div
            className={`${styles.newsDetailParagraphs} flex flexDirectionColumn`}
          >
            <div>
              <h3>
                <strong>Frontend developer</strong> kimdir?
              </h3>
              <p>
                Frontend proqramçılar nə edir? Frontend proqramçı kimdir? Onlar
                veb saytların vəya mobil tətbiqlərin vizual hissəsini,
                interfeyslərini proqramlaşdırır. Siz hər hansı bir veb-sayta
                daxil olduqda, saytda gördüyünüz bütün vizual elementlər
                front-end proqramçıların işi hesab edilir. Bunların doğru
                işləməsi və lazımi yerə yönlənməsi kimi məsələlər isə backend
                proqramçıların işi hesab olunur.    Dizayn edilmiş maketi
                frontend proqramçı kodlama vasitəsilə hazırlayır, bütün
                elementlərin və vizual effektlərin işləməsini də bu
                mütəxəssislər təmin edir. Frontend mütəxəssisin digər bir
                öhdəliyi isə hazırladığı səhifələri bütün ekran ölçülərinə
                uyğunlaşdırmaq, responsivliyi təmin etməkdir: telefonlar,
                kompüter monitorları, noutbuklar, planşetlər, televizorlar və s.
                Bu tip responsivlik problemləri istifadəçi təcrübəsinə mənfi
                təsir etdiyi üçün frontend developer tərəfindən diqqətlə
                yoxlanılır
              </p>
            </div>

            <div>
              <h3>
                <strong>Frontend developer</strong> kimdir?
              </h3>
              <p>
                Frontend proqramçılar nə edir? Frontend proqramçı kimdir? Onlar
                veb saytların vəya mobil tətbiqlərin vizual hissəsini,
                interfeyslərini proqramlaşdırır. Siz hər hansı bir veb-sayta
                daxil olduqda, saytda gördüyünüz bütün vizual elementlər
                front-end proqramçıların işi hesab edilir. Bunların doğru
                işləməsi və lazımi yerə yönlənməsi kimi məsələlər isə backend
                proqramçıların işi hesab olunur.    Dizayn edilmiş maketi
                frontend proqramçı kodlama vasitəsilə hazırlayır, bütün
                elementlərin və vizual effektlərin işləməsini də bu
                mütəxəssislər təmin edir. Frontend mütəxəssisin digər bir
                öhdəliyi isə hazırladığı səhifələri bütün ekran ölçülərinə
                uyğunlaşdırmaq, responsivliyi təmin etməkdir: telefonlar,
                kompüter monitorları, noutbuklar, planşetlər, televizorlar və s.
                Bu tip responsivlik problemləri istifadəçi təcrübəsinə mənfi
                təsir etdiyi üçün frontend developer tərəfindən diqqətlə
                yoxlanılır
              </p>
            </div>

            <div>
              <h3>
                <strong>Frontend developer</strong> kimdir?
              </h3>
              <p>
                Frontend proqramçılar nə edir? Frontend proqramçı kimdir? Onlar
                veb saytların vəya mobil tətbiqlərin vizual hissəsini,
                interfeyslərini proqramlaşdırır. Siz hər hansı bir veb-sayta
                daxil olduqda, saytda gördüyünüz bütün vizual elementlər
                front-end proqramçıların işi hesab edilir. Bunların doğru
                işləməsi və lazımi yerə yönlənməsi kimi məsələlər isə backend
                proqramçıların işi hesab olunur.    Dizayn edilmiş maketi
                frontend proqramçı kodlama vasitəsilə hazırlayır, bütün
                elementlərin və vizual effektlərin işləməsini də bu
                mütəxəssislər təmin edir. Frontend mütəxəssisin digər bir
                öhdəliyi isə hazırladığı səhifələri bütün ekran ölçülərinə
                uyğunlaşdırmaq, responsivliyi təmin etməkdir: telefonlar,
                kompüter monitorları, noutbuklar, planşetlər, televizorlar və s.
                Bu tip responsivlik problemləri istifadəçi təcrübəsinə mənfi
                təsir etdiyi üçün frontend developer tərəfindən diqqətlə
                yoxlanılır
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.otherNews}>
        <div className="container">
          <div className={styles.otherNewsTitle}>
            <h2>Digər xəbərlər</h2>
          </div>
          <div className={`${styles.otherNewsWrapper} flexCenter`}>
            <NewsCard
              title={"Data Analitika Nədir ?"}
              date={"Fevral 12 ,2024"}
              img={newsImg}
              desc={
                "Data analitika sahəsində mütəxəsis olmaq istəyənlər üçün mükəməl imkanlar  İNNAB lorem ipsum sit amet"
              }
            />
            <NewsCard
              title={"Data Analitika Nədir ?"}
              date={"Fevral 12 ,2024"}
              img={newsImg}
              desc={
                "Data analitika sahəsində mütəxəsis olmaq istəyənlər üçün mükəməl imkanlar  İNNAB lorem ipsum sit amet"
              }
            />
            <NewsCard
              title={"Data Analitika Nədir ?"}
              date={"Fevral 12 ,2024"}
              img={newsImg}
              desc={
                "Data analitika sahəsində mütəxəsis olmaq istəyənlər üçün mükəməl imkanlar  İNNAB lorem ipsum sit amet"
              }
            />
          </div>
          <Button title={"Hamısına bax"} borderRadius={"6.3rem"} />
        </div>
      </section>
      <Contact />
    </>
  );
};

export default NewsDetail;
