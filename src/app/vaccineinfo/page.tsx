import { getVaccines } from "@/api/vaccineApi";
import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";
import { createClient } from "@/utils/supabase/server";

const VaccineInfoPage = async () => {
  const serverClinet = createClient();

  await getVaccines(serverClinet);

  return (
    <div>
      접종 정보 페이지
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
    </div>
  );
};

export default VaccineInfoPage;
