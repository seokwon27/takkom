import Image from "next/image";
import Vaccination11 from "../../../public/vaccinerecord/vaccination1-1.svg";
import Vaccination12 from "../../../public/vaccinerecord/vaccination1-2.svg";

import IconHover from "./ui/IconHover";

const VaccineRecordTitle = () => {
  return (
    <div className="flex flex-col items-start gap-6 relative md:gap-12 md:min-w-[323px] md:min-h-[171px]">
      <Image src={Vaccination11} alt="Vaccination" className="size-12 relative md:size-20" />
      <div className="flex flex-row items-center relative gap-2 md:gap-3 md:px-6">
        <h1 className="text-heading-s text-gray-800 font-bold md:text-heading-xxl">우리 아이 접종 체크리스트</h1>
        <IconHover />
      </div>
      <Image
        src={Vaccination12}
        alt="Vaccination"
        className="absolute size-12 top-1.5 left-[6px] md:w-[80px] md:h-[80px] md:top-2"
      />
    </div>
  );
};

export default VaccineRecordTitle;
