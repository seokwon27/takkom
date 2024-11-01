"use client";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";

const AgeGroup = () => {
  const { ageGroup } = useAgeGroupStore();

  return (
    <>
      <p>{`선택된 연령 그룹 : ${ageGroup}`}</p>

      <div className="flex text-center justify-center  gap-6 p-2">
        <AgeCard age={"전체"} />
        <AgeCard age={"신생아"} />
        <AgeCard age={"영아기"} />
        <AgeCard age={"유아기"} />
        <AgeCard age={"아동기"} />
      </div>
    </>
  );
};

const AgeCard = ({ age }: { age: string }) => {
  const { ageGroup, setAgeGroup } = useAgeGroupStore();

  return (
    <div className="p-2 " onClick={() => setAgeGroup(age)}>
      <div className={`${age === ageGroup ? "bg-gray-400" : "bg-gray-30"}  w-20 h-20 rounded-lg`}></div>
      <p>{age}</p>
    </div>
  );
};

export default AgeGroup;
