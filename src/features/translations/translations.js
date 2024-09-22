import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
export const fetchTranslations = async (lang, group, keywords) => {
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
  return useQuery({
    queryKey: ["translations", lang, group, keywords],
    queryFn: () => fetchTranslations(lang, group, keywords),
    staleTime: Infinity, // Cache translations indefinitely
    cacheTime: Infinity, // Keep the translations in cache
    onError: (error) => {
      console.error("Error fetching translations:", error);
    },
  });
};
