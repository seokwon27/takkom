"use client";

import React, { useState } from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";
import { useHospitalQuery } from "@/query/useHospitalQuery";
import { NUM_OF_CARDS_PER_PAGE } from "../../constants/constants";
import LoadingHospitalList from "./LoadingHospitalList";
import { useUserLike } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import { HospitalSearchParams } from "@/types/hospital";
import { User } from "@supabase/supabase-js";
import useDevice from "@/utils/useDevice";
import HospitalCardWithDrawer from "./HospitalCardWithDrawer";
import useHospitalSearchStore from "@/store/hospitalStore";
import MobileLayout from "../layout/MobileLayout";
import DesktopLayout from "../layout/DesktopLayout";

const HospitalList = ({ searchParams, user }: { searchParams: HospitalSearchParams; user: User | null }) => {
  const { step } = useHospitalSearchStore();
  const [clickedId, setClickedId] = useState(0);
  const device = useDevice();

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

  if (isLoading || isFetching) {
    return (
      <LoadingHospitalList animate="animate-bounce">
        <p>데이터를 불러오는 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </LoadingHospitalList>
    );
  }
  if (isError) {
    return <LoadingHospitalList>{!hospitalData ? "에러가 발생했습니다." : error?.message}</LoadingHospitalList>;
  }

  if ((step === 0 && device === "mobile") || !hospitalData) {
    return (
      <LoadingHospitalList>
        <p>우리 동네 병원을 검색해 보세요.</p>
      </LoadingHospitalList>
    );
  }
  if ((step === 1 || (step === 0 && device === "desktop")) && !!hospitalData && hospitalData.totalCount === 0) {
    return (
      <LoadingHospitalList>
        <p>검색 결과가 없습니다.</p>
      </LoadingHospitalList>
    );
  }

  return (
    <>
      <ul className="w-full grid grid-cols-[repeat(10, 1fr)] gap-6 pb-20 bg-white max-sm:gap-3 max-sm:pb-6 max-sm:px-6 max-sm:z-40">
        {hospitalData?.items
          .slice(NUM_OF_CARDS_PER_PAGE * (currentPage - 1), NUM_OF_CARDS_PER_PAGE * currentPage)
          .map((info) => (
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

//   return (
//     <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6 max-sm:mt-4 max-sm:px-6">
//       {((step === 0 && device === 'mobile') || !hospitalData) && (
//         <LoadingHospitalList className="mt-0">
//           <p>우리 동네 병원을 검색해 보세요.</p>
//         </LoadingHospitalList>
//       )}

//       {((step === 1 || (step === 0 && device === 'desktop')) && !!hospitalData && hospitalData.totalCount === 0) && (
//         <LoadingHospitalList className="mt-0">
//           <p>검색 결과가 없습니다.</p>
//         </LoadingHospitalList>
//       )}
//       {((step === 1 || (step === 0 && device === 'desktop')) && !!hospitalData && hospitalData.totalCount > 0) && (
//         <>
//           <ul className="w-full grid grid-cols-[repeat(10, 1fr)] gap-6 max-sm:gap-3">
//             {hospitalData?.items
//               .slice(NUM_OF_CARDS_PER_PAGE * (currentPage - 1), NUM_OF_CARDS_PER_PAGE * currentPage)
//               .map((info) => (
//                 <li
//                   key={info.orgcd}
//                   onClick={() => {
//                     setClickedId((prev) => {
//                       if (prev === info.orgcd) {
//                         return 0;
//                       }
//                       return info.orgcd;
//                     });
//                   }}
//                 >
//                   {device === "desktop" && (
//                     <HospitalCard
//                       user={user ?? null}
//                       hospitalInfo={info}
//                       clickedId={clickedId}
//                       filter={disease}
//                       likes={likes}
//                     />
//                   )}
//                   {device === "mobile" && (
//                     <HospitalCardWithDrawer
//                       user={user ?? null}
//                       hospitalInfo={info}
//                       clickedId={clickedId}
//                       filter={disease}
//                       likes={likes}
//                     />
//                   )}
//                 </li>
//               ))}
//           </ul>
//           <HospitalPagination
//             maxPage={hospitalData.maxPage}
//             currentPage={currentPage}
//             params={{ brtcCd, sggCd, addr, org, disease }}
//           />
//         </>
//       )}
//     </section>
//   );
// };

export default HospitalList;
