import React, { useRef, useState } from "react";
import "../../general.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import SocialNetworks from "../SocialNetworks";
import Button from "../Button";

const Header = ({ partnersRef }) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(Array(7).fill(false));
  const [openSubMenus, setOpenSubMenus] = useState(Array(6).fill(false));
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobMenu = () => {
    setMobMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : false))
    );
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenus((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : false))
    );
  };

  const isDropdownActive = (dropdownPaths) => {
    return dropdownPaths.some((path) => location.pathname.startsWith(path));
  };

  const handleScrollToPartners = () => {
    navigate("/");
    setTimeout(() => {
      if (partnersRef && partnersRef.current) {
        partnersRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <header>
      <div className="container">
        <div className="headerTop flex alignItemsCenter justifyContentBetween">
          <Link to={"/"} className="headerTopLogo">
            <img src={logo} alt="Innab logo" />
          </Link>
          <div className="headerTopRight flex alignItemsCenter justifyContentBetween">
            <SocialNetworks gap={"3.2rem"} />
            <div className="headerTopTools flex alignItemsCenter">
              <ul className="headerTopContact flex alignItemsCenter">
                <li>
                  <Link to={"tel:+994502906121"}>
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
                    (+994) 50 290 61 21
                  </Link>
                </li>
                <li>
                  <Link to={"mailto:info@innab.org"}>
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
                    info@innab.org
                  </Link>
                </li>
              </ul>
              <form action="" className="headerTopLang">
                <select name="" id="">
                  <option value="AZ">AZ</option>
                  <option value="RU">RU</option>
                  <option value="EN">EN</option>
                </select>
              </form>
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
      <form action="" className={`searchForm ${searchBarOpen ? "open" : ""}`}>
        <div className="searchBar" id="">
          <button name="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.12507 1.25C11.9221 1.25 15.0001 4.32821 15.0001 8.12536C15.0001 9.68585 14.4803 11.1249 13.6043 12.2788L18.4739 17.1542C18.8398 17.5205 18.8394 18.1141 18.4731 18.48C18.1068 18.8459 17.5132 18.8456 17.1473 18.4792L12.2783 13.6049C11.1245 14.4809 9.68549 15.0007 8.12507 15.0007C4.32807 15.0007 1.25 11.9225 1.25 8.12536C1.25 4.32821 4.32807 1.25 8.12507 1.25ZM8.12507 3.125C5.36363 3.125 3.125 5.36372 3.125 8.12536C3.125 10.887 5.36363 13.1257 8.12507 13.1257C10.8865 13.1257 13.1251 10.887 13.1251 8.12536C13.1251 5.36372 10.8865 3.125 8.12507 3.125Z"
                fill="#333333"
              />
            </svg>
          </button>
          <input type="search" name="" id="" />
          <button
            type="button"
            name=""
            id=""
            onClick={() => setSearchBarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.71967 4.71967C5.01256 4.42678 5.48744 4.42678 5.78033 4.71967L10 8.93934L14.2197 4.71967C14.5126 4.42678 14.9874 4.42678 15.2803 4.71967C15.5732 5.01256 15.5732 5.48744 15.2803 5.78033L11.0607 10L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L10 11.0607L5.78033 15.2803C5.48744 15.5732 5.01256 15.5732 4.71967 15.2803C4.42678 14.9874 4.42678 14.5126 4.71967 14.2197L8.93934 10L4.71967 5.78033C4.42678 5.48744 4.42678 5.01256 4.71967 4.71967Z"
                fill="#333333"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className={`headerBottom ${mobMenuOpen ? "opened" : ""}`}>
        {searchBarOpen ? (
          <div className="container">
            <form action="">
              <div className={`searchBar ${searchBarOpen ? "open" : ""}`} id="">
                <button name="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.92893 7.92893C9.73721 6.12066 12.2389 5 15 5C17.7611 5 20.2628 6.12066 22.0711 7.92893C23.8793 9.73721 25 12.2389 25 15C25 17.7611 23.8793 20.2628 22.0711 22.0711C20.2628 23.8793 17.7611 25 15 25C12.2389 25 9.73721 23.8793 7.92893 22.0711C6.12066 20.2628 5 17.7611 5 15C5 12.2389 6.12066 9.73721 7.92893 7.92893ZM15 7.5C12.9286 7.5 11.0553 8.3381 9.6967 9.6967C8.3381 11.0553 7.5 12.9286 7.5 15C7.5 17.0714 8.3381 18.9447 9.6967 20.3033C11.0553 21.6619 12.9286 22.5 15 22.5C17.0714 22.5 18.9447 21.6619 20.3033 20.3033C21.6619 18.9447 22.5 17.0714 22.5 15C22.5 12.9286 21.6619 11.0553 20.3033 9.6967C18.9447 8.3381 17.0714 7.5 15 7.5Z"
                      fill="#3138E3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.6243 21.3565C22.1124 20.8684 22.9039 20.8684 23.392 21.3565L28.1435 26.108C28.6316 26.5961 28.6316 27.3876 28.1435 27.8757C27.6553 28.3639 26.8639 28.3639 26.3757 27.8757L21.6243 23.1243C21.1361 22.6361 21.1361 21.8447 21.6243 21.3565Z"
                      fill="#3138E3"
                    />
                  </svg>
                </button>
                <input type="search" name="" id="" />
                <button
                  type="button"
                  name=""
                  id=""
                  onClick={() => setSearchBarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M7.19216 7.19216C7.63847 6.74584 8.36209 6.74584 8.8084 7.19216L16.0003 14.3831L23.1922 7.19216C23.6041 6.78018 24.2524 6.74848 24.7007 7.09708L24.8084 7.19216C25.2547 7.63847 25.2547 8.36209 24.8084 8.8084L17.6174 16.0003L24.8084 23.1922C25.2204 23.6041 25.2521 24.2524 24.9035 24.7007L24.8084 24.8084C24.3621 25.2547 23.6385 25.2547 23.1922 24.8084L16.0003 17.6174L8.8084 24.8084C8.39642 25.2204 7.74816 25.2521 7.29982 24.9035L7.19216 24.8084C6.74584 24.3621 6.74584 23.6385 7.19216 23.1922L14.3831 16.0003L7.19216 8.8084C6.78018 8.39642 6.74848 7.74816 7.09708 7.29982L7.19216 7.19216Z"
                      fill="#808080"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <nav className="navbar flex alignItemsCenter justifyContentBetween container">
            <ul className="navbarMenu flex alignItemsCenter">
              <li className="navbarMenuDy">
                <NavLink
                  className={({ isActive }) =>
                    `${openDropdowns[0] ? "opened" : ""} ${
                      isDropdownActive(["/about", "/vacancies", "/contact"])
                        ? "active"
                        : ""
                    }`
                  }
                >
                  Haqqımızda
                  {!openDropdowns[0] ? (
                    <svg
                      onClick={() => toggleDropdown(0)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(0)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
                <ul
                  className={`dropdown dy flex justifyContentBetween ${
                    openDropdowns[0] ? "open" : ""
                  }`}
                >
                  <li>
                    <Link to={"about"}>Haqqımızda</Link>
                  </li>
                  <li>
                    <Link to={"about/vacancies"}>Vakansiyalar</Link>
                  </li>
                  <li>
                    <Link to={"about/contact"}>Əlaqə</Link>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to={"trainings"}
                  end
                  className={openDropdowns[1] ? "opened" : ""}
                >
                  Təlimlər
                  {!openDropdowns[1] ? (
                    <svg
                      onClick={() => toggleDropdown(1)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(1)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
                <ul
                  className={`dropdown flex justifyContentBetween ${
                    openDropdowns[1] ? "open" : ""
                  }`}
                >
                  <li>
                    <p>
                      Data analitika
                      {!openSubMenus[0] ? (
                        <svg
                          onClick={() => toggleSubMenu(0)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                            fill="#333333"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleSubMenu(0)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                            fill="#3138E3"
                          />
                        </svg>
                      )}
                    </p>
                    <ul className={`${openSubMenus[0] ? "open" : ""}`}>
                      <li>
                        <Link>Data analitika</Link>
                      </li>
                      <li>
                        <Link>MS Excel</Link>
                      </li>
                      <li>
                        <Link>Biznes Statistikas</Link>
                      </li>
                      <li>
                        <Link>SQL</Link>
                      </li>
                      <li>
                        <Link>Database Developer</Link>
                      </li>
                      <li>
                        <Link>Power Bİ</Link>
                      </li>
                      <li>
                        <Link>Data Reporting (Bİ)</Link>
                      </li>
                      <li>
                        <Link>Python</Link>
                      </li>
                      <li>
                        <Link>R</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      Mühasibatlıq
                      {!openSubMenus[1] ? (
                        <svg
                          onClick={() => toggleSubMenu(1)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                            fill="#333333"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleSubMenu(1)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                            fill="#3138E3"
                          />
                        </svg>
                      )}
                    </p>
                    <ul className={`${openSubMenus[1] ? "open" : ""}`}>
                      <li>
                        <Link>Mühasibat uçotu və 1 C</Link>
                      </li>
                      <li>
                        <Link>Vergi uçotu</Link>
                      </li>
                      <li>
                        <Link>ACCA F3</Link>
                      </li>
                      <li>
                        <Link>PMS</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      Komputer bacarıqları
                      {!openSubMenus[2] ? (
                        <svg
                          onClick={() => toggleSubMenu(2)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                            fill="#333333"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleSubMenu(2)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                            fill="#3138E3"
                          />
                        </svg>
                      )}
                    </p>
                    <ul className={`${openSubMenus[2] ? "open" : ""}`}>
                      <li>
                        <Link>MS Office</Link>
                      </li>
                      <li>
                        <Link>MS Excel</Link>
                      </li>
                      <li>
                        <Link>VBA</Link>
                      </li>
                      <li>
                        <Link>MOSE</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      İnsan resursları
                      {!openSubMenus[3] ? (
                        <svg
                          onClick={() => toggleSubMenu(3)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                            fill="#333333"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleSubMenu(3)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                            fill="#3138E3"
                          />
                        </svg>
                      )}
                    </p>
                    <ul className={`${openSubMenus[3] ? "open" : ""}`}>
                      <li>
                        <Link>Əmək məcəlləsi</Link>
                      </li>
                      <li>
                        <Link>HR Data analitikası</Link>
                      </li>
                      <li>
                        <Link>HR Assisent</Link>
                      </li>
                      <li>
                        <Link>İnsan Resursları İdarə Edilməsi</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      Yumuşaq səriştələr
                      {!openSubMenus[4] ? (
                        <svg
                          onClick={() => toggleSubMenu(4)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                            fill="#333333"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleSubMenu(4)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                            fill="#3138E3"
                          />
                        </svg>
                      )}
                    </p>
                    <ul className={`${openSubMenus[4] ? "open" : ""}`}>
                      <li>
                        <Link>SMM</Link>
                      </li>
                      <li>
                        <Link>Praktiki satış</Link>
                      </li>
                      <li>
                        <Link>Biznes Proseslərin İdarə Edilməsi</Link>
                      </li>
                      <li>
                        <Link>Dövlət satınalmaları</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      Digər Təlimlər
                      {!openSubMenus[5] ? (
                        <svg
                          onClick={() => toggleSubMenu(5)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                            fill="#333333"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleSubMenu(5)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                            fill="#3138E3"
                          />
                        </svg>
                      )}
                    </p>
                    <ul className={`${openSubMenus[5] ? "open" : ""}`}>
                      <li>
                        <Link>SMM</Link>
                      </li>
                      <li>
                        <Link>Praktiki satış</Link>
                      </li>
                      <li>
                        <Link>Biznes Proseslərin İdarə Edilməsi</Link>
                      </li>
                      <li>
                        <Link>Dövlət satınalmaları</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to={"corporative"}
                  className={openDropdowns[2] ? "opened" : ""}
                >
                  Korporativ
                  {!openDropdowns[2] ? (
                    <svg
                      onClick={() => toggleDropdown(2)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(2)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"projects"}
                  className={openDropdowns[3] ? "opened" : ""}
                >
                  Lahiyələr
                  {!openDropdowns[3] ? (
                    <svg
                      onClick={() => toggleDropdown(3)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(3)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"career-center"}
                  className={openDropdowns[4] ? "opened" : ""}
                >
                  Karyera mərkəzi
                  {!openDropdowns[4] ? (
                    <svg
                      onClick={() => toggleDropdown(4)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(4)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
              </li>
              <li className="navbarMenuDy">
                <NavLink
                  className={({ isActive }) =>
                    `${openDropdowns[5] ? "opened" : ""} ${
                      isDropdownActive(["/useful-for-you"]) ? "active" : ""
                    }`
                  }
                >
                  Sizə faydalı
                  {!openDropdowns[5] ? (
                    <svg
                      onClick={() => toggleDropdown(5)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(5)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
                <ul
                  className={`dropdown dy flex justifyContentBetween ${
                    openDropdowns[5] ? "open" : ""
                  }`}
                >
                  <li>
                    <Link to={"useful-for-you/video-lessons"}>
                      Video dərslər
                    </Link>
                  </li>
                  <li>
                    <Link to={"useful-for-you/blog"}>Bloq</Link>
                  </li>
                  <li>
                    <Link to={"useful-for-you/seminar-and-webinar"}>
                      Seminar ve Vebinar
                    </Link>
                  </li>
                  <li>
                    <Link to={"useful-for-you/career-calculator"}>
                      Karyera Kalkulyatoru
                    </Link>
                  </li>
                  <li>
                    <Link to={"useful-for-you/workshops"}>Vorkshoplar</Link>
                  </li>
                  <li>
                    <Link to={"useful-for-you/internships"}>
                      Teqaud Proqramlari
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to={"#partners"}
                  onClick={handleScrollToPartners}
                  className={openDropdowns[6] ? "opened" : ""}
                >
                  Partnyorluqlar
                  {!openDropdowns[6] ? (
                    <svg
                      onClick={() => toggleDropdown(6)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(6)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </Link>
              </li>
              <li>
                <NavLink
                  to={"news"}
                  className={openDropdowns[7] ? "opened" : ""}
                >
                  Xəbərlər
                  {!openDropdowns[7] ? (
                    <svg
                      onClick={() => toggleDropdown(7)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3.25C10.4142 3.25 10.75 3.58579 10.75 4V9.24999L16 9.25C16.4142 9.25 16.75 9.58579 16.75 10C16.75 10.4142 16.4142 10.75 16 10.75L10.75 10.75V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58581 16.75 9.25002 16.4142 9.25002 16V10.75H4C3.58579 10.75 3.25 10.4142 3.25 9.99999C3.25 9.58578 3.58579 9.24999 4 9.24999H9.25002V4C9.25002 3.58579 9.58581 3.25 10 3.25Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => toggleDropdown(7)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"
                        fill="#3138E3"
                      />
                    </svg>
                  )}
                </NavLink>
              </li>
            </ul>

            <div className="headerBottomRight flex alignItemsCenter justifyContentBetween">
              <button
                type="button"
                name="openSearchBar"
                onClick={() => setSearchBarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.92893 7.92893C9.73721 6.12066 12.2389 5 15 5C17.7611 5 20.2628 6.12066 22.0711 7.92893C23.8793 9.73721 25 12.2389 25 15C25 17.7611 23.8793 20.2628 22.0711 22.0711C20.2628 23.8793 17.7611 25 15 25C12.2389 25 9.73721 23.8793 7.92893 22.0711C6.12066 20.2628 5 17.7611 5 15C5 12.2389 6.12066 9.73721 7.92893 7.92893ZM15 7.5C12.9286 7.5 11.0553 8.3381 9.6967 9.6967C8.3381 11.0553 7.5 12.9286 7.5 15C7.5 17.0714 8.3381 18.9447 9.6967 20.3033C11.0553 21.6619 12.9286 22.5 15 22.5C17.0714 22.5 18.9447 21.6619 20.3033 20.3033C21.6619 18.9447 22.5 17.0714 22.5 15C22.5 12.9286 21.6619 11.0553 20.3033 9.6967C18.9447 8.3381 17.0714 7.5 15 7.5Z"
                    fill="#3138E3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.6243 21.3565C22.1124 20.8684 22.9039 20.8684 23.392 21.3565L28.1435 26.108C28.6316 26.5961 28.6316 27.3876 28.1435 27.8757C27.6553 28.3639 26.8639 28.3639 26.3757 27.8757L21.6243 23.1243C21.1361 22.6361 21.1361 21.8447 21.6243 21.3565Z"
                    fill="#3138E3"
                  />
                </svg>
              </button>
              <div className="headerBottomSocials flexDirectionColumn">
                <p>Bizi izləyin</p>
                <SocialNetworks gap="2rem" />
              </div>
              <Button title={"Müraciət et"} to={"#contact"} color="orange" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
