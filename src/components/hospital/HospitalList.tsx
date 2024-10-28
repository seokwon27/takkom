"use client";

import {
  getHospitalsMutliConditions,
  HospitalData,
  HospitalsMutliConditionParams
} from "@/utils/hospital/server-action";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";

const HospitalList = () =>
  //   {
  //   brtcObj,
  //   regionInfo
  // }: {
  //   brtcObj: { [key: string]: string };
  //   regionInfo: Map<string, { [key: string]: string }>;
  // }
  {
    const searchParams = useSearchParams();
    const [brtcCd, sggCd, pageNo, addr, org, disease] = [
      searchParams.get("brtcCd") as string,
      searchParams.get("sggCd") as string,
      searchParams.get("pageNo") as string,
      searchParams.get("addr") as string,
      searchParams.get("org") as string,
      searchParams.get("disease") as string
    ];
    const defaultData: HospitalData = { items: [], totalCount: 0, maxPage: 0 };
    const [hospitalData, setHospitalData] = useState<HospitalData>(defaultData);

    useEffect(() => {
      const fetchHospitalsMultiConditions = async (input: HospitalsMutliConditionParams) => {
        const data = await getHospitalsMutliConditions(input);
        console.log("hospitals :", data);
        setHospitalData(data as HospitalData);
      };
      if (brtcCd && sggCd) {
        fetchHospitalsMultiConditions({ brtcCd, sggCd, pageNo, addr, org, disease, numOfRows: "100" });
        // if (brtcCd && sggCd && pageNo) {
        //   const inputs: HospitalParams = {
        //     pageNo,
        //     numOfRows: "100",
        //     brtcCd,
        //     sggCd
        //   };
        //   if (searchParams.size === 3) {
        //     console.log(brtcCd, sggCd);
        //     // fetchHospitals(inputs);
        //     fetchHospitalsMultiConditions(inputs);
        //   } else if (searchParams.size === 4) {
        //     if (org) {
        //       inputs["searchTpcd"] = "ORG";
        //       inputs["searchWord"] = org;
        //       console.log("inputs :", inputs);
        //       fetchHospitals(inputs);
        //     } else if (addr) {
        //       inputs["searchTpcd"] = "ADDR";
        //       inputs["searchWord"] = addr;
        //       console.log("inputs :", inputs);
        //       fetchHospitals(inputs);
        //     }
        //   } else if (searchParams.size >= 5) {

        //   }
        // }
        // console.log("hospitals :", hospitalList);
      }
    }, [brtcCd, sggCd, addr, org, disease, pageNo]);

    return (
      <div className="w-full flex flex-col">
        <p>
          전체 결과값 : <span>{hospitalData.totalCount}</span>
        </p>
        {hospitalData.totalCount === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <ul className="grid grid-cols-[repeat(10, 1fr)] gap-4">
            {hospitalData.items.map((info) => (
              <li key={info.orgcd}>
                <HospitalCard info={info} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default HospitalList;
