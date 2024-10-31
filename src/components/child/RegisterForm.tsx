"use client";

import { useState } from "react";
import RegisterStep1 from "@/app/child/register/steps/RegisterStep1";
import RegisterStep2 from "@/app/child/register/steps/RegisterStep2";
import { Child } from "@/types/childType";

interface ChildCardProps {
  child?: Child;
  user_id: string;
}

const RegisterForm: React.FC<ChildCardProps> = ({ child, user_id }) => {
  // 만약 `child`가 주어지지 않았다면 빈 객체로 초기화
  const [childInfo, setChildInfo] = useState<Child>(
    child || {
      id: "",
      name: "",
      birth: "",
      notes: "",
      created_at: new Date().toISOString(), // 현재시간으로 초기화
      profile: null,
      updated_at: null,
      user_id: user_id // 부모로부터 받은 userId 사용
    }
  );
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
  const handleComplete = () => {
    // API를 통해 아이 정보 등록하기
    console.log("아이 등록 완료:", childInfo);
    // 페이지 이동 또는 상태 업데이트 등 서버에 데이터 저장 로직 추가
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      {step === 1 ? (
        <RegisterStep1 onNext={handleNext} child={childInfo} />
      ) : (
        <RegisterStep2 child={childInfo} onPrev={handlePrevious} onComplete={handleComplete} />
      )}
    </div>
  );
};

export default RegisterForm;
