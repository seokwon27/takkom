import React from "react";
import { Button } from "../ui/button";
import phoneImg from "../../../public/hospital/phone.svg";
import Image from "next/image";

const PhoneModal = ({
  phoneNumber,
  setShowModal
}: {
  phoneNumber: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-[52]"
      onClick={(e) => {
        e.stopPropagation();
        setShowModal((prev) => !prev);
      }}
    >
      <div // 모달창
        className="w-[360px] h-fit max-h-[269px] flex flex-col justify-between p-6 rounded-xl bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="">
          <p className="text-xl font-bold mb-[8px]">문의하기</p>
          <p>예약을 위해 병원에 문의 해보세요.</p>
        </p>
        <div className="h-[42px] flex items-center gap-6 bg-gray-30 rounded-lg px-4 py-2 mt-6 mb-[32px]">
          <Image src={phoneImg} alt="전화" className="w-5 h-5" />
          <p className="text-md font-semibold text-gray-600">{phoneNumber.replaceAll('-', ' - ')}</p>
        </div>
        <Button
          className="w-full h-14 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-400"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal((prev) => !prev);
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default PhoneModal;
