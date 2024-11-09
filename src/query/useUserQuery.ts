import { getUser, getUserLike } from "@/api/userApi";
import { SupabaseDatabase } from "@/types/supabaseDataType";
import { User } from "@supabase/supabase-js";
import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";

// 로그인 정보 가져오기
export const useUserQuery = (supabaseClient: SupabaseDatabase): UseQueryResult<User> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabaseClient)
  });
};

// 로그인 정보 prefetch
export const prefetchUser = async (queryClient: QueryClient, supabaseClient: SupabaseDatabase) => {
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser(supabaseClient)
  });
};

// 로그인 정보 prefetch
export const useUserLike = (supabaseClient: SupabaseDatabase, userId?: string) => {
  return useQuery({
    queryKey: ["user", "like", userId],
    queryFn: () => getUserLike(supabaseClient, userId),
    enabled: !!userId
  });
};
