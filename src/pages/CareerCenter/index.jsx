import React, { Suspense } from "react";
import styles from "./career-center.module.css";
import PageTitle from "../../components/pageTitle";
import career from "../../assets/images/career-center/career.png";
import Contact from "../../components/Contact";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";

const CareerCenter = ({ page }) => {
  return (
    <>
      <Helmet></Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
        <section className={styles.career}>
          <div className="container">
            <PageTitle title={"Karyera mərkəzi"} />
            <div
              className={`${styles.careerWrapper} ${
                page ? styles.cw1 : ""
              } flex alignItemsCenter`}
            >
              <div className={styles.careerImg}>
                <img src={career} alt="" />
              </div>
              <div
                className={`${styles.careerDetails} flex flexDirectionColumn`}
              >
                <div>
                  <img src={career} alt="" />
                </div>
                <h2>İşlə təminat və ya məzun layihəsi</h2>
                <p>
                  INNAB Business School gənclərin peşəkar inkişafında dəyər
                  yaratmaqla kifayətlənməmiş və məzunlarımızın uğurlu
                  karyerasına öz töhfəsini verməkdə davam edir. INNAB Karyera
                  Mərkəzi “Məzun layihəsi” çərçivəsində INNAB Business School-un
                  təlimlərində iştirak edərək, fərqlənmə sertifikatı ilə bitirən
                  məzunlarımızın işlə təmin olunmasında öz köməyini əsirgəmir.
                  “İnnab Karyera Mərkəzi”nin əməkdaşlıq etdiyi dövlət və özəl
                  qurumlarda olan vakansiyalara yuxarıda qeyd edilən
                  kriteriyalara uyğun məzunların cvləri yönləndirilir. Məhz
                  bunun sayəsindədir ki, bu günədək 200-dən çox tələbəmizin işlə
                  təmin edilməsində bizimdə payımız olmuşdur.
                </p>
              </div>
            </div>

            <div className={styles.careerRequirements}>
              <h3>Təlimdə iştirak üçün tələblər</h3>
              <ul className="flex flexDirectionColumn">
                <li className="flex alignItemsCenter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M24.9393 15.4394C25.5251 14.8536 26.4749 14.8536 27.0606 15.4394C27.6464 16.0252 27.6464 16.9749 27.0606 17.5607L19.394 25.2274C18.8082 25.8132 17.8584 25.8132 17.2727 25.2274L12.9393 20.894C12.3535 20.3082 12.3535 19.3585 12.9393 18.7727C13.5251 18.1869 14.4749 18.1869 15.0606 18.7727L18.3333 22.0454L24.9393 15.4394Z"
                      fill="#3138E3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 3.5C29.1119 3.5 36.5 10.8881 36.5 20C36.5 29.1119 29.1119 36.5 20 36.5C10.8881 36.5 3.5 29.1119 3.5 20C3.5 10.8881 10.8881 3.5 20 3.5ZM20 6.5C12.5433 6.5 6.5 12.5433 6.5 20C6.5 27.4567 12.5433 33.5 20 33.5C27.4567 33.5 33.5 27.4567 33.5 20C33.5 12.5433 27.4567 6.5 20 6.5Z"
                      fill="#3138E3"
                    />
                  </svg>
                  <span>Əyani təhsil alan tələbə statusunuz olmamalı;</span>
                </li>
                <li className="flex alignItemsCenter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M24.9393 15.4394C25.5251 14.8536 26.4749 14.8536 27.0606 15.4394C27.6464 16.0252 27.6464 16.9749 27.0606 17.5607L19.394 25.2274C18.8082 25.8132 17.8584 25.8132 17.2727 25.2274L12.9393 20.894C12.3535 20.3082 12.3535 19.3585 12.9393 18.7727C13.5251 18.1869 14.4749 18.1869 15.0606 18.7727L18.3333 22.0454L24.9393 15.4394Z"
                      fill="#3138E3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 3.5C29.1119 3.5 36.5 10.8881 36.5 20C36.5 29.1119 29.1119 36.5 20 36.5C10.8881 36.5 3.5 29.1119 3.5 20C3.5 10.8881 10.8881 3.5 20 3.5ZM20 6.5C12.5433 6.5 6.5 12.5433 6.5 20C6.5 27.4567 12.5433 33.5 20 33.5C27.4567 33.5 33.5 27.4567 33.5 20C33.5 12.5433 27.4567 6.5 20 6.5Z"
                      fill="#3138E3"
                    />
                  </svg>
                  <span>Adınıza aktiv VÖEN olmamalı;</span>
                </li>
                <li className="flex alignItemsCenter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M24.9393 15.4394C25.5251 14.8536 26.4749 14.8536 27.0606 15.4394C27.6464 16.0252 27.6464 16.9749 27.0606 17.5607L19.394 25.2274C18.8082 25.8132 17.8584 25.8132 17.2727 25.2274L12.9393 20.894C12.3535 20.3082 12.3535 19.3585 12.9393 18.7727C13.5251 18.1869 14.4749 18.1869 15.0606 18.7727L18.3333 22.0454L24.9393 15.4394Z"
                      fill="#3138E3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 3.5C29.1119 3.5 36.5 10.8881 36.5 20C36.5 29.1119 29.1119 36.5 20 36.5C10.8881 36.5 3.5 29.1119 3.5 20C3.5 10.8881 10.8881 3.5 20 3.5ZM20 6.5C12.5433 6.5 6.5 12.5433 6.5 20C6.5 27.4567 12.5433 33.5 20 33.5C27.4567 33.5 33.5 27.4567 33.5 20C33.5 12.5433 27.4567 6.5 20 6.5Z"
                      fill="#3138E3"
                    />
                  </svg>
                  <span>
                    DMA-da işsiz kimi qeydiyyatda olmalı (qeydiyyatda
                    deyilsinizsə biz tərəfdən köməklik ediləcəkdir);
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Contact
          apply
          title={"Sualın var?"}
          subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
          apiEndpoint={
            "https://admin.innab.coder.az/api/carrier_and_schoolarship/post"
          }
        />
      </Suspense>
    </>
  );
};

export default CareerCenter;
