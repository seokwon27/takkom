import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import React from "react";
import VaccinateTag from "./VaccinateTag";

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
        vaccineId === vaccine ? "border-primary-400" : ""
      } border-[2px] border-gray-100 px-14 py-16 flex flex-col gap-8 rounded-3xl max-h-[358px]`}
      onClick={() => {
        setCurrentDisease(disease ?? "");
        setVaccineId(vaccine);
      }}
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{disease}</p>
          <p className="text-base font-normal text-gray-600">{vaccine}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <p className="text-base font-semibold text-gray-800">{`대상`}</p>
            <p className="text-base font-normal text-gray-600">{target}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-base font-semibold text-gray-800">{`방법`}</p>
            <p className="text-base font-normal text-gray-600">{process}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <VaccinateTag mode="무료" />
      </div>
    </div>
  );
};

export default VaccineCard;
