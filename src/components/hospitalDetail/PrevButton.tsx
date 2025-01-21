"use client";

import { ChevronLeft } from "lucide-react";

const PrevButton = () => {

  const handleClick = () => {
    // 뒤로가기
    window.history.back();
  };
  
  return (
    <div className={"w-full h-[41px] flex items-center gap-2 mb-1 px-6 sm:hidden"}>
      <ChevronLeft size={24} className="w-[21px] h-6 text-gray-400 cursor-pointer" onClick={handleClick}/>
    </div>
  );
};

export default PrevButton;
