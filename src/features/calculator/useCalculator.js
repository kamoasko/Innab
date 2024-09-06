import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useCalcDatas = (lang) => {
  return useQuery({
    queryKey: ["calcdatas", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/calculator/getCalculatorDatas`
      );

      return response;
    },
  });
};
