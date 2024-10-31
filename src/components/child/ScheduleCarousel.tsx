"use client";

import React from "react";
import { Tables } from "../../../database.types";
import { calculateSchedule, useVaccineScheduleQuery } from "@/api/vaccineApi";
import browserClient from "@/utils/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// 여기서 child id에 대한 vaccine record를 가져와서 vaccine id가 포함되어 있으면 
const ScheduleCarousel = ({ child }: { child?: Tables<"child"> }) => {
  const { data: schedule, isLoading, isError } = useVaccineScheduleQuery(browserClient);

  const childSchedule = calculateSchedule(child?.birth, schedule);

  if (isLoading) {
    return <div>아이 카드 접종 일정표 Loading....</div>;
  }
  if (isError) {
    return <div>아이 카드 접종 일정표 Error</div>;
  }

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from(childSchedule?.entries() || []).map((schedule, index) => {
          const [month, vaccines] = schedule;
          return (
            <CarouselItem key={index}>
              <div className="flex flex-col p-1">
                <p className="mx-auto">{month}</p>
                <div>
                  <ul>
                    {vaccines.length === 0 ? <li>접종 일정이 없습니다.</li>:vaccines.map(vaccine => (<li key={`${month}_${vaccine.id}`}>{vaccine.disease_name} - {vaccine.vaccine_name}</li>))}
                  </ul>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="top-0 left-0 translate-y-0"/>
      <CarouselNext className="top-0 right-0 translate-y-0"/>
    </Carousel>
  );
};

export default ScheduleCarousel;
