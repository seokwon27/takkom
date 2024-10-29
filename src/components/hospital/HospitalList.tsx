"use client";

import { getHospitalsMutliConditions, HospitalData, HospitalsMutliConditionParams } from "@/api/hospitalApi";
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
    const [openVaccine, setOpenVaccine] = useState('');

    useEffect(() => {
      const fetchHospitalsMultiConditions = async (input: HospitalsMutliConditionParams) => {
        const data = await getHospitalsMutliConditions(input);
        console.log("hospitals :", data);
        setHospitalData(data as HospitalData);
      };
      if (brtcCd && sggCd) {
        fetchHospitalsMultiConditions({ brtcCd, sggCd, pageNo, addr, org, disease, numOfRows: "100" });
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
                <HospitalCard info={info} filter={disease} openVaccine={openVaccine} setOpenVaccine={setOpenVaccine}/>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default HospitalList;
