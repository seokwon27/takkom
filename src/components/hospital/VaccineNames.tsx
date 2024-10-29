import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const VaccineNames = ({hospitalCd, vaccineNames, filter }: {hospitalCd: number, vaccineNames: string[]; filter: string | undefined }) => {
  let filteredVaccine: string | null = null;
  if (filter) {
    filteredVaccine = vaccineNames.find((name) => name.includes(filter)) ?? null;
  }

  return (
    <ul>
      {vaccineNames.length === 1 ? (
        <li className={`${filteredVaccine && "text-primary-400"}`}>{vaccineNames[0]}</li>
      ) : filter ? (
        <li>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-transparent text-base text-gray-700 w-fit h-fit p-0 m-0 hover:bg-transparent">
                <span className="text-primary-400">{filteredVaccine}</span> 외 {vaccineNames.length - 1}개
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80">
              <ul>
                {vaccineNames.map((name) => (
                  <li key={`${hospitalCd}_${name}`}>{name}</li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </li>
      ) : (
        <li>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-transparent text-base text-gray-700 w-fit h-fit p-0 m-0 hover:bg-transparent">
                {vaccineNames[0]} 외 {vaccineNames.length - 1}개
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80">
              <ul>
                {vaccineNames.map((name) => (
                  <li key={`${hospitalCd}_${name}`}>{name}</li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </li>
      )}
    </ul>
  );
};

export default VaccineNames;
