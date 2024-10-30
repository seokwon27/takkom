"use client";

import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
    <>
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

      <Tabs value={`${selectedAge}`} onValueChange={(value) => setSelectedAge(Number(value))}>
        <TabsList>
          {subAgeGroup.map((age) => {
            return (
              <TabsTrigger value={`${age}`} key={age}>
                {formatAgeText(age)}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
};

export default AgeFilter;
