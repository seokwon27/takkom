"use client";
import { useAgeGroupStore } from "@/store/ageGroupStore";
import Category from "../../../public/ageGroup/category.svg";
import Newborn from "../../../public/ageGroup/newborn-baby.svg";
import Yeonga from "../../../public/ageGroup/yeong-a.svg";
import Yua from "../../../public/ageGroup/yua.svg";
import Children from "../../../public/ageGroup/children.svg";
import Image from "next/image";

const AgeGroup = () => {
  return (
    <div className="text-center items-center justify-center">
      <div className="flex text-center justify-between w-full">
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
      <Image src={division} alt={`${age}`} className="w-[54px] h-[54px] sm:w-[100px] sm:h-[100px]" />
      <p className={`${age === ageGroup ? "text-[#303030]" : "text-[#B0B0B0]"}  text-lg font-semibold`}>{age}</p>
    </div>
  );
};

const CategorySvg: { [key: string]: string } = {
  전체: Category,
  신생아: Newborn,
  영아기: Yeonga,
  유아기: Yua,
  아동기: Children
};

export default AgeGroup;
