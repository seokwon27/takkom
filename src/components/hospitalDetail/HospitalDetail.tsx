import { HopsitalItem } from "@/types/hospital";
import HospitalImg from "../../../public/hospital/ambulance.svg";
import Image from "next/image";
import VaccineList from "./VaccineList";
import HospitalMap from "./HospitalMap";
import PrevButton from "./PrevButton";

type Props = { hospitalInfo: HopsitalItem };

const HospitalDetail = ({ hospitalInfo }: Props) => {
  const {
    orgnm,
    orgAddr,
    orgTlno,
    vcnList: { vcnInfo }
  } = hospitalInfo;

  return (
    <>
      <PrevButton />
      <section className="w-full max-sm:px-6">
        <div>
          <p className="text-heading-xl max-sm:text-heading-s max-sm:line-clamp-2">{orgnm}</p>
        </div>
        <div className="w-full flex flex-col mt-5 max-sm:mt-0">
          <div className="w-full flex gap-5 mt-5 max-sm:flex-col">
            <Image src={HospitalImg} alt="병원 이미지" className="max-sm:w-full max-sm:aspect-[16/9] max-sm:object-cover"/>
            <div>
              <p className="mb-2 text-label-xl text-gray-300 max-sm:text-label-s max-sm:mb-1">병원 주소</p>
              <p className="max-sm:text-text-m">{orgAddr}</p>
              <p className="mt-4 mb-2 text-label-xl text-gray-300 max-sm:text-label-s max-sm:mt-2 max-sm:mb-1">전화번호</p>
              <p className="max-sm:text-text-m">{orgTlno}</p>
            </div>
          </div>
          <VaccineList vcnInfo={vcnInfo} />
        </div>
      </section>
      <HospitalMap orgnm={orgnm} orgAddr={orgAddr} />
    </>
  );
};

export default HospitalDetail;
