import React, { Suspense, useRef } from "react";
import styles from "./events.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import eventCardImg from "../../assets/images/advertisement/event-card.png";
import {
  useSeminarWebinar,
  useWorkshops,
} from "../../features/seminarOrWorkshops/useSeminarOrWorksops";
import { useParams } from "react-router";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";
import { useTranslations } from "../../features/translations/translations";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { imgUrl } from "../../imgUrl";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const UsefulPageCard = React.lazy(() =>
  import("../../components/usefulPageCard")
);
const Advertisement = React.lazy(() =>
  import("../../components/advertisement")
);
const EventCard = React.lazy(() => import("../../components/eventCard"));
const Contact = React.lazy(() => import("../../components/Contact"));

const SeminarWebinar = ({ workshop }) => {
  const { lang } = useParams();
  const {
    data: seminarOrWorkshop,
    status,
    error,
  } = workshop ? useWorkshops(lang) : useSeminarWebinar(lang);
  const { data: siteInfo } = useSiteInfos(lang);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const date = new Date();

  const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getSeconds()}`;
  console.log(today);
  console.log(
    seminarOrWorkshop &&
      seminarOrWorkshop.map((item) => item.event_datetime?.slice(0, 16))[0] <
        today
  );

  const contactRef = useRef(null);

  const handleScrollToContact = () => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{workshop ? "Vorşoplar" : "Seminar & Vebinar"}</title>
            <meta
              name="description"
              content={workshop ? "Vorşoplar" : "Seminar & Vebinar"}
            />
            <meta
              name="keywords"
              content={workshop ? "Vorşoplar" : "Seminar & Vebinar"}
            />
            <link
              rel="canonical"
              href={
                workshop
                  ? `/${lang}/size-faydali/workshop`
                  : `/${lang}/size-faydali/seminar-webinar`
              }
            />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>
              {workshop ? usefulMenu[4]?.seo_title : usefulMenu[2]?.seo_title}
            </title>
            <meta
              name="description"
              content={
                workshop
                  ? usefulMenu[4]?.seo_description
                  : usefulMenu[2]?.seo_description
              }
            />
            <meta
              name="keywords"
              content={
                workshop
                  ? usefulMenu[4]?.seo_keywords
                  : usefulMenu[2]?.seo_keywords
              }
            />
            {workshop
              ? usefulMenu[4]?.seo_links || (
                  <link
                    rel="canonical"
                    href={`/${lang}/useful-for-you/workshop`}
                  />
                )
              : usefulMenu[2]?.seo_links || (
                  <link
                    rel="canonical"
                    href={`/${lang}/useful-for-you/seminar-webinar`}
                  />
                )}
            {workshop
              ? usefulMenu[4]?.seo_scripts || (
                  <script type="application/ld+json"></script>
                )
              : usefulMenu[2]?.seo_scripts || (
                  <script type="application/ld+json"></script>
                )}
          </>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} width={"100%"} />
          </Box>
        }
      >
        <section className={styles.eventsFirst}>
          <div className="container">
            <PageTitle
              title={
                isLoading ? (
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={100}
                    sx={{ borderRadius: "0.8rem" }}
                  />
                ) : (
                  translations &&
                  (workshop
                    ? getTranslation("workshop_page_title")
                    : getTranslation("seminar_page_title"))
                )
              }
            />
            <UsefulPageCard
              desc={
                isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={200} />
                ) : (
                  translations &&
                  (workshop
                    ? getTranslation("workshops_top_text")
                    : getTranslation("seminar_top_text"))
                )
              }
              icon={
                workshop && siteInfo
                  ? `${imgUrl}/${siteInfo && siteInfo[0]?.workshop_icon.url}`
                  : `${imgUrl}/${siteInfo && siteInfo[0]?.vebinar_icon.url}`
              }
            />
          </div>
        </section>

        <section className={styles.eventsActive}>
          <div className="container">
            <div className={styles.eventsTitle}>
              <h2>
                {isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={40} />
                ) : (
                  translations &&
                  (workshop
                    ? getTranslation("active_workshops")
                    : getTranslation("active_seminars"))
                )}
              </h2>
            </div>
            <Swiper
              className="adsSlider"
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              modules={[Pagination, Autoplay]}
            >
              {status === "pending" && (
                <Skeleton
                  variant="rectangular"
                  height={595}
                  sx={{
                    width: "100% !important",
                    height: "100%",
                    borderRadius: "2.4rem",
                  }}
                />
              )}
              {status === "error" && <div>{error}</div>}
              {status === "success" &&
                seminarOrWorkshop?.map(
                  (sow, index) =>
                    sow.event_datetime?.slice(0, 16) > today && (
                      <SwiperSlide key={sow.id || index}>
                        <Advertisement
                          onclick={handleScrollToContact}
                          speakers={sow.spikers}
                          time={sow.event_datetime?.slice(0, 16)}
                          adsImg={sow.image}
                          location={sow.place}
                          title={sow.title}
                          locationTitle={
                            isLoading ? (
                              <Skeleton
                                variant="text"
                                width={"100%"}
                                height={40}
                              />
                            ) : (
                              translations && getTranslation("location")
                            )
                          }
                          dateTitle={
                            isLoading ? (
                              <Skeleton
                                variant="text"
                                width={"100%"}
                                height={40}
                              />
                            ) : (
                              translations && getTranslation("event_date")
                            )
                          }
                          btnTitle={
                            isLoading ? (
                              <Skeleton
                                variant="text"
                                width={"100%"}
                                height={40}
                              />
                            ) : (
                              translations && getTranslation("join_us")
                            )
                          }
                          speakersTitle={
                            isLoading ? (
                              <Skeleton
                                variant="text"
                                width={"100%"}
                                height={40}
                              />
                            ) : (
                              translations && getTranslation("speakers")
                            )
                          }
                        />
                      </SwiperSlide>
                    )
                )}
            </Swiper>
          </div>
        </section>
        <section className={styles.lastEvents}>
          <div className="container">
            <div className={styles.eventsTitle}>
              <h2>
                {isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={40} />
                ) : (
                  translations && getTranslation("last_events")
                )}
              </h2>
              <div className={styles.lastEventsGrid}>
                {seminarOrWorkshop &&
                  seminarOrWorkshop.map(
                    (event) =>
                      event.event_datetime?.slice(0, 16) < today && (
                        <EventCard
                          key={event.id}
                          eventImg={event.image}
                          title={event.spikers[0]}
                          date={event.event_datetime?.slice(0, 16)}
                          place={event.place}
                        />
                      )
                  )}
              </div>
            </div>
          </div>
        </section>
        <Contact
          join
          contactRef={contactRef}
          apiEndpoint={
            workshop
              ? "https://admin.innab.coder.az/api/workshop/post"
              : "https://admin.innab.coder.az/api/vebinar/post"
          }
          categories={seminarOrWorkshop && seminarOrWorkshop}
        />
      </Suspense>
    </>
  );
};

export default SeminarWebinar;
