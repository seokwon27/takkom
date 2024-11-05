import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import SearchButton from "@/components/vaccineinfo/SearchButton";
import VaccineList from "@/components/vaccineinfo/VaccineList";

const VaccineInfoPage = async () => {
  return (
    <div className="container flex flex-col max-w-[800px] mx-auto justify-center">
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
      <SearchButton />
    </div>
  );
};

export default VaccineInfoPage;
