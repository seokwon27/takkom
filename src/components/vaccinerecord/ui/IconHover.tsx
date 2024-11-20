import { Info } from "lucide-react";

import RequiredCheck from "../../../../public/vaccinerecord/required-checkbox-icon.svg";
import NotRequiredCheck from "../../../../public/vaccinerecord/not-required-checkbox-icon.svg";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";

const IconHover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="text-primary-300 size-[18px] cursor-pointer" />
      </PopoverTrigger>

      <PopoverContent side="top" sideOffset={5} align="center" className="w-fit rounded-[8px]">
        <div className="flex flex-row gap-1.5">
          <div className="flex flex-row">
            <Image src={RequiredCheck} alt="필수접종" width={16} height={16} />
            <p className="text-title-xxxs font-semibold text-gray-700">필수 접종</p>
          </div>
          <div className="flex flex-row">
            <Image src={NotRequiredCheck} alt="선택접종" width={16} height={16} />
            <p className="text-title-xxxs font-semibold text-gray-700">선택 접종</p>
          </div>
        </div>
        <PopoverArrow className="fill-white" />
      </PopoverContent>
    </Popover>
  );
};

export default IconHover;
