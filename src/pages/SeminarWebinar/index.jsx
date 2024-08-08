import React from "react";
import styles from "./events.module.css";
import PageTitle from "../../components/pageTitle";
import UsefulPageCard from "../../components/usefulPageCard";
import Advertisement from "../../components/advertisement";
import advertImg from "../../assets/images/advertisement/advertisement.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import EventCard from "../../components/eventCard";
import eventCardImg from "../../assets/images/advertisement/event-card.png";
import Contact from "../../components/Contact";

const SeminarWebinar = () => {
  return (
    <>
      <section className={styles.eventsFirst}>
        <div className="container">
          <PageTitle title={"Seminar & Vebinar"} />
          <UsefulPageCard
            desc={
              "Proqramlaşdırma sahəsində tədbirlərdən xəbərdar olun. Biz, səktorun ən maraqlı və aktual tədbirlərini təşkil edirik. Mövzularımız arasında yeni texnologiyalar, proqramlaşdırmada trendlər əsas yer alır. Bu tədbirlərdə sizin proqramlaşdırma biliklərinizi genişləndirə bilər və digər ekspertlərlə görüşmə imkanı əldə edəcəksiniz."
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="111"
                height="163"
                viewBox="0 0 111 163"
                fill="none"
              >
                <g clipPath="url(#clip0_3378_6356)">
                  <path
                    d="M6.43217 58.6437C6.43217 54.3525 6.47508 50.3103 6.43217 46.2465C6.3666 44.8781 6.64438 43.515 7.24022 42.2814C7.83606 41.0477 8.73103 39.9827 9.84364 39.1833C11.839 37.6557 13.8129 36.0937 15.7225 34.4631C16.2345 33.9725 16.5785 33.3327 16.7052 32.635C17.0699 29.7642 19.2799 27.7131 22.0262 27.8032C23.3486 27.8852 24.5923 28.4592 25.5127 29.4122C26.4332 30.3652 26.9636 31.6282 26.9996 32.9526C27.0028 33.6687 26.8545 34.3774 26.5644 35.0322C26.2744 35.687 25.8493 36.2731 25.3168 36.752C24.7844 37.231 24.1567 37.592 23.475 37.8113C22.7933 38.0306 22.0729 38.1034 21.3611 38.0247C20.8707 37.9595 20.372 38.0046 19.9013 38.1568C19.4306 38.309 18.9998 38.5644 18.6405 38.9044C16.7524 40.4835 14.7785 41.9425 12.9161 43.5646C12.3196 44.0838 11.6802 44.9377 11.6588 45.6587C11.5429 49.9284 11.5987 54.2023 11.5987 58.5621H24.3735C24.7811 48.066 29.1152 39.6811 37.676 33.3517C34.4619 27.6058 33.7453 21.5767 36.084 15.3288C37.6122 11.172 40.4807 7.64216 44.2372 5.29613C47.9895 2.90523 52.4159 1.7956 56.8524 2.13371C61.2888 2.47182 65.496 4.23943 68.8426 7.17135C74.9017 12.4924 78.768 22.6195 72.9192 33.3474C81.3341 39.5609 85.7669 47.9373 86.166 58.6651H87.9125C93.9201 58.6651 99.9148 58.6651 105.897 58.6651C108.394 58.6651 109.235 59.5234 109.239 62.0637C109.239 65.1705 109.27 68.2773 109.239 71.3841C109.188 75.8941 105.918 79.1639 101.417 79.2283C99.6059 79.2498 97.7993 79.2283 95.9112 79.2283C91.118 101.499 86.372 123.667 81.5745 146.059C84.0547 146.059 86.432 146.011 88.805 146.059C90.8181 146.121 92.7265 146.97 94.1215 148.423C95.5164 149.875 96.2869 151.817 96.2678 153.831C96.2488 155.844 95.4416 157.771 94.0194 159.197C92.5972 160.623 90.673 161.435 88.6592 161.46C83.042 161.498 77.4206 161.46 71.7992 161.46C55.2611 161.46 38.7216 161.46 22.1807 161.46C17.9453 161.46 14.6368 158.597 14.182 154.628C14.0624 153.56 14.167 152.479 14.489 151.454C14.8111 150.428 15.3435 149.482 16.0523 148.674C16.7611 147.866 17.6307 147.215 18.6054 146.763C19.5801 146.31 20.6385 146.066 21.713 146.046C24.0602 145.99 26.4118 146.046 28.9435 146.046C24.1589 123.732 19.4086 101.521 14.6283 79.1983C12.7959 79.1983 11.0409 79.1983 9.28578 79.1983C4.58698 79.1554 1.33 75.8984 1.29567 71.1953C1.27421 68.2473 1.29567 65.3035 1.29567 62.3598C1.29567 59.4161 2.01229 58.6566 4.96031 58.6351C5.37655 58.6394 5.80137 58.6437 6.43217 58.6437ZM76.3178 145.981L90.603 79.2755H19.915L34.2002 145.981H76.3178ZM104.077 63.8918H6.43217V70.2341C6.43217 73.3838 7.12305 74.0661 10.2942 74.0703H100.198C100.627 74.0703 101.056 74.0703 101.485 74.0703C103.017 73.9631 104.017 73.0534 104.06 71.5386C104.124 69.0326 104.06 66.5222 104.06 63.9046L104.077 63.8918ZM80.9909 58.5836C80.6261 49.5121 76.8928 42.4746 69.5507 37.2609C65.4226 40.9942 60.7624 42.9853 55.2311 43.0067C49.6998 43.0282 44.9324 41.0628 40.8086 37.3596C33.5608 42.6591 29.8404 49.6366 29.5443 58.5836H80.9909ZM55.0165 38.0762C63.9679 37.9303 70.7779 31.0902 70.6535 22.3706C70.5723 18.2808 68.8723 14.3902 65.9264 11.5521C62.9805 8.71401 59.0293 7.16018 54.9393 7.23144C46.4214 7.36446 39.6714 14.4706 39.8345 23.1344C39.9975 31.3691 46.9578 38.2092 55.0165 38.0762ZM55.2397 156.336H87.8524C89.998 156.336 91.2167 155.409 91.2167 153.761C91.2167 152.113 90.0237 151.187 87.8524 151.187H23.1376C22.6026 151.152 22.0655 151.165 21.5327 151.225C20.151 151.474 19.3142 152.332 19.3142 153.753C19.3142 155.173 20.1724 156.027 21.5327 156.28C22.0652 156.344 22.6025 156.358 23.1376 156.323L55.2397 156.336Z"
                    fill="#3138E3"
                    stroke="#3138E3"
                    strokeWidth="3.4375"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M83.8703 86.5043C83.115 90.0831 82.4714 93.1684 81.8105 96.2495C78.8439 110.096 75.8744 123.942 72.9021 137.788C72.8249 138.153 72.739 138.517 72.6318 138.878C72.4643 139.559 72.0385 140.149 71.4443 140.522C70.8502 140.895 70.1342 141.022 69.4477 140.877C68.0703 140.573 67.2464 139.212 67.5725 137.638C68.3878 133.711 69.2375 129.798 70.0785 125.876C72.8563 112.922 75.6327 99.9642 78.4077 87.002C78.8625 84.8822 80.4417 83.7107 82.0079 84.5389C82.8404 84.9723 83.3768 85.9636 83.8703 86.5043Z"
                    fill="#3138E3"
                    stroke="#3138E3"
                    strokeWidth="2.16661"
                    strokeMiterlimit="10"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3378_6356">
                    <rect
                      width="110.527"
                      height="161.982"
                      fill="white"
                      transform="translate(-0.000244141 0.791016)"
                    />
                  </clipPath>
                </defs>
              </svg>
            }
          />
        </div>
      </section>
      <section className={styles.eventsActive}>
        <div className="container">
          <div className={styles.eventsTitle}>
            <h2>Aktiv seminarlar və vebinarlar</h2>
          </div>
          <Swiper
            className="adsSlider"
            spaceBetween={20}
            pagination={true}
            autoplay={{ delay: 3000 }}
            modules={[Pagination, Autoplay]}
          >
            <SwiperSlide>
              <Advertisement
                speakers={["Fuad Aslan", "Knyaz Yaqubov"]}
                time={"2024-09-24 18:00"}
                adsImg={advertImg}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Advertisement
                speakers={["Fuad Aslan", "Knyaz Yaqubov"]}
                time={"2024-09-24 18:00"}
                adsImg={advertImg}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className={styles.lastEvents}>
        <div className="container">
          <div className={styles.eventsTitle}>
            <h2>Keçirdiyimiz tədbirlər</h2>
            <div className={styles.lastEventsGrid}>
              <EventCard
                eventImg={eventCardImg}
                title={"Ramin Nəsirov"}
                date={"2024-01-16 16:00"}
                place={"İNNAB business school"}
              />
              <EventCard
                eventImg={eventCardImg}
                title={"Ramin Nəsirov"}
                date={"2024-01-16 16:00"}
                place={"İNNAB business school"}
              />
              <EventCard
                eventImg={eventCardImg}
                title={"Ramin Nəsirov"}
                date={"2024-01-16 16:00"}
                place={"İNNAB business school"}
              />
            </div>
          </div>
        </div>
      </section>
      <Contact
        join
        title={"Növbəti tədbirdə xəbər edək?"}
        subTitle={[
          "Formu doldur, növbəti tədbirlərə səni də ",
          <span>dəvət edək</span>,
        ]}
      />
    </>
  );
};

export default SeminarWebinar;
