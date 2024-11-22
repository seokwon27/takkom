import { updateChildInfo } from "@/api/childInfoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateChildMutationProps {
  userId: string;
  childId: string;
  name: string;
  birth: string;
  notes?: string;
  profile?: string;
}
export const useUpdateChildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // child 정보를 업데이트하는 함수
    mutationFn: ({ childId, name, birth, notes, profile }: UpdateChildMutationProps) =>
      updateChildInfo(childId, name, birth, notes, profile),
    onSuccess: (_, { userId, childId }) => {
      // 쿼리 키를 useChildInfoQuery에서 사용한 것과 동일하게 설정
      queryClient.invalidateQueries({
        queryKey: ["child_info", userId]
      });
    },
    onError: (error) => {
      console.error("자식 정보 업데이트 중 오류 발생:", error);
    }
  });
};
