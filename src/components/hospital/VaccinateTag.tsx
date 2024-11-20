import React from "react";

const COLORS = {
  free: "bg-[#F0F6FF] text-primary-400",
  required: "bg-[#FFF6F4] text-[#FF7664]",
  additional: "bg-[#F1FBE9] text-[#5EBE15]"
};

const VaccinateTag = ({ name }: { name?: "required" | "additional" }) => {
  return (
    <>
      {!name && (
        <div className={COLORS.free + " px-[6px] py-1 rounded text-title-xxs font-semibold max-sm:px-1 max-sm:py-[2px] max-sm:rounded-[1.64px] max-sm:text-label-xs"}>
          무료 접종
        </div>
      )}
      {name === "required" && (
        <div
          className={COLORS.required + " px-[6px] py-1 text-title-xxs font-semibold max-sm:px-1 max-sm:py-[2px] max-sm:text-label-xs"}
        >
          필수 접종
        </div>
      )}
      {name === "additional" && (
        <div
          className={
            COLORS.additional + " px-[6px] py-1 text-title-xxs font-semibold max-sm:px-1 max-sm:py-[2px] max-sm:text-label-xs"
          }
        >
          선택 접종
        </div>
      )}
    </>
  );
};

export default VaccinateTag;
