import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";
import { Button } from "@/components/ui/button";
import VaccineRecord from "@/components/vaccinerecord/VaccineRecord";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface VaccinatePageProps {
  params: {
    id: string;
  };
}

const VaccinatePage = async ({ params }: VaccinatePageProps) => {
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
    queryFn: () => getVaccineRecord(serverClient, childId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">우리 아이 접종 내역</h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <div>전체</div>
            <div>접종 완료</div>
            <div>미접종</div>
          </div>
          <Link href={`/child/${params.id}/edit`}>
            <Button>수정하기</Button>
          </Link>
        </div>
        <VaccineRecord />
      </div>
    </HydrationBoundary>
  );
};

export default VaccinatePage;
