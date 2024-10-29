import { HopsitalItem } from "@/types/hospital";
import React from "react";
import FreeTag from "./FreeTag";
import PhoneButton from "./PhoneButton";

const HospitalCard = ({ info, filter, openVaccine, setOpenVaccine}: { info: HopsitalItem; filter: string | undefined, openVaccine:string, setOpenVaccine: React.Dispatch<React.SetStateAction<string>> }) => {
  const {
    orgnm,
    orgTlno,
    orgAddr,
    vcnList: { vcnInfo }
  } = info;

  const vaccineNames = Array.isArray(vcnInfo) ? vcnInfo.map((info) => info.vcnNm) : [vcnInfo.vcnNm];

  return (
    <div className="w-full h-fit min-h-[192px] flex border rounded-lg p-4 justify-between items-center">
      <div>
        <div className="w-[160px] h-[160px] rounded-2xl bg-gray-300" />
      </div>
      <div className="h-full flex flex-col gap-4 flex-1 mx-4">
        <FreeTag />
        <table>
          <tbody>
            <tr>
              <td className="w-[96px] text-gray-900">
                <p>병원 이름</p>
              </td>
              <td className="text-gray-700">
                <p>{orgnm}</p>
              </td>
            </tr>
            <tr>
              <td className="w-[96px] text-gray-900">
                <p>병원 주소</p>
              </td>
              <td className="text-gray-700">
                <p>{orgAddr}</p>
              </td>
            </tr>
            <tr>
              <td className="w-[96px] text-gray-900">
                <p>백신 목록</p>
              </td>
              <td className="text-gray-700">
                <ul>
                  {
                    filter ? (
                      <li>
                        {filter} {vaccineNames.length > 1 ? `외 ${vaccineNames.length - 1}개` : null}{" "}
                      </li>
                    ) : vaccineNames.length === 1 ? (
                      <li>{vaccineNames[0]}</li>
                    ) : (
                      <li>
                        {vaccineNames[0]} 외 {`${vaccineNames.length - 1}`}개
                      </li>
                    )
                    // (
                    //   vaccineNames.map((name, idx) => {
                    //     if (idx === vaccineNames.length - 1) {
                    //       return <li key={`${orgnm}_vcnNm_${name}`}>{name}</li>;
                    //     } else {
                    //       return <li key={`${orgnm}_vcnNm_${name}`}>{name}, </li>;
                    //     }
                    //   })
                    // )
                  }
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PhoneButton phoneNumber={orgTlno} />
    </div>
  );
};

export default HospitalCard;
