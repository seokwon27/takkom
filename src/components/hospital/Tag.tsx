import React from "react";

const COLORS = {
  free: "px-[6px] py-1 bg-[#F0F6FF] text-primary-400",
  required: "px-[6px] py-1 bg-[#FFF6F4] text-[#FF7664]",
  additional: "px-[6px] py-1 bg-[#F1FBE9] text-[#5EBE15]"
};

const Tag = ({ name }: { name?: string }) => {
  return (
    <>
      {!name && (
        <div className={COLORS.free + " rounded text-title-xxs font-semibold max-sm:px-1 max-sm:py-[2px] max-sm:rounded-[1.64px] max-sm:text-label-xs"}>
          무료 접종
        </div>
      )}
      {name === "required" && (
        <div
          className={COLORS.required + " text-title-xxs font-semibold max-sm:px-1 max-sm:py-[2px] max-sm:text-label-xs"}
        >
          필수 접종
        </div>
      )}
      {name === "additional" && (
        <div
          className={
            COLORS.additional + " text-title-xxs font-semibold max-sm:px-1 max-sm:py-[2px] max-sm:text-label-xs"
          }
        >
          선택 접종
        </div>
      )}
    </>
  );
};

export default Tag;
