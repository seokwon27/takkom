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
import { useToast } from "@/hooks/use-toast";
import { ToastDescription } from "@/components/ui/toast";

interface RegisterChildRecordProps {
  child: Child; // child prop 추가
  onPrev: () => void;
  onComplete: () => void;
}

const RegisterChildRecord = ({ child, onPrev, onComplete }: RegisterChildRecordProps) => {
  const { toast } = useToast();
  
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
    toast({
      description: <ToastDescription className="text-white">등록이 완료되었습니다.</ToastDescription>,
      variant: "mobile",
    });
  };

  return (
    <div className="container flex flex-col mx-auto justify-center max-w-[792px] mt-16 max-sm:mt-3 max-sm:px-6">
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

      <div className="relative mb-10 max-sm:mb-5">
        <Image src={Vaccination11} alt="백신 아이콘" className="w-20 h-20 object-cover max-sm:w-14 max-sm:h-14" />
        <Image
          src={Vaccination12}
          alt="백신 아이콘의 그림자"
          className="absolute top-2 left-2 w-20 h-20 object-cover max-sm:w-14 max-sm:h-14"
        />
      </div>

      <div className="inline-flex flex-col items-start gap-3 relative mb-14">
        <h1 className="self-stretch mt-[-1.00px] font-heading-XXL text-gray-900 text-[32px] font-bold">2단계</h1>
        <h2 className="w-fit text-gray-400">접종 완료한 내역을 선택해주세요.</h2>
      </div>

      <CheckboxForm childId={child?.id} onSuccess={onSuccess}>
        <div className="flex flex-row justify-between">
          <Button
            type="button"
            onClick={onPrev}
            className="mt-4 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500"
          >
            이전
          </Button>
          <Button
            type="submit"
            onClick={onComplete}
            className="mt-4 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500"
          >
            완료
          </Button>
        </div>
      </CheckboxForm>
    </div>
  );
};

export default RegisterChildRecord;
