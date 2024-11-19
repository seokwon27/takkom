import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";

import RequiredCheck from "../../../../public/vaccinerecord/required-checkbox-icon.svg";
import NotRequiredCheck from "../../../../public/vaccinerecord/not-required-checkbox-icon.svg";
import Image from "next/image";
import { HoverCardArrow } from "@radix-ui/react-hover-card";

const IconHover = () => {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Info className="text-primary-300 size-[18px]" />
      </HoverCardTrigger>

      <HoverCardContent side="top" sideOffset={5} align="center" className="w-fit">
        <div className="flex flex-row gap-1.5">
          <div className="flex flex-row">
            <Image src={RequiredCheck} alt="필수접종" width={16} height={16} />
            <p className="text-title-xxxs font-semibold">필수 접종</p>
          </div>
          <div className="flex flex-row">
            <Image src={NotRequiredCheck} alt="선택접종" width={16} height={16} />
            <p className="text-title-xxxs font-semibold">선택 접종</p>
          </div>
        </div>
        <HoverCardArrow className="fill-white" />
      </HoverCardContent>
    </HoverCard>
  );
};

export default IconHover;
