import React from "react";
import { Button } from "../ui/button";
import PhoneImg from "../../../public/hospital/phone.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Modal from "../layout/Modal";

const PhoneModal = ({
  phoneNumber,
  setShowModal
}: {
  phoneNumber: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal position={document.body}>
      <div // 모달창
        className={cn(
          "w-full max-w-[360px] h-fit max-h-[269px] flex flex-col justify-between p-6 rounded-xl bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
          "max-sm:max-w-[327px] max-sm:max-h-[235px]"
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <p className="text-xl font-bold mb-2 max-sm:mb-[6px] max-sm:text-heading-s">문의하기</p>
          <p>예약을 위해 병원에 문의 해보세요.</p>
        </div>
        <div className="h-[42px] flex items-center gap-6 bg-gray-30 rounded-lg px-4 py-2 mt-6 mb-[32px] max-sm:mb-6 max-sm:gap-5">
          <Image src={PhoneImg} alt="전화" className="w-5 h-5 max-sm:w-[18px] max-sm:h-[18px]" />
          <p className="text-md font-semibold text-gray-600 max-sm:text-title-ssx ">
            {phoneNumber.replaceAll("-", " - ")}
          </p>
        </div>
        <Button
          className="w-full h-14 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-400 max-sm:h-11 max-sm:py-4 max-sm:text-title-s"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal((prev) => !prev);
          }}
        >
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default PhoneModal;
