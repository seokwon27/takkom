"use client";

import { useState } from "react";
import RegisterChildInfo from "@/app/child/register/steps/RegisterChildInfo";
import RegisterChildRecord from "@/app/child/register/steps/RegisterChildRecord";
import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";

interface ChildCardProps {
  child?: Child;
  userId: string;
}

const RegisterForm: React.FC<ChildCardProps> = ({ userId }) => {
  // 만약 `child`가 주어지지 않았다면 빈 객체로 초기화
  const [childInfo, setChildInfo] = useState<Partial<Child>>({});
  const [step, setStep] = useState(1); // 기본적으로 1단계로 설정됨

  // 다음 단계로 이동하는 함수
  const handleNext = (data: Partial<Child>) => {
    setChildInfo((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  // 이전 단계로 돌아가는 함수
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // 아이 정보를 최종 등록하는 함수
  const handleComplete = async () => {
    try {
      const supabase = browserClient;

      // 아이 정보 등록
      const { data, error } = await supabase
        .from("child") // "child" 테이블에 데이터 추가
        .insert([{ ...childInfo, user_id: userId }]); // userId를 포함하여 등록

      if (error) {
        throw error; // 에러 발생 시 예외 처리
      }

      console.log("아이 등록 완료:", data); // 등록 완료 로그
    } catch (error) {
      console.error("아이 등록 중 오류 발생:", error); // 등록 오류 처리
    }
  };

  return (
    <div>
      {step === 1 ? (
        <RegisterChildInfo onNext={handleNext} userId={userId} childInfo={childInfo} />
      ) : (
        <RegisterChildRecord child={childInfo as Child} onPrev={handlePrevious} onComplete={handleComplete} />
      )}
    </div>
  );
};

export default RegisterForm;
