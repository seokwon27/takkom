"use client";

import React from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";
import { useHospitalQuery } from "@/query/useHospitalQuery";
import { NUM_OF_CARDS_PER_PAGE } from "../../constants/constants";
import LoadingHospitalList from "./LoadingHospitalList";
import { useUserLike } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import { HospitalSearchParams } from "@/types/hospital";
import { User } from "@supabase/supabase-js";

const HospitalList = ({searchParams, user}: {searchParams: HospitalSearchParams, user: User | null}) => {
  const [brtcCd, sggCd, addr, org, disease, currentPage] = [
    searchParams.brtcCd ?? "",
    searchParams.sggCd ?? "",
    searchParams.addr ?? "",
    searchParams.org ?? "",
    searchParams.disease ?? "",
    Number(searchParams.pageNo) ?? 1
  ];

  const {
    data: hospitalData,
    isLoading,
    isError,
    isFetching,
    error
  } = useHospitalQuery(brtcCd, sggCd, addr, org, disease);

  const { data: likes } = useUserLike(browserClient, user?.id);

  console.log("likes :", likes);

  if (isLoading || isFetching ) {
    return (
      <LoadingHospitalList>
        <p>데이터를 불러오는 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </LoadingHospitalList>
    );
  }
  if (isError ) {
    return <LoadingHospitalList>{!hospitalData ? "에러가 발생했습니다." : error?.message}</LoadingHospitalList>;
  }

  return (
    <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6">
      {!hospitalData && (
        <LoadingHospitalList className="mt-0">
          <p>우리 동네 병원을 검색해 보세요.</p>
        </LoadingHospitalList>
      )}

      {!!hospitalData && hospitalData.totalCount === 0 && (
        <LoadingHospitalList className="mt-0">
          <p>검색 결과가 없습니다.</p>
        </LoadingHospitalList>
      )}
      {!!hospitalData && hospitalData.totalCount > 0 && (
        <>
          <ul className="w-full grid grid-cols-[repeat(10, 1fr)] gap-6">
            {hospitalData?.items
              .slice(NUM_OF_CARDS_PER_PAGE * (currentPage - 1), NUM_OF_CARDS_PER_PAGE * currentPage)
              .map((info) => (
                <li key={info.orgcd}>
                  <HospitalCard user={user ?? null} hospitalInfo={info} filter={disease} likes={likes} />
                </li>
              ))}
          </ul>
          <HospitalPagination
            maxPage={hospitalData.maxPage}
            currentPage={currentPage}
            params={{ brtcCd, sggCd, addr, org, disease }}
          />
        </>
      )}
    </section>
  );
};

export default HospitalList;
