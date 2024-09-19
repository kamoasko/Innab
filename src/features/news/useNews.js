import axiosInstance from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const useGetNews = (lang, page) => {
  return useQuery({
    queryKey: ["news", lang, page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_news?page=${page ? page : ""}`
      );

      const sortedNews = response?.data?.sort((a, b) => {
        return (b.pined ? 1 : 0) - (a.pined ? 1 : 0);
      });
      return { data: sortedNews, pagination: response?.pagination };
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useGetNewsDetail = (lang, slug) => {
  return useQuery({
    queryKey: ["newsDetail", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_news/${slug}`);

      return response;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
