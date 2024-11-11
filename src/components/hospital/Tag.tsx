import React from "react";

const COLORS = {
  free: "px-[6px] py-1 rounded bg-[#F0F6FF] text-title-xxs font-semibold text-primary-400",
  required: "px-[6px] py-1 rounded bg-[#FFF6F4] text-title-xxs font-semibold text-[#FF7664]",
  additional: "px-[6px] py-1 rounded bg-[#F1FBE9] text-title-xxs font-semibold text-[#5EBE15]"
};

const Tag = ({ name }: { name?: string }) => {
  return (
    <>
      {!name && <div className={COLORS.free}>무료 접종</div>}
      {name === "required" && <div className={COLORS.required}>필수 접종</div>}
      {name === "additional" && <div className={COLORS.additional}>선택 접종</div>}
    </>
  );
};

export default Tag;
