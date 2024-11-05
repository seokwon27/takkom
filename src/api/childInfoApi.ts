import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getChildInfo = async (client: SupabaseDatabase, userId: string, childId: string) => {
  const { data, error } = await client.from("child").select("*").eq("user_id", userId).eq("id", childId).single();

  if (error) throw new Error(error.message);

  return data;
};
