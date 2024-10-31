"use client";

import { useChildrenQuery, useUserQuery } from "@/api/userApi";
import { calculateSchedule, useVaccineScheduleQuery } from "@/api/vaccineApi";
import browserClient from "@/utils/supabase/client";
import React from "react";
import { addDays, addMonths, format } from "date-fns";

// 나중에 input으로 받을 것
// child: 아이 정보
// 접종 일정도 상위에서 한번만 가져와서 같이 뿌려주면 좋을 듯

// 추후 해야할 것
// 접종 정보 가져와서 받은 백신 표시하기
const Schedule = () => {
  const { user, isUserLoading, isUserError } = useUserQuery(browserClient);

  const {
    data: schedule,
    isLoading: isScheduleLoading,
    isError: isScheduleError
  } = useVaccineScheduleQuery(browserClient);

  const {
    data: childrenData,
    isLoading: isChildrenLoading,
    isError: isChildrenError
  } = useChildrenQuery(browserClient, user?.id);

  if (isUserLoading || isChildrenLoading || isScheduleLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError || isChildrenError || isScheduleError) {
    return <div>Error.</div>;
  }

  return (
    <div>
      <p>Schedule</p>
    </div>
  );
};

export default Schedule;
