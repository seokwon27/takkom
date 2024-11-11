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
  const date: string = startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;
  return (
    <TableRow className="h-[32px] m-0 p-0 border-0 text-title-xxxs font-semibold hover:bg-white">
      <TableCell className="px-4 py-1 m-0 mt-[4px] items-center grid grid-cols-[minmax(180px,auto)_minmax(80px,auto)_minmax(160px,auto)_40px] text-gray-700 hover:border-0 hover:bg-primary-50 hover:rounded-md hover:text-primary-300">
        <p>{disease}</p>
        <p>{vaccineName}</p>
        <p>{date}</p>
        {additional && <Image src={selectiveIcon} alt="선택" width={40} height={24} className="w-[40px] h-[24px]" />}
        {!additional && <Image src={essentialIcon} alt="필수" width={40} height={24} className="w-[40px] h-[24px]" />}
      </TableCell>
    </TableRow>
  );
};

export default ScheduleTableRow;
