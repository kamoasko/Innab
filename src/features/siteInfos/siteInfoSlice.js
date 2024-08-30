import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useSiteInfos = (lang) => {
  return useQuery({
    queryKey: ["infos", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_siteinfo`);

      return response.data;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
