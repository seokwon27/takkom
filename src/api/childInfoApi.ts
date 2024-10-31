import { Child } from "@/types/childType";
import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getChildInfo = async (
  client: SupabaseDatabase,
  userId: string
) => {
  const { data, error } = await client
    .from("child")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data; 
};
