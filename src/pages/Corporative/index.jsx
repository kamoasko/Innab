import React, { Suspense, useRef } from "react";
import styles from "./corporative.module.css";
import banner from "../../assets/images/corporative/corporative.png";
import corporativeImg from "../../assets/images/corporative/corporative-img.jpeg";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Box, Skeleton } from "@mui/material";
import { useCorporatives } from "../../features/corporative/corporativeSlice";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useTrainingCategories } from "../../features/categories/categorySlice";
import { useTranslations } from "../../features/translations/translations";
import Contact from "../../components/Contact";
import PageTitle from "../../components/pageTitle";

const Button = React.lazy(() => import("../../components/Button"));
const Customers = React.lazy(() => import("../../components/Customers"));
const AccordionSecond = React.lazy(() =>
  import("../../components/customAccrodionSecond")
);

const Corporative = () => {
  const { lang } = useParams();
  const { data: corporatives, status, error } = useCorporatives(lang);

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

  const keywords = [
    "corporative_trainings",
    "corporative_customers",
    "corporative_apply",
    "corporative_contact_us",
  ];
  const { data: translations, isLoading } = useTranslations(
    lang,
    "site",
    keywords
  );

  if (status === "error") {
    return <p>{error}</p>;
  }

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
        <div className={`${styles.pgtC} pageTop`}>
          <div className="container">
            <PageTitle
              title={
                status === "pending" ? (
                  <Skeleton variant="text" width={"100%"} height={100} />
                ) : (
                  corporatives && corporatives?.banner_title
                )
              }
            />
          </div>
        </div>

        <section
          className={styles.pageHeader}
          style={{
            background: `linear-gradient(90deg, var(--color-main) -1.51%, rgba(3, 5, 51, 0.00) 81.73%), url(${
              banner || (corporatives && corporatives?.banner)
            }) lightgray center / cover no-repeat`,
          }}
        >
          <div className="container">
            <div
              className={`${styles.pageHeaderWrapper} flex flexDirectionColumn justifyContentBetween`}
            >
              <div
                className={`${styles.pageHeaderTitle} flex flexDirectionColumn`}
              >
                <PageTitle
                  title={
                    status === "pending" ? (
                      <Skeleton variant="text" width={"100%"} height={100} />
                    ) : (
                      corporatives && corporatives?.banner_title
                    )
                  }
                />
                <div>
                  {status === "pending" && (
                    <Skeleton variant="text" width={"100%"} height={20} />
                  )}
                  {corporatives && corporatives?.banner_description}
                </div>
              </div>
              <ol
                className={`${styles.pageHeaderBottom} flex alignItemsCenter`}
              >
                <li>
                  <Link to={"#"} onClick={() => scrollToSection(trainingRef)}>
                    {isLoading && (
                      <Skeleton variant="text" width={"100%"} height={20} />
                    )}
                    {translations && translations?.corporative_trainings}
                  </Link>
                </li>
                <li>
                  <Link to={"#"} onClick={() => scrollToSection(customersRef)}>
                    {isLoading && (
                      <Skeleton variant="text" width={"100%"} height={20} />
                    )}
                    {translations && translations?.corporative_customers}
                  </Link>
                </li>
                <li>
                  <Link to={"#"} onClick={() => scrollToSection(contactRef)}>
                    {isLoading && (
                      <Skeleton variant="text" width={"100%"} height={20} />
                    )}
                    {translations && translations?.corporative_apply}
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.corporative} ref={trainingRef}>
          <div className="container">
            <div className={styles.corporativeTitle}>
              <h2>
                {status === "pending" && (
                  <Skeleton variant="text" width={"100%"} height={50} />
                )}
                {corporatives && corporatives?.content_title}
              </h2>
            </div>
            <div
              className={`${styles.corporativeWrapper} flex alignItemsCenter justifyContentBetween`}
            >
              <figure className={styles.corporativeLeft}>
                <figcaption>
                  {status === "pending" && (
                    <Skeleton variant="text" width={"100%"} height={30} />
                  )}
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: corporatives && corporatives?.content_top_text,
                    }}
                  />
                </figcaption>
                <picture className={styles.corporativeImg}>
                  <img
                    loading="lazy"
                    src={
                      corporativeImg || (corporatives && corporatives?.image)
                    }
                    alt={corporatives && corporatives?.content_title}
                  />
                </picture>
              </figure>
              <div className={styles.corporativeDet}>
                {status === "pending" && (
                  <Skeleton variant="text" width={"100%"} height={40} />
                )}
                <h3
                  dangerouslySetInnerHTML={{
                    __html: corporatives && corporatives?.content_top_text,
                  }}
                />
                {status === "pending" && (
                  <Skeleton variant="text" width={"100%"} height={40} />
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: corporatives && corporatives?.content_text,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className="container">
            <div className={`${styles.faqAccordions} faqAccordions`}>
              {corporatives &&
                corporatives?.corporative_trainings?.map((category, index) => (
                  <AccordionSecond
                    key={index}
                    summary={category.title}
                    details={[
                      <ol>
                        {category.trainings?.map((training, index) => (
                          <li key={index}>{training}</li>
                        ))}
                      </ol>,
                    ]}
                  />
                ))}
            </div>
            <Button
              title={[
                isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={20} />
                ) : (
                  translations?.corporative_contact_us
                ),
                <HiOutlineArrowLongRight />,
              ]}
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
