import React, { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import styles from "./customers.module.css";
import CustomerCard from "../CustomerCard";
import customerImg from "../../assets/images/customers/kb-logo-main-1.png";
import customerImg1 from "../../assets/images/customers/adra-logo-1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Customers = ({ homepage, about, placeId }) => {
  // const [reviews, setReviews] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const apiKey = "AIzaSyCfV-yh-nvSbmfOLJ23TsxTBynxxC82mM0";
  //       const response = await fetch(
  //         `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setReviews(data.result.reviews || []);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchReviews();
  // }, [placeId]);
  // console.log(reviews);

  return (
    <section className={styles.customers}>
      <SectionTitle about={about} title={"Müştərilərimiz"} />
      <div className={styles.customersText}>
        <p>
          Bank, Sığorta, FMCG, Neft, İT, Təhsil və digər sektorlardan 200-dən
          çox şirkət əməkdaşlarının peşəkar inkişafında etibarlı tərəfdaş olaraq
          İnnabı seçmiş və bizim təlim proqramlarımız və xidmətlərimizdən
          faydalanmışdır.
        </p>
      </div>

      <div className={styles.customerSliderWrapper}>
        <Swiper
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 12,
              centeredSlides: true,
            },
            425: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            481: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
            1440: {
              slidesPerView: 6,
            },
            1800: {
              slidesPerView: 8,
            },
          }}
        >
          <SwiperSlide>
            <CustomerCard img={customerImg} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCard img={customerImg1} />
          </SwiperSlide>
        </Swiper>
      </div>
      {homepage && (
        <div className={styles.customersReview}>
          <div className={styles.googleMapReviews}></div>
          <div className={styles.googleMapRatings}></div>
        </div>
      )}
    </section>
  );
};

export default Customers;
