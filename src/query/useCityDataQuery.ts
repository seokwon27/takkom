import { getBrtcCd, getRegionInfo } from "@/api/hospital-actions";
import { useQuery } from "@tanstack/react-query";

export const fetchCityData = async () => {
  const brtcRes = await getBrtcCd();
  const brtcObj = Object.entries(brtcRes);

  const regionRes = await getRegionInfo();

  return { brtcObj, regionRes };
};

export const useCityDataQuery = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCityData
  });
};
