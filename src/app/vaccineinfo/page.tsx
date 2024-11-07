import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";

const VaccineInfoPage = async () => {
  return (
    <div className="container flex flex-col max-w-[800px] mx-auto mt-[64px] justify-center">
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
    </div>
  );
};

export default VaccineInfoPage;
