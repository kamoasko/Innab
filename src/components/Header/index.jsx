import React, { memo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SocialNetworks from "../SocialNetworks";
import Button from "../Button";
import LangForm from "../langForm";
import SearchBar from "../searchBar";
import { Box, CircularProgress } from "@mui/material";
import { useSiteInfos } from "../../features/siteInfos/siteInfoSlice";
import Navbar from "./navbar";

const Header = memo(({ partnersRef }) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const { lang } = useParams();
  const { data: infos, status, error } = useSiteInfos(lang);

  const toggleMobMenu = () => {
    setMobMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <div className="container">
        <div className="headerTop flex alignItemsCenter justifyContentBetween">
          {status === "loading" && (
            <Box sx={{ width: "100%" }}>
              <CircularProgress
                sx={{ width: "2rem !important", height: "2rem !important" }}
              />
            </Box>
          )}
          {status === "failed" && <p>{error}</p>}
          {status === "success" && (
            <Link to={"/"} className="headerTopLogo">
              <img src={infos?.header_top} alt="Innab logo" />
            </Link>
          )}
          <div className="headerTopRight flex alignItemsCenter justifyContentBetween">
            <SocialNetworks gap={"3.2rem"} />
            <div className="headerTopTools flex alignItemsCenter">
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
                <Button title={"Müraciət et"} to={"#contact"} color="orange" />
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
                      d="M10.75 3.5C6.74594 3.5 3.5 6.74594 3.5 10.75C3.5 14.7541 6.74594 18 10.75 18C12.4277 18 13.9722 17.4302 15.2007 16.4735L19.4636 20.7364C19.8151 21.0879 20.3849 21.0879 20.7364 20.7364C21.0878 20.3849 21.0878 19.8151 20.7364 19.4636L16.4735 15.2007C17.4302 13.9722 18 12.4277 18 10.75C18 6.74594 14.7541 3.5 10.75 3.5ZM10.75 5.3C7.74005 5.3 5.3 7.74005 5.3 10.75C5.3 13.76 7.74005 16.2 10.75 16.2C13.76 16.2 16.2 13.76 16.2 10.75C16.2 7.74005 13.76 5.3 10.75 5.3Z"
                      fill="#3138E3"
                    />
                  </svg>
                </button>
                <button onClick={() => toggleMobMenu()}>
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1H21"
                      stroke="#3138E3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 8H15"
                      stroke="#3138E3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 15H21"
                      stroke="#3138E3"
                      strokeWidth="2"
                      strokeLinecap="round"
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
      <div className={`headerBottom ${mobMenuOpen ? "opened" : ""}`}>
        {searchBarOpen ? (
          <div className="container">
            <SearchBar
              isOpen={searchBarOpen}
              onClose={() => setSearchBarOpen(false)}
              bottom
            />
          </div>
        ) : (
          <Navbar partnersRef={partnersRef} />
        )}
      </div>
    </header>
  );
});

export default Header;
