import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";
import { getVaccineList } from "@/utils/vaccineInfo/server-action";

const VaccineInfoPage = async () => {
  const vaccineList = await getVaccineList();
  console.log(vaccineList);

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
