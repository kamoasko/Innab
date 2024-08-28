import React, { Suspense, useEffect, useRef } from "react";
import styles from "./corporative.module.css";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCorporativeDatas } from "../../features/corporative/corporativeSlice";

const Contact = React.lazy(() => import("../../components/Contact"));
const Customers = React.lazy(() => import("../../components/Customers"));
const Button = React.lazy(() => import("../../components/Button"));
const AccordionSecond = React.lazy(() =>
  import("../../components/customAccrodionSecond")
);
const PageTitle = React.lazy(() => import("../../components/pageTitle"));

const Corporative = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { corporative, status, error } = useSelector(
    (state) => state.corporative
  );
  const contactRef = useRef(null);
  const trainingRef = useRef(null);
  const customersRef = useRef(null);

  const scrollToSection = function (r) {
    switch (r) {
      case contactRef:
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case trainingRef:
        trainingRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case customersRef:
        customersRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        null;
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchCorporativeDatas(lang));
  }, [lang, dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "20rem",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && <p>{error}</p>}
      <div className={`${styles.pgtC} pageTop`}>
        <div className="container">
          <PageTitle title={corporative.banner_title} />
        </div>
      </div>

      {status === "succeeded" && (
        <>
          <section
            className={styles.pageHeader}
            style={{
              background: `linear-gradient(90deg, var(--color-main) -1.51%, rgba(3, 5, 51, 0.00) 81.73%), url(${corporative.banner}) lightgray center / cover no-repeat`,
            }}
          >
            <div className="container">
              <div
                className={`${styles.pageHeaderWrapper} flex flexDirectionColumn justifyContentBetween`}
              >
                <div
                  className={`${styles.pageHeaderTitle} flex flexDirectionColumn`}
                >
                  <PageTitle title={corporative.banner_title} />
                  <div>{corporative.banner_description}</div>
                </div>
                <ol
                  className={`${styles.pageHeaderBottom} flex alignItemsCenter`}
                >
                  <li>
                    <Link to={"#"} onClick={() => scrollToSection(trainingRef)}>
                      Təlimlər
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"#"}
                      onClick={() => scrollToSection(customersRef)}
                    >
                      Bizi seçənlər
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} onClick={() => scrollToSection(contactRef)}>
                      Müraciət
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className={styles.corporative} ref={trainingRef}>
            <div className="container">
              <div className={styles.corporativeTitle}>
                <h2>{corporative.content_title}</h2>
              </div>
              <div
                className={`${styles.corporativeWrapper} flex alignItemsCenter justifyContentBetween`}
              >
                <figure className={styles.corporativeLeft}>
                  <figcaption>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: corporative.content_top_text,
                      }}
                    />
                  </figcaption>
                  <picture className={styles.corporativeImg}>
                    <img src={corporative.image} alt="" />
                  </picture>
                </figure>
                <div className={styles.corporativeDet}>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: corporative.content_top_text,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: corporative.content_text,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

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

      <Customers about corporative ref={customersRef} />
      <Contact
        title={"Sualın var?"}
        subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
        contactRef={contactRef}
      />
    </Suspense>
  );
};

export default Corporative;
