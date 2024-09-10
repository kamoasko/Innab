import React, { Suspense, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useMenus } from "../../features/menus/useMenu";
import { useTrainingCategories } from "../../features/categories/categorySlice";
import { useProjectOrCareer } from "../../features/project/projectSlice";

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

  return (
    <>
      <Suspense>
        <footer>
          <div className="footerTop">
            <div className="container">
              <div className="footerTopWrapper flex justifyContentBetween">
                <div>
                  <h5>Linklər</h5>
                  {parentMenu && categories && (
                    <ul className="flex flexDirectionColumn">
                      <li>
                        <Link to={parentMenu[0]?.slug}>
                          {parentMenu[0]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Onlayn qeydiyyat</Link>
                      </li>
                      <li>
                        <Link to={parentMenu[2]?.slug}>
                          {parentMenu[2]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[0]?.slug}/${categories[0]?.trainings[0]?.slug}`}
                        >
                          {categories[0]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[1]?.slug}/${categories[1]?.trainings[0]?.slug}}`}
                        >
                          {categories[1]?.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[2]?.slug}/${categories[2]?.trainings[0]?.slug}}`}
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
                          İnsan resursları
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${parentMenu[1]?.slug}/${categories[5].slug}/${categories[5]?.trainings[0]?.slug}`}
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
                  <h5>Ünvan</h5>
                  <div>{status === "success" && <p>{infos.address}</p>}</div>
                </div>
                <div>
                  <h5>Əlaqə</h5>
                  <ContactDetails email />
                </div>
                <div>
                  <h5>Bizi izləyin</h5>
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
                    <div className="footerLogo">
                      <img
                        loading="lazy"
                        src={infos.header_footer}
                        alt="Innab logo"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="footerCopy">
            <div className="container">
              <p>© 2024 INNAB. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </Suspense>
    </>
  );
};

export default Footer;
