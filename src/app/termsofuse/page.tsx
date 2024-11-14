import Image from "next/image";
import kkom from "../../../public/logoIcon.svg";
import TermsOfUse from "@/components/mypage/markdown/TermsofUse";

const TermsOfUsePage = () => {
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col justify-center items-center mt-[84px]">
        <Image src={kkom} alt="따꼼 로고" className=""></Image>
      </div>
      <TermsOfUse />
    </div>
  );
};

export default TermsOfUsePage;
