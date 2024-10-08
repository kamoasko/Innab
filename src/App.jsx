import React, { useState, useEffect } from "react";
import "./style.css";
import "./general.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useMenus } from "./features/menus/useMenu";
import { Box } from "@mui/material";
import { useLanguages } from "./features/languages/useLanguages";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import VacanciesPage from "./pages/VacanciesPage";
import ContactPage from "./pages/ContactPage";
import TrainingsPage from "./pages/TrainingsPage";
import Corporative from "./pages/Corporative";
import Projects from "./pages/Projects";
import CareerCenter from "./pages/CareerCenter";
import VideoLessons from "./pages/VideoLessons";
import BlogPage from "./pages/BlogPage";
import CareerCalculator from "./pages/CareerCalculator";
import SeminarWebinar from "./pages/SeminarWebinar";
import NewsPage from "./pages/NewsPage";
import NewsDetail from "./pages/NewsDetail";
import Privacy from "./pages/Privacy";
import NotFoundPage from "./pages/NotFoundPage";
import DetailPage from "./pages/DetailPage";
import VideoGrid from "./components/videosGrid";
import BlogGrid from "./components/blogGrid";
import Scholarships from "./pages/Scholarship";

function App() {
  const { data: languages } = useLanguages();
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages?.find((lang) => lang.ise_default === 1)?.site_code || "az"
  );
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: menuData,
    status: menuStatus,
    error: menuError,
  } = useMenus(selectedLanguage);

  useEffect(() => {
    const langFromPath = location.pathname.split("/")[1];
    if (!langFromPath) {
      navigate(`/${selectedLanguage}`, { replace: true });
    } else if (
      languages &&
      !languages.some((lang) => lang.site_code === langFromPath)
    ) {
      navigate(`/${selectedLanguage}`, { replace: true });
    } else if (langFromPath !== selectedLanguage) {
      setSelectedLanguage(langFromPath);
    }
  }, [location, languages, selectedLanguage, navigate]);

  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang);
    const newPath = `/${newLang}${location.pathname.substring(3)}`;
    navigate(newPath);
  };

  if (menuStatus === "error") {
    return <Box>{menuError}</Box>;
  }

  const parentMenu = menuData?.filter((menu) => menu.parent_id === 0);
  const aboutMenu = menuData?.filter((menu) => menu.parent_id === 3);
  const usefulMenu = menuData?.filter((menu) => menu.parent_id === 8);

  return (
    <>
      {menuStatus === "success" && (
        <LanguageContext.Provider
          value={{ selectedLanguage, handleLanguageChange }}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`${selectedLanguage}`} replace />}
            />
            <Route path=":lang" element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path={parentMenu[0]?.slug}>
                <Route index element={<About />} />
                <Route path={aboutMenu[1]?.slug} element={<VacanciesPage />} />
                <Route path={aboutMenu[2]?.slug} element={<ContactPage />} />
              </Route>
              <Route path={parentMenu[1]?.slug}>
                <Route path=":slug/:trainingSlug" element={<TrainingsPage />} />
              </Route>
              <Route path={parentMenu[2]?.slug} element={<Corporative />} />
              <Route path={parentMenu[3]?.slug}>
                <Route path=":slug" element={<Projects />} />
              </Route>
              <Route path={parentMenu[4]?.slug}>
                <Route path=":slug" element={<CareerCenter />} />
              </Route>
              <Route path={parentMenu[5]?.slug}>
                <Route path={usefulMenu[0]?.slug}>
                  <Route path=":slug" element={<VideoLessons />}>
                    <Route index element={<VideoGrid />} />
                    <Route
                      path=":videoSlug"
                      element={<DetailPage pageTitle={"Video dərslər"} />}
                    />
                  </Route>
                </Route>
                <Route path={usefulMenu[1]?.slug}>
                  <Route path=":slug" element={<BlogPage />}>
                    <Route index element={<BlogGrid />} />
                    <Route
                      path=":blogSlug"
                      element={<DetailPage pageTitle={"Bloq"} blog />}
                    />
                  </Route>
                </Route>
                <Route
                  path={usefulMenu[5]?.slug}
                  element={<CareerCalculator />}
                />
                <Route
                  path={usefulMenu[2]?.slug}
                  element={<SeminarWebinar />}
                />
                <Route
                  path={usefulMenu[4]?.slug}
                  element={<SeminarWebinar workshop />}
                />
                <Route path={usefulMenu[3]?.slug} element={<Scholarships />} />
              </Route>
              <Route path={parentMenu[7]?.slug}>
                <Route index element={<NewsPage />} />
                <Route path=":slug" element={<NewsDetail />} />
              </Route>
              <Route path={parentMenu[9]?.slug} element={<Privacy />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LanguageContext.Provider>
      )}
    </>
  );
}

export default App;

export const LanguageContext = React.createContext();
