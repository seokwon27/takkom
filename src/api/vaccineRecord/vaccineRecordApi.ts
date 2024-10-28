import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccineRecord = async (supabaseClient: SupabaseDatabase, childId: string) => {
  const { data, error } = await supabaseClient
    .from("vaccine_record")
    .select("vaccine_id, vaccine(disease_name, vaccine_turn)")
    .eq("child_id", childId);

  if (error) throw Error("접종내역 데이터를 가져오는데 실패했습니다.");

  return data;
};
