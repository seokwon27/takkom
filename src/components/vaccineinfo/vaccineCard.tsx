import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import React from "react";

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
      className={`${vaccineId === vaccine ? "border-black" : ""} border-[2px] gap-2 p-3`}
      onClick={() => {
        setCurrentDisease(disease ?? "");
        setVaccineId(vaccine);
      }}
    >
      <div>
        <p>{disease}</p>
        <p>{vaccine}</p>
      </div>
      <div className="mt-5">
        <p>{`대상: ${target}`}</p>
        <p>{`방법: ${process}`}</p>
      </div>
      <p>무료접종</p>
    </div>
  );
};

export default VaccineCard;
