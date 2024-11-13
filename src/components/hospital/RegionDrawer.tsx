import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
// import { Button } from "../ui/button";
import { Check } from "lucide-react";

type RegionDrawerProps = {
  defaultValue: string;
  regionArray: [string, string][];
  trigger: boolean;
  disabled: boolean;
  value: string;
  onClick: (item: [string, string]) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const RegionDrawer = ({ defaultValue, regionArray, trigger, disabled, value, onClick }: RegionDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          "h-12 justify-center border rounded-lg text-base font-semibold  max-sm:rounded-xl",
          trigger ? "border-gray-300 text-gray-300" : "border-primary-400 text-primary-400"
        )}
        disabled={disabled}
      >
        {regionArray.find(item => item[0] === value)?.[1] ?? defaultValue}
      </DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerTitle />
        <DrawerDescription />
        <div
          className="w-full h-[300px] flex flex-col overflow-auto"
          draggable={false}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {regionArray.map((item) => (
            <DrawerClose
              value={String(item[0])}
              key={item[0]}
              className={cn(
                "flex h-8 p-0 justify-between mb-4 bg-transparent text-label-xl font-medium text-left hover:bg-transparent"
              )}
              onClick={onClick(item)}
            >
              {item[1]}
              <Check size={20} className={cn("w-5 h-5 text-primary-400", item[0] !== value && 'hidden')} />
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RegionDrawer;
