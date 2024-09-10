import axiosInstance from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const useAboutDatas = (lang) => {
  return useQuery({
    queryKey: ["about", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_about`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
