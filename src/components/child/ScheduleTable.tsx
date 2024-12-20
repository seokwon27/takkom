"use client";

import React, { useState } from "react";
import { Tables } from "../../../database.types";
import { calculateSchedule } from "@/api/vaccineApi";
import browserClient from "@/utils/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useVaccineRecordQuery, useVaccineScheduleQuery } from "@/query/useVaccineRecordQuery";
import ScheduleTableRow from "./ScheduleTableRow";
import checkListIcon from "../../../public/child/checklist-icon.svg";
import Image from "next/image";

// 여기서 child id에 대한 vaccine record를 가져와서 vaccine id가 포함되어 있으면
const ScheduleTable = ({ child }: { child?: Tables<"child"> }) => {
  const today = new Date();
  const currentMonth = `${today.getFullYear()}.${("0" + (today.getMonth() + 1)).slice(-2)}`;
  const [month, setMonth] = useState(currentMonth);

  const {
    data: schedule,
    isLoading: isScheduleLoading,
    isError: isScheduleError
  } = useVaccineScheduleQuery(browserClient);
  const {
    data: vaccineRecord,
    isLoading: isVaccineRecordLoading,
    isError: isVaccineRecordError
  } = useVaccineRecordQuery(child?.id);

  const childSchedule = calculateSchedule(child?.birth, schedule);
  const scheduleMonths = Array.from(childSchedule?.keys() ?? []);
  const filteredSchedule = childSchedule?.get(month)?.filter((data) => !vaccineRecord?.includes(data.id)) ?? [];

  if (isScheduleLoading || isVaccineRecordLoading) {
    return <LoadingError currentMonth={currentMonth} text={"로딩중입니다."} />;
  }
  if (isScheduleError || isVaccineRecordError) {
    return <LoadingError currentMonth={currentMonth} text={"죄송합니다. 에러가 발생했습니다."} />;
  }

  return (
    <div className="flex flex-col p-6 bg-white rounded-3xl shadow-[0px_0px_12px_rgba(114,114,114,0.1)]">
      <div className="flex gap-[10px]">
        <Image src={checkListIcon} alt="일정표 아이콘" />
        <p className="text-title-s font-bold text-gray-700">접종 일정표</p>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[120px] h-[26px] justify-center border-0 bg-gray-30 text-gray-600">
            <p className="text-title-xxs font-semibold">{`${month.split(".")[0]}년 ${month.split(".")[1]}월`}</p>
          </SelectTrigger>
          <SelectContent
            className="w-[50px] h-[180px] shadow-[0px_0px_16px_rgba(114,114,114,0.1)]"
            align="center"
            avoidCollisions={false}
          >
            {scheduleMonths.map((month) => (
              <SelectItem
                value={month}
                key={month}
                className="h-fit p-0 py-1 justify-center items-center text-title-xxs"
              >{`${month.split(".")[0]}년 ${month.split(".")[1]}월`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-[174px] flex mt-6 overflow-auto">
        <Table>
          <TableHeader className="[&_tr]:border-0 sticky top-0 bg-white">
            <TableRow className="hover:bg-white">
              <TableHead className="h-[22px] p-0">
                <div className="px-4 pb-1 grid grid-cols-[minmax(180px,auto)_minmax(80px,auto)_minmax(160px,auto)_40px] max-sm:grid-cols-[minmax(70px,auto)_minmax(60px,auto)_minmax(90px,auto)_30px] border-b border-gray-30 text-label-s font-medium text-gray-400">
                  <p>예방접종명</p>
                  <p>백신명</p>
                  <p>날짜</p>
                  <p className="">기타</p>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-2 m-0 p-0 border-0 hover:bg-white" />
            {filteredSchedule.length > 0 &&
              filteredSchedule.map((data) => {
                const { disease_name: disease, vaccine_name: vaccineName, startDate, endDate, additional } = data;
                return (
                  <ScheduleTableRow
                    data={{ disease, vaccineName, startDate, endDate, additional }}
                    key={`${child?.id}_${data.id}`}
                  />
                );
              })}
            {filteredSchedule.length === 0 && (
              <TableRow className="text-title-xxxs font-semibold hover:bg-white" key={`${child?.id}_done`}>
                <TableCell colSpan={4} className="pt-[60px] text-gray-700 text-center">
                  모두 접종했습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScheduleTable;

const LoadingError = ({ currentMonth, text }: { currentMonth: string; text: string }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-3xl shadow-[0px_0px_12px_rgba(114,114,114,0.1)]">
      <div className="flex gap-[10px]">
        <Image src={checkListIcon} alt="일정표 아이콘" />
        <p>접종 일정표</p>
        <Select>
          <SelectTrigger className="w-[120px] h-[26px] justify-center border-0 bg-gray-30 text-gray-600">
            <p className="text-title-xxs font-semibold">{`${currentMonth.split(".")[0]}년 ${
              currentMonth.split(".")[1]
            }월`}</p>
          </SelectTrigger>
        </Select>
      </div>
      <div className="w-full h-[174px] flex mt-6 overflow-auto">
        <Table>
          <TableHeader className="[&_tr]:border-0 sticky top-0 bg-white">
            <TableRow className="hover:bg-white">
              <TableHead className="h-[22px] p-0">
                <div className="px-4 pb-1 grid grid-cols-[minmax(180px,auto)_minmax(80px,auto)_minmax(160px,auto)_40px] border-b border-gray-30 text-label-s font-medium text-gray-400">
                  <p>예방접종명</p>
                  <p>백신명</p>
                  <p>날짜</p>
                  <p className="">기타</p>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-2 m-0 p-0 border-0 hover:bg-white" />

            <TableRow className="text-title-xxxs font-semibold hover:bg-white" key={text}>
              <TableCell colSpan={4} className="pt-[60px] text-gray-700 text-center">
                {text}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
