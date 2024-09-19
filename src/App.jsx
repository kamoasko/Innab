import React, { useState, useEffect } from "react";
import "./style.css";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { generateRoutes } from "./routes";
import { useMenus } from "./features/menus/useMenu";
import { Box } from "@mui/material";
import { useLanguages } from "./features/languages/useLanguages";

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

  const routes = useRoutes(generateRoutes(menuData || [], selectedLanguage));

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

  return (
    <>
      {menuStatus === "success" && (
        <LanguageContext.Provider
          value={{ selectedLanguage, handleLanguageChange }}
        >
          {routes}
        </LanguageContext.Provider>
      )}
    </>
  );
}

export default App;

export const LanguageContext = React.createContext();
