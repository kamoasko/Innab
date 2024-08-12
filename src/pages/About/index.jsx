import React from "react";
import styles from "./about.module.css";
import PageTitle from "../../components/pageTitle";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import aboutImg from "../../assets/images/about/about.jpeg";
import aboutImg1 from "../../assets/images/about/about1.jpeg";
import logo from "../../assets/images/about-logo.png";
import ContactSection from "../../components/contactSection";
import Customers from "../../components/Customers";
import Contact from "../../components/Contact";
import CircleAnimation from "../../components/circleAnimation";

const About = () => {
  return (
    <>
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
              sahəsində təcrübəli mütəxəssislər hazırlayan tədris müəssisəsidir.
            </p>
          </div>
          <div className={styles.timelineContainer}>
            <VerticalTimeline
              className={styles.timelineWrapper}
              lineColor="#C1C1C1"
            >
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
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.1875 6.75C6.42969 6.75 5.0625 5.38281 5.0625 3.625C5.0625 1.90625 6.42969 0.5 8.1875 0.5C9.90625 0.5 11.3125 1.90625 11.3125 3.625C11.3125 5.38281 9.90625 6.75 8.1875 6.75ZM6.07812 16.4766L7.25 18C7.75781 18.7031 7.60156 19.6797 6.9375 20.1875C6.625 20.4219 6.3125 20.5 6 20.5C5.49219 20.5 5.02344 20.3047 4.75 19.875L2.875 17.375C2.44531 16.8281 2.44531 16.0469 2.875 15.4609L4.67188 13.2344L7.09375 15.2266L6.07812 16.4766ZM11.6641 13.2344L13.4609 15.4609C13.8906 16.0469 13.8906 16.8281 13.5 17.375L11.625 19.875C11.3125 20.3047 10.8438 20.5 10.375 20.5C10.0234 20.5 9.71094 20.4219 9.4375 20.1875C8.73438 19.6797 8.57812 18.7031 9.125 18L10.2578 16.4766L9.24219 15.2266L11.6641 13.2344ZM15.375 6.16406C15.8828 6.90625 15.7266 7.84375 15.0234 8.35156L13.4219 9.48438C12.7578 9.95312 12.0547 10.3047 11.3125 10.5781V11.75H5.0625V10.5781C4.32031 10.3047 3.57812 9.95312 2.91406 9.48438L1.35156 8.35156C0.648438 7.84375 0.453125 6.90625 0.960938 6.16406C1.46875 5.46094 2.40625 5.30469 3.14844 5.8125L4.71094 6.90625C6.78125 8.35156 9.55469 8.35156 11.625 6.90625L13.2266 5.8125C13.9297 5.30469 14.9062 5.46094 15.375 6.16406Z"
                      fill="currentColor"
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
                    <h3>2015</h3>
                    <div>
                      Azərbaycanda INNAB peşəkar inkişaf platforması olaraq
                      yaradılmışdır.
                    </div>
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
    </>
  );
};

export default About;
