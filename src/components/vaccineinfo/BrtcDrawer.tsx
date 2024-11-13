import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

const BrtcDrawer = ({
  defaultValue,
  value,
  cityArray,
  setCity
}: {
  defaultValue: string;
  value: string;
  cityArray: [string, string][];
  setCity: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          "h-12 justify-center bg-gray-30  rounded-lg text-base font-bold  max-sm:rounded-xl text-gray-700",
          value ?? "text-gray-400"
        )}
      >
        {cityArray.find((item) => item[0] === value)?.[1] ?? defaultValue}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle />
        <DrawerDescription />

        <div className="flex flex-col p-6 gap-4 h-[300px] overflow-auto">
          {cityArray.map((item) => {
            const [cityCd, cityName] = item;
            return (
              <DrawerClose
                key={cityCd}
                className="text-left"
                onClick={() => {
                  setCity(cityCd);
                }}
              >
                {cityName}
              </DrawerClose>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BrtcDrawer;
