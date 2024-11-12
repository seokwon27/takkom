import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";

const VaccineInfoPage = async () => {
  return (
    <div
      className="container flex flex-col mx-auto justify-center max-w-[800px] mt-[64px]
      max-sm:max-w-[327px] max-sm:mt-3
      "
    >
      <div className="py-[6px] mb-4 hidden max-sm:block">
        <p className="text-gray-800 text-title-m font-semibold">예방접종</p>
      </div>
      <AgeGroup />
      <AgeFilter />
      <VaccineList />
    </div>
  );
};

export default VaccineInfoPage;
