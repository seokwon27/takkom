import { updateChildInfo } from "@/api/childInfoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateChildMutationProps {
  childId: string;
  name: string;
  birth: string;
  notes?: string;
  profile?: string;
}
export const useUpdateChildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ childId, name, birth, notes, profile }: UpdateChildMutationProps) =>
      updateChildInfo(childId, name, birth, notes, profile),
    onSuccess: () => {
      // 자식 정보를 가져오는 쿼리 키로 캐시를 무효화
      queryClient.invalidateQueries({
        queryKey: ["child"]
      });
    },
    onError: (error) => {
      console.error("자식 정보 업데이트 중 오류 발생:", error);
    }
  });
};
