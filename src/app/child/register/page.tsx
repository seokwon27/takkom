"use client"
import RegisterForm from "@/components/child/RegisterForm";
import browserClient from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const RegisterPage = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await browserClient.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUserId(data.user.id); // userId를 설정합니다.
      }
    };

    fetchUser();
  }, []); // 컴포넌트가 마운트될 때 사용자 정보를 가져옵니다.

  return (
    <div className="flex justify-center items-center h-screen">
      <div>아이 등록하기 페이지</div>
      <RegisterForm userId={userId} />
    </div>
  );
};

export default RegisterPage;
