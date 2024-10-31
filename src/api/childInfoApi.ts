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

  if (error) throw new Error(error.message);

  return data; 
};

// 새롭게 추가된 updateChildInfo 함수
export const updateChildInfo = async (
  client: SupabaseDatabase,
  childId: string,
  updatedInfo: Partial<Child>
) => {
  const { data, error } = await client
    .from("child")
    .update(updatedInfo)
    .eq("id", childId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};