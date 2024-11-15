import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "따꼼 예방 접종",
  description: "예방접종 리스트를 연령별로 확인할 수 있습니다"
};

const VaccineInfoPage = async () => {
  return (
    <div
      className="container flex flex-col mx-auto justify-center max-w-[800px] mt-[64px]
      max-sm:mt-3 max-sm:px-6
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
