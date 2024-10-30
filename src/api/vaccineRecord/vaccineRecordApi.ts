import { Child } from "@/types/childType";
import { SupabaseDatabase } from "@/types/supabaseDataType";
import { Vaccine } from "@/types/vaccineType";
import browserClient from "@/utils/supabase/client";

export const getVaccineRecord = async (supabaseClient: SupabaseDatabase, childId: string) => {
  const { data, error } = await supabaseClient.from("vaccine_record").select("vaccine_id").eq("child_id", childId);

  if (error) throw Error(error.message);

  return data;
};

export const addVaccineRecord = async (child_id: Child["id"], vaccine_id: Vaccine["id"]) => {
  const { data, error } = await browserClient.from("vaccine_record").insert({ child_id, vaccine_id });

  if (error) throw Error(error.message);

  return data;
};
