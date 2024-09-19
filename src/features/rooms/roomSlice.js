import axiosInstance from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRooms = (lang) => {
  return useQuery({
    queryKey: ["corporatives", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_rooms`);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
