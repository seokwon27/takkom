"use client";
import { useAgeGroupStore } from "@/store/ageGroupStore";
import category from "../../../public/ageGroup/category.svg";
import newborn from "../../../public/ageGroup/newborn-baby.svg";
import yeonga from "../../../public/ageGroup/yeong-a.svg";
import yua from "../../../public/ageGroup/yua.svg";
import children from "../../../public/ageGroup/children.svg";
import Image from "next/image";
import { useCityDataQuery } from "@/query/useCityDataQuery";

const AgeGroup = () => {
  const { error } = useCityDataQuery();
  if (error) console.log(error);

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
  const division = CategorySvg[age];
  return (
    <div className="flex flex-col gap-3 hover:cursor-pointer text-lg font-semibold" onClick={() => setAgeGroup(age)}>
      <Image src={division} alt={`${age}`} width={100} height={100} />
      <p className={`${age === ageGroup ? "text-[#303030]" : "text-[#B0B0B0]"}  text-lg font-semibold`}>{age}</p>
    </div>
  );
};

const CategorySvg: { [key: string]: string } = {
  전체: category,
  신생아: newborn,
  영아기: yeonga,
  유아기: yua,
  아동기: children
};

export default AgeGroup;
