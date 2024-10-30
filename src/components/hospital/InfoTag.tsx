// import React from "react";

// const InfoTag = ({ isVisible }: { isVisible: boolean }) => {
//   return (
//     <div className={`${isVisible ? "animate-fadein bg-gray-500 text-white" : "animate-fadeout text-transparent"} p-2 rounded-t-lg rounded-r-lg`}>
//     {/* <div className={`${isVisible ? null : "hidden"} p-2 rounded-t-lg rounded-r-lg`}> */}
//       <p>도로명 주소를 입력해 주세요.</p>
//       <p>ex. 서울특별시 관악구 <span className={`${isVisible ? "animate-fadein text-primary-500 bg-transparent" : "animate-fadeout"} bg-transparent`}>신림로</span></p>
//     </div>
//   );
// };

// export default InfoTag;

import React from "react";

const InfoTag = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`transition-all duration-200 text-white ${isVisible ? 'opacity-100 bg-gray-500' : 'opacity-0 bg-tansparent'} p-2 rounded-t-lg rounded-r-lg`}
    >
      <p>도로명 주소를 입력해 주세요.</p>
      <p>
        ex. 서울특별시 관악구 <span className="text-primary-500">신림로</span>
      </p>
    </div>
  );
};

export default InfoTag;
