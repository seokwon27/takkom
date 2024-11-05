"use client";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";

const AgeGroup = () => {
  return (
    <div className="text-center items-center justify-center">
      <div className="flex text-center justify-between p-2 w-full">
        <AgeCard age={"전체"} />
        <AgeCard age={"신생아"} />
        <AgeCard age={"영아기"} />
        <AgeCard age={"유아기"} />
        <AgeCard age={"아동기"} />
      </div>
    </div>
  );
};

const AgeCard = ({ age }: { age: string }) => {
  const { ageGroup, setAgeGroup } = useAgeGroupStore();

  return (
    <div className="hover:cursor-pointer" onClick={() => setAgeGroup(age)}>
      <img src={`${CategorySvg[age]}`} alt={`${age}`} width="100" height="100" />
      <p className={`${age === ageGroup ? "text-[#303030]" : "text-[#B0B0B0]"}  text-lg font-semibold`}>{age}</p>
    </div>
  );
};

const CategorySvg: { [key: string]: string } = {
  전체: "/ageGroup/category.svg",
  신생아: "/ageGroup/newbornBaby.svg",
  영아기: "/ageGroup/yeong-a.svg",
  유아기: "/ageGroup/yua.svg",
  아동기: "/ageGroup/children.svg"
};

export default AgeGroup;
