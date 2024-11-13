import HospitalList from "@/components/hospital/HospitalList";
import SearchForm from "@/components/hospital/SearchForm";
import { getBrtcCd, getRegionInfo } from "@/api/hospital-actions";
import { HospitalSearchParams } from "@/types/hospital";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/api/userApi";

const HospitalSearchPage = async ({ searchParams }: { searchParams: HospitalSearchParams }) => {
  const supabaseClient = createClient();
  const brtcObj = await getBrtcCd();
  const regionInfo = await getRegionInfo();

  const user = await getUser(supabaseClient);

  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto max-sm:max-w-auto">
      <section className="w-full flex flex-col bg-white max-sm:px-6 max-sm:sticky max-sm:top-0 max-sm:z-[41]">
        <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} searchParams={searchParams} />
      </section>
      <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6 bg-white max-sm:my-0 max-sm:px-0 max-sm:pb-0">
        <HospitalList searchParams={searchParams} user={user} />
      </section>
      {/* </SearchForm> */}
    </div>
  );
};

export default HospitalSearchPage;
