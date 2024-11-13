import React from "react";
import LoadingHospitalList from "./LoadingHospitalList";
import LoadingSearchForm from "./LoadingSearchForm";

const LoadingHospitalSearchPage = () => {
  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto">
      <LoadingSearchForm />
      <LoadingHospitalList animate="animate-spin" />
    </div>
  );
};

export default LoadingHospitalSearchPage;
