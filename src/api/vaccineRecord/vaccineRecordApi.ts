import { Child } from "@/types/childType";
import { SupabaseDatabase } from "@/types/supabaseDataType";
import { Vaccine } from "@/types/vaccineType";
import browserClient from "@/utils/supabase/client";

export const getVaccineRecord = async (supabaseClient: SupabaseDatabase, childId?: string) => {
  if (!childId) {
    throw new Error("childId가 없습니다.");
  }
  const { data, error } = await supabaseClient.from("vaccine_record").select("vaccine_id").eq("child_id", childId);

  if (error) throw Error(error.message);

  return data;
};

export const addVaccineRecord = async (childId: Child["id"], vaccineId: Vaccine["id"]) => {
  const { data, error } = await browserClient
    .from("vaccine_record")
    .insert({ child_id: childId, vaccine_id: vaccineId });

  if (error) throw Error(error.message);

  return data;
};

export const deleteVaccineRecord = async (childId: Child["id"], vaccineId: Vaccine["id"]) => {
  const { error } = await browserClient
    .from("vaccine_record")
    .delete()
    .eq("child_id", childId)
    .eq("vaccine_id", vaccineId);

  if (error) throw Error(error.message);
};
