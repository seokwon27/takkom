import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface RegisterChildData {
  name: string;
  birth: string;
  notes?: string;
  selectedImage?: File;
}

// 이미지 업로드 함수
const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `public/${Date.now()}_${file.name}`; // 고유한 파일 이름 생성
    const { error } = await browserClient.storage.from("profiles").upload(fileName, file, {
      cacheControl: "3600", // 1시간 동안 캐시 유지
      upsert: true // 기존 파일이 있으면 덮어씌움
    });

    if (error) {
      console.error("이미지 업로드 오류:", error);
      return null; // 오류 발생 시 null 반환
    }

    const { data: publicUrlData } = browserClient.storage.from("profiles").getPublicUrl(fileName);
    return publicUrlData?.publicUrl ?? null;
};
  
export const useRegisterChildMutation = (onNext: (data: Partial<Child>) => void) => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ name, birth, notes, selectedImage }: RegisterChildData) => {
        const {
            data: { user },
        } = await browserClient.auth.getUser();

        if (!user) throw new Error("로그인이 필요합니다.");

        const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : "";

        const { data: childData, error } = await browserClient
          .from("child")
          .insert({
            user_id: user.id,
            name,
            birth,
            profile: profileImageUrl ?? "",
            notes: notes ?? ""
          })
          .select()
          .single();

        if (error) throw new Error("데이터 저장 오류: ", error); 
        
        return childData;
    };

    return useMutation({
      mutationFn,
      onSuccess: (childData) => {
        queryClient.invalidateQueries({
          queryKey: ["child"]
        });
        onNext({
          id: childData.id,
          name: childData.name,
          birth: childData.birth,
          notes: childData.notes,
          profile: childData.profile
        });
      },
      onError: (error) => {
        console.error("자녀 정보 등록 중 오류 발생:", error);
      }
    });
};
// export const useRegisterChildMutation = (onNext: (data: Partial<Child>) => void, selectedImage?: File) => { 
//     const queryClient = useQueryClient();
//     return useMutation(
//         async (data: {
//             name: string;
//             birth: string;
//             notes?: string
//         }) => {
//         const {
//           data: { user }
//         } = await browserClient.auth.getUser(); // 사용자 정보 가져오기
//         if (!user) throw new Error("사용자 정보가 없습니다. 로그인이 필요합니다.");

//         // 프로필 이미지 업로드 및 URL 생성
//         const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : "";

//         // Supabase에 아이 정보 저장
//         const { data: childData, error } = await browserClient
//           .from("child")
//           .insert({
//             user_id: user.id,
//             name: data.name,
//             birth: data.birth,
//             profile: profileImageUrl ?? "",
//             notes: data.notes ?? ""
//           })
//           .select()
//           .single();

//         if (error) throw new Error("데이터 저장 오류");

//         return childData;
//       },

//       {
//         onSuccess: (childData) => {
//           queryClient.invalidateQueries(["child"]);
//           onNext({
//             id: childData.id,
//             name: childData.name,
//             birth: childData.birth,
//             notes: childData.notes,
//             profile: childData.profileImageUrl || undefined
//           });
//         },
//         onError: (error) => {
//           console.error("자녀 정보 등록 중 오류 발생:", error);
//         }
//       }
//     // );
// }