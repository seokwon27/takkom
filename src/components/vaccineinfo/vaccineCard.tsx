import { useAgeGroupStore } from "@/store/ageGroupStore";
import React from "react";
import Image from "next/image";
import Target from "../../../public/vaccineInfo/target.svg";
import Process from "../../../public/vaccineInfo/process.svg";
import Tag from "../hospital/Tag";

const VaccineCard = ({
  disease,
  vaccine,
  target,
  process
}: {
  disease: string;
  vaccine: string;
  target: string;
  process: string;
}) => {
  const { setCurrentDisease, setVaccineId, vaccineId } = useAgeGroupStore();

  return (
    <div
      className={`${
        vaccineId === vaccine ? "border-primary-400 border-2" : ""
      }  p-10 flex flex-col gap-8 rounded-3xl max-h-[358px] hover:cursor-pointer shadow-[0px_0px_16px_0px_rgba(114,114,114,0.10)]
      max-sm:max-h-[140px]  max-sm:px-6 max-sm:py-4 max-sm:gap-[10px]
      `}
      onClick={() => {
        if (vaccineId === vaccine) {
          setCurrentDisease("");
          setVaccineId("");
          return;
        }
        setCurrentDisease(disease ?? "");
        setVaccineId(vaccine);
      }}
    >
      <div className="flex flex-col gap-10 max-sm:gap-[10px]">
        <div className="flex flex-col gap-2 max-sm:flex-row max-sm:gap-1 max-sm:items-end">
          <p className="text-heading-xl font-bold max-sm:text-heading-xs break-keep">{disease}</p>
          <p className="text-label-xl font-normal text-gray-600 max-sm:text-label-s">{vaccine}</p>
        </div>
        <div className="flex flex-col gap-2 max-sm:gap-1">
          <div className="flex gap-3 max-sm:gap-1">
            <Image src={Target} alt="대상" />
            <p className="text-title-s font-semibold text-gray-800 max-sm:text-label-m">{`대상`}</p>
            <p className="text-label-xl font-normal text-gray-600 max-sm:text-text-m">{target}</p>
          </div>
          <div className="flex gap-3 max-sm:gap-1">
            <Image src={Process} alt="방법" />
            <p className="text-title-s font-semibold text-gray-800 max-sm:text-label-m ">{`방법`}</p>
            <p className="text-label-xl font-normal text-gray-600 break-keep max-sm:text-text-m">{process}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Tag />
        {/* 추가접종정보에 따른 태그 입력 */}
        {/* {additional === true ? <Tag name="additional" /> : <Tag name="required" />} */}
      </div>
    </div>
  );
};

export default VaccineCard;
