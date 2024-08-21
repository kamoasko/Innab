import React, { Suspense, useEffect } from "react";
import styles from "./about.module.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import aboutImg from "../../assets/images/about/about.jpeg";
import aboutImg1 from "../../assets/images/about/about1.jpeg";
import logo from "../../assets/images/about-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchAboutCards } from "../../features/about/aboutSlice";
import { CircularProgress } from "@mui/material";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const Contact = React.lazy(() => import("../../components/Contact"));
const Customers = React.lazy(() => import("../../components/Customers"));
const ContactSection = React.lazy(() =>
  import("../../components/contactSection")
);
const CircleAnimation = React.lazy(() =>
  import("../../components/circleAnimation")
);

const About = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { about, status, error } = useSelector((state) => state.about);

  console.log(error);

  useEffect(() => {
    dispatch(fetchAboutCards(lang));
  }, [lang, dispatch]);

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <div className="pageTop">
          <div className="container">
            <PageTitle title={"Haqqımızda"} />
          </div>
        </div>

        <section className={styles.timeline}>
          <div className="container">
            <div className={styles.timelineText}>
              <p>
                2015-ci ildə fəaliyyətə başlayan INNAB yüksək texnologiyalar
                sahəsində təcrübəli mütəxəssislər hazırlayan tədris
                müəssisəsidir.
              </p>
            </div>
            <div className={styles.timelineContainer}>
              <VerticalTimeline
                className={styles.timelineWrapper}
                lineColor="#C1C1C1"
              >
                {status === "loading" && <CircularProgress />}
                {status === "failed" && <p>{error}</p>}
                {status === "succeeded" &&
                  about.map((a, index) => (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{
                        borderRadius: "0.8rem",
                        overflow: "hidden",
                        border: "0.2rem solid var(--color-light-grey)",
                        padding: 0,
                        boxShadow: "none",
                      }}
                      // contentArrowStyle={{
                      //   borderRight: "7px solid  rgb(33, 150, 243)",
                      // }}
                      iconStyle={{
                        backgroundColor: "var(--color-black-71)",
                        boxShadow: "none",
                        color: "var(--color-white)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      icon={[<img src={a.icon} />]}
                      key={index}
                    >
                      <article className={styles.timelineCard}>
                        <div className={styles.timelineCardImg}>
                          <img src={a.image} alt={a.description} />
                          <div className={`${styles.timelineHover} flexCenter`}>
                            <img src={logo} alt="" />
                          </div>
                        </div>
                        <div className={styles.aboutCardDet}>
                          <h3>{a.date}</h3>
                          <div>{a.description}</div>
                        </div>
                      </article>
                    </VerticalTimelineElement>
                  ))}

                {/* <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  borderRadius: "0.8rem",
                  overflow: "hidden",
                  border: "0.2rem solid var(--color-light-grey)",
                  padding: 0,
                  boxShadow: "none",
                }}
                // contentArrowStyle={{
                //   borderRight: "7px solid  rgb(33, 150, 243)",
                // }}
                iconStyle={{
                  backgroundColor: "var(--color-black-71)",
                  boxShadow: "none",
                  color: "var(--color-white)",
                }}
                icon={
                  <svg
                    width="26"
                    height="16"
                    viewBox="0 0 26 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9719 4.51562C25.8703 4.78906 25.8703 6 24.9719 6.27344L14.0734 9.63281C13.2922 9.86719 12.5891 9.75 12.2375 9.63281L4.62031 7.28906C4.1125 7.60156 3.83906 8.14844 3.8 8.73438C4.15156 8.92969 4.425 9.32031 4.425 9.75C4.425 10.1797 4.19063 10.5312 3.87813 10.7656L4.85469 15.2578C4.93281 15.6484 4.65938 16 4.26875 16H2.04219C1.65156 16 1.37813 15.6484 1.45625 15.2578L2.43281 10.7656C2.12031 10.5312 1.925 10.1797 1.925 9.75C1.925 9.32031 2.15938 8.92969 2.55 8.69531C2.58906 8.03125 2.82344 7.36719 3.25313 6.85938L1.33906 6.27344C0.440625 6 0.440625 4.78906 1.33906 4.51562L12.2375 1.15625C12.8234 0.960938 13.4875 0.960938 14.0734 1.15625L24.9719 4.51562ZM14.425 10.8438L20.0891 9.08594L20.675 13.5C20.675 14.9062 17.3156 16 13.175 16C8.99531 16 5.675 14.9062 5.675 13.5L6.22188 9.08594L11.8859 10.8438C12.3547 11 13.3313 11.1562 14.425 10.8438Z"
                      fill="white"
                    />
                  </svg>
                }
              >
                <article className={styles.timelineCard}>
                  <div className={styles.timelineCardImg}>
                    <img src={aboutImg} alt="" />
                    <div className={`${styles.timelineHover} flexCenter`}>
                      <img src={logo} alt="" />
                    </div>
                  </div>
                  <div className={styles.aboutCardDet}>
                    <h3>2016</h3>
                    <div>İnnab ilk məzunları verdi</div>
                  </div>
                </article>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  borderRadius: "0.8rem",
                  overflow: "hidden",
                  border: "0.2rem solid var(--color-light-grey)",
                  padding: 0,
                  boxShadow: "none",
                }}
                // contentArrowStyle={{
                //   borderRight: "7px solid  rgb(33, 150, 243)",
                // }}
                iconStyle={{
                  backgroundColor: "var(--color-black-71)",
                  boxShadow: "none",
                  color: "var(--color-white)",
                }}
                icon={
                  <svg
                    width="26"
                    height="16"
                    viewBox="0 0 26 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9719 4.51562C25.8703 4.78906 25.8703 6 24.9719 6.27344L14.0734 9.63281C13.2922 9.86719 12.5891 9.75 12.2375 9.63281L4.62031 7.28906C4.1125 7.60156 3.83906 8.14844 3.8 8.73438C4.15156 8.92969 4.425 9.32031 4.425 9.75C4.425 10.1797 4.19063 10.5312 3.87813 10.7656L4.85469 15.2578C4.93281 15.6484 4.65938 16 4.26875 16H2.04219C1.65156 16 1.37813 15.6484 1.45625 15.2578L2.43281 10.7656C2.12031 10.5312 1.925 10.1797 1.925 9.75C1.925 9.32031 2.15938 8.92969 2.55 8.69531C2.58906 8.03125 2.82344 7.36719 3.25313 6.85938L1.33906 6.27344C0.440625 6 0.440625 4.78906 1.33906 4.51562L12.2375 1.15625C12.8234 0.960938 13.4875 0.960938 14.0734 1.15625L24.9719 4.51562ZM14.425 10.8438L20.0891 9.08594L20.675 13.5C20.675 14.9062 17.3156 16 13.175 16C8.99531 16 5.675 14.9062 5.675 13.5L6.22188 9.08594L11.8859 10.8438C12.3547 11 13.3313 11.1562 14.425 10.8438Z"
                      fill="white"
                    />
                  </svg>
                }
              >
                <article className={styles.timelineCard}>
                  <div className={styles.timelineCardImg}>
                    <img src={aboutImg} alt="" />
                    <div className={`${styles.timelineHover} flexCenter`}>
                      <img src={logo} alt="" />
                    </div>
                  </div>
                  <div className={styles.aboutCardDet}>
                    <h3>2016</h3>
                    <div>İnnab ilk məzunları verdi</div>
                  </div>
                </article>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  borderRadius: "0.8rem",
                  overflow: "hidden",
                  border: "0.2rem solid var(--color-light-grey)",
                  padding: 0,
                  boxShadow: "none",
                }}
                // contentArrowStyle={{
                //   borderRight: "7px solid  rgb(33, 150, 243)",
                // }}
                iconStyle={{
                  backgroundColor: "var(--color-black-71)",
                  boxShadow: "none",
                  color: "var(--color-white)",
                }}
                icon={
                  <svg
                    width="26"
                    height="16"
                    viewBox="0 0 26 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9719 4.51562C25.8703 4.78906 25.8703 6 24.9719 6.27344L14.0734 9.63281C13.2922 9.86719 12.5891 9.75 12.2375 9.63281L4.62031 7.28906C4.1125 7.60156 3.83906 8.14844 3.8 8.73438C4.15156 8.92969 4.425 9.32031 4.425 9.75C4.425 10.1797 4.19063 10.5312 3.87813 10.7656L4.85469 15.2578C4.93281 15.6484 4.65938 16 4.26875 16H2.04219C1.65156 16 1.37813 15.6484 1.45625 15.2578L2.43281 10.7656C2.12031 10.5312 1.925 10.1797 1.925 9.75C1.925 9.32031 2.15938 8.92969 2.55 8.69531C2.58906 8.03125 2.82344 7.36719 3.25313 6.85938L1.33906 6.27344C0.440625 6 0.440625 4.78906 1.33906 4.51562L12.2375 1.15625C12.8234 0.960938 13.4875 0.960938 14.0734 1.15625L24.9719 4.51562ZM14.425 10.8438L20.0891 9.08594L20.675 13.5C20.675 14.9062 17.3156 16 13.175 16C8.99531 16 5.675 14.9062 5.675 13.5L6.22188 9.08594L11.8859 10.8438C12.3547 11 13.3313 11.1562 14.425 10.8438Z"
                      fill="white"
                    />
                  </svg>
                }
              >
                <article className={styles.timelineCard}>
                  <div className={styles.timelineCardImg}>
                    <img src={aboutImg} alt="" />
                    <div className={`${styles.timelineHover} flexCenter`}>
                      <img src={logo} alt="" />
                    </div>
                  </div>
                  <div className={styles.aboutCardDet}>
                    <h3>2016</h3>
                    <div>İnnab ilk məzunları verdi</div>
                  </div>
                </article>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  borderRadius: "0.8rem",
                  overflow: "hidden",
                  border: "0.2rem solid var(--color-light-grey)",
                  padding: 0,
                  boxShadow: "none",
                }}
                // contentArrowStyle={{
                //   borderRight: "7px solid  rgb(33, 150, 243)",
                // }}
                iconStyle={{
                  backgroundColor: "var(--color-black-71)",
                  boxShadow: "none",
                  color: "var(--color-white)",
                }}
                icon={
                  <svg
                    width="26"
                    height="16"
                    viewBox="0 0 26 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9719 4.51562C25.8703 4.78906 25.8703 6 24.9719 6.27344L14.0734 9.63281C13.2922 9.86719 12.5891 9.75 12.2375 9.63281L4.62031 7.28906C4.1125 7.60156 3.83906 8.14844 3.8 8.73438C4.15156 8.92969 4.425 9.32031 4.425 9.75C4.425 10.1797 4.19063 10.5312 3.87813 10.7656L4.85469 15.2578C4.93281 15.6484 4.65938 16 4.26875 16H2.04219C1.65156 16 1.37813 15.6484 1.45625 15.2578L2.43281 10.7656C2.12031 10.5312 1.925 10.1797 1.925 9.75C1.925 9.32031 2.15938 8.92969 2.55 8.69531C2.58906 8.03125 2.82344 7.36719 3.25313 6.85938L1.33906 6.27344C0.440625 6 0.440625 4.78906 1.33906 4.51562L12.2375 1.15625C12.8234 0.960938 13.4875 0.960938 14.0734 1.15625L24.9719 4.51562ZM14.425 10.8438L20.0891 9.08594L20.675 13.5C20.675 14.9062 17.3156 16 13.175 16C8.99531 16 5.675 14.9062 5.675 13.5L6.22188 9.08594L11.8859 10.8438C12.3547 11 13.3313 11.1562 14.425 10.8438Z"
                      fill="white"
                    />
                  </svg>
                }
              >
                <article className={styles.timelineCard}>
                  <div className={styles.timelineCardImg}>
                    <img src={aboutImg} alt="" />
                    <div className={`${styles.timelineHover} flexCenter`}>
                      <img src={logo} alt="" />
                    </div>
                  </div>
                  <div className={styles.aboutCardDet}>
                    <h3>2016</h3>
                    <div>İnnab ilk məzunları verdi</div>
                  </div>
                </article>
              </VerticalTimelineElement> */}
              </VerticalTimeline>
            </div>
          </div>
        </section>

        <section className={styles.innab}>
          <div className={styles.innabTitle}>
            <h2>
              Niyə <strong>INNAB?</strong>
            </h2>
            <div>
              Biz danışmırıq, iş görürük. Gördüyümüz iş isə ölkəyə səs salır.
            </div>
          </div>
          <div className="container">
            <div className={styles.innabInteractivity}>
              <CircleAnimation />
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <div className="container">
            <h2>Əlaqə</h2>
            <ContactSection h2 />
          </div>
        </section>

        <Customers about />

        <Contact
          title={"Sualın var?"}
          subTitle={[
            "Hardan başlamaqda tərəddüd edirsənsə ",
            <strong>bizə zəng elə</strong>,
          ]}
        />
      </Suspense>
    </>
  );
};

export default About;
