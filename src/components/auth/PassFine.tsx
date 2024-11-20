import Image from "next/image";
import sorry from "../../../public/sorry.png";

const PassFine = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen px-6 py-12">
      <Image src={sorry} alt="추후 오픈 예정입니다"></Image>
    </div>
  );
};

export default PassFine;
