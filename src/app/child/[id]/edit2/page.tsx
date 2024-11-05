import { getVaccines } from "@/api/vaccineApi";
import { getVaccineRecord } from "@/api/vaccineRecord/vaccineRecordApi";

import CheckboxFormWrap from "@/components/vaccinerecord/CheckboxFormWrap";

import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Image from "next/image";
import Vaccination11 from "../../../../assets/images/vaccinerecord/vaccination-1-1.png";
import Vaccination12 from "../../../../assets/images/vaccinerecord/vaccination-1-2.png";

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
      <div className="flex flex-col max-w-[796px] gap-20 justify-center items-center mx-auto my-[100px]">
        <div className="flex flex-col gap-10 relative self-stretch w-full">
          <div className="inline-flex flex-col items-start gap-12">
            <Image src={Vaccination11} alt="Vaccination" className="w-20 h-20 object-cover relative" />
            <div className="inline-flex flex-col items-start gap-3 relative">
              <h1 className="self-stretch mt-[-1.00px] font-heading-XXL text-gray-900 text-[32px] font-bold">
                우리 아이 접종 내역
              </h1>
            </div>
            <Image
              src={Vaccination12}
              alt="Vaccination"
              className="absolute w-[100px] h-[100px] -top-0.5 -left-px object-cover"
            />
            <CheckboxFormWrap childId={params.id} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default VaccineRecordEditPage;
