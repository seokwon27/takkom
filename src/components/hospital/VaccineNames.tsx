"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const VaccineNames = ({
  vaccineNames,
  filter
}: {
  vaccineNames: string[];
  filter: string | undefined;
}) => {
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
        <p><span className={`${filteredVaccineIndex !== -1 && "font-semibold"}`}>{vaccineNames[0]}</span> 접종 가능</p>
      ) : filter ? (
          <Select
            value={""}
            onOpenChange={(open) => {
              setIsOpen(open);
            }}
          >
            <SelectTrigger
              className={`h-fit p-0 justify-start border-0 rounded-none bg-gray-30 text-sm`}
            >
              <SelectValue placeholder={placeHolder} className="p-0"/>
            </SelectTrigger>
            <SelectContent className="max-h-[100px] mt-0 p-0 rounded-none text-sm">
              <SelectGroup>
                {duplicatedVaccineNames.map((name) => (
                  <SelectItem value={name} key={name} className="max-w-fit h-fit justify-start p-0 pl-5 pb-2 text-sm">
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
            <SelectTrigger
              className={`h-fit p-1 justify-start border-0 rounded-none bg-gray-30`}
            >
              <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent className="max-h-[100px] mt-0 p-0 rounded-none" side="bottom">
              <SelectGroup>
                {duplicatedVaccineNames.slice(1).map((name) => (
                  <SelectItem value={name} key={name} className="justify-start h-fit max-w-fit p-0 pl-4 pb-2">
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
