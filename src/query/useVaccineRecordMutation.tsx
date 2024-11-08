import { addVaccineRecord, deleteVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VaccineRecordMutationProps {
  childId: string;
  vaccineId: string;
}

export const useAddVaccineRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ childId, vaccineId }: VaccineRecordMutationProps) => addVaccineRecord(childId, vaccineId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine_record"]
      });
    }
  });
};

export const useDeleteVaccineRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ childId: child_id, vaccineId: vaccine_id }: VaccineRecordMutationProps) =>
      deleteVaccineRecord(child_id, vaccine_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine_record"]
      });
    }
  });
};

// childedit에서는 없고 useChilInfoQuery 쿼리키를 가지고 사용해라.
// 프로필 쿼리 키를 인벨리드 해라.
// editChildForm 이미지 업로드 함수 텐스텍쿼리 사용, 프로필 이미지 삭제 함수도 텐스텍쿼리