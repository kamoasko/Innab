import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useSeminarWebinar = (lang) => {
  return useQuery({
    queryKey: ["seminarWebinar", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_vebinar`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useWorkshops = (lang) => {
  return useQuery({
    queryKey: ["workshops", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_workshop`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
