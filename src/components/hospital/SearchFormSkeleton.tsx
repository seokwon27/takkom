import Image from "next/image";
import React from "react";
import VaccineFilterOffIcon from "../../../public/hospital/vaccine-filter-off-icon.svg";
import DesktopLayout from "../layout/DesktopLayout";
import MobileLayout from "../layout/MobileLayout";

const LoadingSearchForm = () => {
  return (
    <>
      <MobileLayout className="w-full">
        <div className="w-full flex flex-col">
          <div className="w-full mt-3 px-6 py-1.5 text-title-m text-gray-800 font-bold">검색</div>
          <div className="grid grid-cols-[1fr_1fr] gap-4 mt-14 mb-4 px-6">
            <div className="h-12 border border-gray-300/50 rounded-xl" />
            <div className="h-12 border border-gray-300/50 rounded-xl" />
            <div className="h-12 col-span-2 bg-gray-30/50 rounded-xl" />
            <div className="h-12 col-span-2 bg-gray-30/50 rounded-xl" />
            <div className="h-12 mt-1 col-span-2 bg-primary-400/50 rounded-lg" />
          </div>
        </div>
      </MobileLayout>
      <DesktopLayout className="w-full">
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
              <Image src={VaccineFilterOffIcon} alt="백신 찾기" className="cursor-pointer" />
              <span className="ml-2 text-gray-700">백신 찾기</span>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </>
  );
};

export default LoadingSearchForm;
