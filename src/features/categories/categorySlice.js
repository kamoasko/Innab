import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useTrainingCategories = (lang) => {
  return useQuery({
    queryKey: ["trainingsCategories", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_categories`);

      return response.data;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useTrainingContent = (lang, categotryId) => {
  return useQuery({
    queryKey: ["trainingContent", lang, categotryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_trainings/${categotryId}`
      );

      return response.data;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
