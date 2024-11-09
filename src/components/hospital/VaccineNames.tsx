"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="flex">
      <div className="w-4 h-4 ml-1.5 mr-[5px] my-auto relative">
        <ChevronUp
          strokeWidth={3}
          className={cn(
            "w-[16px] h-[16px] m-auto absolute left-0 text-gray-400",
            "transition-all duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <ChevronDown
          strokeWidth={3}
          className={cn(
            "w-[16px] h-[16px] m-auto absolute left-0 text-gray-400",
            "transition-all duration-300",
            isOpen ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      <p className="text-text-l text-gray-700 line-clamp-1">
        <span className={`${filteredVaccineIndex !== -1 && "text-title-xxs font-semibold"}`}>{`${
          filteredVaccine || duplicatedVaccineNames[0]
        }`}</span>
        {!isOpen && (
          <span className="ml-1 text-text-l">
            외 {filter ? duplicatedVaccineNames.length : duplicatedVaccineNames.length - 1}개
          </span>
        )}
      </p>
    </div>
  );

  return (
    <>
    {(vaccineNames.length === 1 && !vaccineNames[0]) && (
      <p className="text-text-l line-clamp-1">
          접종 정보가 없습니다.
      </p>
    )}
    {(vaccineNames.length === 1 && vaccineNames[0]) && (
      <p className="text-text-l line-clamp-1">
        <span className={cn("text-title-xxs", filteredVaccineIndex !== -1 && "font-semibold")}>
          {vaccineNames[0]}
        </span>
        <span> 접종 가능</span>
      </p>
    )}
      {vaccineNames.length > 1 && filter && (
        <Select
          value={""}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <SelectTrigger
            className={cn(
              "h-fit p-1 justify-start border-0 rounded-none bg-gray-10 text-text-l",
              isOpen ? "rounded-t" : "rounded"
            )}
          >
            {placeHolder}
            {/* <SelectValue placeholder={placeHolder} /> */}
          </SelectTrigger>
          <SelectContent
            className="max-h-[85px] mt-0 p-0 bg-gray-10 rounded-none rounded-b text-text-l"
            avoidCollisions={false}
          >
            {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
            <SelectGroup>
              {duplicatedVaccineNames.map((name) => (
                <SelectItem
                  value={name}
                  key={name}
                  className="justify-start h-fit max-w-fit p-0 pl-7 pb-2 last:pb-0 text-text-l"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {vaccineNames.length > 1 && !filter && (
        <Select
          value={""}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <SelectTrigger
            className={cn(
              "h-fit p-1 justify-start border-0 rounded-none bg-gray-10 text-text-l",
              isOpen ? "rounded-t" : "rounded"
            )}
          >
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent
            className="max-h-[85px] mt-0 p-0 bg-gray-10 rounded-none rounded-b text-text-l"
            avoidCollisions={false}
          >
            {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
            <SelectGroup>
              {duplicatedVaccineNames.slice(1).map((name) => (
                <SelectItem
                  value={name}
                  key={name}
                  className="justify-start h-fit max-w-fit p-0 pl-7 pb-2 text-text-l last:pb-0"
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
