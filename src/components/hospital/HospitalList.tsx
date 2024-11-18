"use client";

import React, { useState } from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";
import { useHospitalQuery } from "@/query/useHospitalQuery";
import { NUM_OF_CARDS_PER_PAGE } from "../../constants/constants";
import LoadingHospitalList from "./HospitalListLoading";
import { useUserLike } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import { HospitalSearchParams } from "@/types/hospital";
import { User } from "@supabase/supabase-js";
import useDevice from "@/utils/useDevice";
import HospitalCardWithDrawer from "./HospitalCardWithDrawer";
import MobileLayout from "../layout/MobileLayout";
import DesktopLayout from "../layout/DesktopLayout";
import Image from "next/image";
import LoadingSpinner from "../../../public/common/loading-spinner.svg";
import { useHospitalContext } from "@/providers/HospitalProvider";

const HospitalList = ({searchParams, user }: { searchParams: HospitalSearchParams; user: User | null }) => {
  const { step } = useHospitalContext(state => state);
  const [clickedId, setClickedId] = useState(0);
  const device = useDevice();

  // const {brtcCd, sggCd, addr, org} = params
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
    isFetching,
    isError,
    error
  } = useHospitalQuery(brtcCd, sggCd, addr, org, disease);

  const { data: likes } = useUserLike(browserClient, user?.id);

  if (isLoading || isFetching ) {
    return (
      <>
        <LoadingHospitalList>
          <p>데이터를 불러오는 중입니다.</p>
          <p>잠시만 기다려주세요.</p>
        </LoadingHospitalList>
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-50">
          <div className="w-full h-full flex">
            <Image src={LoadingSpinner} alt="로딩중입니다." className="w-10 max-sm:w-6 m-auto animate-spin" />
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <LoadingHospitalList>
        <p>{!hospitalData ? "에러가 발생했습니다." : error?.message}</p>
      </LoadingHospitalList>
    );
  }

  if ((step === 0 && device === "mobile") || !hospitalData) {
    return (
      <LoadingHospitalList>
        <p>우리 동네 병원을 검색해 보세요.</p>
      </LoadingHospitalList>
    );
  }
  if ((step === 1 || device === "desktop") && !!hospitalData && hospitalData.totalCount === 0) {
    return (
      <LoadingHospitalList>
        <p>검색 결과가 없습니다.</p>
      </LoadingHospitalList>
    );
  }

  return (
    <>
      <ul className="w-full grid grid-cols-[repeat(10, 1fr)] gap-6 pb-20 bg-white max-sm:gap-3 max-sm:pb-6 max-sm:px-6 max-sm:z-[11]">
        {hospitalData?.items
          .slice(NUM_OF_CARDS_PER_PAGE * (currentPage - 1), NUM_OF_CARDS_PER_PAGE * currentPage)
          .map((info) => (
            <li
              key={info.orgcd}
              onClick={(e) => {
                e.stopPropagation();
                if ((e.target instanceof HTMLElement || e.target instanceof SVGElement) && e.target.dataset.select) {
                  // 모바일 클릭 오류 방지용: data-set='true' 달려있을 땐 동작하지 않음
                  return;
                }
                setClickedId((prev) => {
                  if (prev === info.orgcd) {
                    return 0;
                  }
                  return info.orgcd;
                });
              }}
            >
              <MobileLayout>
                <HospitalCardWithDrawer
                  user={user ?? null}
                  hospitalInfo={info}
                  clickedId={clickedId}
                  filter={disease}
                  likes={likes}
                />
              </MobileLayout>
              <DesktopLayout>
                <HospitalCard
                  user={user ?? null}
                  hospitalInfo={info}
                  clickedId={clickedId}
                  filter={disease}
                  likes={likes}
                />
              </DesktopLayout>
            </li>
          ))}
      </ul>
      <HospitalPagination
        maxPage={hospitalData.maxPage}
        currentPage={currentPage}
        params={{ brtcCd, sggCd, addr, org, disease }}
      />
    </>
  );
};

export default HospitalList;
