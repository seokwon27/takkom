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
          "h-12 justify-center rounded-lg text-title-xs font-semibold  max-sm:rounded-xl",
          trigger ? "border-gray-300 text-gray-400" : "border-primary-400 text-primary-400"
        )}
        disabled={disabled}
      >
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)] text-gray-700 max-sm:rounded-xl">
        <SelectGroup>
          <SelectItem value={defaultValue} key={defaultValue} className="justify-center text-title-xxs font-semibold">
            {defaultValue}
          </SelectItem>
          {regionArray.map(([code, name]) => (
            <SelectItem value={String(code)} key={code} className="justify-center text-title-xxs font-semibold">
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RegionSelect;
