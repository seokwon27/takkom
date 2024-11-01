import { SupabaseDatabase } from "@/types/supabaseDataType";
import { useQuery } from "@tanstack/react-query";

// supabase에서 로그인 정보 가져오기
export const getUser = async (supabaseClient: SupabaseDatabase) => {
  const {
    data: { user },
    error
  } = await supabaseClient.auth.getUser();

  if (error || !user) {
    console.error(error);
    return;
  }

  return user;
};

// 로그인 정보 가져오기
export const useUserQuery = (supabaseClient: SupabaseDatabase) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery({
    queryKey: ["user", "client"],
    queryFn: () => getUser(supabaseClient)
  });

  return { user, isUserLoading, isUserError };
};

// supabase에서 children table에서 user가 등록한 아이들 정보 가져오기
export const getChildren = async (supabaseClient: SupabaseDatabase, userId?: string) => {
  if (userId) {
    const { data, error } = await supabaseClient.from("child").select().eq("user_id", userId);

    if (error) {
      console.error(error.message);
      return [];
    }

    return data;
  } else {
    return [];
  }
};

// 사용자의 아이들 정보 가져오기
export const useChildrenQuery = (supabaseClient: SupabaseDatabase, userId?: string) => {
  return useQuery({
      queryKey: ["child_info", userId],
      queryFn: () => getChildren(supabaseClient, userId),
      enabled: !!userId
    });
};
