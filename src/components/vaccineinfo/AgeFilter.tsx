"use client";

import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";

//연령 텍스트 전환
const formatAgeText = (age: number) => {
  if (age >= 48) {
    return <p>{`만 ${Math.floor(age / 12)}세`}</p>;
  } else if (age >= 1) {
    return <p>{`${age}개월`}</p>;
  } else if (age === 0) {
    return <p>출생 직후</p>;
  } else if (age > 0 && age < 1) {
    return <p>4주 이내</p>;
  }
};

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
              {formatAgeText(age)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgeFilter;
