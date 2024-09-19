import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useGetPartners = (lang) => {
  return useQuery({
    queryKey: ["partners", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_partners`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
