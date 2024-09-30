import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../../axios";

export const useTranslations = (group) => {
  return useQuery({
    queryKey: ["translations", group],
    queryFn: async () => {
      const response = await axiosInstance.get(`/get_translate/${group}`);

      return response?.translates;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
