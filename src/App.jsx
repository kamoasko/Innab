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
              <Route path="about-us">
                <Route index element={<About />} />
                <Route path="vacancies" element={<VacanciesPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
              <Route path="trainings">
                <Route path=":slug/:trainingSlug" element={<TrainingsPage />} />
              </Route>
              <Route path="corporate" element={<Corporative />} />
              <Route path="projects">
                <Route path=":slug" element={<Projects />} />
              </Route>
              <Route path="career-center">
                <Route path=":slug" element={<CareerCenter />} />
              </Route>
              <Route path={"useful-for-you"}>
                <Route path={"video-lessons"}>
                  <Route path=":slug" element={<VideoLessons />}>
                    <Route index element={<VideoGrid />} />
                    <Route
                      path=":videoSlug"
                      element={<DetailPage pageTitle={"Video dərslər"} />}
                    />
                  </Route>
                </Route>
                <Route path="blog">
                  <Route path=":slug" element={<BlogPage />}>
                    <Route index element={<BlogGrid />} />
                    <Route
                      path=":blogSlug"
                      element={<DetailPage pageTitle={"Bloq"} blog />}
                    />
                  </Route>
                </Route>
                <Route
                  path="career-calculator"
                  element={<CareerCalculator />}
                />
                <Route path="seminar-webinar" element={<SeminarWebinar />} />
                <Route path="workshop" element={<SeminarWebinar workshop />} />
                <Route path="scholarship-programs" element={<Scholarships />} />
              </Route>
              <Route path="news">
                <Route index element={<NewsPage />} />
                <Route path=":slug" element={<NewsDetail />} />
              </Route>
              <Route path="privacy-policy" element={<Privacy />} />
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
