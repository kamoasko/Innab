import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

const apiUrl = "https://admin.innab.coder.az/api";

const fetchTranslations = async (lang, group, keyword) => {
  try {
    const response = await axios.get(`${apiUrl}/${lang}/get_translate`, {
      params: { group, keyword },
    });
    return response.data.data.value;
  } catch (error) {
    console.error("Error fetching translation:", error);
    return keyword; // Fallback to keyword if fetch fails
  }
};

i18next.use(initReactI18next).init({
  lng: "az", // Default language
  fallbackLng: "az", // Fallback language
  debug: true,
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
  resources: {}, // We will dynamically load translations
});

export const changeLanguage = async (lang, group, keyword) => {
  const translation = await fetchTranslations(lang, group, keyword);
  i18next.addResource(lang, group, keyword, translation);
  i18next.changeLanguage(lang);
};

export default i18next;
