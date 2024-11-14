import Image from "next/image";
import kkom from "../../../public/logoIcon.svg";
import TermsOfUse from "@/components/mypage/markdown/TermsofUse";

const TermsOfUsePage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Image src={kkom} alt="따꼼 로고" className=""></Image>
      </div>
      <TermsOfUse />
    </div>
  );
};

export default TermsOfUsePage;
