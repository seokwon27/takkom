import { HopsitalItem } from "@/types/hospital";
import React from "react";
import FreeTag from "./FreeTag";
import PhoneButton from "./PhoneButton";
import VaccineNames from "./VaccineNames";

const HospitalCard = ({
  info,
  filter,
}: {
  info: HopsitalItem;
  filter: string | undefined;
}) => {
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
                <VaccineNames
                  hospitalCd={info.orgcd}
                  filter={filter}
                  vaccineNames={vaccineNames}
                />
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
