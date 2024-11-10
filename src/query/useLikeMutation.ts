import { HopsitalItem } from "@/types/hospital";
import browserClient from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    const { data, error } = await browserClient.from("like").delete().eq("id", id);
    console.log(data);

    if (error) throw Error(error.message);
  }
};

export const useAddLikeMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({hospitalInfo}:{hospitalInfo: HopsitalItem}) => addLike(hospitalInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "like", userId ?? '']
      });
    }
  });
};

export const useCancelLikeMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id}: {id?: string}) => cancelLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "like", userId ?? '']
      });
    }
  });
};
