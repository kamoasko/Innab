import { useEffect, useState } from "react";
import styles from "../Customers/customers.module.css";

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiKey = "AIzaSyCfV-yh-nvSbmfOLJ23TsxTBynxxC82mM0";
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJRbvf7pt9MEARgjHAlEh5G5A&key=${apiKey}`,
          {
            mode: "no-cors",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response?.json();
        setReviews(data?.result || {});
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className={styles.customersReview}>
      <div className={styles.googleMapReviews}></div>
      <div className={styles.googleMapRatings}></div>
    </div>
  );
};

export default GoogleReviews;
