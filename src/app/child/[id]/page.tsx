import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";
import VaccineRecord from "@/components/vaccinerecord/VaccineRecord";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface VaccinatePageProps {
  params: {
    id: string;
  };
}

const VaccineRecordPage = async ({ params }: VaccinatePageProps) => {
  const childId = params.id;
  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vaccines"],
    queryFn: async () => {
      const vaccines = await serverClient;
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
        <VaccineRecord childId={childId} />
      </div>
    </HydrationBoundary>
  );
};

export default VaccineRecordPage;
