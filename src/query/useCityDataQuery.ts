import { getBrtcCd, getRegionInfo } from "@/api/hospital-actions";
import { useQuery } from "@tanstack/react-query";

export const useCityDataQuery = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const brtcRes = await getBrtcCd();
      const brtcObj = Object.entries(brtcRes);

      const regionRes = await getRegionInfo();

      return { brtcObj, regionRes };
    }
  });
};
