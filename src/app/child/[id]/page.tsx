import VaccinateRecord from "@/components/VaccinateRecord";
import { createClient } from "@/utils/supabase/server";
import { getVaccines } from "@/utils/vaccinations/vaccinationsApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const VaccinatePage = async () => {
  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vaccine"],
    queryFn: () => getVaccines(serverClient)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <VaccinateRecord />
      </div>
    </HydrationBoundary>
  );
};

export default VaccinatePage;
