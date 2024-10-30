"use client";

import { getHospitalsMutliConditions, HospitalData, HospitalsMutliConditionParams } from "@/api/hospitalApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";
import HospitalPagination from "./HospitalPagination";

const HospitalList = () => {
  const searchParams = useSearchParams();
  const [brtcCd, sggCd, addr, org, disease, currentPage] = [
    searchParams.get("brtcCd") || "",
    searchParams.get("sggCd") || "",
    searchParams.get("addr") || "",
    searchParams.get("org") || "",
    searchParams.get("disease") || "",
    Number(searchParams.get("pageNo")) ?? 1
  ];
  const defaultData: HospitalData = { items: [], totalCount: 0, maxPage: 1 };
  const [hospitalData, setHospitalData] = useState<HospitalData>(defaultData);

  useEffect(() => {
    const fetchHospitalsMultiConditions = async (input: HospitalsMutliConditionParams): Promise<void> => {
      const data = await getHospitalsMutliConditions(input);
      console.log("hospitals :", data);
      setHospitalData(data as HospitalData);
    };
    if (brtcCd && sggCd) {
      fetchHospitalsMultiConditions({ brtcCd, sggCd, addr, org, disease });
    }
  }, [brtcCd, sggCd, addr, org, disease]);

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
