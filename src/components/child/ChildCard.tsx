"use client";
import React, { useState } from "react";
import browserClient from "@/utils/supabase/client";
import Schedule from "./Schedule";
import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { ToastDescription } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";
import { Child } from "@/types/childType";
import ChildBasicInfo from "./ChildCardBasicInfo";
import ChildCardVaccinationInfo from "./ChildCardVaccinationInfo";

type ChildCardProps = {
  child?: Child; // 등록된 child가 없으면 undefined일 수 있음
  onEdit?: (child: Child) => void; // 수정 기능을 위해 child를 전달
  onDelete?: (childId: string) => void;
}

export const ChildCard = ({ child, onDelete }: ChildCardProps) => {
  const { toast } = useToast();

  // vaccineData와 vaccineRecord를 가져오는 쿼리
  const { data: vaccineData } = useVaccineQuery();
  const { data: vaccineRecord } = useVaccineRecordQuery(child?.id);
  const [menuOpen, setMenuOpen] = useState(false);

  // child가 없을 때를 대비한 처리
  if (!child) {
    return <div>아이가 등록되지 않았습니다.</div>;
  }

  // 햄버거 메뉴 버튼 클릭 시 메뉴 열기/닫기 토글
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDelete = async () => {
    if (onDelete) {
      const { error } = await browserClient.from("child").delete().match({ id: child.id });

      if (error) {
        console.error("아이 삭제에 실패했습니다:", error.message);
      } else {
        onDelete(child.id);
        toast({
          description: <ToastDescription className="text-white">{child.name}이(가) 삭제되었습니다.</ToastDescription>,
          variant: "mobile"
        });
      }
    }
  };

  // 접종 데이터가 없으면 처리하지 않도록
  if (!vaccineData || !vaccineRecord) return <div>Loading...</div>;

  const getVaccinesCount = () => {
    let requiredVaccinesCount = 0; // 맞은 필수 접종 수
    let optionalVaccinesCount = 0; // 맞은 선택 접종 수
    let totalRequiredVaccines = 0; // 전체 필수 접종 수
    let totalOptionalVaccines = 0; // 전체 선택 접종 수

    vaccineData.forEach((vaccine) => {
      // 각 disease 항목에 대해서 접종 여부를 체크
      vaccine.disease.forEach((disease) => {
        disease.ids.forEach((id, index) => {
          const isOptional = disease.additions[index]; // additions 배열에서 해당 id의 접종이 선택 접종인지 필수 접종인지 확인
          const allCheckedVaccine = vaccineRecord.includes(id); // 해당 id가 접종 기록에 포함되어 있는지 확인

          // 전체 접종 수를 계산
          if (isOptional) {
            totalOptionalVaccines++; // 선택 접종 수 증가
            if (allCheckedVaccine) optionalVaccinesCount++; // 선택 접종 완료된 경우
          } else {
            totalRequiredVaccines++; // 필수 접종 수 증가
            if (allCheckedVaccine) requiredVaccinesCount++; // 필수 접종 완료된 경우
          }
        });
      });
    });

    return { requiredVaccinesCount, totalRequiredVaccines, optionalVaccinesCount, totalOptionalVaccines };
  };

  const { requiredVaccinesCount, totalRequiredVaccines, optionalVaccinesCount, totalOptionalVaccines } =
    getVaccinesCount();

  return (
    <>
      {/* 아이 카드 전체 컨테이너 */}
      <div className="relative flex flex-col justify-center items-center w-full max-w-[792px] gap-6 p-6 rounded-2xl bg-gray-10 max-sm:bg-white mb-6 max-sm:p-0">
        {/* 미트볼 메뉴 버튼 */}
        <button onClick={toggleMenu} className="absolute top-0 right-4 text-primary-300 hover:text-primary-400">
          &#8230;
        </button>

        {/* 삭제하기 버튼이 보이는 메뉴 */}
        {menuOpen && (
          <div className="absolute top-7 right-0 bg-white shadow-md rounded-md p-2 z-10">
            <button
              onClick={handleDelete}
              className="text-text-l text-gray-700 hover:text-gray-800 bg-gray-30 font-medium px-6 py-4 min-w-[132px]"
            >
              삭제하기
            </button>
          </div>
        )}

        {/* 아이 기본 정보 & 우리 아이 접종 내역 컨테이너 */}
        <div className="flex flex-col md:flex-row justify-start items-start w-full gap-6">
          {/* 아이 기본 정보 컨테이너 */}
          <ChildBasicInfo child={child} />
          {/* 아이 기본 정보 컨테이너 끝 */}

          {/* 우리아이 접종 내역 전체 컨테이너 */}
          <ChildCardVaccinationInfo
            child={child}
            requiredVaccinesCount={requiredVaccinesCount}
            totalRequiredVaccines={totalRequiredVaccines}
            optionalVaccinesCount={optionalVaccinesCount}
            totalOptionalVaccines={totalOptionalVaccines}
          />
          {/* 우리아이 접종 내역 전체 컨테이너 끝*/}
        </div>
        {/* 아이 기본 정보 & 우리 아이 접종 내역 컨테이너 끝*/}

        {/* 접종 일정표 */}
        <Schedule child={child} />
      </div>
    </>
  );
};

export default ChildCard;
