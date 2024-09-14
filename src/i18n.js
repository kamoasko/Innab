import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

const apiUrl = "https://admin.innab.coder.az/api";

const fetchTranslation = async (lang, group, keyword) => {
  try {
    const response = await axios.get(`${apiUrl}/${lang}/get_translate`, {
      params: { group, keyword },
    });
    return { [keyword]: response.data.data.value };
  } catch (error) {
    console.error(`Error fetching translation for ${keyword}:`, error);
    return { [keyword]: keyword }; // Fallback to keyword if fetch fails
  }
};

const fetchTranslations = async (lang, group, keywords) => {
  try {
    // Use Promise.all to fetch all translations in parallel
    const translationsArray = await Promise.all(
      keywords.map((keyword) => fetchTranslation(lang, group, keyword))
    );

    // Merge all translation objects into one object
    const translations = translationsArray.reduce((acc, translation) => {
      return { ...acc, ...translation };
    }, {});

    console.log("Fetched translations:", translations);
    return translations;
  } catch (error) {
    console.error("Error fetching translations:", error);
    return keywords.reduce((acc, keyword) => {
      acc[keyword] = keyword; // Fallback to keyword for each translation
      return acc;
    }, {});
  }
};

i18next.use(initReactI18next).init({
  lng: "az", // Default language
  fallbackLng: "az", // Fallback language
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
  resources: {}, // We will dynamically load translations
});

export const changeLanguage = async (lang, group, keywords) => {
  // Fetch translations for all keywords in parallel
  const translations = await fetchTranslations(lang, group, keywords);

  // Add all translations to i18next
  Object.entries(translations).forEach(([keyword, translation]) => {
    i18next.addResource(lang, group, keyword, translation, { ns: group });
  });

  // Change the language
  i18next.changeLanguage(lang);
};

export default i18next;
