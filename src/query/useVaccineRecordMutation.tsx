import { addVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddVaccineRecordMutationProps {
  child_id: string;
  vaccine_id: string;
}

export const useAddVaccineRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ child_id, vaccine_id }: AddVaccineRecordMutationProps) => addVaccineRecord(child_id, vaccine_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine_record"]
      });
    }
  });
};
