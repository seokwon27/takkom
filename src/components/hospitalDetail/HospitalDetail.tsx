import { HopsitalItem } from "@/types/hospital";
import HospitalImg from "../../../public/hospital/ambulance.svg";
import Image from "next/image";
import VaccineList from "./VaccineList";
import HospitalMap from "./HospitalMap";

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
      <section className="w-full">
        <div>
          <p className="text-heading-l">{orgnm}</p>
        </div>
        <div className="w-full flex flex-col gap-5 mt-5">
          <div className="w-full flex gap-5 mt-5">
            <Image src={HospitalImg} alt="병원 이미지" />
            <div>
              <p className="mb-2 text-label-xl text-gray-300 max-sm:text-label-s">병원 주소</p>
              <p>{orgAddr}</p>
              <p className="mt-4 mb-2 text-label-xl text-gray-300 max-sm:text-label-s">전화번호</p>
              <p>{orgTlno}</p>
            </div>
          </div>
          <VaccineList vcnInfo={vcnInfo} />
        </div>
      </section>
      <section className="w-full">
        <HospitalMap orgAddr={orgAddr} />
      </section>
    </>
  );
};

export default HospitalDetail;
