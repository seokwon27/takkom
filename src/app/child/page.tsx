"use client";
import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import browserClient from "@/utils/supabase/client";
import { useChildrenQuery, useUserQuery } from "@/api/userApi";
import Link from "next/link";

const ChildPage = () => {
  // useUserQuery를 이용하여 현재 로그인한 사용자 정보를 가져옵니다.
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // userId가 설정된 후에만 useChildrenQuery 호출
  const userId = user?.id; // 현재 로그인한 사용자의 ID를 설정
  const { data: children, isLoading, error } = useChildrenQuery(browserClient, userId);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // userId가 로드될 때까지 로딩 표시
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <div>
      <h1>우리 아이 접종</h1>
      <RegisterButton />
      {children && children.length > 0 ? ( // children 배열을 확인
        children.map((child) => (
          <ChildCard key={child.id} child={child} /> // 각 child 정보를 ChildCard로 전달
        ))
      ) : (
        <p>등록된 아이가 없습니다.</p>
      )}
    </div>
  );
};

export default ChildPage;
