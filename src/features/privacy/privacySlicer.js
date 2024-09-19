import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useGetPrivacy = (lang) => {
  return useQuery({
    queryKey: ["privacy", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_privacy`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
