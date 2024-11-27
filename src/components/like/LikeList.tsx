"use client";

import { useUserLike } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { useState } from "react";
import LoadingHospitalList from "../hospital/HospitalListLoading";
import { NUM_OF_CARDS_PER_PAGE } from "@/constants/constants";
import HospitalCard from "../hospital/HospitalCard";
import HospitalPagination from "../hospital/HospitalPagination";
import { HopsitalItem } from "@/types/hospital";
import HospitalCardWithDrawer from "../hospital/HospitalCardWithDrawer";
import DesktopLayout from "../layout/DesktopLayout";
import MobileLayout from "../layout/MobileLayout";

type LikeListProps = { currentPage: number; user: User | null };

const LikeList = ({ currentPage, user }: LikeListProps) => {
  const [clickedId, setClickedId] = useState(0);

  const { data: likes, isLoading, isError, error } = useUserLike(browserClient, user?.id);
  const totalCount = likes?.length ?? 0;
  const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE) || 1;

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, info: HopsitalItem) => {
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
  };

  if (isLoading) {
    return (
      <LoadingHospitalList>
        <p>데이터를 불러오는 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </LoadingHospitalList>
    );
  }
  if (isError) {
    return (
      <LoadingHospitalList>
        <p>에러가 발생했습니다.</p>
        <p>{error?.message}</p>
      </LoadingHospitalList>
    );
  }

  return (
    <>
      {totalCount === 0 && (
        <LoadingHospitalList>
          <p>스크랩한 병원이 없습니다.</p>
        </LoadingHospitalList>
      )}
      {!!likes && totalCount > 0 && (
        <div className="w-full">
          <ul className="grid grid-cols-[repeat(10, 1fr)] gap-6 pb-20 bg-white max-sm:gap-3 max-sm:pb-6 max-sm:px-6 max-sm:z-40">
            {likes
              ?.slice(NUM_OF_CARDS_PER_PAGE * (currentPage - 1), NUM_OF_CARDS_PER_PAGE * currentPage)
              .map((like) => {
                const info: HopsitalItem = {
                  orgnm: like.orgnm,
                  orgcd: like.orgcd,
                  orgAddr: like.orgAddr,
                  expnYmd: like.expnYmd,
                  orgTlno: like.orgTlno,
                  vcnList: { vcnInfo: JSON.parse(like.vcnInfo) }
                };

                return (
                  <li
                    key={info.orgcd}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(e, info);
                    }}
                  >
                    <DesktopLayout>
                      <HospitalCard
                        user={user ?? null}
                        hospitalInfo={info}
                        clickedId={clickedId}
                        // filter={disease}
                        likes={likes}
                      />
                    </DesktopLayout>
                    <MobileLayout>
                      <HospitalCardWithDrawer
                        user={user ?? null}
                        hospitalInfo={info}
                        clickedId={clickedId}
                        // filter={disease}
                        likes={likes}
                      />
                    </MobileLayout>
                  </li>
                );
              })}
          </ul>
          <HospitalPagination
            maxPage={maxPage}
            currentPage={currentPage}
            params={{ brtcCd: "", sggCd: "", addr: "", org: "", disease: "" }}
          />
        </div>
      )}
    </>
  );
};

export default LikeList;
