import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SocialNetworks from "../SocialNetworks";
import Button from "../Button";
import LangForm from "../langForm";
import SearchBar from "../searchBar";
import { Box, Skeleton } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import Navbar from "./navbar";
import { useTranslations } from "../../features/translations/translations";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Header = memo(({ partnersRef }) => {
  const { width } = useWindowDimensions();
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(Array(7).fill(false));
  const [openSubMenus, setOpenSubMenus] = useState(Array(6).fill(false));
  const [isFixed, setIsFixed] = useState(false);
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);
  const location = useLocation();
  const prevLocationRef = useRef(location);

  const toggleMobMenu = () => {
    setMobMenuOpen((prev) => !prev);
    if (openDropdowns.some((isOpen) => isOpen)) {
      setOpenDropdowns(Array(7).fill(false));
      setOpenSubMenus(Array(6).fill(false));
    }
  };

  const handleScrollToContact = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  const keywords = ["h_apply_button"];
  const { data: translations } = useTranslations(lang, "header", keywords);

  useEffect(() => {
    if (location.pathname !== prevLocationRef.current.pathname) {
      setMobMenuOpen(false);
      setOpenDropdowns(Array(7).fill(false));
      setOpenSubMenus(Array(6).fill(false));
    }
    prevLocationRef.current = location;
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <div className="headerTop flex alignItemsCenter justifyContentBetween">
          {status === "pending" && (
            <Box sx={{ width: "100%" }}>
              <Skeleton variant="rectangular" width={150} height={60} />
            </Box>
          )}
          {status === "error" && <p>{error}</p>}
          {status === "success" && (
            <Link to={"/"} className="headerTopLogo">
              <img loading="lazy" src={infos?.header_top} alt="Innab logo" />
            </Link>
          )}
          <div className="headerTopRight flex alignItemsCenter justifyContentBetween">
            <SocialNetworks gap={"3.2rem"} />
            <div className="headerTopTools flex alignItemsCenter">
              {status === "pending" ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 3.2 }}>
                  <Skeleton variant="rectangular" width={140} height={20} />
                  <Skeleton variant="rectangular" width={140} height={20} />
                </Box>
              ) : (
                <ul className="headerTopContact flex alignItemsCenter">
                  <li>
                    <Link to={`tel:${infos?.phone1}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M11.7597 12.7158C12.8882 11.5872 14.6647 11.4832 15.846 12.4764L16.6996 13.1955C17.6737 14.0153 17.7728 15.4931 16.9192 16.4953C16.4537 17.0339 15.7985 17.3722 15.0899 17.4398C12.3624 17.8072 9.50111 16.4929 6.50448 13.496C3.50785 10.4991 2.19281 7.63683 2.56016 4.90992C2.57925 4.69656 2.62359 4.48622 2.69224 4.2833C2.8511 3.81717 3.13153 3.40191 3.50455 3.08043C4.50756 2.2276 5.98441 2.32584 6.80414 3.30086L7.52234 4.15451C8.51709 5.33427 8.4139 7.11175 7.28542 8.24033L6.67289 8.85208C6.50958 9.0157 6.45611 9.25924 6.53585 9.47623C6.75874 10.0855 7.32752 10.8467 8.24054 11.7598C9.15439 12.6737 9.91552 13.2417 10.5239 13.4654C10.741 13.545 10.9846 13.4912 11.148 13.3276L11.7597 12.7158Z"
                          fill="#3138E3"
                        />
                      </svg>
                      {infos?.phone1}
                    </Link>
                  </li>
                  <li>
                    <Link to={`mailto:${infos?.email2}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M18.3346 7.62413V13.6497C18.3346 14.795 18.2154 15.2104 17.9914 15.6291C17.7675 16.0478 17.4389 16.3764 17.0202 16.6004C16.6014 16.8243 16.1861 16.9436 15.0408 16.9436H4.96185C3.81649 16.9436 3.40116 16.8243 2.98244 16.6004C2.56371 16.3764 2.2351 16.0478 2.01116 15.6291C1.78722 15.2104 1.66797 14.795 1.66797 13.6497V7.62413L10.0013 11.4948L18.3346 7.62413ZM15.0408 3.05469C16.1861 3.05469 16.6014 3.17394 17.0202 3.39788C17.4389 3.62182 17.7675 3.95043 17.9914 4.36916C18.1335 4.63474 18.2334 4.89895 18.2875 5.34894L10.0013 9.19789L1.71528 5.34753C1.76941 4.8984 1.86927 4.63446 2.01116 4.36916C2.2351 3.95043 2.56371 3.62182 2.98244 3.39788C3.40116 3.17394 3.81649 3.05469 4.96185 3.05469H15.0408Z"
                          fill="#3138E3"
                        />
                      </svg>
                      {infos?.email2}
                    </Link>
                  </li>
                </ul>
              )}
              <LangForm />
            </div>
          </div>
          <div className="headerMobileTools flex alignItemsCenter">
            {mobMenuOpen ? (
              <button onClick={() => toggleMobMenu()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5.26363 5.2636C5.6151 4.91213 6.18495 4.91213 6.53642 5.26361L12 10.7272L17.4636 5.26363C17.8151 4.91216 18.385 4.91216 18.7364 5.26363C19.0879 5.6151 19.0879 6.18495 18.7364 6.53642L13.2728 12L18.7364 17.4636C19.0879 17.8151 19.0879 18.385 18.7364 18.7364C18.3849 19.0879 17.8151 19.0879 17.4636 18.7364L12 13.2728L6.53639 18.7364C6.18492 19.0879 5.61507 19.0879 5.2636 18.7364C4.91213 18.3849 4.91213 17.8151 5.26361 17.4636L10.7272 12L5.26363 6.53639C4.91216 6.18492 4.91216 5.61507 5.26363 5.2636Z"
                    fill="#3138E3"
                  />
                </svg>
              </button>
            ) : (
              <>
                <Button
                  title={translations && translations["h_apply_button"]}
                  component
                  color="orange"
                  borderRadius={"3.3rem"}
                  onClick={handleScrollToContact}
                />
                <button onClick={() => setSearchBarOpen(true)}>
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
                      d="M10.75 3.5C6.74594 3.5 3.5 6.74594 3.5 10.75C3.5 14.7541 6.74594 18 10.75 18C12.4277 18 13.9722 17.4302 15.2007 16.4735L19.4636 20.7364C19.7565 21.0293 20.2313 21.0293 20.5242 20.7364C20.8171 20.4435 20.8171 19.9687 20.5242 19.6758L16.2613 15.4128C17.2179 14.1843 17.7877 12.6398 17.7877 10.9622C17.7877 6.95816 14.5418 3.71222 10.5377 3.71222H10.75ZM10.75 4.5C7.37765 4.5 4.5 7.37765 4.5 10.75C4.5 14.1224 7.37765 17 10.75 17C14.1224 17 17 14.1224 17 10.75C17 7.37765 14.1224 4.5 10.75 4.5Z"
                      fill="#3138E3"
                    />
                  </svg>
                </button>
                <button onClick={() => toggleMobMenu()}>
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
                      d="M5.5 7.25C5.5 6.83579 5.83579 6.5 6.25 6.5H17.75C18.1642 6.5 18.5 6.83579 18.5 7.25C18.5 7.66421 18.1642 8 17.75 8H6.25C5.83579 8 5.5 7.66421 5.5 7.25ZM5.5 11.75C5.5 11.3358 5.83579 11 6.25 11H17.75C18.1642 11 18.5 11.3358 18.5 11.75C18.5 12.1642 18.1642 12.5 17.75 12.5H6.25C5.83579 12.5 5.5 12.1642 5.5 11.75ZM6.25 15.5C5.83579 15.5 5.5 15.8358 5.5 16.25C5.5 16.6642 5.83579 17 6.25 17H17.75C18.1642 17 18.5 16.6642 18.5 16.25C18.5 15.8358 18.1642 15.5 17.75 15.5H6.25Z"
                      fill="#3138E3"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <SearchBar
        isOpen={searchBarOpen}
        onClose={() => setSearchBarOpen(false)}
        top
      />
      <div
        className={`headerBottom ${mobMenuOpen ? "opened" : ""} ${
          width > "992" && isFixed ? "fixed" : ""
        }`}
      >
        {searchBarOpen ? (
          <div className="container">
            <SearchBar
              isOpen={searchBarOpen}
              onClose={() => setSearchBarOpen(false)}
              bottom
            />
          </div>
        ) : (
          <Navbar
            setMobMenuOpen={setMobMenuOpen}
            openDropdowns={openDropdowns}
            openSubMenus={openSubMenus}
            setOpenDropdowns={setOpenDropdowns}
            setOpenSubMenus={setOpenSubMenus}
            partnersRef={partnersRef}
            setSearchBarOpen={setSearchBarOpen}
          />
        )}
      </div>
    </header>
  );
});

export default Header;
