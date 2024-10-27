import { getVaccines } from "@/api/vaccineApi";

import VaccineRecord from "@/components/vaccinerecord/VaccinateRecord";
import { createClient } from "@/utils/supabase/server";
import { groupVaccines } from "@/utils/vaccineRecord/vaccinesRecord";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

// interface VaccinatePageProps {
//   params: {
//     id: string;
//   };
// }

const VaccinatePage = async () => {
  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vaccines"],
    queryFn: async () => {
      const vaccines = await getVaccines(serverClient);
      return groupVaccines(vaccines);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <VaccineRecord />
      </div>
    </HydrationBoundary>
  );
};

export default VaccinatePage;
