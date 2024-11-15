"use client";

import Image from "next/image";
import React from "react";
import ErrorImg from "../../public/common/error-takkomi.svg";
import Link from "next/link";

const ErrorPage = ({ error }: { error: Error }) => {
  console.error(error);
  return (
    <div className="w-full h-full flex flex-col p-[100px] items-center">
      <Image src={ErrorImg} alt="에러가 발생했습니다." />
      <p className="mt-10 text-heading-m">네트워크가 불안정해요.</p>
      <p className="mb-5 text-title-xxs">잠시 후 다시 시도해보세요.</p>
      <div className="space-x-5">
        <Link href="/" className="py-2 px-4 bg-gray-30 text-gray-500 rounded-lg">
          홈으로 가기
        </Link>
        <Link href="/child" className="py-2 px-4 bg-gray-30 text-gray-500 rounded-lg">
          우리 아이 보기
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
