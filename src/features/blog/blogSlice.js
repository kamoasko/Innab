import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useBlogPosts = (lang, categoryId) => {
  return useQuery({
    queryKey: ["blogPosts", lang, categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_blog/${categoryId}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
