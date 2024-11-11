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
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto">
      <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} searchParams={searchParams} />
      <HospitalList searchParams={searchParams} user={user} />
    </div>
  );
};

export default HospitalSearchPage;
