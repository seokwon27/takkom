import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";

const VaccineInfoPage = async () => {
  return (
    <div
      className="container flex flex-col mx-auto max-w-[327px] justify-center
    sm:max-w-[800px] sm:mt-[64px]"
    >
      <div className="py-[6px] mb-4 sm:hidden">
        <p className="text-gray-800 text-xl font-semibold">예방접종</p>
      </div>
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
    </div>
  );
};

export default VaccineInfoPage;
