import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type RegionSelectProps = {
  defaultValue: string;
  regionArray: [string, string][];
  trigger: boolean;
  disabled: boolean;
  value: string;
  onValueChange: (value: string) => void;
};

const RegionSelect = ({ defaultValue, regionArray, trigger, disabled, value, onValueChange }: RegionSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-12 justify-center rounded-lg text-base font-semibold",
          trigger ? "border-gray-300 text-gray-300" : "border-primary-400 text-primary-400"
        )}
        disabled={disabled}
      >
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)]">
        <SelectGroup>
          <SelectItem value={defaultValue} key={defaultValue} className="justify-center text-title-xxs font-semibold">
            {defaultValue}
          </SelectItem>
          {regionArray.map((item) => (
            <SelectItem value={String(item[0])} key={item[0]} className="justify-center text-title-xxs font-semibold">
              {item[1]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RegionSelect;
