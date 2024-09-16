import i18next from "i18next";
// import { initReactI18next } from "react-i18next";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "https://admin.innab.coder.az/api";

// Function to fetch a single translation for a keyword
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

// React Query function to fetch translations for multiple keywords
const fetchTranslations = async (lang, group, keywords) => {
  try {
    const translationsArray = await Promise.all(
      keywords.map((keyword) => fetchTranslation(lang, group, keyword))
    );

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

// Hook to use translations in React components
export const useTranslations = (lang, group, keywords) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["translations", lang, group, keywords],
    queryFn: () => fetchTranslations(lang, group, keywords),
    staleTime: Infinity, // Cache translations indefinitely
    cacheTime: Infinity, // Keep the translations in cache
    // onSuccess: (translations) => {
    //   // Once translations are fetched, add them to i18next
    //   Object.entries(translations).forEach(([keyword, translation]) => {
    //     i18next.addResource(lang, group, keyword, translation, { ns: group });
    //   });
    // },
    onError: (error) => {
      console.error("Error fetching translations:", error);
    },
  });
};

// i18next.use(initReactI18next).init({
//   lng: "az", // Default language
//   fallbackLng: "az", // Fallback language
//   debug: true,
//   interpolation: {
//     escapeValue: false, // React already safes from xss
//   },
//   resources: {}, // We will dynamically load translations
// });

// export default i18next;
