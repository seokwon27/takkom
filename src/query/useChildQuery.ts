import { useMutation, useQuery } from "@tanstack/react-query";
import browserClient, { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import { Child } from "@/types/childType";
import { SupabaseDatabase } from "@/types/supabaseDataType";
import { getChildren } from "@/api/userApi";

// 자식 정보 조회
export const fetchChildInfo = async (userId: string, childId: string): Promise<Child | null> => {
  const { data, error } = await browserClient
    .from("child")
    .select("*")
    .eq("id", childId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch child info:", error);
    return null;
  }
  return data as Child;
};

export const useChildInfoQuery = (userId?: string, childId?: string) => {
  return useQuery({
    // 쿼리 키에 userId와 childId를 포함해 캐싱 및 데이터 유효성 관리
    queryKey: ["childInfo", userId, childId],
    // fetchChildInfo 함수를 사용해 쿼리 실행: userId, childId를 전달
    queryFn: () => fetchChildInfo(userId!, childId!),
    // userId와 childId가 모두 유효할 때만 쿼리가 실행되도록 설정
    enabled: !!userId && !!childId
  });
};

// 프로필 이미지 삭제
export const useDeleteProfileImageMutation = (childId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data: childData, error: fetchError } = await browserClient
        .from("child")
        .select("profile")
        .eq("id", childId)
        .single();

      if (fetchError) {
        throw new Error(`Failed to fetch child profile image: ${fetchError.message}`);
      }

      const profilePath = childData?.profile?.replace(`${process.env.SUPABASE_STORAGE_URL}/profiles/`, "");

      if (profilePath && profilePath !== DEFAULT_PROFILE_IMAGE_URL) {
        const { error: deleteError } = await browserClient.storage.from("profiles").remove([profilePath]);

        if (deleteError) {
          throw new Error(`Failed to delete profile image: ${deleteError.message}`);
        }
      }

      const { error: updateError } = await browserClient
        .from("child")
        .update({ profile: DEFAULT_PROFILE_IMAGE_URL })
        .eq("id", childId);

      if (updateError) {
        throw new Error(`Failed to update child profile: ${updateError.message}`);
      }
    }
  });
};


// 사용자의 아이들 정보 가져오기
export const useChildrenQuery = (supabaseClient: SupabaseDatabase, userId?: string) => {
  return useQuery({
    queryKey: ["child_info", userId],
    queryFn: () => getChildren(supabaseClient, userId),
    enabled: !!userId
  });
};