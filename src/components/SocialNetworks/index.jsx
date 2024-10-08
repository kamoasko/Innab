import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import { FaInstagram } from "react-icons/fa6";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";

const SocialNetworks = React.memo(({ gap, contact }) => {
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);

  if (status === "pending") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 3.2 }}>
        <Skeleton
          variant="rectangular"
          width={30}
          height={30}
          sx={{ borderRadius: "0.5rem" }}
        />
        <Skeleton
          variant="rectangular"
          width={30}
          height={30}
          sx={{ borderRadius: "0.5rem" }}
        />
        <Skeleton
          variant="rectangular"
          width={30}
          height={30}
          sx={{ borderRadius: "0.5rem" }}
        />
        <Skeleton
          variant="rectangular"
          width={30}
          height={30}
          sx={{ borderRadius: "0.5rem" }}
        />
        <Skeleton
          variant="rectangular"
          width={30}
          height={30}
          sx={{ borderRadius: "0.5rem" }}
        />
      </Box>
    );
  }

  if (status === "error") {
    return <Box>{error}</Box>;
  }

  return (
    <>
      {status === "success" && (
        <ul
          className="socialNetworks flex alignItemsCenter"
          style={{ gap: gap }}
        >
          <li>
            <Link to={infos?.facebook_link} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clipPath="url(#clip0_1015_22591)">
                  <path
                    d="M20 10C20 4.4772 15.5228 0 10 0C4.4772 0 0 4.4772 0 10C0 14.6896 3.2288 18.6248 7.5844 19.7056V13.056H5.5224V10H7.5844V8.6832C7.5844 5.2796 9.1248 3.702 12.4664 3.702C13.1 3.702 14.1932 3.8264 14.6404 3.9504V6.7204C14.4044 6.6956 13.9944 6.6832 13.4852 6.6832C11.8456 6.6832 11.212 7.3044 11.212 8.9192V10H14.4784L13.9172 13.056H11.212V19.9268C16.1636 19.3288 20.0004 15.1128 20.0004 10H20Z"
                    fill="#0866FF"
                  />
                  <path
                    d="M13.9173 13.0552L14.4785 9.99917H11.2121V8.91837C11.2121 7.30357 11.8457 6.68237 13.4853 6.68237C13.9945 6.68237 14.4045 6.69477 14.6405 6.71957V3.94957C14.1933 3.82517 13.1001 3.70117 12.4665 3.70117C9.12486 3.70117 7.58446 5.27877 7.58446 8.68237V9.99917H5.52246V13.0552H7.58446V19.7048C8.35806 19.8968 9.16726 19.9992 10.0001 19.9992C10.4101 19.9992 10.8145 19.974 11.2117 19.926V13.0552H13.9169H13.9173Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1015_22591">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </li>
          <li>
            <Link to={infos?.instagram_link} target="_blank">
              {contact ? (
                <FaInstagram style={{ width: "2.4rem", height: "2.4rem" }} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M14.9951 0H5.00486C2.24567 0 0 2.24566 0 5.00485V14.1443C0 16.9035 2.24567 19.1492 5.00486 19.1492H14.9951C17.7543 19.1492 20 16.9035 20 14.1443V5.00485C20 2.24566 17.7543 0 14.9951 0ZM1.76544 5.00485C1.76544 3.2186 3.2186 1.76544 5.00486 1.76544H14.9951C16.7814 1.76544 18.2345 3.2186 18.2345 5.00485V14.1443C18.2345 15.9306 16.7814 17.3837 14.9951 17.3837H5.00486C3.2186 17.3837 1.76544 15.9306 1.76544 14.1443V5.00485Z"
                    fill="url(#paint0_linear_1015_22592)"
                  />
                  <path
                    d="M10.0018 14.2301C12.5681 14.2301 14.6569 12.1413 14.6569 9.57502C14.6569 7.00875 12.5681 4.91992 10.0018 4.91992C7.43551 4.91992 5.34668 7.00875 5.34668 9.57502C5.34668 12.1413 7.43551 14.2301 10.0018 14.2301ZM10.0018 6.68536C11.5951 6.68536 12.8914 7.98168 12.8914 9.57502C12.8914 11.1684 11.5951 12.4647 10.0018 12.4647C8.40845 12.4647 7.11212 11.1684 7.11212 9.57502C7.11212 7.98168 8.40845 6.68536 10.0018 6.68536Z"
                    fill="url(#paint1_linear_1015_22592)"
                  />
                  <path
                    d="M15.0877 5.67148C15.7789 5.67148 16.3424 5.10937 16.3424 4.41679C16.3424 3.72422 15.7803 3.16211 15.0877 3.16211C14.3951 3.16211 13.833 3.72422 13.833 4.41679C13.833 5.10937 14.3951 5.67148 15.0877 5.67148Z"
                    fill="url(#paint2_linear_1015_22592)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1015_22592"
                      x1="1.56003"
                      y1="17.6988"
                      x2="18.7994"
                      y2="1.10616"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FAAD4F" />
                      <stop offset="0.35" stopColor="#DD2A7B" />
                      <stop offset="0.62" stopColor="#9537B0" />
                      <stop offset="1" stopColor="#515BD4" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1015_22592"
                      x1="1.56042"
                      y1="17.6985"
                      x2="18.7998"
                      y2="1.10588"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FAAD4F" />
                      <stop offset="0.35" stopColor="#DD2A7B" />
                      <stop offset="0.62" stopColor="#9537B0" />
                      <stop offset="1" stopColor="#515BD4" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1015_22592"
                      x1="1.42908"
                      y1="17.5632"
                      x2="18.6685"
                      y2="0.970503"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FAAD4F" />
                      <stop offset="0.35" stopColor="#DD2A7B" />
                      <stop offset="0.62" stopColor="#9537B0" />
                      <stop offset="1" stopColor="#515BD4" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link to={infos?.linkedin_link} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clipPath="url(#clip0_1015_22593)">
                  <path
                    d="M18.5236 0H1.47639C1.08483 0 0.709301 0.155548 0.432425 0.432425C0.155548 0.709301 0 1.08483 0 1.47639V18.5236C0 18.9152 0.155548 19.2907 0.432425 19.5676C0.709301 19.8445 1.08483 20 1.47639 20H18.5236C18.9152 20 19.2907 19.8445 19.5676 19.5676C19.8445 19.2907 20 18.9152 20 18.5236V1.47639C20 1.08483 19.8445 0.709301 19.5676 0.432425C19.2907 0.155548 18.9152 0 18.5236 0ZM5.96111 17.0375H2.95417V7.48611H5.96111V17.0375ZM4.45556 6.1625C4.11447 6.16058 3.7816 6.05766 3.49895 5.86674C3.21629 5.67582 2.99653 5.40544 2.8674 5.08974C2.73826 4.77404 2.70554 4.42716 2.77336 4.09288C2.84118 3.7586 3.0065 3.4519 3.24846 3.21148C3.49042 2.97107 3.79818 2.80772 4.13289 2.74205C4.4676 2.67638 4.81426 2.71133 5.12913 2.84249C5.44399 2.97365 5.71295 3.19514 5.90205 3.47901C6.09116 3.76288 6.19194 4.09641 6.19167 4.4375C6.19488 4.66586 6.15209 4.89253 6.06584 5.104C5.97959 5.31547 5.85165 5.50742 5.68964 5.66839C5.52763 5.82936 5.33487 5.95607 5.12285 6.04096C4.91083 6.12585 4.68389 6.16718 4.45556 6.1625ZM17.0444 17.0458H14.0389V11.8278C14.0389 10.2889 13.3847 9.81389 12.5403 9.81389C11.6486 9.81389 10.7736 10.4861 10.7736 11.8667V17.0458H7.76667V7.49306H10.6583V8.81667H10.6972C10.9875 8.22917 12.0042 7.225 13.5556 7.225C15.2333 7.225 17.0458 8.22083 17.0458 11.1375L17.0444 17.0458Z"
                    fill="#0A66C2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1015_22593">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </li>
          <li>
            <Link to={infos?.tiktok_link} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.314 7.22037C15.6001 8.14301 17.1757 8.68588 18.8774 8.68588V5.39966C18.5553 5.39972 18.2341 5.36602 17.919 5.29903V7.88576C16.2175 7.88576 14.6421 7.34289 13.3557 6.42032V13.1265C13.3557 16.4813 10.6457 19.2007 7.30306 19.2007C6.05583 19.2007 4.89658 18.8223 3.93359 18.1734C5.03269 19.3012 6.56546 20.0008 8.2612 20.0008C11.6041 20.0008 14.3141 17.2814 14.3141 13.9265V7.22037H14.314ZM15.4962 3.90498C14.8389 3.18434 14.4074 2.25304 14.314 1.22346V0.800781H13.4058C13.6344 2.10938 14.4142 3.22737 15.4962 3.90498ZM6.04783 15.599C5.6806 15.1158 5.48215 14.5246 5.48304 13.9168C5.48304 12.3825 6.72255 11.1384 8.25176 11.1384C8.53676 11.1383 8.82004 11.1821 9.09164 11.2686V7.90896C8.77424 7.8653 8.4539 7.84677 8.13371 7.85356V10.4686C7.86191 10.3821 7.57848 10.3382 7.29342 10.3384C5.76421 10.3384 4.52477 11.5824 4.52477 13.1169C4.52477 14.202 5.14432 15.1414 6.04783 15.599Z"
                  fill="#FF004F"
                />
                <path
                  d="M13.3551 6.42025C14.6416 7.34282 16.217 7.88569 17.9185 7.88569V5.29896C16.9687 5.09593 16.1279 4.59782 15.4957 3.90498C14.4136 3.2273 13.6339 2.10931 13.4053 0.800781H11.0198V13.9263C11.0144 15.4565 9.77704 16.6955 8.25111 16.6955C7.3519 16.6955 6.55304 16.2653 6.04711 15.599C5.14366 15.1414 4.52411 14.2019 4.52411 13.117C4.52411 11.5826 5.76355 10.3385 7.29277 10.3385C7.58576 10.3385 7.86815 10.3843 8.13305 10.4686V7.85363C4.8491 7.92172 2.20801 10.6146 2.20801 13.9264C2.20801 15.5796 2.8657 17.0784 3.93314 18.1734C4.89613 18.8223 6.05538 19.2008 7.30261 19.2008C10.6453 19.2008 13.3552 16.4813 13.3552 13.1265V6.42025H13.3551Z"
                  fill="black"
                />
                <path
                  d="M17.9188 5.29817V4.59874C17.0623 4.60004 16.2226 4.35932 15.496 3.90411C16.1392 4.61089 16.9863 5.09822 17.9188 5.29817ZM13.4056 0.799986C13.3838 0.674926 13.367 0.549042 13.3554 0.422678V0H10.0617V13.1257C10.0564 14.6556 8.8191 15.8946 7.29303 15.8946C6.845 15.8946 6.42199 15.7879 6.04737 15.5983C6.55331 16.2645 7.35216 16.6946 8.25137 16.6946C9.77717 16.6946 11.0148 15.4558 11.0201 13.9256V0.799986H13.4056ZM8.13345 7.85284V7.10824C7.85823 7.07049 7.58076 7.05155 7.30294 7.05169C3.95993 7.05162 1.25 9.77116 1.25 13.1257C1.25 15.2288 2.31505 17.0822 3.93347 18.1725C2.86603 17.0775 2.20834 15.5787 2.20834 13.9255C2.20834 10.6138 4.84936 7.92093 8.13345 7.85284Z"
                  fill="#00F2EA"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link to={infos?.youtube_link} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clipPath="url(#clip0_1015_22595)">
                  <path
                    d="M19.6014 5.15508C19.4883 4.72959 19.2654 4.34126 18.9551 4.02896C18.6448 3.71665 18.2579 3.49133 17.8332 3.37553C16.2695 2.95508 10.0195 2.95508 10.0195 2.95508C10.0195 2.95508 3.76953 2.95508 2.20589 3.37553C1.78114 3.49133 1.39425 3.71665 1.08394 4.02896C0.773628 4.34126 0.550786 4.72959 0.437713 5.15508C0.0195313 6.72553 0.0195312 10.0005 0.0195312 10.0005C0.0195312 10.0005 0.0195313 13.2755 0.437713 14.846C0.550786 15.2715 0.773628 15.6598 1.08394 15.9721C1.39425 16.2844 1.78114 16.5097 2.20589 16.6255C3.76953 17.046 10.0195 17.046 10.0195 17.046C10.0195 17.046 16.2695 17.046 17.8332 16.6255C18.2579 16.5097 18.6448 16.2844 18.9551 15.9721C19.2654 15.6598 19.4883 15.2715 19.6014 14.846C20.0195 13.2755 20.0195 10.0005 20.0195 10.0005C20.0195 10.0005 20.0195 6.72553 19.6014 5.15508Z"
                    fill="#FF0302"
                  />
                  <path
                    d="M7.97461 12.9731V7.02539L13.2019 9.99925L7.97461 12.9731Z"
                    fill="#FEFEFE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1015_22595">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
});

export default SocialNetworks;
