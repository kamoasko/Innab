import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useProjectOrCareer = (lang) => {
  return useQuery({
    queryKey: ["projectOrCareer", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_projects`);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useProOrCarContent = (lang, slug) => {
  return useQuery({
    queryKey: ["proOrCarContent", lang, slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_project/${slug}`);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
