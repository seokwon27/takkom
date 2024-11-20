"use client";

import RegisterForm from "@/components/child/RegisterForm";
import { useUserQuery } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";

const RegisterPage = () => {
  // 현재 로그인한 사용자 정보를 가져오기 위한 useUserQuery 훅 호출
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;
  
  return (
    <div>
      <RegisterForm userId={user?.id ?? ""} />
    </div>
  );
};

export default RegisterPage;
