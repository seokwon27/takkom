import React from "react";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import selectiveIcon from "../../../public/child/selective-icon.svg";
import essentialIcon from "../../../public/child/essential-icon.svg";

type SchduleTableRowParams = {
  data: { disease: string; vaccineName: string; startDate: string; endDate: string; additional: boolean };
};

const ScheduleTableRow = ({ data }: SchduleTableRowParams) => {
  const { disease, vaccineName, startDate, endDate, additional } = data;

  // 모바일과 데스크탑에서 보여줄 날짜 형식 설정
  const dateMobile: string = startDate === endDate ? startDate : `${startDate} ~`;
  const dateDesktop: string = startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;

  return (
    <TableRow className="h-[32px] m-0 p-0 border-0 text-title-xxxs font-semibold hover:bg-white">
      <TableCell className="px-4 py-1 m-0 mt-[4px] items-center grid grid-cols-[minmax(180px,auto)_minmax(80px,auto)_minmax(160px,auto)_40px] max-sm:grid-cols-[minmax(70px,auto)_minmax(60px,auto)_minmax(90px,auto)_30px] text-gray-700 hover:border-0 hover:bg-primary-50 hover:rounded-md hover:text-primary-300">
        <p className="truncate">{disease}</p>
        <p>{vaccineName}</p>
        {/* 모바일 환경과 데스크탑 환경에 따라 다른 형식으로 날짜 표시 */}
        <p className="truncate sm:hidden">{dateMobile}</p> {/* 모바일에서는 시작 날짜만 표시 */}
        <p className="truncate hidden sm:block">{dateDesktop}</p> {/* 데스크탑에서는 전체 날짜 표시 */}
        {additional && <Image src={selectiveIcon} alt="선택" width={40} height={24} className="w-[40px] h-[24px]" />}
        {!additional && <Image src={essentialIcon} alt="필수" width={40} height={24} className="w-[40px] h-[24px]" />}
      </TableCell>
    </TableRow>
  );
};

export default ScheduleTableRow;
