import React from "react";
import LoadingHospitalList from "@/components/hospital/LoadingHospitalList";
import LoadingSearchForm from "@/components/hospital/LoadingSearchForm";

const LoadingHospitalSearchPage = () => {
  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto max-sm:max-w-auto">
      <LoadingSearchForm />
      <LoadingHospitalList>
        <p>페이지를 로딩중입니다.</p>
      </LoadingHospitalList>
    </div>
  );
};

export default LoadingHospitalSearchPage;