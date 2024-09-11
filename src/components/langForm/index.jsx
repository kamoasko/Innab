import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguages } from "../../features/languages/languageSlice";

const LangForm = () => {
  const { lang } = useParams();
  const { data: languages, status, error } = useLanguages();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;

    // Invalidate the language-related queries when language is changed
    queryClient.invalidateQueries(["languages"]);

    const newUrl = window.location.pathname.replace(
      `/${lang}`,
      `/${selectedLang}`
    );
    navigate(newUrl);
  };

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
            onChange={handleLanguageChange}
            value={lang}
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
