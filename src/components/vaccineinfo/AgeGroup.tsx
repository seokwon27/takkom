"use client";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";

const AgeGroup = () => {
  const { ageGroup } = useAgeGroupStore();

  return (
    <>
      <p>{`선택된 연령 그룹 : ${ageGroup}`}</p>

      <div className="flex text-center justify-center  gap-6 p-2">
        <AgeCard age={"신생아"} />
        <AgeCard age={"영아기"} />
        <AgeCard age={"유아초기"} />
        <AgeCard age={"유아중기"} />
        <AgeCard age={"아동기"} />
      </div>
    </>
  );
};

const AgeCard = ({ age }: { age: string }) => {
  const { setAgeGroup } = useAgeGroupStore();

  return (
    <div className="p-2 " onClick={() => setAgeGroup(age)}>
      <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
      <p>{age}</p>
    </div>
  );
};

export default AgeGroup;
