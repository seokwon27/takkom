import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccinations = async (supabaseClient: SupabaseDatabase, childId: string) => {
  const { data, error } = await supabaseClient
    .from("vaccine_record")
    .select("id, created_at, child_id, vaccine(id, disease_name, vaccine_turn)")
    .eq("child_id", childId);

  if (error) throw Error("접종내역 데이터를 가져오는데 실패했습니다.");

  return data;
};
