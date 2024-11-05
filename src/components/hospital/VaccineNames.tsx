"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";

const VaccineNames = ({ vaccineNames, filter }: { vaccineNames: string[]; filter: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const duplicatedVaccineNames = [...vaccineNames];
  let filteredVaccineIndex = -1;
  let filteredVaccine: string = "";
  if (filter) {
    filteredVaccineIndex = vaccineNames.findIndex((name) => name.includes(filter));
    filteredVaccine = vaccineNames[filteredVaccineIndex];
    duplicatedVaccineNames.splice(filteredVaccineIndex, 1);
  }

  const placeHolder = (
    <span className="text-sm">
      <span className={`${filteredVaccineIndex !== -1 && "font-semibold"}`}>{`${
        filteredVaccine || duplicatedVaccineNames[0]
      }`}</span>
      {!isOpen && ` 외 ${duplicatedVaccineNames.length}개`}
    </span>
  );

  return (
    <>
      {vaccineNames.length === 1 ? (
        <p>
          <span className={`${filteredVaccineIndex !== -1 && "font-semibold"}`}>{vaccineNames[0]}</span> 접종 가능
        </p>
      ) : filter ? (
        <Select
          value={""}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <SelectTrigger className={cn('h-fit p-1 justify-start border-0 rounded-none  bg-gray-10 text-sm', isOpen ? 'rounded-t': 'rounded')}>
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent className="max-h-[85px] mt-0 p-0 bg-gray-10 rounded-none rounded-b text-sm" avoidCollisions={false}>
            {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
            <SelectGroup>
              {duplicatedVaccineNames.map((name) => (
                <SelectItem
                  value={name}
                  key={name}
                  className="justify-start h-fit max-w-fit p-0 pl-[29px] pb-2 text-sm last:pb-0"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Select
          value={""}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
        <SelectTrigger className={cn('h-fit p-1 justify-start border-0 rounded-none  bg-gray-10 text-sm', isOpen ? 'rounded-t': 'rounded')}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent className="max-h-[85px] mt-0 p-0 bg-gray-10 rounded-none rounded-b text-sm" avoidCollisions={false}>
            {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
            <SelectGroup>
              {duplicatedVaccineNames.slice(1).map((name) => (
                <SelectItem
                  value={name}
                  key={name}
                  className="justify-start h-fit max-w-fit p-0 pl-[29px] pb-2 text-sm last:pb-0"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default VaccineNames;
