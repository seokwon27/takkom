import HospitalList from "@/components/hospital/HospitalList";
import SearchForm from "@/components/hospital/SearchForm";
import { getBrtcCd, getRegionInfo } from "@/api/hospitalApi";
import { Suspense } from "react";

const HospitalSearchPage = async () => {
  const brtcObj = await getBrtcCd();
  const regionInfo = await getRegionInfo();

  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HospitalList />
      </Suspense>
    </div>
  );
};

export default HospitalSearchPage;
