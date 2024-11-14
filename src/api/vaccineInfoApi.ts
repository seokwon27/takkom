import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getVaccineInfo = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient
    .from("vaccine_duplicate")
    .select()
    .order("disease_name", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};
