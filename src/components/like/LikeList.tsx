"use client";

import { useUserLike } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { useState } from "react";
import LoadingHospitalList from "../hospital/LoadingHospitalList";
import { NUM_OF_CARDS_PER_PAGE } from "@/constants/constants";
import HospitalCard from "../hospital/HospitalCard";
import HospitalPagination from "../hospital/HospitalPagination";
import { HopsitalItem } from "@/types/hospital";
import useDevice from "@/utils/useDevice";
import HospitalCardWithDrawer from "../hospital/HospitalCardWithDrawer";

type LikeListProps = { currentPage: number; user: User | null };

const LikeList = ({ currentPage, user }: LikeListProps) => {
  const [clickedId, setClickedId] = useState(0);
  const device = useDevice();

  const { data: likes, isLoading, isError, error } = useUserLike(browserClient, user?.id);
  const totalCount = likes?.length ?? 0;
  const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE) || 1;

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
    <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6">
      {totalCount === 0 && (
        <LoadingHospitalList className="mt-0">
          <p>스크랩한 병원이 없습니다.</p>
        </LoadingHospitalList>
      )}
      {!!likes && totalCount > 0 && (
        <>
          <ul className="w-full grid grid-cols-[repeat(10, 1fr)] gap-6">
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
                    onClick={() => {
                      setClickedId((prev) => {
                        if (prev === info.orgcd) {
                          return 0;
                        }
                        return info.orgcd;
                      });
                    }}
                  >
                    {device === "desktop" && (
                      <HospitalCard
                        user={user ?? null}
                        hospitalInfo={info}
                        clickedId={clickedId}
                        // filter={disease}
                        likes={likes}
                      />
                    )}
                    {device === "mobile" && (
                      <>
                        <HospitalCardWithDrawer
                          user={user ?? null}
                          hospitalInfo={info}
                          clickedId={clickedId}
                          // filter={disease}
                          likes={likes}
                        />
                      </>
                    )}{" "}
                  </li>
                );
              })}
          </ul>
          <HospitalPagination
            maxPage={maxPage}
            currentPage={currentPage}
            params={{ brtcCd: "", sggCd: "", addr: "", org: "", disease: "" }}
          />
        </>
      )}
    </section>
  );
};

export default LikeList;
