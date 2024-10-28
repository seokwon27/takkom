import React from "react";
import { Button } from "../ui/button";
import { PhoneCall } from "lucide-react";

const PhoneModal = ({
  phoneNumber,
  setShowModal
}: {
  phoneNumber: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50"
      onClick={(e) => {
        e.stopPropagation();
        setShowModal((prev) => !prev);
      }}
    >
      <div // 모달창
        className="w-[300px] h-[232px] flex flex-col justify-between p-6 rounded-xl bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>예약 전 병원에 문의 해보세요.</p>
        <div className="flex items-center gap-4 bg-gray-30 rounded-lg px-4 py-2">
          <PhoneCall className="-scale-x-100 w-[15px] h-[15px] text-gray-600" />
          <p className="text-gray-600 text-base">{phoneNumber}</p>
        </div>
        <Button
          className="text-white p-6 bg-primary-400 hover:bg-primary-100"
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
