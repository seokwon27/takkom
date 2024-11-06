"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { ReactNode } from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";
import { useHospitalQuery } from "@/query/useHospitalQuery";
import { NUM_OF_CARDS_PER_PAGE } from "./constants";
import hospitalLoading from "../../../public/hospital/hospital-loading.svg";
import { cn } from "@/lib/utils";

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
      <div className="w-full grow flex flex-col justify-between items-center mt-16 relative">
        <Loading className="bottom-6">
          <span>
            데이터를 불러오는 중입니다.
            <br />
            잠시만 기다려주세요.
          </span>
        </Loading>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full grow flex flex-col justify-between items-center mt-16">
        <Loading className="bottom-6">{!hospitalData ? "에러가 발생했습니다." : error?.message}</Loading>
      </div>
    );
  }

  return (
    <div className="w-full grow flex flex-col justify-between items-center mt-16 mb-6">
      {!hospitalData || hospitalData?.totalCount === 0 ? (
        <Loading>우리 동네 병원을 검색해 보세요.</Loading>
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
    </div>
  );
};

export default HospitalList;

const Loading = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      <Image src={hospitalLoading} alt="우리 동네 병원을 검색해 보세요." />
      <p className="w-full absolute top-[73%] text-2xl text-gray-200 font-semibold text-center">{children}</p>
    </div>
  );
};
