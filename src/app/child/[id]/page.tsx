import { getVaccinations } from "@/api/vaccinations/vaccinationsApi";
import VaccinateRecord from "@/components/VaccinateRecord";
import { createClient } from "@/utils/supabase/server";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface VaccinatePageProps {
  params: {
    id: string;
  };
}

const VaccinatePage = async ({ params }: VaccinatePageProps) => {
  const serverClient = createClient();
  const queryClient = new QueryClient();

  const id = params.id;

  await queryClient.prefetchQuery({
    queryKey: ["vaccinations", id],
    queryFn: () => getVaccinations(serverClient, id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <VaccinateRecord id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default VaccinatePage;
