import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLanguages,
  setLanguage,
} from "../../features/languages/languageSlice";
import { useNavigate, useParams } from "react-router";

const LangForm = () => {
  const { lang } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    dispatch(setLanguage(selectedLang));

    const newUrl = window.location.pathname.replace(
      `/${lang}`,
      `/${selectedLang}`
    );
    navigate(newUrl);
  };

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <form action="" className="headerTopLang">
      <select
        name="language"
        id="language"
        onChange={handleLanguageChange}
        value={lang}
      >
        {languages.map((lang) => (
          <option key={lang.site_code} value={lang.site_code}>
            {lang.site_code}
          </option>
        ))}
      </select>
    </form>
  );
};

export default LangForm;
