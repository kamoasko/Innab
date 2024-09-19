import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useCorporatives = (lang) => {
  return useQuery({
    queryKey: ["corporatives", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_corporative`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
