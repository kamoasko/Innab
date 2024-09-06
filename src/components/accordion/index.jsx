import React, { Suspense, useEffect } from "react";
import styles from "./accordion.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  AccordionActions,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVacancies } from "../../features/vacancies/vacanciesSlice";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";

const Button = React.lazy(() => import("../Button"));
const CustomExpandIcon = React.lazy(() => import("./customExpandIcon"));

export default function CustomizedAccordions() {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { vacancies, status, error } = useSelector((state) => state.vacancies);
  const { data: infos, isSuccess } = useSiteInfos(lang);

  useEffect(() => {
    dispatch(fetchVacancies(lang));
  }, [lang, dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "0.2rem",
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={150}
              sx={{ width: "100% !important" }}
            />
          ))}
        </Box>
      )}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" &&
        vacancies.map((vacancy, index) => (
          <Accordion
            sx={{
              width: "100%",
              padding: "5rem 3rem",
              boxShadow: "none",
              borderTop: "0.1rem solid var(--color-gray)",
              borderBottom: "0.1rem solid var(--color-gray)",
              borderRadius: "0 !important",
            }}
            key={vacancy.id}
          >
            <AccordionSummary
              expandIcon={<CustomExpandIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                color: "var(--color-main)",
              }}
            >
              <Typography
                sx={{
                  color: "var(--color-light-black)",
                  fontSize: "2rem",
                  lineHeight: "2.8rem",
                  fontWeight: "700",
                  fontFamily: "inherit",
                }}
                component={"div"}
              >
                <div
                  className={`${styles.accordionTitle} flex alignItemsCenter`}
                >
                  <strong>{index + 1}</strong> <h2>{vacancy.title}</h2>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                className={styles.accordion}
                sx={{
                  fontSize: "1.8rem",
                  fontFamily: "inherit",
                  color: "var(--color-dark-black)",
                }}
                component={"div"}
              >
                <div
                  className={`${styles.description} flex flexDirectionColumn`}
                  dangerouslySetInnerHTML={{
                    __html: vacancy.vacancy_header_text,
                  }}
                />
                <div
                  className={`${styles.accordionBottom} flex justifyContentBetween`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: vacancy.obligations,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: vacancy.skills,
                    }}
                  />
                </div>
              </Typography>
            </AccordionDetails>
            <AccordionActions sx={{ marginTop: "5.2rem" }}>
              <div
                className={`${styles.accordionEnd} flex alignItemsCenter justifyContentBetween`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: vacancy.vacancy_footer_text,
                  }}
                />
                <Button
                  title={[
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.473 2.00006C12.7727 1.99968 13.0594 1.99932 13.3389 2.06642C13.5838 2.12521 13.8179 2.22218 14.0327 2.35377C14.2777 2.50395 14.4802 2.70697 14.6918 2.91911L19.081 7.30828L19.081 7.30829C19.2931 7.51989 19.4961 7.72241 19.6463 7.96747C19.7779 8.1822 19.8749 8.4163 19.9337 8.66119C20.0008 8.94066 20.0004 9.22742 20 9.52704L20 15.5386C20 16.4861 20 17.2518 19.9493 17.8722C19.8971 18.5115 19.7866 19.0754 19.5204 19.5977C19.0986 20.4256 18.4255 21.0987 17.5976 21.5206C17.0752 21.7868 16.5114 21.8973 15.8721 21.9495C15.2517 22.0002 14.4859 22.0002 13.5384 22.0002H10.4616C9.51409 22.0002 8.74834 22.0002 8.12792 21.9495C7.48863 21.8973 6.92481 21.7868 6.40244 21.5206C5.57453 21.0987 4.90142 20.4256 4.47957 19.5977C4.21341 19.0754 4.10291 18.5115 4.05067 17.8722C3.99998 17.2518 3.99999 16.4861 4 15.5386V8.46176C3.99999 7.51426 3.99998 6.7485 4.05067 6.12808C4.10291 5.48879 4.21341 4.92497 4.47957 4.40261C4.90142 3.57469 5.57453 2.90158 6.40244 2.47974C6.92481 2.21358 7.48863 2.10307 8.12792 2.05084C8.74834 2.00015 9.51409 2.00015 10.4616 2.00016L12.473 2.00006ZM10.5 3.80013L12 3.80012V5.93554C12 6.46541 12 6.9166 12.0302 7.28703C12.062 7.67619 12.1317 8.05478 12.3161 8.41671C12.5941 8.96238 13.0378 9.40603 13.5834 9.68406C13.9454 9.86847 14.324 9.93811 14.7131 9.9699C15.0835 10.0002 15.5347 10.0002 16.0646 10.0001H16.0646H16.0646L18.2 10.0001V14.5001L18.2 15.5002C18.2 16.4951 18.1993 17.1872 18.1553 17.7257C18.1122 18.2536 18.0319 18.5542 17.9166 18.7805C17.6673 19.2698 17.2696 19.6675 16.7804 19.9168C16.5541 20.0321 16.2535 20.1123 15.7255 20.1555C15.187 20.1995 14.4949 20.2002 13.5 20.2002H10.5C9.50506 20.2002 8.81298 20.1995 8.2745 20.1555C7.74652 20.1123 7.44595 20.0321 7.21962 19.9168C6.7304 19.6675 6.33266 19.2698 6.08339 18.7805C5.96807 18.5542 5.88783 18.2536 5.8447 17.7257C5.8007 17.1872 5.8 16.4951 5.8 15.5002V8.50016C5.8 7.50522 5.8007 6.81314 5.8447 6.27466C5.88783 5.74668 5.96806 5.44611 6.08338 5.21979C6.33265 4.73057 6.7304 4.33282 7.21962 4.08355C7.44595 3.96823 7.74652 3.888 8.2745 3.84486C8.81298 3.80086 9.50506 3.80013 10.5 3.80013ZM13.8 4.57293L17.4272 8.20014H16.1C15.5251 8.20014 15.148 8.19944 14.8597 8.17588C14.5818 8.15318 14.4665 8.11382 14.4006 8.08025C14.1936 7.97479 14.0254 7.80651 13.9199 7.59953C13.8863 7.53364 13.847 7.41829 13.8243 7.14045C13.8007 6.85209 13.8 6.47504 13.8 5.90014V4.57293ZM7.99731 17.1044C7.99731 16.6074 8.40026 16.2044 8.89731 16.2044H12.0956C12.5927 16.2044 12.9956 16.6074 12.9956 17.1044C12.9956 17.6015 12.5927 18.0044 12.0956 18.0044H8.89731C8.40026 18.0044 7.99731 17.6015 7.99731 17.1044ZM8.89731 12.998C8.40026 12.998 7.99731 13.4009 7.99731 13.898C7.99731 14.395 8.40026 14.798 8.89731 14.798H14.0944C14.5915 14.798 14.9944 14.395 14.9944 13.898C14.9944 13.4009 14.5915 12.998 14.0944 12.998L8.89731 12.998Z"
                        fill="currentColor"
                      />
                    </svg>,
                    "CV göndər",
                  ]}
                  borderRadius={"3rem"}
                  to={isSuccess && `mailto:${infos.email2}`}
                />
              </div>
            </AccordionActions>
          </Accordion>
        ))}
    </Suspense>
  );
}
