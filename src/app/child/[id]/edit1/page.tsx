"use client";

import EditChildForm from "@/components/child/EditChildForm";
import browserClient from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useChildInfoQuery } from "@/query/useChildQuery";
import { useUserQuery } from "@/query/useUserQuery";

const ChildInfoEditPage = () => {
  // useParams를 이용해 id 추출
  const { id } = useParams();
  const router = useRouter();

  // 현재 로그인한 사용자 정보 가져옴
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // userId가 설정된 후 아이들 정보 가져오기
  const userId = user?.id;
  const childId = Array.isArray(id) ? id[0] : id;
  const { data: child, isLoading, error } = useChildInfoQuery(userId, childId);
  // console.log(child);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // userId가 로드될 때까지 로딩 표시
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col justify-start items-start w-[588px] gap-20 mx-auto">
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[207px] gap-6">
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[207px] text-[40px] font-bold text-left text-[#303030]">
              수정하기
            </p>
          </div>
        </div>
        {child ? (
          <EditChildForm child={child} onComplete={() => router.push(`/child/`)} />
        ) : (
          <p>아이 정보를 불러올 수 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default ChildInfoEditPage;
