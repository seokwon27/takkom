import Image from "next/image";
import kkom from "../../../public/logoIcon.svg";
import PrivacyPolicy from "@/components/mypage/markdown/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col justify-center items-center mt-[84px]">
        <Image src={kkom} alt="따꼼 로고" className=""></Image>
      </div>
      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
