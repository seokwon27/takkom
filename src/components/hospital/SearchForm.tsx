"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BRTC, DISEASE, DISEASE_LIST, SGG } from "../../constants/constants";
import { setQueryParams } from "../../utils/hospital/setHospitalQueryParams";
import InfoTag from "./InfoTag";
import infoCircle from "../../../public/hospital/info-circle.svg";
import vaccineFilterOffIcon from "../../../public/hospital/vaccine-filter-off-icon.svg";
import vaccineFilterOnIcon from "../../../public/hospital/vaccine-filter-on-icon.svg";
import { cn } from "@/lib/utils";

const SearchForm = ({
  brtcObj,
  regionInfo
}: {
  brtcObj: { [key: string]: string };
  regionInfo: Map<string, { [key: string]: string }>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [params, setParams] = useState<{ brtcCd: string; sggCd: string; addr: string; org: string }>({
    brtcCd: searchParams.get("brtcCd") ?? BRTC,
    sggCd: searchParams.get("sggCd") ?? SGG,
    addr: searchParams.get("addr") ?? "",
    org: searchParams.get("org") ?? ""
  });
  const [disease, setDisease] = useState(searchParams.get("disease") || DISEASE);
  const [showInfoTag, setShowInfoTag] = useState(true);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex gap-2 items-end mb-3">
        <Image
          src={infoCircle}
          alt="정보"
          onClick={() => {
            setShowInfoTag((prev) => !prev);
          }}
          className="cursor-pointer"
        />
        <InfoTag isVisible={showInfoTag} />
      </div>
      <form className="grid grid-cols-[144fr_144fr_144fr_196fr_100fr] gap-4 mb-4">
        <Select
          value={params.brtcCd}
          onValueChange={(value) => {
            setParams(() => {
              // 시도 값이 바뀌면 다른 영역 모두 초기화
              const tmpParams = { brtcCd: value, sggCd: SGG, addr: "", org: "" };
              return tmpParams;
            });
            // setDisease(DISEASE);
          }}
        >
          <SelectTrigger
            className={`h-12 justify-center rounded-lg text-base font-semibold ${
              params.brtcCd === BRTC ? "border-gray-300 text-gray-300" : "border-primary-400 text-primary-400"
            }`}
          >
            <SelectValue placeholder={BRTC} />
          </SelectTrigger>
          <SelectContent className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)]">
            <SelectGroup>
              <SelectItem value={BRTC} key={BRTC} className="justify-center text-title-xxs font-semibold">
                {BRTC}
              </SelectItem>
              {Object.entries(brtcObj).map((item) => (
                <SelectItem
                  value={String(item[0])}
                  key={item[0]}
                  className="justify-center text-title-xxs font-semibold"
                >
                  {item[1]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={params.sggCd}
          onValueChange={(value) => {
            setParams((prev) => {
              // 시/군/구 값이 바뀌면 입력값 초기화
              const tmpParams = { ...prev, sggCd: value, addr: "", org: "" };
              return tmpParams;
            });
          }}
        >
          <SelectTrigger
            className={`h-12 justify-center rounded-lg text-base font-semibold ${
              params.sggCd === SGG ? "border-gray-300 text-gray-300" : "border-primary-400 text-primary-400"
            }`}
            disabled={params.brtcCd === BRTC}
          >
            <SelectValue placeholder={SGG} />
          </SelectTrigger>
          <SelectContent className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)]">
            <SelectGroup>
              <SelectItem value={SGG} key={SGG} className="justify-center text-title-xxs font-semibold">
                {SGG}
              </SelectItem>
              {Object.entries(regionInfo.get(params.brtcCd) || {}).map((item) => (
                <SelectItem
                  value={String(item[0])}
                  key={item[0]}
                  className="justify-center text-title-xxs font-semibold"
                >
                  {item[1]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

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
            // params.addr ? "border-primary-400 text-primary-400" : "border-gray-300 text-gray-300"
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
            // params.org ? "border-primary-400 text-primary-400" : "border-gray-300 text-gray-300"
          )}
        />

        <Button
          type="button"
          onClick={() => {
            setDisease(DISEASE);
            setQueryParams({ ...params, pageNo: "1" }, router, pathname);
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
            if (searchParams.has("brtcCd") && searchParams.has("sggCd")) {
              const brtcCd = searchParams.get("brtcCd") ?? "";
              const sggCd = searchParams.get("sggCd") ?? "";
              const addr = searchParams.get("addr") ?? "";
              const org = searchParams.get("org") ?? "";
              const params = { brtcCd, sggCd, addr, org, disease: value, pageNo: "1" };
              setQueryParams(params, router, pathname);
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
              <Image src={vaccineFilterOffIcon} alt="백신 찾기" />
            ) : (
              <Image src={vaccineFilterOnIcon} alt="백신 찾기" />
            )}
            <span className="ml-2 text-gray-700 text-label-xl font-medium">백신 찾기</span>
          </SelectTrigger>
          <SelectContent align="end" className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)]" avoidCollisions={false}>
            {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
            <SelectGroup>
              <SelectItem value={DISEASE} key={DISEASE} className="justify-center">
                {DISEASE}
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
