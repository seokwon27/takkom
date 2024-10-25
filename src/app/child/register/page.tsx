import RegisterForm from "@/components/child/RegisterForm";
import React from "react";


const register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>아이 등록하기 페이지</div>
      <RegisterForm />
    </div>
  );
};

export default register;
