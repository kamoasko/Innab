import React from "react";
import styles from "../../pages/TrainingsPage/trainings.module.css";
import { useParams } from "react-router";
import { useGetRooms } from "../../features/rooms/roomSlice";
import { Skeleton } from "@mui/material";

const Rooms = ({ title }) => {
  const { lang } = useParams();
  const { data: rooms, status, error } = useGetRooms(lang);

  return (
    <section className={styles.rooms}>
      <div className="container">
        <div className={styles.roomsTitle}>
          <h2>{title}</h2>
        </div>
        <div className={styles.roomsGrid}>
          {status === "pending" &&
            [...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={300}
                className={styles.roomsCard}
              />
            ))}
          {status === "error" && <p>{error}</p>}
          {status === "success" &&
            rooms.map((room) => (
              <article key={room.id} className={styles.roomsCard}>
                <picture>
                  <img loading="lazy" src={room.image} alt="" />
                </picture>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
