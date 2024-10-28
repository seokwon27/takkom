"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { BRTC, SGG } from "./constants";

const brtcDefault = [BRTC, BRTC];
const sggDefault = [SGG, SGG];

const SearchForm = ({
  brtcObj,
  regionInfo
}: {
  brtcObj: { [key: string]: string };
  regionInfo: Map<string, { [key: string]: string }>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [brtc, setBrtc] = useState<string[]>(brtcDefault);
  const [sgg, setSgg] = useState<string[]>(sggDefault);
  const [disableSgg, setDisableSgg] = useState(true);
  const [disableInputs, setDisableInputs] = useState(true);
  const [addr, setAddr] = useState("");
  const [org, setOrg] = useState("");

  const setQueryParams = (params: { [key: string]: string }) => {
    const { brtcCd, sggCd, addr, org, disease, pageNo } = params;
    const searchParams = new URLSearchParams();

    if (!brtcCd || !sggCd) {
      console.log("잘못된 접근입니다.");
      return;
    }

    if (brtcCd) searchParams.set("brtcCd", brtcCd);
    if (sggCd) searchParams.set("sggCd", sggCd);
    if (addr) searchParams.set("addr", addr);
    if (org) searchParams.set("org", org);
    if (disease) searchParams.set("disease", disease);
    if (pageNo) searchParams.set("pageNo", "" + pageNo);

    const queryString = searchParams.toString();
    router.push(`${pathname}?${queryString}`);
    return;
  };

  // const checkForm =  (brtc: string[], sgg: string[]) => {
  //   if (brtc[0] === BRTC) {
  //     setSgg(sggDefault);
  //     setAddr('')
  //     setOrg('')
  //     setDisableInputs(true);
  //     setDisableSgg(true);
  //   }
  // }

  return (
    <div className="w-full flex flex-col ">
      <form className="hospital-search">
        <Select
          onValueChange={(value) => {
            setSgg(sggDefault);
            if (value === BRTC) {
              // 선택 값이 없으면 모든 영역 초기화
              setBrtc(brtcDefault);
              setAddr("");
              setOrg("");
              setDisableSgg(true);
              setDisableInputs(true);
            } else {
              // 시/도 설정 시 시/군/구 활성화
              setBrtc([value, brtcObj[value]]);
              setDisableSgg(false);
              setAddr("");
              setOrg("");
              setDisableInputs(true);
            }
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder={BRTC} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup >
              <SelectItem value={BRTC} key={BRTC} className="w-[180px]">
                {BRTC}
              </SelectItem>
              {Array.from(regionInfo.keys()).map((item) => (
                <SelectItem value={item} key={item} className="w-[180px]">
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            const sggObj = regionInfo.get(brtc[0]) ?? { "시/군/구": SGG };
            setSgg([value, sggObj[value]]);
            if (value === SGG) {
              // 기본값으로 바꾸면 입력값 초기화 및 비활성화
              setAddr("");
              setOrg("");
              setDisableInputs(true);
            } else {
              setDisableInputs(false);
            }
          }}
          value={sgg[0]}
        >
          <SelectTrigger className="" value={sgg} disabled={disableSgg}>
            <SelectValue placeholder={SGG} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={SGG} key={SGG} className="w-[180px]">
                {SGG}
              </SelectItem>
              {Object.entries(regionInfo.get(brtc[0]) || {}).map((item) => (
                <SelectItem value={item[0]} key={item[0]} className="w-[180px]">
                  {item[0]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          placeholder="도로명/동 주소"
          value={addr}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // 입력값 전후 공백 제거
            setAddr(e.target.value);
          }}
          disabled={disableInputs}
        />
        <Input
          placeholder="병원명"
          value={org}
          onChange={(e) => {
            // 입력값 전후 공백 제거
            setOrg(e.target.value);
          }}
          disabled={disableInputs}
        />

        <Button
          type="button"
          onClick={() => {
            const params = { brtcCd: brtc[1], sggCd: sgg[1], addr, org, disease: "", pageNo: "1" };
            setQueryParams(params);
          }}
          disabled={disableInputs}
        >
          검색
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
