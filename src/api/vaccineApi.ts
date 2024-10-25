import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccines = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient.from("vaccine").select();

  if (error) throw Error(error.message);

  return data;
};
