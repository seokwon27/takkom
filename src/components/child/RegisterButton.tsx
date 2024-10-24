"use client";

import { useRouter } from "next/navigation";
import React from "react";

const RegisterButton = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/child/register");
  };
  return <button onClick={handleRegisterClick}>우리아이 등록하기</button>;
};

export default RegisterButton;
