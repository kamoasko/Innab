import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/get_langs`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
