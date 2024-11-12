import { getHospitalsMutliConditions } from "@/api/hospital-actions";
import { defaultHospitalData } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";

export const useHospitalQuery = (brtcCd: string, sggCd: string, addr: string, org: string, disease: string) => {
  return useQuery({
    queryKey: ["hospital", brtcCd, sggCd, org, addr, disease],
    queryFn: async () => {
      if (brtcCd && sggCd) return getHospitalsMutliConditions({ brtcCd, sggCd, org, addr, disease });
      else {
        return defaultHospitalData;
      }
    },
    enabled: !!brtcCd && !!sggCd,
    staleTime: Infinity
  });
};
