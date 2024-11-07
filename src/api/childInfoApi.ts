import { SupabaseDatabase } from "@/types/supabaseDataType";

// 아이 정보를 가져오는 API 함수: 주어진 userId와 childId로 아이 정보 조회
export const getChildInfo = async (client: SupabaseDatabase, userId: string, childId: string) => {
  // 데이터베이스에서 user_id와 id가 일치하는 아이 정보를 단일 레코드로 조회
  const { data, error } = await client.from("child").select("*").eq("user_id", userId).eq("id", childId).single();

  // 에러가 발생할 경우 에러 메시지를 포함해 예외를 발생
  if (error) throw new Error(error.message);

  return data;
};
