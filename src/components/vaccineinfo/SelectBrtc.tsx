"use client";

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgeGroupStore } from "@/store/ageGroupStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCityDataQuery } from "@/query/useCityDataQuery";
import { setQueryParams } from "@/utils/hospital/setHospitalQueryParams";

const SelectBrtc = () => {
  const router = useRouter();
  const [brtc, setBrtc] = useState("");
  const [sgg, setSgg] = useState("");
  const { currentDisease } = useAgeGroupStore();

  // 도시정보 fetch 및 데이터 가공
  const { data, error, isPending } = useCityDataQuery();
  if (error) throw new Error(`Error: ${error}`);
  const brtcObj = data?.brtcObj ?? [];
  const regionInfo = Object.entries(data?.regionRes.get(brtc) ?? {});

  //병원검색 페이지 이동
  const handleClick = () => {
    setQueryParams({ brtcCd: brtc, sggCd: sgg, disease: currentDisease, pageNo: "1" }, router, "/hospital");
  };

  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex gap-2 w-full">
        <div className="w-[144px]">
          <Select
            value={brtc}
            onValueChange={(value) => {
              setBrtc(value);
              // console.log(value);
            }}
          >
            <SelectTrigger className="justify-center">
              <SelectValue placeholder="시/도" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="z-[100]">
                {isPending
                  ? "도시 정보"
                  : brtcObj.map((item) => {
                      const [brtcCd, brtcName] = item;

                      return (
                        <SelectItem className="justify-center" value={brtcCd} key={brtcCd}>
                          {brtcName}
                        </SelectItem>
                      );
                    })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="w-[144px]">
            <Select
              value={sgg}
              onValueChange={(value) => {
                setSgg(value);
                // console.log(value);
              }}
            >
              <SelectTrigger className="justify-center" disabled={!brtc}>
                <SelectValue placeholder="시/군/구" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {regionInfo.map((item) => {
                    const [sggCd, sggName] = item;
                    return (
                      <SelectItem className="justify-center" value={sggCd} key={sggCd}>
                        {sggName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button
        className="text-white p-6 bg-primary-400 hover:bg-primary-300 disabled:bg-primary-100"
        onClick={handleClick}
        disabled={!brtc || !sgg}
      >
        찾기
      </Button>
    </div>
  );
};

export default SelectBrtc;
