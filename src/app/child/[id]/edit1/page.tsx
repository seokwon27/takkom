"use client";
import { useUserQuery } from "@/api/userApi";
import EditChildForm from "@/components/child/EditChildForm";
import browserClient from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useChildInfoQuery } from "@/query/useChildQuery";

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
  console.log(child);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // userId가 로드될 때까지 로딩 표시
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <>
      <h1>아이 정보 수정하기</h1>
      {child ? (
        <EditChildForm child={child} onComplete={() => router.push(`/child/`)} />
      ) : (
        <p>아이 정보를 불러올 수 없습니다.</p>
      )}
    </>
  );
};

export default ChildInfoEditPage;