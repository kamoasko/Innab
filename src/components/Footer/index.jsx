import React, { Suspense, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useMenus } from "../../features/menus/useMenu";
import { useTrainingCategories } from "../../features/categories/useCategory";
import { useProjectOrCareer } from "../../features/project/projectSlice";
import { useTranslations } from "../../features/translations/translations";

const ContactDetails = React.lazy(() => import("../contactDetails"));
const SocialNetworks = React.lazy(() => import("../SocialNetworks"));

const Footer = () => {
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);
  const { data: menus } = useMenus(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const { data: categories, error: categoriesError } =
    useTrainingCategories(lang);
  const { data: projectOrCareer } = useProjectOrCareer(lang);
  const careers =
    projectOrCareer &&
    projectOrCareer?.filter((career) => career.is_corporative === 1);

  const keywords = [
    "links_label",
    "online_regisration",
    "human_resources",
    "f_address_label",
    "f_contact_label",
    "f_follow_us",
    "copyrights",
  ];

  const { data: translations, isLoading } = useTranslations(
    lang,
    "footer",
    keywords
  );

  return (
    <>
      <Suspense>
        <footer>
          <div className="footerTop">
            <div className="container">
              <div className="footerTopWrapper flex justifyContentBetween">
                <div>
                  <h5>{translations && translations["links_label"]}</h5>
                  {parentMenu && categories && (
                    <ul className="flex flexDirectionColumn">
                      <li>
                        <Link to={parentMenu[0]?.slug}>
                          {parentMenu[0]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          {translations && translations["online_regisration"]}
                        </Link>
                      </li>
                      <li>
                        <Link to={parentMenu[2]?.slug}>
                          {parentMenu[2]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[0]?.slug}/${categories[0]?.subData[0]?.slug}`}
                        >
                          {categories[0]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[1]?.slug}/${categories[1]?.subData[0]?.slug}}`}
                        >
                          {categories[1]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[2]?.slug}/${categories[2]?.subData[0]?.slug}}`}
                        >
                          {categories[2]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[4].slug}/${
                            careers && careers[0].slug
                          }`}
                        >
                          {translations && translations["human_resources"]}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[5].slug}/${categories[5]?.subData[0]?.slug}`}
                        >
                          {categories[5]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link to={parentMenu[9]?.slug}>
                          {parentMenu[9]?.title}
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
                <div>
                  <h5>{translations && translations["f_address_label"]}</h5>
                  <div>{status === "success" && <p>{infos.address}</p>}</div>
                </div>
                <div>
                  <h5>{translations && translations["f_contact_label"]}</h5>
                  <ContactDetails email />
                </div>
                <div>
                  <h5>{translations && translations["f_follow_us"]}</h5>
                  <SocialNetworks gap={"2.4rem"} />
                  {status === "pending" && (
                    <Box sx={{ width: "100%" }}>
                      <CircularProgress
                        sx={{
                          width: "2rem !important",
                          height: "2rem !important",
                        }}
                      />
                    </Box>
                  )}
                  {status === "error" && <p>{error}</p>}
                  {status === "success" && (
                    <Link to={"/"}>
                      <figure className="footerLogo">
                        <img
                          loading="lazy"
                          src={infos.header_footer}
                          alt="Innab logo"
                        />
                      </figure>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="footerCopy">
            <div className="container">
              <p>&copy; {translations && translations["copyrights"]}</p>
            </div>
          </div>
        </footer>
      </Suspense>
    </>
  );
};

export default Footer;
