"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import PhoneModal from "./PhoneModal";

const PhoneButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className="bg-white border border-solid border-gray-700 rounded-full text-gray-700 p-4 hover:bg-white"
        onClick={() => {
          setShowModal(prev => !prev);
        }}
      >
        문의하기
      </Button>
      {showModal && <PhoneModal phoneNumber={phoneNumber} setShowModal={setShowModal} />}
    </>
  );
};

export default PhoneButton;
