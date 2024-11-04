"use client";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import SampleSVG from "../../../public/sampleIcon.svg";

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
    <div onClick={() => setAgeGroup(age)}>
      <img src={SampleSVG.src} alt={`${age}sample`} width="140" height="140" />
      <p className={`${age === ageGroup ? "border-gray-400" : "border-gray-30"} mt-1  border-b-2`}>{age}</p>
    </div>
  );
};

export default AgeGroup;
