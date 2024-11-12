"use client";

import { useState } from "react";
import RegisterChildInfo from "@/app/child/register/steps/RegisterChildInfo";
import RegisterChildRecord from "@/app/child/register/steps/RegisterChildRecord";
import { Child } from "@/types/childType";
import browserClient from "@/utils/supabase/client";
import { FormProvider, useForm } from "react-hook-form";

interface ChildCardProps {
  child?: Child;
  userId: string;
}

const RegisterForm: React.FC<ChildCardProps> = ({ userId }) => {
  // 만약 `child`가 주어지지 않았다면 빈 객체로 초기화
  // const [childInfo, setChildInfo] = useState<Partial<Child>>({});
  const [step, setStep] = useState(1); // 기본적으로 1단계로 설정됨

  // 여기에서 form을 생성하고 context provider로 감싸주어야함....
  // -> 체크박스 폼에
  // useForm 통합
  const form = useForm({
    defaultValues: {
      name: "",
      birth: "",
      notes: "",
      selectVaccines: []
    }
  });

  // 다음 단계로 이동하는 함수
  // const handleNext = (data: Partial<Child>) => {
  //   setChildInfo((prev) => ({ ...prev, ...data }));
  //   setStep(step + 1);
  //   console.log("다음버튼 클릭됨, 아이 아이디 : ", childInfo.id);
  // };

  // const handleNext = (data: Partial<Child>) => {
  //   setChildInfo((prev) => {
  //     const updatedChildInfo = { ...prev, ...data };
  //     console.log("다음버튼 클릭됨, 아이 아이디 : ", updatedChildInfo.id);
  //     return updatedChildInfo;
  //   });
  //   setStep(step + 1);
  // };

  // 잠시 안녕
  // const handleNext = (data: Partial<Child>) => {
  //   setChildInfo((prev) => ({ ...prev, ...data }));
  //   setStep((prevStep) => prevStep + 1); // 상태가 설정된 후에 step을 업데이트
  // };

  //  const handleNext = (data: Partial<Child>) => {
  //    form.setValue("name", data.name || "");
  //    form.setValue("birth", data.birth || "");
  //    formMethods.setValue("notes", data.notes || "");
  //    setStep(step + 1);
  //  };

  // 이전 단계로 돌아가는 함수
  // const handlePrevious = () => {
  //   setStep(step - 1);
  //   console.log("이전버튼 클릭됨, 아이 아이디 : ", childInfo.id);
  // };

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

  // 수정 2
  // const handleComplete = async () => {
  //   // 중복 데이터 확인
  //   const { data: existingData, error } = await browserClient.from("child").select("*").eq("id", childInfo.id);

  //   if (existingData && existingData.length > 0) {
  //     alert("이미 등록된 아이디입니다. 다른 아이디를 사용해주세요.");
  //     return;
  //   }

  //   // 중복이 없을 경우 데이터 삽입
  //   const { error: insertError } = await browserClient.from("child").insert([data]);

  //   if (insertError) {
  //     console.error("아이 등록 중 오류 발생:", insertError.message);
  //   } else {
  //     alert("아이 등록이 완료되었습니다.");
  //   }
  // }


  // 수정3
  // const handleComplete = async () => {
  //   try {
  //     if (!childInfo.id) {
  //       throw new Error("아이디가 없습니다. 유효한 아이디를 입력해 주세요.");
  //     }

  //     // 중복 데이터 확인
  //     const { data: existingData, error: selectError } = await browserClient
  //       .from("child")
  //       .select("*")
  //       .eq("id", childInfo.id) // `childInfo.id`는 중복 체크에 사용되는 필드
  //       .single(); // 단일 결과 반환

  //     if (selectError && selectError.code !== "PGRST116") {
  //       // selectError가 발생했고, 결과가 없는 경우가 아니라면
  //       throw selectError;
  //     }

  //     if (existingData) {
  //       // 기존 데이터가 있으면 업데이트
  //       const { error: updateError } = await browserClient
  //         .from("child")
  //         .update({ ...childInfo, user_id: userId })
  //         .eq("id", childInfo.id);

  //       if (updateError) {
  //         throw updateError;
  //       }

  //       console.log("아이 정보 업데이트 완료:", childInfo.id);
  //     } else {
  //       // 기존 데이터가 없으면 새로 삽입
  //       const { error: insertError } = await browserClient.from("child").insert([{ ...childInfo, user_id: userId }]);

  //       if (insertError) {
  //         throw insertError;
  //       }

  //       console.log("아이 등록 완료:", childInfo.id);
  //     }
  //   } catch (error) {
  //     console.error("아이 등록 중 오류 발생:", error); // 등록 오류 처리
  //   }
  // };

  // const handleComplete = async (data: Partial<Child>) => {
  //   try {
  //     const childData = { ...data, user_id: userId };

  //     const { error } = await browserClient.from("child").insert([childData]);

  //     if (error) {
  //       throw error;
  //     }
  //     console.log("아이 등록 완료:", data);
  //   } catch (error) {
  //     console.error("아이 등록 중 오류 발생:", error);
  //   }
  // };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  const handleComplete = async (data) => {
    try {
      const { id } = data;
      const { data: existingData, error: selectError } = await browserClient
        .from("child")
        .select("*")
        .eq("id", id)
        .single();

      if (selectError && selectError.code !== "PGRST116") throw selectError;

      if (existingData) {
        const { error: updateError } = await browserClient
          .from("child")
          .update({ ...data, user_id: userId })
          .eq("id", id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await browserClient.from("child").insert([{ ...data, user_id: userId }]);
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error("아이 등록 중 오류 발생:", error);
    }
  };
  
  return (
    <div>
      <FormProvider {...form}>
        {step === 1 ? (
          <RegisterChildInfo onNext={handleNext} />
        ) : (
          <RegisterChildRecord onPrev={handlePrevious} onComplete={handleComplete} />
        )}
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
