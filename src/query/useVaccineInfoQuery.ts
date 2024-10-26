import { getVaccineInfo } from "@/api/vaccineInfoApi";
import browserClient from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useVaccineInfoQuery = () => {
  return useQuery({
    queryKey: ["vaccineInfo"],
    queryFn: () => getVaccineInfo(browserClient)
  });
};
