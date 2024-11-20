import AgeFilter from "@/components/vaccineinfo/AgeFilter";
import AgeGroup from "@/components/vaccineinfo/AgeGroup";
import VaccineList from "@/components/vaccineinfo/VaccineList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "따꼼 - 예방접종 정보",
  description: "우리 아이에게 시기별로 필요한 예방접종 정보를 제공해요.",
  keywords: ["따꼼", "따꼬미", "예방접종"],
  openGraph: {
    title: "따꼼 - 예방접종 정보",
    description: "우리 아이에게 시기별로 필요한 예방접종 정보를 제공해요.",
    url: "https://www.takkom.site/vaccineinfo",
    images: [
      {
        url: "/opengraph/vaccine-og.png",
        width: 1280,
        height: 680,
        alt: "따꼼 - 예방접종 정보"
      }
    ]
  }
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
