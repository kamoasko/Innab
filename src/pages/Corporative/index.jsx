import React from "react";
import styles from "./corporative.module.css";
import PageTitle from "../../components/pageTitle";
import { Link } from "react-router-dom";
import corporativeBg from "../../assets/images/corporative/corporative.png";
import corporativeImg from "../../assets/images/corporative/corporative-img.jpeg";
import AccordionSecond from "../../components/customAccrodionSecond";
import Button from "../../components/Button";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import Customers from "../../components/Customers";
import Contact from "../../components/Contact";

const Corporative = () => {
  return (
    <>
      <div className={`${styles.pgtC} pageTop`}>
        <div className="container">
          <PageTitle title={"Korporativ"} />
        </div>
      </div>

      <section
        className={styles.pageHeader}
        style={{
          background: `linear-gradient(90deg, var(--color-main) -1.51%, rgba(3, 5, 51, 0.00) 81.73%), url(${corporativeBg}) lightgray center / cover no-repeat`,
        }}
      >
        <div className="container">
          <div
            className={`${styles.pageHeaderWrapper} flex flexDirectionColumn justifyContentBetween`}
          >
            <div
              className={`${styles.pageHeaderTitle} flex flexDirectionColumn`}
            >
              <PageTitle title={"Korporativ"} />
              <div>
                Korporativ hədəflərinizə çatmaq üçün tədris proqramlarımıza
                qoşulun və komandanızın peşəkar inkişafını bizə etibar edin.
              </div>
            </div>
            <ol className={`${styles.pageHeaderBottom} flex alignItemsCenter`}>
              <li>
                <Link>Təlimlər</Link>
              </li>
              <li>
                <Link>Bizi seçənlər</Link>
              </li>
              <li>
                <Link>Müraciət</Link>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.corporative}>
        <div className="container">
          <div className={styles.corporativeTitle}>
            <h2>Korporativ təlimlərimiz</h2>
          </div>
          <div
            className={`${styles.corporativeWrapper} flex alignItemsCenter justifyContentBetween`}
          >
            <figure className={styles.corporativeLeft}>
              <figcaption>
                <h3>
                  “Şirkətinizə <strong>özəl təlim planı</strong>,{" "}
                  <strong>saatları</strong> və <strong>məkanı</strong>{" "}
                  uyğunlaşdırmaq imkanı”
                </h3>
              </figcaption>
              <picture className={styles.corporativeImg}>
                <img src={corporativeImg} alt="" />
              </picture>
            </figure>
            <div className={styles.corporativeDet}>
              <h3>
                “Şirkətinizə <strong>özəl təlim planı</strong>,{" "}
                <strong>saatları</strong> və <strong>məkanı</strong>{" "}
                uyğunlaşdırmaq imkanı”
              </h3>
              <div>
                “İnnab Business School” olaraq bu günə qədər 300-dən çox dövlət
                və özəl qurumlara xidmət göstərmişik. Peşəkar mütəxəssislərdən
                ibarət olan komandamız ən yaxşı tədrisi təmin edirlər.
                Mərkəzimizdə bir çox sahələri əhatə edən təlimlər həyata
                keçirilir. Hər bir sahə üzrə ixtisaslaşmış təlimçilərimiz nəzəri
                bilikləri praktiki nümunələr ilə sintez edərək iştirakçıları 
                maksimum fayda əldə etməsinə çalışırlar. Bizim korporativ
                təlimlərimizdə iştirak edərək bilik və bacarıqlarınızı
                artıraraq əməkdaşlarınızın peşəkar inkişafını təmin edə
                bilərsiniz. 
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
          <div className={styles.faqAccordions}>
            <AccordionSecond
              summary={"Kompüter bilikləri"}
              details={[
                <ol>
                  <li>MS Excel</li>
                  <li>MS Office</li>
                  <li>MS VBA</li>
                  <li>MOSE</li>
                </ol>,
              ]}
            />
            <AccordionSecond
              summary={"Kompüter bilikləri"}
              details={[
                <ol>
                  <li>MS Excel</li>
                  <li>MS Office</li>
                  <li>MS VBA</li>
                  <li>MOSE</li>
                </ol>,
              ]}
            />
            <AccordionSecond
              summary={"Kompüter bilikləri"}
              details={[
                <ol>
                  <li>MS Excel</li>
                  <li>MS Office</li>
                  <li>MS VBA</li>
                  <li>MOSE</li>
                </ol>,
              ]}
            />
            <AccordionSecond
              summary={"Kompüter bilikləri"}
              details={[
                <ol>
                  <li>MS Excel</li>
                  <li>MS Office</li>
                  <li>MS VBA</li>
                  <li>MOSE</li>
                </ol>,
              ]}
            />
            <AccordionSecond
              summary={"Kompüter bilikləri"}
              details={[
                <ol>
                  <li>MS Excel</li>
                  <li>MS Office</li>
                  <li>MS VBA</li>
                  <li>MOSE</li>
                </ol>,
              ]}
            />
          </div>
          <Button
            title={["Bizimlə əlaqə saxlayın", <HiOutlineArrowLongRight />]}
            to={""}
            borderRadius={"5.9rem"}
          />
        </div>
      </section>

      <Customers about corporative />
      <Contact
        title={"Sualın var?"}
        subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
      />
    </>
  );
};

export default Corporative;
