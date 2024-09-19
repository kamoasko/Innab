import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useGetCustomers = (lang) => {
  return useQuery({
    queryKey: ["customers", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_customers`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
