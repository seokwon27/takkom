import { useQuery } from "@tanstack/react-query";
import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";
import { getChildInfo } from "@/api/childInfoApi";

// 아이 정보 가져오기 쿼리 함수
export const fetchChildInfo = async (userId: string, childId: string): Promise<Child | null> => {
  if (!userId || !childId) {
    throw new Error("userId와 childId가 필요합니다.");
  }
  // getChildInfo 함수를 호출하여 아이의 정보를 서버에서 가져옴
  const data = await getChildInfo(browserClient, userId, childId);
  return data;
};

// useChildInfoQuery 훅 정의 - 수정 전
export const useChildInfoQuery = (userId: string | undefined, childId: string | undefined) => {
  return useQuery({
    queryKey: ["childInfo", userId, childId], // userId를 쿼리 키에 포함시킴
    queryFn: () => fetchChildInfo(userId!, childId!), // userId를 전달
    enabled: !!userId && !!childId,
  });
};