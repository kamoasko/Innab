import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useGetVacancies = (lang) => {
  return useQuery({
    queryKey: ["vacancies", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_vacancy`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
