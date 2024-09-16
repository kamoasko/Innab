import React, { Suspense, useEffect, useRef } from "react";
import styles from "./corporative.module.css";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCorporativeDatas } from "../../features/corporative/corporativeSlice";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useTrainingCategories } from "../../features/categories/categorySlice";

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
  const { data: categories } = useTrainingCategories(lang);
  const { data: infos } = useSiteInfos(lang);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const contactRef = useRef(null);
  const trainingRef = useRef(null);
  const customersRef = useRef(null);

  const allTrainings = categories
    ?.map((category) => category.subData)
    ?.flat(Infinity);

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
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Korporativ"}</title>
            <meta name="description" content={"Korporativ"} />
            <meta name="keywords" content={"Korporativ"} />
            <link rel="canonical" href={`/${lang}/korporativ`} />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{parentMenu[2]?.seo_title}</title>
            <meta name="description" content={parentMenu[2]?.seo_description} />
            <meta name="keywords" content={parentMenu[2]?.seo_keywords} />
            {parentMenu[2]?.seo_links || (
              <link rel="canonical" href={`/${lang}/${parentMenu[2]?.slug}`} />
            )}
            {parentMenu[2]?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
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
                      <Link
                        to={"#"}
                        onClick={() => scrollToSection(trainingRef)}
                      >
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
                      <Link
                        to={"#"}
                        onClick={() => scrollToSection(contactRef)}
                      >
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
                      <img
                        loading="lazy"
                        src={corporative.image}
                        alt={corporative.content_title}
                      />
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
            <div className={`${styles.faqAccordions} faqAccordions`}>
              {categories &&
                categories?.map((category) => (
                  <AccordionSecond
                    key={category.id}
                    summary={category.title}
                    details={[
                      <ol>
                        {category.subData?.map((training) => (
                          <li key={training.id}>{training.title}</li>
                        ))}
                      </ol>,
                    ]}
                  />
                ))}
            </div>
            <Button
              title={["Bizimlə əlaqə saxlayın", <HiOutlineArrowLongRight />]}
              to={`tel:${infos && infos?.phone1}`}
              borderRadius={"5.9rem"}
            />
          </div>
        </section>

        <Customers about corporative ref={customersRef} />
        <Contact
          contactRef={contactRef}
          apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
          categories={allTrainings && allTrainings}
        />
      </Suspense>
    </>
  );
};

export default Corporative;
