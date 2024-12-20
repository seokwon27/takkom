"use client";

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgeGroupStore } from "@/store/ageGroupStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCityDataQuery } from "@/query/useCityDataQuery";
import { createQueryParams } from "@/utils/hospital/setHospitalQueryParams";
import useDevice from "@/utils/useDevice";
import BrtcDrawer from "./BrtcDrawer";

const SelectBrtc = () => {
  const router = useRouter();
  const [brtc, setBrtc] = useState("");
  const [sgg, setSgg] = useState("");
  const { currentDisease } = useAgeGroupStore();
  const isMobile = useDevice();

  // 도시정보 fetch 및 데이터 가공
  const { data, error, isPending } = useCityDataQuery();
  if (error) throw new Error(`Error: ${error}`);
  const brtcObj = data?.brtcObj ?? [];
  const regionInfo = Object.entries(data?.regionRes.get(brtc) ?? {}).sort((a, b) => a[1].localeCompare(b[1]));

  //병원검색 페이지 이동
  const handleClick = () => {
    router.push(createQueryParams({ brtcCd: brtc, sggCd: sgg, disease: currentDisease, pageNo: "1" }, "/hospital"));
  };

  if (isMobile === "mobile") {
    return (
      <form className="grid grid-cols-2 gap-2 mt-6">
        <BrtcDrawer defaultValue={"시/도"} cityArray={brtcObj} setCity={setBrtc} value={brtc} />
        <BrtcDrawer defaultValue={"시/군/구"} cityArray={regionInfo} setCity={setSgg} value={sgg} />
        <div className="fixed bottom-0 left-0 w-full pt-3 pb-8 px-6">
          <Button
            type="button"
            className="text-white p-6 bg-primary-400 hover:bg-primary-300 disabled:bg-primary-100 w-full"
            onClick={handleClick}
            disabled={!brtc || !sgg}
          >
            찾기
          </Button>
        </div>
      </form>
    );
  }

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
            <SelectTrigger
              className={`justify-center border-none text-title-xs bg-gray-30  font-bold ${
                brtc === "" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <SelectValue placeholder="시/도" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="z-[100]">
                {isPending
                  ? "로딩중입니다"
                  : brtcObj.map((item) => {
                      const [brtcCd, brtcName] = item;

                      return (
                        <SelectItem
                          className="justify-center text-gray-700 text-title-xxs font-semibold"
                          value={brtcCd}
                          key={brtcCd}
                        >
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
              <SelectTrigger
                className={`justify-center border-none text-title-xs bg-gray-30  font-bold ${
                  sgg === "" ? "text-gray-400" : "text-gray-700"
                }`}
                disabled={!brtc}
              >
                <SelectValue placeholder="시/군/구" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {regionInfo.map((item) => {
                    const [sggCd, sggName] = item;
                    return (
                      <SelectItem
                        className="justify-center text-gray-700 text-title-xxs font-semibold"
                        value={sggCd}
                        key={sggCd}
                      >
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
        className="text-white p-6 rounded-xl bg-primary-400 hover:bg-primary-300 disabled:bg-primary-100"
        onClick={handleClick}
        disabled={!brtc || !sgg}
      >
        찾기
      </Button>
    </div>
  );
};

export default SelectBrtc;
