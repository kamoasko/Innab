import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useMenus = (lang) => {
  return useQuery({
    queryKey: ["menus", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${lang}/get_menu`);

      return response.data;
    },
  });
};
