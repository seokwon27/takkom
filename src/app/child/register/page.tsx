"use client"
import { useUserQuery } from "@/api/userApi";
import RegisterForm from "@/components/child/RegisterForm";
import browserClient from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const RegisterPage = () => {
  // useUserQuery를 이용하여 현재 로그인한 사용자 정보를 가져옵니다.
  const { user, isUserLoading, isUserError } = useUserQuery(browserClient);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;
  return (
    <div className="flex justify-center items-center h-screen">
      <div>아이 등록하기 페이지</div>
      <RegisterForm userId={user?.id || ""} /> {/* userId를 props로 전달 */}
    </div>
  );
};

export default RegisterPage;
