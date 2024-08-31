import { useState } from "react";
import { useBlogCategories } from "../../features/blogCategories/blogCategorySlice";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import SocialNetworks from "../SocialNetworks";
import Button from "../Button";
import { useMenus } from "../../features/menus/useMenu";
import { Skeleton } from "@mui/material";

const Navbar = ({ partnersRef }) => {
  const [openDropdowns, setOpenDropdowns] = useState(Array(7).fill(false));
  const [openSubMenus, setOpenSubMenus] = useState(Array(6).fill(false));
  const { lang } = useParams();
  const { data: menus, status, error } = useMenus(lang);
  // const { data: videoCategories } = useVideoData(lang);
  // const { data: blogCategories } = useBlogCategories(lang);
  const location = useLocation();
  const navigate = useNavigate();

  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);
  const aboutMenu = menus?.filter((menu) => menu.parent_id === 3);
  const usefulMenu = menus?.filter((menu) => menu.parent_id === 8);

  // const categorySlug = videoCategories[0]?.slug;
  //   const blogCategorySlug = blogCategories[0]?.slug;

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

  if (status === "error") {
    return <Box>{error}</Box>;
  }

  if (status === "pending") {
    return <Skeleton />;
  }

  return (
    <>
      {status === "success" && (
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
                {parentMenu[0].title}
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
                  <Link to={aboutMenu[0]?.slug}>{aboutMenu[0]?.title}</Link>
                </li>
                <li>
                  <Link to={`${parentMenu[0]?.slug}/${aboutMenu[1]?.slug}`}>
                    {aboutMenu[1].title}
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[0]?.slug}/${aboutMenu[2]?.slug}`}>
                    {aboutMenu[2]?.title}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to={"trainings"}
                end
                className={openDropdowns[1] ? "opened" : ""}
              >
                {parentMenu[1].title}
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
                to={parentMenu[2].slug}
                className={openDropdowns[2] ? "opened" : ""}
              >
                {parentMenu[2].title}
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
            <li className="navbarMenuDy">
              <NavLink
                to={"#"}
                className={({ isActive }) =>
                  `${openDropdowns[3] ? "opened" : ""} ${
                    isDropdownActive(["/55-derse-excel-kitabi", "/mini-mba"])
                      ? "active"
                      : ""
                  }`
                }
              >
                {parentMenu[3].title}
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
              <ul
                className={`dropdown dy flex justifyContentBetween ${
                  openDropdowns[3] ? "open" : ""
                }`}
              >
                <li>
                  <Link to={`${parentMenu[3].slug}/55-derse-excel-kitabi`}>
                    "55 dərsə Excel" kitabı
                  </Link>
                </li>
                <li>
                  <Link to={"projects/mini-mba"}>Mini MBA</Link>
                </li>
              </ul>
            </li>
            <li className="navbarMenuDy">
              <NavLink
                to={"career-center"}
                className={({ isActive }) =>
                  `${openDropdowns[4] ? "opened" : ""} ${
                    isDropdownActive([
                      `/${parentMenu[4]?.slug}/employment-or-graduate-project`,
                      "/issizlikdir",
                      "/cooperation-with-dma",
                    ])
                      ? "active"
                      : ""
                  }`
                }
              >
                {parentMenu[4].title}
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
              <ul
                className={`dropdown dy flex justifyContentBetween ${
                  openDropdowns[4] ? "open" : ""
                }`}
              >
                <li>
                  <Link
                    to={`${parentMenu[4]?.slug}/employment-or-graduate-project`}
                  >
                    İşlə təminat və ya məzun layihəsi
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[4]?.slug}/issizlikdir`}>
                    İşSizlikdir
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[4]?.slug}/cooperation-with-dma`}>
                    DMA ilə əməkdaşlıq
                  </Link>
                </li>
              </ul>
            </li>
            <li className="navbarMenuDy">
              <NavLink
                className={({ isActive }) =>
                  `${openDropdowns[5] ? "opened" : ""} ${
                    isDropdownActive([
                      `${parentMenu[5].slug}/${usefulMenu[0].slug}/data-analitika`,
                    ])
                      ? "active"
                      : ""
                  }`
                }
              >
                {parentMenu[5].title}
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
                  <Link
                    to={`${parentMenu[5].slug}/${usefulMenu[0].slug}/data-analitika`}
                  >
                    {usefulMenu[0].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${parentMenu[5].slug}/${usefulMenu[1].slug}/data-analitika`}
                  >
                    {usefulMenu[1].title}
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[5].slug}/${usefulMenu[2].slug}`}>
                    {usefulMenu[2].title}
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[5].slug}/career-calculator`}>
                    Karyera Kalkulyatoru
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[5].slug}/${usefulMenu[4].slug}`}>
                    {usefulMenu[4].title}
                  </Link>
                </li>
                <li>
                  <Link to={`${parentMenu[5].slug}/${usefulMenu[3].slug}`}>
                    {usefulMenu[3].title}
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
                {parentMenu[6].title}
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
                to={parentMenu[7].slug}
                className={openDropdowns[7] ? "opened" : ""}
              >
                {parentMenu[7].title}
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
    </>
  );
};

export default Navbar;
