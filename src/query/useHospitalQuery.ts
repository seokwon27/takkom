import { getHospitalsMutliConditions } from "@/api/hospital-actions";
import { defaultHospitalData } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";

export const useHospitalQuery = (brtcCd: string, sggCd: string, addr: string, org: string, disease: string) => {
  return useQuery({
    queryKey: ["hospital", brtcCd, sggCd, addr, org, disease],
    queryFn: async () => {
      if (brtcCd && sggCd) return getHospitalsMutliConditions({ brtcCd, sggCd, addr, org, disease });
      else {
        return defaultHospitalData;
      }
    },
    enabled: !!brtcCd && !!sggCd,
    staleTime: Infinity
  });
};
