"use client";

import { getHospitalsMutliConditions, HospitalData } from "@/api/hospitalApi";
import { useSearchParams } from "next/navigation";
import React from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";
import { useQuery } from "@tanstack/react-query";

const HospitalList = () => {
  const searchParams = useSearchParams();
  const [brtcCd, sggCd, addr, org, disease, currentPage] = [
    searchParams.get("brtcCd") ?? "",
    searchParams.get("sggCd") ?? "",
    searchParams.get("addr") ?? "",
    searchParams.get("org") ?? "",
    searchParams.get("disease") ?? "",
    Number(searchParams.get("pageNo")) ?? 1
  ];
  const defaultData: HospitalData = { items: [], totalCount: 0, maxPage: 1 };

  const {
    data: hospitalData,
    isLoading,
    isError,
    isFetching,
    error
  } = useQuery({
    queryKey: ["hospital", brtcCd, sggCd, addr, org, disease],
    queryFn: () => {
      if (brtcCd && sggCd) 
        return getHospitalsMutliConditions({ brtcCd, sggCd, addr, org, disease });
      else {
        return defaultData;
      }
    },
    staleTime: Infinity
  });

  // console.log(hospitalData);

  if (isLoading || isFetching) {
    return <div>데이터를 불러오는 중입니다. 잠시만 기다려주세요.</div>;
  }
  if (isError || !hospitalData) {
    return <div>에러 : {!hospitalData ? "에러가 발생했습니다." : error?.message}</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <p>
        전체 결과값 : <span>{hospitalData.totalCount}</span>
      </p>
      {hospitalData.totalCount === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(10, 1fr)] gap-4">
          {hospitalData.items.slice(10 * (currentPage - 1), 10 * currentPage).map((info) => (
            <li key={info.orgcd}>
              <HospitalCard info={info} filter={disease} />
            </li>
          ))}
        </ul>
      )}
      {hospitalData.totalCount > 0 && (
        <div>
          <HospitalPagination
            maxPage={hospitalData.maxPage}
            currentPage={currentPage}
            params={{ brtcCd, sggCd, addr, org, disease }}
          />
        </div>
      )}
    </div>
  );
};

export default HospitalList;
