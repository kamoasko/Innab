import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useTrainingCategories = (lang) => {
  return useQuery({
    queryKey: ["categories", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_categories`);

      return response.data;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useTrainingContent = (lang, categotyId) => {
  return useQuery({
    queryKey: ["trainingContent", lang, categotyId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_trainings/${categotyId}`
      );

      return response.data;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
