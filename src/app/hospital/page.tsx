import HospitalList from "@/components/hospital/HospitalList";
import SearchForm from "@/components/hospital/SearchForm";
import { getBrtcCd, getRegionInfo } from "@/api/hospital-actions";
import { HospitalSearchParams } from "@/types/hospital";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/api/userApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "따꼼 - 동네 병원 찾기",
  description: "주소와 병원명을 활용한 맞춤형 검색을 통해 원하는 병원을 찾아볼 수 있어요.",
  keywords: ["따꼼", "따꼬미", "동네 병원 찾기", "예방접종"],
  openGraph: {
    title: "따꼼 - 동네 병원 찾기",
    description: "주소와 병원명을 활용한 맞춤형 검색을 통해 원하는 병원을 찾아볼 수 있어요."
  }
};

const HospitalSearchPage = async ({ searchParams }: { searchParams: HospitalSearchParams }) => {
  const supabaseClient = createClient();
  const brtcObj = await getBrtcCd();
  const regionInfo = await getRegionInfo();

  const user = await getUser(supabaseClient);

  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto max-sm:max-w-auto">
      <section className="w-full flex flex-col bg-white max-sm:sticky max-sm:top-0 max-sm:z-[41]">
        <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} searchParams={searchParams} />
      </section>
      <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6 bg-white max-sm:mt-[14px] max-sm:mb-0 max-sm:px-0 max-sm:pb-0">
        <HospitalList searchParams={searchParams} user={user} />
      </section>
    </div>
  );
};

export default HospitalSearchPage;
