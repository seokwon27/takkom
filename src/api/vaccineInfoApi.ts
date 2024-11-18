import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccineInfo = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient
    .from("vaccine_duplicate")
    .select("*")
    .order("disease_name", { ascending: true })
    .order("vaccine_name", { ascending: true })
    .order("vaccine_turn", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
