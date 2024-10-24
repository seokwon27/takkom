"use client";

import { useMultiStore } from "@/utils/globalStore";

const AgeFilter = () => {
  const subAgeGroup = useMultiStore((state) => state.subAgeGroup);
  const age = useMultiStore((state) => state.selectedAge);
  const setAge = useMultiStore((state) => state.setSelectedAge);
  return (
    <div>
      <p>{`선택된 연령: ${age}`}</p>
      <div className="flex gap-3">
        {subAgeGroup.map((el, index) => {
          return (
            <div
              className={el === age ? `font-bold` : ""}
              key={index}
              onClick={() => {
                setAge(el);
              }}
            >
              <p>{el}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgeFilter;
