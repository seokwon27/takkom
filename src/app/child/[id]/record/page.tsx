import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import BackButton from "@/components/ui/back-button";
import VaccineRecordTabs from "@/components/vaccinerecord/VaccineRecordTabs";
import VaccineRecordTitle from "@/components/vaccinerecord/VaccineRecordTitle";

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
      <div className="flex flex-col w-full px-6 pb-20 justify-center items-center mx-auto sm:max-w-[796px] sm:gap-20 sm:items-start sm:my-[100px]">
        <div className="flex w-full items-start py-1.5 sticky top-0 bg-white z-50 sm:hidden">
          <BackButton childId={childId} />
        </div>
        <div className="flex flex-col gap-10 relative self-stretch w-full sm:max-w-[796px] sm:items-start">
          <VaccineRecordTitle />
          <VaccineRecordTabs childId={params.id} edit={true} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default VaccineRecordEditPage;
