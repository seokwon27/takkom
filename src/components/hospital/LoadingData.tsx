import React from "react";
import Image from "next/image";
import LoadingSpinner from "../../../public/common/loading-spinner.svg";
import { createPortal } from "react-dom";

const LoadingData = () => {
  return createPortal(
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-50 pointer-active-auto">
      <div className="w-full h-full flex">
        <Image src={LoadingSpinner} alt="로딩중입니다." className="m-auto animate-spin" />
      </div>
    </div>,
    document.body
  );
};

export default LoadingData;
