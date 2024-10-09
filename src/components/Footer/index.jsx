import React, { Suspense, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import { useMenus } from "../../features/menus/useMenu";
import { useTrainingCategories } from "../../features/categories/useCategory";
import { useProjectOrCareer } from "../../features/project/projectSlice";
import { useTranslations } from "../../features/translations/translations";
import { imgUrl } from "../../imgUrl";

const ContactDetails = React.memo(
  React.lazy(() => import("../contactDetails"))
);
const SocialNetworks = React.memo(
  React.lazy(() => import("../SocialNetworks"))
);

const Footer = () => {
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);
  const adresses = infos && infos[0]?.address[lang]?.split("/");

  const { data: menus } = useMenus(lang);
  const { data: categories } = useTrainingCategories(lang);
  const { data: projectOrCareer } = useProjectOrCareer(lang);
  const { data: translations } = useTranslations("footer");

  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const parentMenu = useMemo(
    () => menus?.filter((menu) => menu.parent_id === 0),
    [menus]
  );
  const careers = useMemo(
    () => projectOrCareer?.filter((career) => career.is_corporative === 1),
    [projectOrCareer]
  );

  const translationTexts = useMemo(
    () => ({
      linksLabel: translations && getTranslation("links_label"),
      onlineRegistration: translations && getTranslation("online_regisration"),
      humanResources: translations && getTranslation("human_resources"),
      addressLabel: translations && getTranslation("f_address_label"),
      contactLabel: translations && getTranslation("f_contact_label"),
      mailWord: translations && getTranslation("mail_word"),
      followUsLabel: translations && getTranslation("f_follow_us"),
      copyrights: translations && getTranslation("copyrights"),
    }),
    [translations]
  );

  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" width={"100%"} height={300} />}
    >
      <footer>
        <div className="footerTop">
          <div className="container">
            <div className="footerTopWrapper flex justifyContentBetween">
              <div>
                <h5>{translationTexts.linksLabel}</h5>
                {parentMenu && categories && (
                  <ul className="flex flexDirectionColumn">
                    <li>
                      <Link to="about-us">{parentMenu[0]?.title}</Link>
                    </li>
                    <li>
                      <Link to="/">{translationTexts.onlineRegistration}</Link>
                    </li>
                    <li>
                      <Link to="corporate">{parentMenu[2]?.title}</Link>
                    </li>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`trainings/${category.slug}/${category.subData[0]?.slug}`}
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="privacy-policy">{parentMenu[9]?.title}</Link>
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <h5>{translationTexts.addressLabel}</h5>
                <div className="footerAdresses">
                  {adresses &&
                    adresses.map((address, index) => (
                      <p key={index}>{address}</p>
                    ))}
                </div>
              </div>
              <div>
                <h5>{translationTexts.contactLabel}</h5>
                <ContactDetails email mail={translationTexts.mailWord} />
              </div>
              <div>
                <h5>{translationTexts.followUsLabel}</h5>
                <SocialNetworks gap={"2.4rem"} />
                <Link to={"/"}>
                  <figure className="footerLogo">
                    {status === "pending" && (
                      <Box sx={{ width: "100%" }}>
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={30}
                          sx={{ borderRadius: "0.5rem" }}
                        />
                      </Box>
                    )}
                    {status === "error" && <p>{error}</p>}
                    {status === "success" && (
                      <img
                        loading="lazy"
                        src={`${imgUrl}/${infos[0].header_footer.url}`}
                        alt="Innab logo"
                      />
                    )}
                  </figure>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footerCopy">
          <div className="container">
            <p>&copy; {translationTexts.copyrights}</p>
          </div>
        </div>
      </footer>
    </Suspense>
  );
};

export default Footer;
