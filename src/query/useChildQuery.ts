import { useQuery } from "@tanstack/react-query";
import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";
import { getChildInfo } from "@/api/childInfoApi";

// 아이 정보 가져오기 비동기 함수: userId와 childId를 사용해 특정 아이의 정보를 가져옴
export const fetchChildInfo = async (userId: string, childId: string): Promise<Child | null> => {
  // userId와 childId가 유효하지 않으면 에러 발생
  if (!userId || !childId) {
    throw new Error("userId와 childId가 필요합니다.");
  }
  // getChildInfo 함수를 호출하여 아이의 정보를 서버에서 가져옴
  const data = await getChildInfo(browserClient, userId, childId);
  return data;
};

// 아이 정보를 가져오는 커스텀 훅 정의
export const useChildInfoQuery = (userId: string | undefined, childId: string | undefined) => {
  return useQuery({
    // 쿼리 키에 userId와 childId를 포함해 캐싱 및 데이터 유효성 관리
    queryKey: ["childInfo", userId, childId],
    // fetchChildInfo 함수를 사용해 쿼리 실행: userId, childId를 전달
    queryFn: () => fetchChildInfo(userId!, childId!),
    // userId와 childId가 모두 유효할 때만 쿼리가 실행되도록 설정
    enabled: !!userId && !!childId
  });
};