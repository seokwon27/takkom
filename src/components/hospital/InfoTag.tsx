import React from "react";

const InfoTag = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`transition-all duration-200 text-white ${isVisible ? 'opacity-100 bg-gray-800' : 'opacity-0 bg-tansparent'} px-[18px] py-3 rounded-t-lg rounded-r-lg`}
    >
      <p>도로명 주소를 입력해 주세요.</p>
      <p>
        ex. 서울특별시 중구 <span className="text-primary-400">중림로 37 (중림동)</span>
      </p>
    </div>
  );
};

export default InfoTag;
