import { addLike, cancelLike } from "@/api/userApi";
import { HopsitalItem } from "@/types/hospital";
import { Like } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const convertToLike = (hospitalInfo: HopsitalItem): Like => {
  const {
    orgnm,
    orgcd,
    orgAddr,
    orgTlno,
    expnYmd,
    vcnList: { vcnInfo: tmpInfo }
  } = hospitalInfo;
  const vcnInfo = Array.isArray(tmpInfo) ? tmpInfo : [tmpInfo];
  const hospitalData = {
    created_at: "",
    id: "",
    user_id: "",
    orgnm,
    orgcd,
    orgAddr,
    orgTlno,
    expnYmd,
    vcnInfo: JSON.stringify(vcnInfo)
  };

  return hospitalData;
};

export const useAddLikeMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ hospitalInfo }: { hospitalInfo: HopsitalItem }) => addLike(hospitalInfo),

    // 낙관적 업데이트
    onMutate: async ({ hospitalInfo }: { hospitalInfo: HopsitalItem }) => {
      await queryClient.cancelQueries({ queryKey: ["user", "like", userId ?? ""] });
      const prevLikes = queryClient.getQueryData<Like[]>(["user", "like", userId ?? ""]);

      // 낙관적 업데이트를 위한 임시 데이터
      const newLike: Like = convertToLike(hospitalInfo);

      queryClient.setQueryData<Like[]>(["user", "like", userId ?? ""], (prev) => [...(prev ?? []), newLike]);

      // context에 이전 데이터 넣어둠
      return { prevLikes };
    },

    // 에러가 발생하면 이전 데이터로 변경
    onError: (_, __, context) => {
      if (context?.prevLikes) {
        queryClient.setQueryData<Like[]>(["user", "like", userId ?? ""], context.prevLikes);
      }
    },

    // 성공하면 invalidate
    // onSuccess와 달리 성공해도, 실패해도 모두 실행
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "like", userId ?? ""]
      });
    }
  });
};

export const useCancelLikeMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => cancelLike(id),

    // 낙관적 업데이트
    onMutate: async ({ id }: { id: string }) => {
      await queryClient.cancelQueries({ queryKey: ["user", "like", userId ?? ""] });
      const prevLikes = queryClient.getQueryData<Like[]>(["user", "like", userId ?? ""]);

      queryClient.setQueryData<Like[]>(["user", "like", userId ?? ""], (prev) =>
        prev?.filter((like) => like.id !== id)
      );

      // context에 이전 데이터 넣어둠
      return { prevLikes };
    },

    // 에러가 발생하면 이전 데이터로 변경
    onError: (_, __, context) => {
      if (context?.prevLikes) {
        queryClient.setQueryData<Like[]>(["user", "like", userId ?? ""], context.prevLikes);
      }
    },

    // 성공하면 invalidate
    // onSuccess와 달리 성공해도, 실패해도 모두 실행
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "like", userId ?? ""]
      });
    }
  });
};
