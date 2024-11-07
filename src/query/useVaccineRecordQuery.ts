import { getVaccines, getVaccineSchedule } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";
import { Child } from "@/types/childType";
import { SupabaseDatabase } from "@/types/supabaseDataType";
import browserClient from "@/utils/supabase/client";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";
import { useQuery } from "@tanstack/react-query";

export const useVaccineQuery = () => {
  return useQuery({
    queryKey: ["vaccines"],
    queryFn: async () => {
      const vaccines = await getVaccines(browserClient);
      return groupVaccines(vaccines);
    }
  });
};

export const useVaccineRecordQuery = (childId?: Child["id"]) => {
  return useQuery({
    queryKey: ["vaccine_record", childId],
    queryFn: async () => {
      const records = await getVaccineRecord(browserClient, childId);
      return records.map((record) => record.vaccine_id);
    },
    enabled: !!childId
  });
};

export const useVaccineScheduleQuery = (supabaseClient: SupabaseDatabase) => {
  return useQuery({
    queryKey: ["vaccine_schedule"],
    queryFn: () => getVaccineSchedule(supabaseClient),
    staleTime: Infinity
  });
};
