"use client";
import { useEffect } from "react";
import { Child } from "@/types/childType";
import CheckboxForm from "@/components/vaccinerecord/CheckboxForm";
import browserClient from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Vaccination11 from "../../../../../public/vaccinerecord/vaccination1-1.svg";
import Vaccination12 from "../../../../../public/vaccinerecord/vaccination1-2.svg";
import PreIcon from "../../../../../public/icon/preIcon.svg";

interface RegisterChildRecordProps {
  child: Child; // child prop 추가
  onPrev: () => void;
  onComplete: () => void;
}

const RegisterChildRecord = ({ child, onPrev, onComplete }: RegisterChildRecordProps) => {
  //console.log("전달받은 아이 정보: ", child.id);

  // id를 사용하여 Supabase에서 해당 아이의 정보를 가져와
  useEffect(() => {
    const fetchChildData = async () => {
      const { data, error } = await browserClient
        .from("child")
        .select("*")
        .eq("id", child.id) // 전달받은 id로 데이터 조회
        .single();

      if (error) {
        console.error("아이 정보 가져오기 오류났음", error);
      } else {
        console.log("아이 정보:", data);
      }
    };

    fetchChildData();
  }, [browserClient, child.id]);

  const router = useRouter();
  const onSuccess = () => {
    router.push(`/child`);
  };

  return (
    // <div className="container flex flex-col mx-auto justify-center max-w-[588px] mt-16 max-sm:mt-3 max-sm:px-6">
    <div className="flex flex-col gap-14">
      {/* 모바일에서 보이는 레이아웃 */}
      <div className="w-full px-6 py-2 flex items-center gap-6 mb-4 sm:hidden">
        <div className="relative">
          {/* 이전 버튼 */}
          <button onClick={() => router.back()}>
            <Image src={PreIcon} alt="이전" />
          </button>
        </div>
        <div className="flex-1 text-center" style={{ transform: "translateX(-24px)" }}>
          <p className="text-base font-bold text-[#303030]">아이 등록하기</p>
        </div>
      </div>

      <div className="relative mb-20 max-sm:mb-5">
        <Image src={Vaccination11} alt="체크리스트 아이콘" className="w-20 h-20 object-cover max-sm:w-14 max-sm:h-14" />
        <Image
          src={Vaccination12}
          alt="체크리스트 아이콘의 그림자"
          className="absolute top-2 left-2 w-20 h-20 object-cover max-sm:w-14 max-sm:h-14"
        />
      </div>

      {/* <Image src={Vaccination11} alt="Vaccination" className="w-20 h-20 object-cover relative" />
      <Image
        src={Vaccination12}
        alt="Vaccination"
        className="absolute w-[100px] h-[100px] -top-0.5 -left-px object-cover"
      /> */}
      <div className="inline-flex flex-col items-start gap-3 relative max-sm:mb-8">
        <h1 className="self-stretch mt-[-1.00px] font-heading-XXL text-gray-900 text-[32px] font-bold">2단계</h1>
        <h2 className="w-fit text-gray-400">접종 완료한 내역을 선택해주세요.</h2>
      </div>

      <CheckboxForm childId={child?.id} onSuccess={onSuccess}>
        <div className="flex flex-row justify-around mt-20 max-sm:mt-6">
          <Button
            type="button"
            onClick={onPrev}
            className="text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500"
          >
            이전
          </Button>
          <Button
            type="submit"
            onClick={onComplete}
            className="text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500"
          >
            완료
          </Button>
        </div>
      </CheckboxForm>
    </div>
  );
};

export default RegisterChildRecord;
