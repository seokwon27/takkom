import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import SearchButton from "@/components/vaccineinfo/SearchButton";
import VaccineList from "@/components/vaccineinfo/VaccineList";

const VaccineInfoPage = async () => {
  return (
    <div>
      접종 정보 페이지
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
      <SearchButton />
    </div>
  );
};

export default VaccineInfoPage;
