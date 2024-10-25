import { getVaccinations } from "@/api/vaccinations/vaccinationsApi";

import { createClient } from "@/utils/supabase/client";

import { useQuery } from "@tanstack/react-query";

export const useVaccinationQuery = (id: string) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ["vaccinations", id],
    queryFn: () => getVaccinations(browserClient, id)
  });
};
