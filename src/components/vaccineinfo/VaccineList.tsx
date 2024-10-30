"use client";

import { useVaccineInfoQuery } from "@/query/useVaccineInfoQuery";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";

const VaccineList = () => {
  const { selectedAge, setThisDisease, currentDisease } = useAgeGroupStore();

  const { data, error, isPending } = useVaccineInfoQuery();
  if (isPending) return "접종 정보 로딩중...";
  if (error) throw new Error(`Error: ${error}`);

  const formattedData = data.filter((item) => JSON.parse(item.vaccinate_date || "").includes(selectedAge));
  console.log(data);

  return (
    <div>
      백신 리스트
      <div className="flex flex-wrap gap-3">
        {formattedData?.map((item) => {
          return (
            <div
              key={item.disease_name}
              className={`${currentDisease === item.disease_name ? "border-black" : ""} border-[2px] gap-2 w-56 p-3`}
              onClick={() => {
                setThisDisease(item.disease_name);
              }}
            >
              <p>{item.disease_name}</p>
              <p className="mt-2">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VaccineList;
