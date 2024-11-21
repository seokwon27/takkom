import { useQuery } from "@tanstack/react-query";
import { getHospitalsMutliConditions } from "@/api/hospital-actions";
import { HospitalData } from "@/types/hospital";

// 검색 결과가 없을 때 기본값
const DEFAULT_HOSPITAL_DATA: HospitalData = { items: [], totalCount: 0, maxPage: 1 };

export const useHospitalQuery = (brtcCd: string, sggCd: string, addr: string, org: string, disease: string) => {
  return useQuery({
    queryKey: ["hospital", brtcCd, sggCd, org, addr, disease],
    queryFn: async () => {
      if (brtcCd && sggCd) return getHospitalsMutliConditions({ brtcCd, sggCd, org, addr, disease });
      else {
        return DEFAULT_HOSPITAL_DATA;
      }
    },
    enabled: !!brtcCd && !!sggCd,
    staleTime: Infinity
  });
};
