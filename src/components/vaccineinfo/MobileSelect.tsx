import PreIcon from "../../../public/icon/preIcon.svg";
import Image from "next/image";
import SelectBrtc from "./SelectBrtc";

const MobileSelect = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed top-0 left-0 bg-white w-full h-full pt-3 px-6">
      <div className="text-left py-[6px] mb-6">
        {/* 이전버튼 */}
        <button
          onClick={() => {
            onClose();
          }}
        >
          {<Image src={PreIcon} alt="이전" />}
        </button>
      </div>
      <p className="text-left text-title-s font-semibold">지역을 선택해 주세요.</p>
      <SelectBrtc />
    </div>
  );
};

export default MobileSelect;
