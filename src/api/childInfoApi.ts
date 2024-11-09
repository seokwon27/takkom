import { SupabaseDatabase } from "@/types/supabaseDataType";
import browserClient, { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";

// 아이 정보를 가져오는 API 함수: 주어진 userId와 childId로 아이 정보 조회
export const getChildInfo = async (client: SupabaseDatabase, userId: string, childId: string) => {
  // 데이터베이스에서 user_id와 id가 일치하는 아이 정보를 단일 레코드로 조회
  const { data, error } = await client.from("child").select("*").eq("user_id", userId).eq("id", childId).single();

  // 에러가 발생할 경우 에러 메시지를 포함해 예외를 발생
  if (error) throw new Error(error.message);

  return data;
};

// 아이 정보 업데이트
export const updateChildInfo = async (
  childId: string,
  name: string,
  birth: string,
  notes?: string,
  profile?: string
) => {
  const { data, error } = await browserClient
    .from("child")
    .update({
      name,
      birth,
      notes,
      profile
    })
    .eq("id", childId);

  if (error) throw Error(error.message);

  return data;
};

// 프로필 이미지 삭제
export const deleteProfileImage = async (childId: string) => {
  const { data: childData, error: childError } = await browserClient
    .from("child")
    .select("profile")
    .eq("id", childId)
    .single();

  if (childError ?? !childData.profile) throw new Error("이미지 삭제 오류 발생");

  // 프로필 이미지 삭제
  const { error: deleteError } = await browserClient.storage.from("profile").remove([childData.profile]);

  if (deleteError) throw new Error("프로필 이미지 삭제 오류");

  // 기본 이미지로 업데이트
  const { data, error } = await browserClient
    .from("child")
    .update({
      profile: DEFAULT_PROFILE_IMAGE_URL // 기본 이미지로 변경
    })
    .eq("id", childId);

  if (error) throw Error("기본 이미지로 설정하는 중 오류 발생");

  return data;
};
