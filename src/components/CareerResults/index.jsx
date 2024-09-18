import { useParams } from "react-router";
import { useTranslations } from "../../features/translations/translations";
import styles from "../../pages/CareerCalculator/calculator.module.css";
import { Skeleton } from "@mui/material";

const CareerResults = ({ results }) => {
  const { lang } = useParams();
  const keywords = [
    "avarage_salary",
    "payback_period",
    "months",
    "future_position",
    "work_offer_chances",
  ];
  const { data: translations, isLoading } = useTranslations(
    lang,
    "site",
    keywords
  );
  // if (!results) return null;

  return (
    <div>
      <div className={styles.resultSalary}>
        <h4>
          {isLoading && (
            <Skeleton variant="text" width={"100%"} height={"100%"} />
          )}
          {translations && translations["avarage_salary"]}
        </h4>
        <h3>
          {results ? results.futureSalary.replace(/\.0+$/, "") : ""}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="61"
            height="47"
            viewBox="0 0 61 47"
            fill="none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="61"
              height="47"
              viewBox="0 0 61 47"
              fill="none"
            >
              <g clipPath="url(#clip0_787_12129)">
                <path
                  d="M6.75374 47.0001H0.0574274C0.0352591 46.8651 0.0207473 46.7289 0.0139649 46.5923C0.0429388 43.2681 -0.0974738 39.9327 0.138775 36.6241C0.739426 28.1292 3.80509 20.6762 10.0568 14.7299C14.7205 10.2958 20.3414 7.83633 26.6945 7.01391C27.2149 6.94593 27.3631 6.79104 27.3553 6.26951C27.3219 4.394 27.3419 2.5185 27.3419 0.641881V0H33.4409C33.4521 0.222876 33.471 0.436835 33.471 0.65191C33.471 2.5653 33.4889 4.47758 33.4632 6.39097C33.4565 6.83673 33.6192 6.94037 34.0204 6.99943C45.9554 8.71892 54.0447 15.306 58.4833 26.4409C60.117 30.5396 60.7845 34.8445 60.8135 39.2474C60.8291 41.6433 60.8135 44.0392 60.8057 46.434C60.8057 46.6146 60.7867 46.7951 60.7756 47.0024H54.0213C54.0213 46.3103 54.0213 45.6484 54.0213 44.9853C54.0302 42.5337 54.1651 40.0765 54.0213 37.6304C53.5499 29.3372 50.2781 22.4247 43.6063 17.3019C40.7424 15.1032 37.4772 13.766 33.9112 13.1876C33.7886 13.1675 33.6616 13.172 33.4811 13.162V46.9834H27.3397V13.0427C26.0604 13.3625 24.8546 13.5843 23.7013 13.9654C17.4529 16.0315 12.9753 20.1647 9.92082 25.9094C7.46918 30.5162 6.57767 35.4674 6.7426 40.6537C6.81058 42.7477 6.75374 44.846 6.75374 47.0001Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_787_12129">
                  <rect width="60.8218" height="47.0035" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </svg>
        </h3>
      </div>
      <ol className={`${styles.resultDetails} flex flexDirectionColumn`}>
        <li>
          <span>
            {isLoading && (
              <Skeleton variant="text" width={"100%"} height={20} />
            )}
            {translations && translations["payback_period"]}
          </span>
          <h4>
            {results
              ? results.investmentPaybackPeriod.replace(/\.0+$/, "") + " ay"
              : ""}
          </h4>
        </li>
        <li>
          <span>
            {isLoading && (
              <Skeleton variant="text" width={"100%"} height={20} />
            )}
            {translations && translations["future_position"]}
          </span>
          <h4>{results ? results.futurePositions.join(", ") : ""}</h4>
        </li>
        <li>
          <span>
            {isLoading && (
              <Skeleton variant="text" width={"100%"} height={20} />
            )}
            {translations && translations["work_offer_chances"]}
          </span>
          <h4>{results ? results.foreignWorkPercentage + "%" : ""}</h4>
        </li>
      </ol>
    </div>
  );
};

export default CareerResults;
