"use client";

import { useVaccineInfoQuery } from "@/query/useVaccineInfoQuery";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";

const VaccineList = () => {
  const { selectedAge, setCurrentDisease, currentDisease } = useAgeGroupStore();

  const { data, error, isPending } = useVaccineInfoQuery();
  if (isPending) return "접종 정보 로딩중...";
  if (error) throw new Error(`Error: ${error}`);

  const formattedData = data.filter((item) => JSON.parse(item.vaccinate_date || "").includes(selectedAge));
  // console.log(data);

  return (
    <div className="grid grid-cols-2 gap-3">
      {formattedData?.map((item) => {
        return (
          <div
            key={`${item.vaccine_name}_${item.vaccine_turn}`}
            className={`${currentDisease === item.disease_name ? "border-black" : ""} border-[2px] gap-2 p-3`}
            onClick={() => {
              setCurrentDisease(item.disease_name ?? "");
            }}
          >
            <div>
              <p>{item.disease_name}</p>
              <p>{`${item.vaccine_name} ${item.vaccine_turn}차`}</p>
            </div>
            <div className="mt-5">
              <p>{`대상: ${item.target}`}</p>
              <p>{`방법: ${item.process}`}</p>
            </div>
            <p>무료접종</p>
          </div>
        );
      })}
    </div>
  );
};

export default VaccineList;
