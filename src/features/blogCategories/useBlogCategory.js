import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useBlogCategories = (lang) => {
  return useQuery({
    queryKey: ["blogCategories", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_blogcategory`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
