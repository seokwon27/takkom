import { HopsitalItem } from "@/types/hospital";
import React from "react";

const HospitalCard = ({ info }: { info: HopsitalItem }) => {
  const {
    orgnm,
    orgTlno,
    orgAddr,
    vcnList: { vcnInfo }
  } = info;

  const vaccineNames = Array.isArray(vcnInfo) ? vcnInfo.map(info => info.vcnNm) : [vcnInfo.vcnNm];

  return (
    <div className="w-full border rounded-lg">
      <div className="grid grid-cols-2 grid-rows-4">
        <p>병원 이름 :</p> <p>{orgnm}</p>
        <p>병원 주소 :</p> <p>{orgAddr}</p>
        <p>전화 번호 :</p> <p>{orgTlno}</p>
        <p>백신 목록 :</p>
        <p>
          {vaccineNames.map((name, idx) => {
            if (idx === vaccineNames.length - 1) {
              return <span key={`${orgnm}_vcnNm_${name}`}>{name}</span>;
            } else {
              return <span key={`${orgnm}_vcnNm_${name}`}>{name}, </span>;
            }
          })}
        </p>
      </div>
    </div>
  );
};

export default HospitalCard;
