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
    mutationFn: ({ childId, vaccineId }: VaccineRecordMutationProps) =>
      deleteVaccineRecord(childId, vaccineId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine_record"]
      });
    }
  });
};
