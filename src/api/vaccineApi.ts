import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccines = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient.from("vaccine").select().order("vaccine_turn", { ascending: true });

  if (error) throw Error(error.message);

  return data;
};
