import axiosInstance from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const useStatistics = (lang) => {
  return useQuery({
    queryKey: ["statistics", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_headerdatas`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
