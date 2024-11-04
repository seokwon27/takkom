"use client";
import { useEffect } from "react";
import { Child } from "@/types/childType";
import CheckboxForm from "@/components/vaccinerecord/CheckboxForm";
import browserClient from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
  }, [child.id]);

  // const onSubmit = (data: Partial<Child>) => {
  //   console.log("접종 내역:", data);
  //   onComplete(); // 완료 처리
  // };

  console.log("등록하려는 아이의 ID:", child.id);

  const router = useRouter();
  const onSuccess = () => {
    router.push(`/child`);
  };

  return (
    <div>
      <h1>2단계</h1>
      <h2>접종 완료한 내역을 선택해주세요.</h2>
      <CheckboxForm child_id={child?.id} onSuccess={onSuccess} />
      <Button type="button" onClick={onPrev} className="mt-4">
        이전
      </Button>
      <Button type="submit" onClick={onComplete} className="mt-4">
        완료
      </Button>
    </div>
  );
};

export default RegisterStep2;
