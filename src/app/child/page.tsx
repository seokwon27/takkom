"use client";
import React, { useEffect, useState } from "react";
import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import { useChildInfoQuery } from "@/query/useChildQuery";
import browserClient from "@/utils/supabase/client";

const ChildPage = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
        error
      } = await browserClient.auth.getUser();

      if (error) {
        console.error("사용자 정보 가져오기 오류:", error);
      } else if (user) {
        setUserId(user.id); // 현재 로그인한 사용자의 ID를 설정
      }
    };

    fetchUserId();
  }, []);

  // userId가 설정된 후에만 useChildInfoQuery 호출
  const { data: children, isLoading, error } = useChildInfoQuery(userId || "");

  // userId가 로드될 때까지 로딩 표시
  if (userId === null) {
    return <p>로딩 중...</p>;
  }

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
