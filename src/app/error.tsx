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
      <p>죄송합니다.</p>
      <p>공공데이터포털 네트워크에 문제가 발생했습니다.</p>
      <Link href="/">홈으로 가기</Link>
    </div>
  );
};

export default ErrorPage;
