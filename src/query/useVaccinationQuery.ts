import { getVaccines } from "@/api/vaccineApi";

import { createClient } from "@/utils/supabase/client";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";

import { useQuery } from "@tanstack/react-query";

export const useVaccinationQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ["vaccines"],
    queryFn: async () => {
      const vaccines = await getVaccines(browserClient);
      return groupVaccines(vaccines);
    }
  });
};
