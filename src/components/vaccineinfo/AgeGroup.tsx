"use client";
import { useMultiStore } from "@/utils/globalStore";

const AgeGroup = () => {
  const ageGroup = useMultiStore((state) => state.ageGroup);
  const setAgeGroup = useMultiStore((state) => state.setAgeGroup);

  return (
    <>
      <div>{`선택된 연령 그룹 : ${ageGroup}`}</div>
      <div className="flex text-center justify-center  gap-6 p-2">
        <div className="p-2 " onClick={() => setAgeGroup("신생아")}>
          <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
          <p>신생아</p>
        </div>
        <div className="p-2" onClick={() => setAgeGroup("영아기")}>
          <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
          <p>영아기</p>
        </div>
        <div className="p-2" onClick={() => setAgeGroup("유아기 초기")}>
          <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
          <p>유아기 초기</p>
        </div>
        <div className="p-2" onClick={() => setAgeGroup("유아기 중기")}>
          <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
          <p>유아기 중기</p>
        </div>
        <div className="p-2" onClick={() => setAgeGroup("아동기")}>
          <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
          <p>아동기</p>
        </div>
      </div>
    </>
  );
};

export default AgeGroup;
