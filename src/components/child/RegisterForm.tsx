"use client";

import { useState } from "react";
import RegisterStep1 from "@/app/child/register/steps/RegisterStep1";
import RegisterStep2 from "@/app/child/register/steps/RegisterStep2";
import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";

interface ChildCardProps {
  child?: Child;
  userId: string;
}

const RegisterForm: React.FC<ChildCardProps> = ({ child, userId }) => {
  // 만약 `child`가 주어지지 않았다면 빈 객체로 초기화
  const [childInfo, setChildInfo] = useState<Partial<Child>>({});
  const [step, setStep] = useState(1); // 기본적으로 1단계로 설정됨

  // 다음 버튼 핸들러
  const handleNext = (data: Partial<Child>) => {
    setChildInfo((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  // 이전 버튼 핸들러
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // 등록하기 버튼 핸들러
  const handleComplete = async () => {
    try {
      const supabase = browserClient;

      // 아이 정보 등록
      const { data, error } = await supabase
        .from("child") // "child" 테이블에 데이터 추가
        .insert([{ ...childInfo, user_id: userId }]); // userId도 함께 전송

      if (error) {
        throw error; // 에러 발생 시 예외 처리
      }

      console.log("아이 등록 완료:", data); // 등록 완료 후 데이터 출력
      // 페이지 이동 또는 상태 업데이트 등 추가 로직 처리
    } catch (error) {
      console.error("아이 등록 중 오류 발생:", error); // 에러 출력
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      {step === 1 ? (
        // <RegisterStep1 onNext={handleNext} child={childInfo} />
        <RegisterStep1 onNext={handleNext} userId={userId} childInfo={childInfo} />
      ) : (
        <RegisterStep2 child={childInfo as Child} onPrev={handlePrevious} onComplete={handleComplete} />
      )}
    </div>
  );
};

export default RegisterForm;
