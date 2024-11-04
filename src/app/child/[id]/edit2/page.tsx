import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import CheckboxFormWrap from "@/components/vaccinerecord/CheckboxFormWrap";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

interface VaccineRecordEditPageProps {
  params: {
    id: string;
  };
}

const VaccineRecordEditPage = async ({ params }: VaccineRecordEditPageProps) => {
  const childId = params.id;
  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vaccines"],
    queryFn: async () => {
      const vaccines = await getVaccines(serverClient);
      return groupVaccines(vaccines);
    }
  });

  await queryClient.prefetchQuery({
    queryKey: ["vaccine_record", childId],
    queryFn: async () => {
      const records = await getVaccineRecord(serverClient, childId);
      return records.map((record) => record.vaccine_id);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">우리 아이 접종 내역</h1>
        <div className="flex flex-row justify-between"></div>
        <CheckboxFormWrap childId={params.id} />
      </div>
    </HydrationBoundary>
  );
};

export default VaccineRecordEditPage;
