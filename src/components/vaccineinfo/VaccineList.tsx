"use client";

import { useVaccinationQuery } from "@/query/useVaccinationQuery";
import { useMultiStore } from "@/utils/globalStore";

const VaccineList = () => {
  const age = useMultiStore((state) => state.selectedAge);

  const { data, error, isPending } = useVaccinationQuery();
  if (isPending) return "접종 정보 로딩중...";
  if (error) throw new Error(`Error: ${error}`);

  const formattedData = data.filter((item) => item.duration === age);

  return (
    <div>
      백신 리스트
      <div className="flex flex-wrap gap-3">
        {data?.map((item) => {
          return (
            <div key={item.id} className="border-[1px] gap-2 w-56 p-3">
              <p>{item.disease_name}</p>
              {item.description}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VaccineList;
