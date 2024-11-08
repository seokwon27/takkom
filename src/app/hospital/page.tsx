import HospitalList from "@/components/hospital/HospitalList";
import SearchForm from "@/components/hospital/SearchForm";
import { getBrtcCd, getRegionInfo } from "@/api/hospital-actions";
import { Suspense } from "react";
import LoadingSearchForm from "@/components/hospital/LoadingSearchForm";
import LoadingHospitalList from "@/components/hospital/LoadingHospitalList";

const HospitalSearchPage = async () => {
  const brtcObj = await getBrtcCd();
  const regionInfo = await getRegionInfo();

  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto">
      <Suspense fallback={<LoadingSearchForm />}>
        <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} />
      </Suspense>
      <Suspense fallback={<LoadingHospitalList />}>
        <HospitalList />
      </Suspense>
    </div>
  );
};

export default HospitalSearchPage;
