import React, { useContext } from "react";
import { Skeleton } from "@mui/material";
import { useLanguages } from "../../features/languages/languageSlice";
import { LanguageContext } from "../../App";

const LangForm = () => {
  const { data: languages, status, error } = useLanguages();
  const { selectedLanguage, handleLanguageChange } =
    useContext(LanguageContext);

  if (status === "loading") {
    return <Skeleton variant="rectangular" width={50} height={30} />;
  }

  if (status === "error") {
    return <div>{error}</div>;
  }

  return (
    <>
      {status === "success" && (
        <form className="headerTopLang">
          <select
            name="language"
            id="language"
            onChange={(e) => handleLanguageChange(e.target.value)}
            value={selectedLanguage}
          >
            {languages?.map((lang) => (
              <option key={lang.site_code} value={lang.site_code}>
                {lang.site_code}
              </option>
            ))}
          </select>
        </form>
      )}
    </>
  );
};

export default LangForm;
