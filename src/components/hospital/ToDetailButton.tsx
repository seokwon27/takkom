"use client";

import React from "react";
import Link from "next/link";

const ToDetailButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className={
        "w-full h-14 flex flex-col p-4 mb-0 items-center bg-primary-400 border-0 rounded-xl hover:bg-primary-400 cursor-pointer"
      }
    >
      <p className="text-title-xxxs text-white font-semibold max-sm:text-heading-s">자세히 보기</p>
    </Link>
  );
};

export default ToDetailButton;
