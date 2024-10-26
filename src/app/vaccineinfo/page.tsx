import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import { SearchModal } from "@/components/vaccineinfo/SearchModal";
import VaccineList from "@/components/vaccineinfo/VaccineList";

const VaccineInfoPage = async () => {
  return (
    <div>
      접종 정보 페이지
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
      <SearchModal />
    </div>
  );
};

export default VaccineInfoPage;
