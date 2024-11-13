import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";
import HospitalLoading from "../../../public/common/search-takkomi.svg";
import LoadingSpinner from "../../../public/common/loading-spinner.svg";

const LoadingHospitalList = ({
  children,
  className,
  animate
}: {
  children?: ReactNode;
  className?: string;
  animate?: string;
}) => {
  return (
    <div className={cn("flex flex-col items-center mt-4 mb-16 text-title-xl", className)}>
      <Image
        src={!!children ? HospitalLoading : LoadingSpinner}
        alt="로딩중입니다."
        className={cn("max-sm:w-[160px] max-sm:aspect-sqare", animate)}
      />
      <div className="w-full mt-2 text-title-xl font-semibold text-gray-200 text-center max-sm:text-heading-xs">
        {children}
      </div>
    </div>
  );
};

export default LoadingHospitalList;
