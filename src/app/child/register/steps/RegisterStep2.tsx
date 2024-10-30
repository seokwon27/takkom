"use client";
import { useEffect } from "react";
import { Child } from "../../page";
import CheckboxForm from "@/components/vaccinerecord/FormVaccineRecord";
import browserClient from "@/utils/supabase/client";

interface RegisterStep2Props {
  child: Child; // child prop 추가
}

const RegisterStep2 = ({ child }: RegisterStep2Props) => {
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

  console.log("등록하려는 아이의 ID:", child.id);

  return (
    <div>
      <h1>2단계ㅇㅇㅇ</h1>
      <h2>접종 완료한 내역을 선택해주세요.</h2>
      {/* 여기에 접종 리스트 체크리스트 들어 올 예정 */}
      <CheckboxForm child_id={child?.id} />
    </div>
  );
};

export default RegisterStep2;
