import Image from "next/image";
import React from "react";
import NoChildIcon from "../../../public/child/no-child-icon.svg";

const NoChildren = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full lg:min-w-[792px] my-20 lg:my-60">
      <Image
        src={NoChildIcon}
        width={250}
        height={182}
        alt="따꼼 아이콘"
        className="w-40 h-28 lg:w-[250px] lg:h-[182px] object-cover"
      />
      <p className="text-center text-lg sm:text-xl lg:text-2xl p-4 sm:p-6 lg:p-8 text-gray-200">
        우리 아이를 등록해 보세요!
      </p>
    </div>
  );
};

export default NoChildren;
