import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";
import { Child } from "@/types/childType";

import { createClient } from "@/utils/supabase/client";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";

import { useQuery } from "@tanstack/react-query";

export const useVaccineQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ["vaccines"],
    queryFn: async () => {
      const vaccines = await getVaccines(browserClient);
      return groupVaccines(vaccines);
    }
  });
};

export const useVaccineRecordQuery = (childId: Child["id"]) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ["vaccine_record", childId],
    queryFn: async () => {
      const records = await getVaccineRecord(browserClient, childId);
      return records.map((record) => record.vaccine_id);
    }
  });
};
