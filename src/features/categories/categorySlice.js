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
