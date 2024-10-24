"use client";
import { Child } from "@/app/child/page";
import RegisterStep1 from "@/app/child/register/steps/RegisterStep1";
import RegisterStep2 from "@/app/child/register/steps/RegisterStep2";
import { useState } from "react";

interface ChildCardProps {
  child: Child;
}

const RegisterForm = ({ child }: ChildCardProps) => {
  const [step, setStep] = useState(1); // 기본적으로 1단계로 설정됨
  const [childInfo, setChildInfo] = useState<Child>(child);

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
    // 페이지 이동 또는 상태 업데이트 등 추가 로직
  };

  return (
    <div>
      {step === 1 && <RegisterStep1 onNext={handleNext} child={child} />}
      {step === 2 && <RegisterStep2 />}
    </div>
  );
};

export default RegisterForm;
