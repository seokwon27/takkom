"use client";

import Link from "next/link";
import React from "react";

const RegisterButton = () => {
  return (
    <Link href={"/child/register"}>
      <button>우리아이 등록하기</button>
    </Link>
  );
};

export default RegisterButton;
