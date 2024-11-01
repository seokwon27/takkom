"use client";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import SampleSVG from "../../../public/sampleIcon.svg";

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
      <img src={SampleSVG.src} alt={`${age}sample`} width="80" height="80" />
      <p className={`${age === ageGroup ? "border-gray-400" : "border-gray-30"} mt-1  border-b-2`}>{age}</p>
    </div>
  );
};

export default AgeGroup;
