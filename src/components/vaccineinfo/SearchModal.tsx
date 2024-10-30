"use client";

import { ModalRef } from "./SearchButton";
import SelectBrtc from "./SelectBrtc";

export const SearchModal = ({
  isOpen,
  onClose,
  ModalRef
}: {
  isOpen: boolean;
  onClose: () => void;
  ModalRef: ModalRef;
}) => {
  if (!isOpen) return null;
  return (
    // 모달창 외부 배경
    <div
      className="fixed  flex justify-center items-center top-0  w-full h-full z-10 bg-black/50"
      ref={ModalRef}
      onClick={(e) => {
        if (e.target === ModalRef.current) {
          onClose();
        }
      }}
    >
      {/* 모달창 내부 영역 */}
      <div className="bg-white p-[42px]">
        <div>
          <div className="text-left">
            <h1>지역을 선택해 주세요.</h1>
          </div>
          <SelectBrtc />
        </div>
      </div>
    </div>
  );
};
