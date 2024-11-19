'use client'

import { HospitalSearchParams } from "@/types/hospital";
import { createQueryParams } from "@/utils/hospital/setHospitalQueryParams";
import { useState, useEffect } from 'react';

const useQueryParams = (currentQuery: string): [string, HospitalSearchParams, (params: HospitalSearchParams) => void] => {
  const [query, setQuery] = useState('/hospital' + currentQuery);
  const [params, setParams] = useState<HospitalSearchParams>(Object.fromEntries(new URLSearchParams(currentQuery)))

  useEffect(() => {
    const handlePopState = () => {
      // 브라우저의 뒤로가기, 앞으로 가기 이벤트가 발생할 때 쿼리 파라미터 업데이트
      setQuery(window.location.pathname + currentQuery);
    };

    // 처음 마운트될 때 실행
    handlePopState();

    // popstate 이벤트 감지 (뒤로 가기 또는 앞으로 가기 시 = url 변경 시 발생)
    window.addEventListener('popstate', handlePopState);
    setQuery('/hospital'+window.location.search)
    setParams(Object.fromEntries(new URLSearchParams(window.location.search)))

    // 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentQuery, window.location.search]);

  const setQueryParams = (params: HospitalSearchParams) => {
    const newUrl = createQueryParams(params, window.location.pathname);
    window.history.pushState({...window.history.state, as:newUrl, url: newUrl}, '', newUrl)
    window.dispatchEvent(new PopStateEvent('popstate'));
    
  }

  return [query, params, setQueryParams];
};

export default useQueryParams;
