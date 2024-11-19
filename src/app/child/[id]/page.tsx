import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";
import VaccineRecordTabs from "@/components/vaccinerecord/VaccineRecordTabs";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import BackButton from "@/components/ui/back-button";
import VaccineRecordTitle from "@/components/vaccinerecord/VaccineRecordTitle";

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
      <div className="flex flex-col px-6 pb-20 justify-center items-center mx-auto md:w-[796px] md:gap-20 md:items-start md:my-[100px]">
        <div className="flex w-full items-start py-1.5 sticky top-0 bg-white z-50 md:hidden">
          <BackButton childId={childId} />
        </div>
        <div className="flex flex-col gap-10 relative self-stretch w-full md:max-w-[796px] md:items-start">
          <VaccineRecordTitle />

          <VaccineRecordTabs childId={childId} edit={false} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default VaccineRecordPage;
