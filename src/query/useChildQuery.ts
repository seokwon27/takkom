import { getChildInfo } from "@/api/childInfoApi";
import browserClient from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// userId를 인자로 받아서 쿼리 훅을 만드는 함수
export const useChildInfoQuery = (userId: string) => {
  return useQuery({
    queryKey: ["child", userId], // userId를 쿼리 키에 포함시킴
    queryFn: () => getChildInfo(browserClient, userId) // userId를 전달
  });
};

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import browserClient from "@/utils/supabase/client";
// import { Child } from "@/app/child/page"; // Child 타입 정의를 가져옵니다.

// // 데이터를 가져오는 함수
// export const fetchChildData = async (userId: string): Promise<Child[]> => {
//   try {
//     console.log("Fetching data for userId:", userId);

//     const { data, error } = await browserClient
//       .from("child") // 테이블 이름
//       .select("*") // 가져올 필드
//       .eq("user_id", userId); // user_id 기준 필터링

//     // 쿼리 결과 로그
//     console.log("Query result:", data, error);

//     if (error) {
//       console.error("Supabase error (status:", status, "):", error);
//       throw new Error(error.message);
//     }

//     return data as Child[]; // Child 배열 반환
//   } catch (err) {
//     console.error("Error fetching child data:", err);
//     throw new Error("Failed to fetch child data");
//   }
// };

// // 데이터를 등록하는 함수
// const registerChildData = async (childInfo: Child): Promise<Child> => {
//   const { data, error } = await browserClient.from("child").insert(childInfo).single();

//   if (error) throw new Error(error.message);
//   return data as Child;
// };

// // useQuery 훅을 사용하는 함수
// export const useFetchChildData = (user_id: string) => {
//   return useQuery({
//     queryKey: ["child", user_id],
//     queryFn: () => fetchChildData(user_id),
//     enabled: !!user_id // userId가 있을 때만 쿼리 실행
//   });
// };

// // useMutation 훅을 사용하는 함수
// export const useRegisterChildData = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: registerChildData,
//     onSuccess: () => {
//       // 자녀 데이터를 추가한 후 기존 데이터를 무효화하여 새로 고침
//       queryClient.invalidateQueries({ queryKey: ["child"] });
//     }
//   });
// };
