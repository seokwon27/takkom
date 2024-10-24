import { createClient } from "@/utils/supabase/client";
import { getVaccines } from "@/utils/vaccinations/vaccinationsApi";
import { useQuery } from "@tanstack/react-query";

export const useVaccinationQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ["vaccine"],
    queryFn: () => getVaccines(browserClient)
  });
};
