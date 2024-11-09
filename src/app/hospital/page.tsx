import HospitalList from "@/components/hospital/HospitalList";
import SearchForm from "@/components/hospital/SearchForm";
import { getBrtcCd, getRegionInfo } from "@/api/hospital-actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { prefetchUser } from "@/query/useUserQuery";
import { HospitalSearchParams } from "@/types/hospital";

const HospitalSearchPage = async ({ searchParams }: { searchParams: HospitalSearchParams }) => {
  const supabaseClient = createClient();
  const brtcObj = await getBrtcCd();
  const regionInfo = await getRegionInfo();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  });

  await prefetchUser(queryClient, supabaseClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto">
        <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} searchParams={searchParams} />
        <HospitalList searchParams={searchParams} />
      </div>
    </HydrationBoundary>
  );
};

export default HospitalSearchPage;
