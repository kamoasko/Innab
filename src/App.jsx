import React from "react";
import "./style.css";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateRoutes } from "./routes";
import { useMenus } from "./features/menus/useMenu";

function App() {
  const { selectedLanguage } = useSelector((state) => state.languages);
  const { data: menuData, status } = useMenus(selectedLanguage);

  const routes = useRoutes(generateRoutes(menuData || [], selectedLanguage));

  return <>{status === "success" && routes}</>;
}

export default App;
