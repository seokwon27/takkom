"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import PhoneModal from "./PhoneModal";
import CallImg from "../../../public/hospital/call.svg"

const PhoneButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className="w-[72px] h-full flex flex-col aspect-square bg-primary-300 border-0 rounded-full text-white text-xs leading-[1.35] font-semibold p-4 mb-0 mt-auto drop-shadow-[5px_5px_5px_rgba(92,153,255,0.2)] hover:bg-primary-300"
        onClick={() => {
          setShowModal(prev => !prev);
        }}
      >
        <Image src={CallImg} alt="문의하기"/>
        문의하기
      </Button>
      {showModal && <PhoneModal phoneNumber={phoneNumber} setShowModal={setShowModal} />}
    </>
  );
};

export default PhoneButton;
