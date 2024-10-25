import { getVaccines } from "@/api/vaccineApi";
import { createClient } from "@/utils/supabase/client";

import { useQuery } from "@tanstack/react-query";

export const useVaccinationQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ["vaccine"],
    queryFn: () => getVaccines(browserClient)
  });
};
