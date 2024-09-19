import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useTrainingCategories = (lang) => {
  return useQuery({
    queryKey: ["trainingsCategories", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_categories`);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useTrainingFaqs = (lang, categoryId) => {
  return useQuery({
    queryKey: ["trainingsCategories", lang, categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_faq/${categoryId}`
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useTrainingTopics = (lang, categoryId) => {
  return useQuery({
    queryKey: ["trainingTopics", lang, categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_trainingsubject/${categoryId}`
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
