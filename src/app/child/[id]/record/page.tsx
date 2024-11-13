import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Image from "next/image";
import Vaccination11 from "../../../../../public/vaccinerecord/vaccination1-1.svg";
import Vaccination12 from "../../../../../public/vaccinerecord/vaccination1-2.svg";
import CheckboxFormWrap from "@/components/vaccinerecord/CheckboxFormWrap";

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
      <div className="flex flex-col max-w[375px] justify-center items-center mx-auto md:w-[796px] md:min-h-[1151px] md:gap-20 md:items-start md:my-[100px]">
        <div className="flex flex-col gap-10 relative self-stretch w-full md:max-w-[796px] md:min-h-[999px] md:items-start">
          <div className="inline-flex flex-col items-start gap-6 px-6 relative md:gap-12 md:min-w-[323px] md:min-h-[171px]">
            <Image src={Vaccination11} alt="Vaccination" className="size-12 relative md:size-20" />
            <div className="inline-flex flex-col items-start relative gap-2 md:gap-3 md:px-6">
              <h1 className="self-stretch text-heading-s text-gray-800 font-bold md:text-heading-xxl">
                우리 아이 접종 체크리스트
              </h1>
            </div>
            <Image
              src={Vaccination12}
              alt="Vaccination"
              className="absolute size-12 top-1.5 left-[30px] md:w-[80px] md:h-[80px] md:top-2 md:left-[9px]"
            />
          </div>
          <CheckboxFormWrap childId={params.id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default VaccineRecordEditPage;
