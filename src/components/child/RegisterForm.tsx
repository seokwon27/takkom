"use client";

import { useState } from "react";
import RegisterChildInfo from "@/app/child/register/steps/RegisterChildInfo";
import RegisterChildRecord from "@/app/child/register/steps/RegisterChildRecord";
import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";
import BackButton from "../ui/back-button";
import { useRouter } from "next/navigation";

interface ChildCardProps {
  child?: Child;
  userId: string;
}
const RegisterForm: React.FC<ChildCardProps> = ({ userId }) => {
  const router = useRouter();
  // 만약 `child`가 주어지지 않았다면 빈 객체로 초기화
  const [childInfo, setChildInfo] = useState<Partial<Child>>({});
  const [step, setStep] = useState(1); // 기본적으로 1단계로 설정됨

  const handleNext = (data: Partial<Child>) => {
    setChildInfo((prev) => ({ ...prev, ...data }));
    setStep((prevStep) => prevStep + 1); // 상태가 설정된 후에 step을 업데이트
  };

  // 이전 단계로 돌아가는 함수
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // 아이 정보를 최종 등록하는 함수 -- 수정 전
  // const handleComplete = async () => {
  //   try {
  //     // 아이 정보 등록
  //     const { data, error } = await browserClient
  //       .from("child") // "child" 테이블에 데이터 추가
  //       .insert([{ ...childInfo, user_id: userId }]); // userId를 포함하여 등록

  //     if (error) {
  //       throw error; // 에러 발생 시 예외 처리
  //     }

  //     console.log("아이 등록 완료:", data); // 등록 완료 로그
  //   } catch (error) {
  //     console.error("아이 등록 중 오류 발생:", error); // 등록 오류 처리
  //   }
  // };

  const handleComplete = async () => {
    try {
      if (!childInfo.id) {
        throw new Error("아이디가 없습니다. 유효한 아이디를 입력해 주세요.");
      }

      // 중복 데이터 확인
      const { data: existingData, error: selectError } = await browserClient
        .from("child")
        .select("*")
        .eq("id", childInfo.id) // `childInfo.id`는 중복 체크에 사용되는 필드
        .single(); // 단일 결과 반환

      if (selectError && selectError.code !== "PGRST116") {
        // selectError가 발생했고, 결과가 없는 경우가 아니라면
        throw selectError;
      }

      if (existingData) {
        // 기존 데이터가 있으면 업데이트
        const { error: updateError } = await browserClient
          .from("child")
          .update({ ...childInfo, user_id: userId })
          .eq("id", childInfo.id);

        if (updateError) {
          throw updateError;
        }
        //  console.log("아이 정보 업데이트 완료:", childInfo.id);
      } else {
        // 기존 데이터가 없으면 새로 삽입
        const { error: insertError } = await browserClient.from("child").insert([{ ...childInfo, user_id: userId }]);

        if (insertError) {
          throw insertError;
        }

        //  console.log("아이 등록 완료:", childInfo.id);
      }
    } catch (error) {
      console.error("아이 등록 중 오류 발생:", error); // 등록 오류 처리
    }
  };

  const handleBackButton = () => {
    if (step === 1) {
      router.back();
    }
    setStep(1);
  };

  return (
    <div>
      <div className="flex w-full items-start px-6 py-1.5 md:hidden">
        <BackButton onBack={handleBackButton} />
      </div>
      {step === 1 ? (
        <RegisterChildInfo onNext={handleNext} userId={userId} childInfo={childInfo} />
      ) : (
        <RegisterChildRecord child={childInfo as Child} onPrev={handlePrevious} onComplete={handleComplete} />
      )}
    </div>
  );
};

export default RegisterForm;
