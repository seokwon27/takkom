import { cn } from "@/lib/utils";
import React from "react";

const InfoTag = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={cn(
        "w-[288px] h-[72px] px-[18px] py-3 bg-gray-800 rounded-t-lg rounded-r-lg text-white transition-all duration-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <p className="text-heading-xs mb-1">도로명 주소를 입력해 주세요.</p>
      <p className="text-label-l">
        ex. 서울특별시 중구 <span className="text-primary-400">중림로 37 (중림동)</span>
      </p>
    </div>
  );
};

export default InfoTag;
