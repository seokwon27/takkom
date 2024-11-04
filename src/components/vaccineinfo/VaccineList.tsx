"use client";

import { useVaccineInfoQuery } from "@/query/useVaccineInfoQuery";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import VaccineCard from "./vaccineCard";

const VaccineList = () => {
  const { selectedAge } = useAgeGroupStore();

  const { data, error, isPending } = useVaccineInfoQuery();
  if (isPending) return "접종 정보 로딩중...";
  if (error) throw new Error(`Error: ${error}`);

  const formattedData =
    selectedAge === 1000 ? data : data.filter((item) => JSON.parse(item.vaccinate_date || "").includes(selectedAge));
  // console.log(data);

  return (
    <div className="grid grid-cols-2 gap-6">
      {formattedData?.map((item) => {
        return (
          <VaccineCard
            key={item.id}
            disease={item.disease_name}
            vaccine={`${item.vaccine_name} ${item.vaccine_turn}차`}
            target={item.target}
            process={item.process}
          />
        );
      })}
    </div>
  );
};

export default VaccineList;
