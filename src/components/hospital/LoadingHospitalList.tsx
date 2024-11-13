import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";
import HospitalLoading from "../../../public/search-takkomi.svg";
import LoadingSpinner from "../../../public/loading-spinner.svg";

const LoadingHospitalList = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center mt-4 mb-16 text-title-xl", className)}>
      {children ? (
        <>
          <Image src={HospitalLoading} alt="로딩중입니다." className="max-sm:w-[160px] max-sm:aspect-sqare"/>
          <div className="w-full mt-2 text-title-xl font-semibold text-gray-200 text-center max-sm:text-heading-xs">{children}</div>
        </>
      ) : (
        <div className="w-[260px] h-[260px] flex justify-center">
          <Image src={LoadingSpinner} alt="로딩중입니다." className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LoadingHospitalList;
