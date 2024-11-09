"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BRTC, DISEASE, DISEASE_LIST, SGG } from "../../constants/constants";
import { createQueryParams } from "../../utils/hospital/setHospitalQueryParams";
import InfoTag from "./InfoTag";
import RegionSelect from "./RegionSelect";
import InfoCircle from "../../../public/hospital/info-circle.svg";
import VaccineFilterOffIcon from "../../../public/hospital/vaccine-filter-off-icon.svg";
import VaccineFilterOnIcon from "../../../public/hospital/vaccine-filter-on-icon.svg";
import { cn } from "@/lib/utils";
import { HospitalSearchParams } from "@/types/hospital";

type SearchFormProps = {
  brtcObj: { [key: string]: string };
  regionInfo: Map<string, { [key: string]: string }>;
  searchParams: HospitalSearchParams;
};

const SearchForm = ({ brtcObj, regionInfo, searchParams }: SearchFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [params, setParams] = useState<{ brtcCd: string; sggCd: string; addr: string; org: string }>({
    brtcCd: searchParams.brtcCd ?? BRTC,
    sggCd: searchParams.sggCd ?? SGG,
    addr: searchParams.addr ?? "",
    org: searchParams.org ?? ""
  });
  const [disease, setDisease] = useState(searchParams.disease || DISEASE);
  const [showInfoTag, setShowInfoTag] = useState(true);

  const onBrtcChange = (value: string) => {
    setParams((prev) => {
      const tmpParams = { ...prev, brtcCd: value, sggCd: SGG, addr: "", org: "" };
      return tmpParams;
    });
  };

  const onSggChange = (value: string) => {
    setParams((prev) => {
      const tmpParams = { ...prev, sggCd: value, addr: "", org: "" };
      return tmpParams;
    });
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="flex gap-2 items-end mb-3">
        <Image
          src={InfoCircle}
          alt="정보"
          onClick={() => {
            setShowInfoTag((prev) => !prev);
          }}
          className="cursor-pointer"
        />
        <InfoTag isVisible={showInfoTag} />
      </div>
      <form className="grid grid-cols-[144fr_144fr_144fr_196fr_100fr] gap-4 mb-4">
        {/* 시도 select */}
        <RegionSelect
          defaultValue={BRTC}
          regionArray={Object.entries(brtcObj)}
          trigger={params.brtcCd === BRTC}
          disabled={false}
          value={params.brtcCd}
          onValueChange={onBrtcChange}
        />
        {/* 시군구 select */}
        <RegionSelect
          defaultValue={SGG}
          regionArray={Object.entries(regionInfo.get(params.brtcCd) || {}).sort((a, b) => a[1].localeCompare(b[1]))}
          trigger={params.sggCd === SGG}
          disabled={params.brtcCd === BRTC}
          value={params.sggCd}
          onValueChange={onSggChange}
        />

        <Input
          placeholder="주소"
          value={params.addr}
          onChange={(e) => {
            setShowInfoTag(false);
            setParams((prev) => {
              const tmpParams = { ...prev, addr: e.target.value };
              return tmpParams;
            });
          }}
          disabled={params.brtcCd === BRTC || params.sggCd === SGG}
          className={cn(
            "h-12 bg-gray-30 border-0 text-gray-500 text-center font-semibold placeholder:text-gray-500",
            "focus-visible:bg-white focus-visible:text-gray-600 focus-visible:placeholder:text-gray-600",
            "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-700"
          )}
        />

        <Input
          placeholder="병원명"
          value={params.org}
          onChange={(e) => {
            setShowInfoTag(false);
            setParams((prev) => {
              const tmpParams = { ...prev, org: e.target.value };
              return tmpParams;
            });
          }}
          disabled={params.brtcCd === BRTC || params.sggCd === SGG}
          className={cn(
            "h-12 bg-gray-30 border-0 text-gray-500 text-center font-semibold placeholder:text-gray-500",
            "focus-visible:bg-white focus-visible:text-gray-600 focus-visible:placeholder:text-gray-600",
            "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-700"
          )}
        />

        <Button
          type="button"
          onClick={() => {
            setDisease(DISEASE);
            router.push(createQueryParams({ ...params, pageNo: "1" }, pathname));
          }}
          disabled={params.brtcCd === BRTC || params.sggCd === SGG}
          className="h-12 bg-primary-400 rounded-lg text-base font-semibold hover:bg-primary-400 disabled:bg-primary-400"
        >
          검색
        </Button>
      </form>
      <div className="w-full flex justify-end items-center">
        <Select
          value={disease}
          onValueChange={(value) => {
            setDisease(value);
            if (searchParams.brtcCd && searchParams.sggCd) {
              const params = { ...searchParams, disease: value, pageNo: "1" };
              router.push(createQueryParams(params, pathname));
            }
          }}
        >
          <SelectTrigger className={`w-fit p-2 border-0`}>
            {disease !== DISEASE && (
              <p className="h-fit px-3 py-[6px] mr-4 bg-primary-50 ring-inset ring-1 ring-primary-400 rounded-[18px] text-primary-400 text-base">
                {disease}
              </p>
            )}
            {/* <SelectValue placeholder={DISEASE} /> */}
            {disease === DISEASE ? (
              <Image src={VaccineFilterOffIcon} alt="백신 찾기" />
            ) : (
              <Image src={VaccineFilterOnIcon} alt="백신 찾기" />
            )}
            <span className="ml-2 text-gray-700 text-label-xl font-medium">백신 찾기</span>
          </SelectTrigger>
          <SelectContent align="end" className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)]" avoidCollisions={false}>
            {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
            <SelectGroup>
              <SelectItem value={DISEASE} key={DISEASE} className="justify-center">
                {"전체"}
              </SelectItem>
              {DISEASE_LIST.map((name) => (
                <SelectItem value={name} key={name} className="justify-center">
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchForm;
