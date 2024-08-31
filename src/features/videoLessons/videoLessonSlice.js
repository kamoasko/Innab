import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useVideoLessonCategory = (lang) => {
  return useQuery({
    queryKey: ["videoLessonCategory", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_videolessonscategory`
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useVideoLessonContent = (lang, videoSlug) => {
  return useQuery({
    queryKey: ["videoLessonContent", lang, videoSlug],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_videolesson_content/${videoSlug}`
      );

      const links = response.data?.map((link) => link.links);

      return {
        data: response.data,
        links: links.flat(Infinity)[0],
      };
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useVideoLessons = (lang, categoryId) => {
  return useQuery({
    queryKey: ["videoLessons", lang, categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_videolessons/${categoryId}`
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
