import { getChildInfo } from "@/api/childInfoApi";
import browserClient from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useChildInfoQuery = (userId: string) => {
  return useQuery({
    queryKey: ["child", userId], // userId를 쿼리 키에 포함시킴
    queryFn: () => getChildInfo(browserClient, userId) // userId를 전달
  });
};
