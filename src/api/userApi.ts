import { HopsitalItem } from "@/types/hospital";
import { SupabaseDatabase } from "@/types/supabaseDataType";
import browserClient from "@/utils/supabase/client";

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
    const { data, error } = await supabaseClient
      .from("like")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false }); // 최근 등록 순

    if (error) {
      console.error(error.message);
      return [];
    }

    return data;
  } else {
    return [];
  }
};

export const addLike = async (hospitalInfo: HopsitalItem) => {
  const {
    orgnm,
    orgcd,
    orgAddr,
    orgTlno,
    expnYmd,
    vcnList: { vcnInfo: tmpInfo }
  } = hospitalInfo;
  const vcnInfo = Array.isArray(tmpInfo) ? tmpInfo : [tmpInfo];
  const hospitalData = { orgnm, orgcd, orgAddr, orgTlno, expnYmd, vcnInfo: JSON.stringify(vcnInfo) };
  const { error } = await browserClient.from("like").insert(hospitalData);

  if (error) throw Error(error.message);
};

export const cancelLike = async (id?: string) => {
  if (id) {
    const { error } = await browserClient.from("like").delete().eq("id", id);

    if (error) throw Error(error.message);
  }
};
