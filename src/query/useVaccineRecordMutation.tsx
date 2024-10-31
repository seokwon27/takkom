import { addVaccineRecord, deleteVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VaccineRecordMutationProps {
  child_id: string;
  vaccine_id: string;
}

export const useAddVaccineRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ child_id, vaccine_id }: VaccineRecordMutationProps) => addVaccineRecord(child_id, vaccine_id),
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
    mutationFn: ({ child_id, vaccine_id }: VaccineRecordMutationProps) => deleteVaccineRecord(child_id, vaccine_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine_record"]
      });
    }
  });
};
