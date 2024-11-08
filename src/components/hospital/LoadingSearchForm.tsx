import Image from "next/image";
import React from "react";
import vaccineFilterOffIcon from "../../../public/hospital/vaccine-filter-off-icon.svg";

const LoadingSearchForm = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="h-12 grid grid-cols-[144fr_144fr_144fr_196fr_100fr] gap-4 mt-[84px] mb-4">
        <div className="border border-gray-300/50 rounded-lg" />
        <div className="border border-gray-300/50 rounded-lg" />
        <div className="bg-gray-30/50 rounded-lg" />
        <div className="bg-gray-30/50 rounded-lg" />
        <div className="bg-primary-400/50 rounded-lg" />
      </div>
      <div className="w-full flex justify-end items-center">
        <div className={`w-fit flex items-center p-2 border-0 text-label-xl`}>
          <Image src={vaccineFilterOffIcon} alt="백신 찾기" className="cursor-pointer" />
          <span className="ml-2 text-gray-700">백신 찾기</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSearchForm;
