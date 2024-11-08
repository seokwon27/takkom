import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";
import hospitalLoading from "../../../public/hospital/hospital-loading.svg";
import loadingSpinner from "../../../public/loading-spinner.svg";

const LoadingHospitalList = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center my-20", className)}>
      {children ? (
        <>
          <Image src={hospitalLoading} alt="로딩중입니다." />
          <div className="w-full mt-2 text-title-xl font-semibold text-gray-200 text-center">{children}</div>
        </>
      ) : (
        <div className="w-[260px] h-[260px] flex justify-center">
          <Image src={loadingSpinner} alt="로딩중입니다." className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LoadingHospitalList;
