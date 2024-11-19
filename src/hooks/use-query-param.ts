"use client";

import { HospitalSearchParams } from "@/types/hospital";
import { createQueryParams } from "@/utils/hospital/setHospitalQueryParams";
import { useState, useEffect } from "react";

const useQueryParams = (currentQuery: string): [HospitalSearchParams, (params: HospitalSearchParams) => void] => {
  const [params, setParams] = useState<HospitalSearchParams>(Object.fromEntries(new URLSearchParams(currentQuery)));

  useEffect(() => {
    // 클라이언트 환경에서만 실행됨
    if (typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      // 뒤로 가기 또는 앞으로 가기 시 (= url 변경 시 발생) 쿼리 파라미터 업데이트
      setParams(Object.fromEntries(new URLSearchParams(window.location.search)));
    };

    // 처음 마운트될 때 실행
    handlePopState();

    // popstate 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    // 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentQuery]);

  const setQueryParams = (params: HospitalSearchParams) => {
    const newUrl = createQueryParams(params, "/hospital");
    window.history.pushState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return [params, setQueryParams];
};

export default useQueryParams;
