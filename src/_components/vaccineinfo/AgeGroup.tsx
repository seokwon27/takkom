"use client";
import { useMultiStore } from "@/utils/globalStore";

const AgeGroup = () => {
  const ageGroup = useMultiStore((state) => state.ageGroup);
  const setAgeGroup = useMultiStore((state) => state.setAgeGroup);

  return (
    <>
      <div>{`선택된 연령 그룹 : ${ageGroup}`}</div>
      <div className="flex text-center justify-center w-24 gap-3">
        <div className="border-[1px] border-blue-500 p-[3px] w-[20px]" onClick={() => setAgeGroup("신생아")}>
          <p>신생아</p>
        </div>
        <div onClick={() => setAgeGroup("영아기")}>영아기</div>
        <div onClick={() => setAgeGroup("유아기 초기")}>유아기 초기</div>
        <div onClick={() => setAgeGroup("유아기 중기")}>유아기 중기</div>
        <div onClick={() => setAgeGroup("아동기")}>아동기</div>
      </div>
    </>
  );
};

export default AgeGroup;
