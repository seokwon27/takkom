"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";
import { useHospitalQuery } from "@/query/useHospitalQuery";
import { NUM_OF_CARDS_PER_PAGE } from "../../constants/constants";
import LoadingHospitalList from "./LoadingHospitalList";

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

  const {
    data: hospitalData,
    isLoading,
    isError,
    isFetching,
    error
  } = useHospitalQuery(brtcCd, sggCd, addr, org, disease);

  // console.log(hospitalData);

  if (isLoading || isFetching) {
    return (
      <LoadingHospitalList>
        <p>데이터를 불러오는 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </LoadingHospitalList>
    );
  }
  if (isError) {
    return <LoadingHospitalList>{!hospitalData ? "에러가 발생했습니다." : error?.message}</LoadingHospitalList>;
  }

  return (
    <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6">
      {!hospitalData || hospitalData?.totalCount === 0 ? (
        <LoadingHospitalList>
          <p>우리 동네 병원을 검색해 보세요.</p>
        </LoadingHospitalList>
      ) : (
        <ul className="w-full grid grid-cols-[repeat(10, 1fr)] gap-6">
          {hospitalData?.items
            .slice(NUM_OF_CARDS_PER_PAGE * (currentPage - 1), NUM_OF_CARDS_PER_PAGE * currentPage)
            .map((info) => (
              <li key={info.orgcd}>
                <HospitalCard info={info} filter={disease} />
              </li>
            ))}
        </ul>
      )}
      {hospitalData && hospitalData?.totalCount > 0 && (
        <HospitalPagination
          maxPage={hospitalData.maxPage}
          currentPage={currentPage}
          params={{ brtcCd, sggCd, addr, org, disease }}
        />
      )}
    </section>
  );
};

export default HospitalList;
