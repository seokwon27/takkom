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
      className="fixed  flex justify-center items-center top-0 left-0  w-full h-full z-20 bg-black/50"
      ref={ModalRef}
      onClick={(e) => {
        if (e.target === ModalRef.current) {
          onClose();
        }
      }}
    >
      {/* 모달창 내부 영역 */}
      <div className="bg-white px-8 py-6 rounded-xl flex flex-col gap-6 relative w-[360px] h-[258px]">
        <div className="text-left">
          <div className="text-right">
            <button onClick={() => onClose()} className="w-6 h-6">
              <img src="/icon/closeBtn.svg" alt="closeBtn" />
            </button>
          </div>
          <h1 className="text-gray-800 text-lg font-semibold">지역을 선택해 주세요.</h1>
        </div>
        <SelectBrtc />
      </div>
    </div>
  );
};
