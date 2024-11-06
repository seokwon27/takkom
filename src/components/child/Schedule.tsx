"use client";

import { useChildrenQuery, useUserQuery } from "@/api/userApi";
import browserClient from "@/utils/supabase/client";
import React from "react";
import ScheduleTable from "./ScheduleTable";
import { Child } from "@/types/childType";

// 나중에 input으로 받을 것
// child: 아이 정보
// 접종 일정도 상위에서 한번만 가져와서 같이 뿌려주면 좋을지도..?
interface ScheduleProps {
  child: Child;
}
// 추후 해야할 것
// 접종 정보 가져와서 받은 백신 표시하기
const Schedule = ({ child }: ScheduleProps) => {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  const {
    data: childrenData,
    isLoading: isChildrenLoading,
    isError: isChildrenError
  } = useChildrenQuery(browserClient, user?.id);

  if (isUserLoading || isChildrenLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError || isChildrenError) {
    return <div>Error.</div>;
  }

   // 자녀 정보 배열에서 해당 child를 찾음
  const selectedChild = childrenData?.find(c => c.id === child.id);

  return (
    <div className="mx-auto w-full">
      {/* <ScheduleTable child={childrenData?.[0]} /> */}
      {/* 선택된 자녀에 대한 ScheduleTable만 표시 */}
      {selectedChild && <ScheduleTable key={selectedChild.id} child={selectedChild} />}
    </div>
  );
};

export default Schedule;
