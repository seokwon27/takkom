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
    <p>
      <span className={`${filteredVaccineIndex !== -1 && "text-primary-400"}`}>{`${
        filteredVaccine || duplicatedVaccineNames[0]
      }`}</span>
      {!isOpen && ` 외 ${duplicatedVaccineNames.length}개`}
    </p>
  );

  return (
    <ul>
      {vaccineNames.length === 1 ? (
        <li className={`${filteredVaccineIndex !== -1 && "text-primary-400"}`}>{vaccineNames[0]}</li>
      ) : filter ? (
        <li>
          <Select
            value={""}
            onOpenChange={(open) => {
              setIsOpen(open);
            }}
          >
            <SelectTrigger
              className={`h-fit p-1 justify-start border-0 rounded-none bg-gray-30`}
              disabled={!(vaccineNames.length + 1)}
            >
              <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent className="max-h-[100px] mt-0 p-0 rounded-none" side="bottom">
              <SelectGroup>
                {duplicatedVaccineNames.map((name) => (
                  <SelectItem value={name} key={name} className="justify-start h-fit max-w-fit p-0 pl-4 pb-2">
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </li>
      ) : (
        <li>
          <Select
            value={""}
            onOpenChange={(open) => {
              setIsOpen(open);
            }}
          >
            <SelectTrigger
              className={`h-fit p-1 justify-start border-0 rounded-none bg-gray-30`}
              disabled={!(vaccineNames.length + 1)}
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
        </li>
      )}
    </ul>
  );
};

export default VaccineNames;
