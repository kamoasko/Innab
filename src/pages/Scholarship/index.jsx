import React, { Suspense, useRef } from "react";
import styles from "./internships.module.css";
import { useParams } from "react-router";
import { useScholarshipProgram } from "../../features/scholarshipProgram/useScholarshipProgram";
import { Box, Skeleton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useMenus } from "../../features/menus/useMenu";
import { useTranslations } from "../../features/translations/translations";

const PageTitle = React.lazy(() => import("../../components/pageTitle"));
const UsefulPageCard = React.lazy(() =>
  import("../../components/usefulPageCard")
);
const PartnersCard = React.lazy(() => import("../../components/PartnersCard"));
const Contact = React.lazy(() => import("../../components/Contact"));

const Scholarships = () => {
  const { lang } = useParams();
  const { data: programs, status, error } = useScholarshipProgram(lang);
  const contactRef = useRef(null);
  const { data: menus, status: menuStatus, error: menuError } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const handleScrollToContact = () => {
    contactRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        {menuStatus === "pending" && (
          <>
            <title>{"Təqaüd proqramları"}</title>
            <meta name="description" content={"Təqaüd proqramları"} />
            <meta name="keywords" content={"Təqaüd proqramları"} />
            <link
              rel="canonical"
              href={`/${lang}/useful-for-you/scholarships-programs`}
            />
            <script type="application/ld+json"></script>
          </>
        )}
        {menuStatus === "error" && <noscript>{menuError}</noscript>}
        {menuStatus === "success" && (
          <>
            <title>{usefulMenu[3]?.seo_title}</title>
            <meta name="description" content={usefulMenu[3]?.seo_description} />
            <meta name="keywords" content={usefulMenu[3]?.seo_keywords} />
            {usefulMenu[3]?.seo_links || (
              <link
                rel="canonical"
                href={`/${lang}/useful-for-you/scholarships-programs`}
              />
            )}
            {usefulMenu[3]?.seo_scripts || (
              <script type="application/ld+json"></script>
            )}
          </>
        )}
      </Helmet>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="rectangular" height={48} />
          </Box>
        }
      >
        <section className={styles.internships}>
          <div className="container">
            <PageTitle
              title={
                isLoading ? (
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={100}
                    sx={{ borderRadius: "0.8rem" }}
                  />
                ) : (
                  translations && getTranslation("scholarship_page_title")
                )
              }
            />
            <UsefulPageCard
              desc={
                isLoading ? (
                  <Skeleton variant="text" width={"100%"} height={200} />
                ) : (
                  translations && getTranslation("scholarships_top_text")
                )
              }
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="138"
                  height="138"
                  viewBox="0 0 138 138"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3349_21334)">
                    <path
                      d="M96.7975 134.46C94.3271 133.909 91.7887 133.558 89.3966 132.758C82.7408 130.584 76.9657 126.317 72.9317 120.593C68.8977 114.87 66.8206 107.997 67.01 100.997C67.01 100.575 67.01 100.157 67.01 99.9764C61.8038 99.381 56.618 99.1122 51.5786 98.1118C46.5391 97.1113 41.6494 95.3896 36.6066 93.9366C36.5611 95.0153 36.577 96.0957 36.6542 97.1726C36.6916 97.5129 37.2803 97.8532 37.675 98.0369C39.3545 98.7362 40.7748 99.9405 41.7393 101.483C42.7039 103.025 43.1647 104.83 43.0581 106.646C42.9719 108.191 42.4738 109.685 41.6156 110.973C40.7574 112.261 39.5703 113.297 38.1773 113.971C36.7844 114.646 35.2363 114.936 33.6936 114.811C32.1508 114.686 30.6696 114.15 29.4036 113.26C28.1375 112.37 27.1326 111.157 26.493 109.747C25.8535 108.338 25.6026 106.783 25.7664 105.244C25.9302 103.705 26.5027 102.238 27.4245 100.994C28.3463 99.751 29.584 98.7769 31.0091 98.173C32.0639 97.7511 32.2851 97.1862 32.2409 96.1892C32.1762 94.5763 32.6628 92.7695 32.0809 91.3982C31.5365 90.1119 29.8998 89.2953 28.7633 88.2506C25.2755 85.0453 23.3972 81.1968 23.4788 76.3172C23.6183 68.1099 23.4992 59.8991 23.5435 51.6917C23.5435 50.6913 23.2576 50.2013 22.3355 49.7895C17.1838 47.4995 12.0967 45.0665 6.92452 42.8275C4.39288 41.7319 2.50097 40.2074 1.78979 37.4546V35.413C2.47034 32.7112 4.32144 31.197 6.79522 30.0809C20.0455 24.1023 33.2413 17.9978 46.4915 12.0124C52.7763 9.17451 59.1395 6.51018 65.4651 3.76758H68.5276C70.035 4.30521 71.5901 4.74076 73.043 5.40089C84.3855 10.5458 95.7279 15.7146 107.07 20.9071C113.971 24.0581 120.862 27.2294 127.773 30.3565C129.767 31.2549 131.318 32.5241 131.938 34.6984C132.832 37.8425 131.379 40.8233 128.167 42.2899C122.628 44.8533 117.07 47.3861 111.494 49.8882C110.715 50.2285 110.442 50.6368 110.446 51.4943C110.487 57.5716 110.487 63.6512 110.446 69.733C110.446 70.6959 110.745 71.094 111.644 71.4615C117.975 73.9829 123.357 78.4234 127.036 84.1599C130.715 89.8964 132.505 96.6408 132.155 103.447C131.805 110.252 129.333 116.778 125.086 122.107C120.838 127.436 115.029 131.301 108.472 133.16C106.485 133.718 104.426 134.014 102.402 134.433L96.7975 134.46ZM55.0086 40.0849C53.103 35.8656 54.1034 32.5785 57.9383 30.1456C59.9246 28.9016 62.1728 28.1363 64.5056 27.91C68.8407 27.4472 73.0124 27.9644 76.6465 30.5743C78.8379 32.1396 80.2568 34.2186 79.971 37.0395C79.6784 39.9386 77.8545 41.8373 75.4215 43.093C70.2494 45.7675 64.9275 45.856 59.5852 43.5898C59.2738 43.4287 58.9272 43.3478 58.5767 43.3543C58.2262 43.3608 57.8828 43.4546 57.5776 43.6272C51.8814 46.5501 46.1648 49.4323 40.4551 52.3314C40.1692 52.4777 39.9106 52.6717 39.5465 52.9099C47.5702 56.5746 55.4849 60.1543 63.3657 63.7986C64.4843 64.36 65.7178 64.6547 66.9694 64.6594C68.2209 64.6641 69.4566 64.3788 70.5795 63.8258C89.0722 55.3462 107.577 46.8904 126.095 38.4584C126.987 38.0535 127.796 37.5839 127.82 36.4814C127.847 35.3109 127.014 34.8141 126.075 34.3888C122.093 32.5921 118.126 30.7717 114.165 28.9444C99.5923 22.3136 85.0161 15.6658 70.4365 9.00097C68.2248 7.98015 66.0504 7.87127 63.8114 8.89549C45.1145 17.4409 26.4142 25.9795 7.71056 34.5113C6.83946 34.9094 6.00918 35.4913 6.22356 36.4644C6.3278 36.8539 6.50963 37.2183 6.75813 37.5358C7.00663 37.8533 7.31669 38.1174 7.66972 38.3121C16.3127 42.3376 24.9964 46.2847 33.6836 50.2217C34.0923 50.3901 34.551 50.3901 34.9596 50.2217C41.629 46.8802 48.2779 43.5013 55.0086 40.0849ZM99.615 73.4658C92.1357 73.4702 84.9625 76.4358 79.6637 81.7142C74.3648 86.9926 71.3715 94.1544 71.3383 101.634C71.2804 117.31 83.993 130.101 99.615 130.084C115.131 130.084 127.817 117.375 127.858 101.841C127.866 94.336 124.897 87.134 119.603 81.8146C114.308 76.4952 107.12 73.4928 99.615 73.4658ZM106.033 52.4845C105.461 52.7193 105.012 52.8928 104.552 53.097C93.878 57.9731 83.1866 62.822 72.5326 67.7492C68.7896 69.4846 65.1555 69.4744 61.3989 67.7083C54.5934 64.4962 47.6893 61.4201 40.826 58.2896C39.4853 57.6771 38.1378 57.0816 36.5896 56.384V84.9874C36.5896 88.8223 36.5896 88.8461 40.159 90.3365C48.5059 93.8141 57.2612 95.1003 66.241 95.2398C67.3333 95.2398 67.7416 94.9404 68.0002 93.8788C69.8844 86.1964 74.5066 79.4653 80.9998 74.9479C87.4931 70.4305 95.4113 68.4371 103.27 69.3416L106.033 69.6819V52.4845ZM32.0571 85.4604C32.1252 85.2865 32.1765 85.1064 32.2102 84.9228C32.2102 74.9868 32.2102 65.0508 32.2102 55.1148C32.2102 54.8188 32.0809 54.356 31.87 54.2471C30.6178 53.604 29.3247 53.0425 27.9908 52.4267C27.9412 52.6249 27.9037 52.8261 27.8786 53.0289C27.8786 61.1955 27.8173 69.3348 27.899 77.4844C27.9398 80.6966 29.3962 83.3405 32.0571 85.4604ZM66.9011 32.0953C64.56 32.1328 62.2427 32.5411 60.1841 33.875C57.6967 35.4844 57.7103 37.3832 60.1841 39.0199C63.7706 41.4018 70.2834 41.3848 73.8699 38.9927C76.2518 37.4036 76.2722 35.4708 73.8699 33.909C71.7738 32.5513 69.4191 32.126 66.9011 32.1021V32.0953ZM38.7333 106.149C38.7495 105.57 38.6494 104.993 38.439 104.453C38.2285 103.913 37.9119 103.421 37.5079 103.005C37.1039 102.59 36.6207 102.26 36.0869 102.034C35.553 101.809 34.9794 101.692 34.3999 101.692C33.8204 101.692 33.2467 101.809 32.7129 102.034C32.1791 102.26 31.6959 102.59 31.2919 103.005C30.8879 103.421 30.5713 103.913 30.3608 104.453C30.1504 104.993 30.0503 105.57 30.0665 106.149C30.0981 107.277 30.5686 108.349 31.3778 109.136C32.187 109.922 33.2712 110.363 34.3999 110.363C35.5286 110.363 36.6128 109.922 37.422 109.136C38.2312 108.349 38.7017 107.277 38.7333 106.149Z"
                      fill="#3138E3"
                      stroke="#3138E3"
                      strokeWidth="3.41667"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M101.758 86.9068C101.758 90.4491 101.847 93.7565 101.724 97.0572C101.653 98.8777 101.952 99.8951 103.966 100.616C108.08 102.09 110.666 106.517 110.462 110.797C110.241 115.466 107.4 119.342 103.034 120.757C102.075 121.067 101.673 121.438 101.727 122.499C101.816 124.674 101.02 125.739 99.5599 125.715C98.1001 125.691 97.3651 124.636 97.4264 122.442C97.4502 121.482 97.1882 121.06 96.2218 120.74C92.7612 119.638 90.461 117.266 89.2734 113.836C88.7392 112.291 89.219 111.131 90.4916 110.678C91.7642 110.226 92.7987 110.842 93.3839 112.397C94.2244 114.636 95.4596 115.912 97.3141 116.415C97.3561 116.171 97.3833 115.924 97.3958 115.677C97.3958 112.022 97.3958 108.364 97.3958 104.71C97.3958 104.029 97.229 103.689 96.5008 103.465C91.7064 101.923 88.6746 97.7888 88.6746 93.0011C88.6746 88.2135 91.737 84.154 96.4532 82.6432C97.1338 82.4254 97.4366 82.1566 97.3924 81.4148C97.3397 80.7383 97.3832 80.0578 97.5217 79.3936C97.6106 78.9279 97.8679 78.5112 98.2445 78.2232C98.6211 77.9351 99.0905 77.7957 99.5633 77.8317C100.652 77.8317 101.707 78.4783 101.574 79.5331C101.258 82.0409 102.728 82.6909 104.637 83.5177C107.315 84.6849 108.996 86.9681 109.904 89.7617C110.381 91.2283 109.904 92.4091 108.713 92.8412C107.447 93.3006 106.331 92.6915 105.797 91.1637C105.157 89.2071 103.919 87.8188 101.758 86.9068ZM101.83 116.511C103.201 116.026 104.365 115.086 105.129 113.848C105.893 112.61 106.21 111.148 106.028 109.705C105.726 107.187 103.837 104.897 101.83 104.635V116.511ZM97.2937 98.9525V87.0668C94.6328 88.0604 92.9042 90.6771 93.0709 93.3414C93.2376 96.0058 95.0649 98.4625 97.2937 98.9457V98.9525Z"
                      fill="#3138E3"
                      stroke="#3138E3"
                      strokeWidth="1.67203"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3349_21334">
                      <rect
                        width="136.667"
                        height="136.667"
                        fill="white"
                        transform="translate(0.944336 0.666016)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
            />
          </div>
        </section>
        <section className={styles.activePrograms}>
          <div className="container">
            <div className={styles.activeProgramsTitle}>
              <h2>
                {isLoading ? (
                  <Skeleton variant="text" height={60} width={200} />
                ) : (
                  translations && getTranslation("active_scholarships")
                )}
              </h2>
            </div>
            <div className={styles.programsGrid}>
              {status === "pending" &&
                [...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={410}
                    height={360}
                    sx={{ borderRadius: "2.4rem" }}
                  />
                ))}
              {status === "error" && <Box>{error}</Box>}
              {status === "success" &&
                programs?.map((program) => (
                  <PartnersCard
                    key={program.id}
                    cardtTitle={program.name}
                    text={program.short_description}
                    img={program.image}
                    onClick={handleScrollToContact}
                    buttonTitle={
                      translations && getTranslation("s_apply_button")
                    }
                  />
                ))}
            </div>
          </div>
        </section>
        <Contact
          apply
          contactRef={contactRef}
          apiEndpoint={
            "https://admin.innab.coder.az/api/carrier_and_schoolarship/post"
          }
        />
      </Suspense>
    </>
  );
};

export default Scholarships;
