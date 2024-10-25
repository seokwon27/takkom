"use client";

import { useAgeGroupStore } from "@/utils/ageGroupStore";

const AgeFilter = () => {
  const { subAgeGroup, selectedAge, setSelectedAge } = useAgeGroupStore();
  return (
    <div>
      <p>{`선택된 연령: ${selectedAge}`}</p>
      <div className="flex gap-3">
        {subAgeGroup.map((age) => {
          return (
            <div
              className={age === selectedAge ? `font-bold` : ""}
              key={`${age} 개월`}
              onClick={() => {
                setSelectedAge(age);
              }}
            >
              {age >= 48 ? <p>{`만 ${age / 12}세`}</p> : <p>{`${age}개월`}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgeFilter;
