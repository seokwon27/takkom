import React from "react";
import LoadingChildList from "@/components/child/ChildListLoading";

const ChildPageLoading = () => {
  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto max-sm:max-w-auto">
      <LoadingChildList>
        <p>페이지를 로딩중입니다.</p>
      </LoadingChildList>
    </div>
  );
};

export default ChildPageLoading;
