"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import CallImg from "../../../public/hospital/call.svg";
import { cn } from "@/lib/utils";

const PhoneButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className={cn(
        "w-[72px] h-full flex flex-col p-4 mb-0 aspect-square bg-primary-300 border-0 rounded-full drop-shadow-[5px_5px_5px_rgba(92,153,255,0.2)] hover:bg-primary-300",
        "max-sm:w-full max-sm:h-14 max-sm:bg-primary-400 max-sm:rounded-xl max-sm:hover:bg-primary-400"
      )}
      onClick={onClick}
    >
      <Image src={CallImg} alt="문의하기" className="max-sm:hidden" />
      <p className="text-title-xxxs text-white font-semibold max-sm:text-heading-s">문의하기</p>
    </Button>
  );
};

export default PhoneButton;
