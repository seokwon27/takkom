import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccineInfo = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient.from("vaccineinfo").select();

  if (error) throw new Error(error.message);

  return data;
};
