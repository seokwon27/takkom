import { HopsitalItem } from "@/types/hospital";
import React from "react";
import Image from "next/image";
import PhoneButton from "./PhoneButton";
import VaccineNames from "./VaccineNames";
import ambulance from "../../../public/hospital/ambulance.svg";
import freeTag from "../../../public/common/free-tag.svg";

const HospitalCard = ({ info, filter }: { info: HopsitalItem; filter?: string }) => {
  const {
    orgnm,
    orgTlno,
    orgAddr,
    vcnList: { vcnInfo }
  } = info;
  const vaccineNames = Array.isArray(vcnInfo)
    ? vcnInfo.map((info) => {
        return info.vcnNm;
      })
    : [vcnInfo?.vcnNm ?? "접종 정보가 없습니다."];

  return (
    <div className="w-full h-fit min-h-[200px] flex border border-gray-30 rounded-3xl p-4 justify-between items-start shadow-[0px_0px_16px_rgba(114,114,114,0.1)]">
      <div className="w-[160px] flex justify-center items-center bg-gray-10 rounded-xl aspect-square">
        <Image src={ambulance} alt="병원 이미지" />
      </div>
      <div className="flex-1 h-full flex flex-col gap-4 mx-[24px] text-sm">
        <Image src={freeTag} alt="무료 접종" />
        <div className="max-w-[450px] grid grid-cols-[minmax(52px,80px)_auto] grid-rows-[repeat(3, minmax(0,20px))] gap-2">
          {/* <div className="flex justify-start gap-1 flex-auto"> */}
          <p className="text-gray-300">병원 이름</p>
          <p className="grow text-gray-700 line-clamp-1">{orgnm}</p>
          {/* </div>
          <div className="flex justify-start gap-1 flex-auto"> */}
          <p className="text-gray-300">병원 주소</p>
          <p className="text-gray-700 break-all line-clamp-2">{orgAddr}</p>
          {/* </div>
          <div className="flex justify-start gap-1 flex-auto items-center"> */}
          <div className="flex items-center">
            <p className="text-gray-300">접종 목록</p>
          </div>
          <div className="text-gray-700">
            <VaccineNames filter={filter} vaccineNames={vaccineNames} />
            {/* </div> */}
          </div>
        </div>
      </div>
      <PhoneButton phoneNumber={orgTlno} />
    </div>
  );
};

export default HospitalCard;
