import React, { useEffect } from "react";
import styles from "../../pages/TrainingsPage/trainings.module.css";
import room from "../../assets/images/trainings/room.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchRooms } from "../../features/rooms/roomSlice";
import { Box, CircularProgress } from "@mui/material";

const Rooms = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { rooms, status, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms(lang));
  }, [lang, dispatch]);

  return (
    <section className={styles.rooms}>
      <div className="container">
        <div className={styles.roomsTitle}>
          <h2>Dərs alacağın otaqlar</h2>
        </div>
        <div className={styles.roomsGrid}>
          {status === "loading" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {status === "failed" && <p>{error}</p>}
          {status === "succeeded" &&
            rooms.map((room) => (
              <article key={room.id} className={styles.roomsCard}>
                <picture>
                  <img src={room.image} alt="" />
                </picture>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
