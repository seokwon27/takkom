import { Child } from "@/types/childType";
import { SupabaseDatabase } from "@/types/supabaseDataType";

export const getChildInfo = async (supabaseClient: SupabaseDatabase, userId: string) => {
  const { data, error } = await supabaseClient.from("child").select("*").eq("user_id", userId); // user_id로 필터링

  if (error) throw new Error(error.message);

  return (data as Child[]) || []; // null 또는 undefined 처리
};
