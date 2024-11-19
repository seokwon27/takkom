import { SupabaseDatabase } from "@/types/supabaseDataType";

// supabase에서 로그인 정보 가져오기
export const getUser = async (supabaseClient: SupabaseDatabase) => {
  const {
    data: { user },
    error
  } = await supabaseClient.auth.getUser();

  if (error || !user) {
    console.error(error);
    return null;
  }

  return user;
};

// child table에서 사용자가 등록한 아이들 정보 가져오기
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


// like table에서 사용자가 좋아요한 병원 목록 가져오기
export const getUserLike = async (supabaseClient: SupabaseDatabase, userId: string) => {
  if (userId) {
    const { data, error } = await supabaseClient.from("like").select().eq("user_id", userId);

    if (error) {
      console.error(error.message);
      return [];
    }

    return data;
  } else {
    return [];
  }
};
