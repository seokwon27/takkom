"use client";

import { useAgeGroupStore } from "@/store/ageGroupStore";

//연령 텍스트 전환
const formatAgeText = (age: number) => {
  if (age === 1000) {
    return <p>전체</p>;
  }
  if (age < 1000 && age >= 48) {
    return <p>{`만 ${Math.floor(age / 12)}세`}</p>;
  }
  if (age >= 1) {
    return <p>{`${age}개월`}</p>;
  }
  if (age === 0) {
    return <p>출생 직후</p>;
  }
  if (age > 0 && age < 1) {
    return <p>4주이내</p>;
  }
};

const AgeFilter = () => {
  const { subAgeGroup, selectedAge, setSelectedAge } = useAgeGroupStore();
  return (
    <div className="flex mt-20 mb-16 text-heading-xs max-sm:text-title-xxs max-sm:mt-5 max-sm:mb-5 max-sm:whitespace-nowrap max-sm:overflow-x-auto scrollbar-hide">
      {subAgeGroup.length > 6 ? (
        <p className=" border-gray-700 border-b-2 text-gray-700 p-2 hover:cursor-pointer font-bold w-20">전체</p>
      ) : (
        subAgeGroup.map((age) => {
          return (
            <div
              className={`${
                age === selectedAge ? ` border-gray-700 border-b-2 text-gray-700` : "text-gray-300"
              } p-2 hover:cursor-pointer font-bold max-sm:p-[6px] w-20 text-center`}
              key={`${age} 개월`}
              onClick={() => {
                setSelectedAge(age);
              }}
            >
              {formatAgeText(age)}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AgeFilter;
