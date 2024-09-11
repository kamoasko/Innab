import React from "react";
import "./style.css";
import { useRoutes } from "react-router-dom";
import { generateRoutes } from "./routes";
import { useMenus } from "./features/menus/useMenu";
import { Box } from "@mui/material";
import { useLanguages } from "./features/languages/languageSlice";

function App() {
  const { data: languages, status, error } = useLanguages();
  const selectedLanguage = languages?.[0]?.site_code || "az"; // Set default language as 'az' if not available
  const {
    data: menuData,
    status: menuStatus,
    error: menuError,
  } = useMenus(selectedLanguage);

  const routes = useRoutes(generateRoutes(menuData || [], selectedLanguage));

  if (menuStatus === "error") {
    return <Box>{menuError}</Box>;
  }

  return <>{menuStatus === "success" && routes}</>;
}

export default App;
