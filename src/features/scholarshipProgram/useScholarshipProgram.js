import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

export const useScholarshipProgram = (lang) => {
  return useQuery({
    queryKey: ["programs", lang],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${lang}/get_scholarshipprogram`
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
