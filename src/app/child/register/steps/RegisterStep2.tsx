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

interface RegisterStep2Props {
  child: Child; // child prop 추가
  onPrev: () => void;
  onComplete: () => void;
}

const RegisterStep2 = ({ child, onPrev, onComplete }: RegisterStep2Props) => {
  // Supabase 클라이언트 생성
  const supabase = browserClient;

  // id를 사용하여 Supabase에서 해당 아이의 정보를 가져와
  useEffect(() => {
    const fetchChildData = async () => {
      const { data, error } = await supabase
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
    // }, [child.id]);
  }, [supabase, child.id]); // 빌드 경고 해결 테스트: supabase를 의존성 배열에 추가

  // console.log("등록하려는 아이의 ID:", child.id);

  const router = useRouter();
  const onSuccess = () => {
    router.push(`/child`);
  };

  return (
    <div className="flex flex-col gap-14">
      <Image src={Vaccination11} alt="Vaccination" className="w-20 h-20 object-cover relative" />
      <div className="inline-flex flex-col items-start gap-3 relative">
        <h1 className="self-stretch mt-[-1.00px] font-heading-XXL text-gray-900 text-[32px] font-bold">2단계</h1>
        <h2 className="w-fit text-gray-400">접종 완료한 내역을 선택해주세요.</h2>
      </div>
      <Image
        src={Vaccination12}
        alt="Vaccination"
        className="absolute w-[100px] h-[100px] -top-0.5 -left-px object-cover"
      />
      <CheckboxForm childId={child?.id} onSuccess={onSuccess}>
        <Button type="button" onClick={onPrev} className="mt-4">
          이전
        </Button>
        <Button type="submit" onClick={onComplete} className="mt-4">
          완료
        </Button>
      </CheckboxForm>
    </div>
  );
};

export default RegisterStep2;
