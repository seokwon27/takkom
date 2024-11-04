"use client";

import React from "react";
import { Tables } from "../../../database.types";
import { calculateSchedule } from "@/api/vaccineApi";
import browserClient from "@/utils/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useVaccineRecordQuery, useVaccineScheduleQuery } from "@/query/useVaccineRecordQuery";

// 여기서 child id에 대한 vaccine record를 가져와서 vaccine id가 포함되어 있으면
const ScheduleCarousel = ({ child }: { child?: Tables<"child"> }) => {
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

  // '이번달'을 기준으로 시작하는 캐러셀 인덱스 설정
  // '아이 접종 일정표'에 해당하지 않는 시점인 경우 마지막 달을 보여줌
  const today = new Date();
  const currentMonth = `${today.getFullYear()}.${("0" + (today.getMonth() + 1)).slice(-2)}`;
  const startIndex =
    Array.from(childSchedule?.keys() ?? []).findIndex((month) => month === currentMonth) === -1
      ? (childSchedule?.size ?? 1) - 1
      : Array.from(childSchedule?.keys() ?? []).findIndex((month) => month === currentMonth);

  if (isScheduleLoading || isVaccineRecordLoading) {
    return <div>아이 카드 접종 일정표 Loading....</div>;
  }
  if (isScheduleError || isVaccineRecordError) {
    return <div>아이 카드 접종 일정표 Error</div>;
  }

  return (
    <Carousel opts={{ startIndex }} className="w-full max-w-xs">
      <CarouselContent>
        {Array.from(childSchedule?.entries() || []).map((schedule, index) => {
          const [month, vaccines] = schedule;
          return (
            <CarouselItem key={index}>
              <div className="flex flex-col p-1">
                <p className="mx-auto">{month}</p>
                <div>
                  <ul>
                    {vaccines.length === 0 ? (
                      <li>접종 일정이 없습니다.</li>
                    ) : (
                      vaccines.map((vaccine) => (
                        <li key={`${month}_${vaccine.id}`}>
                          <p className={`${vaccineRecord?.includes(vaccine.id) && "line-through"}`}>
                            {vaccine.disease_name} - {vaccine.vaccine_name}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="top-0 left-0 translate-y-0" />
      <CarouselNext className="top-0 right-0 translate-y-0" />
    </Carousel>
  );
};

export default ScheduleCarousel;
