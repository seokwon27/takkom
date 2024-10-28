"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BRTC, DISEASE, DISEASE_LIST, SGG } from "./constants";

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
  const [brtc, setBrtc] = useState<string>(searchParams.get("brtcCd") || BRTC);
  const [sgg, setSgg] = useState<string>(searchParams.get("sggCd") || SGG);
  const [disableSgg, setDisableSgg] = useState(!searchParams.has("brtcCd"));
  const [disableInputs, setDisableInputs] = useState((!searchParams.has("brtcCd") || !searchParams.has('sggCd')) ? true : false);
  const [addr, setAddr] = useState(searchParams.get("addr") ?? "");
  const [org, setOrg] = useState(searchParams.get("org") ?? "");
  const [disease, setDisease] = useState(searchParams.get("disease") || DISEASE);

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
    if (disease !== DISEASE) searchParams.set("disease", disease);
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
          value={brtc}
          onValueChange={(value) => {
            setBrtc(value);
            setSgg(SGG);
            setAddr("");
            setOrg("");
            setDisease(DISEASE);
            setDisableInputs(true);
            if (value === BRTC) {
              // 선택 값이 없으면 모든 영역 초기화
              setDisableSgg(true);
            } else {
              // 시/도 설정 시 시/군/구 활성화
              setDisableSgg(false);
            }
          }}
        >
          <SelectTrigger className={`justify-center ${brtc === BRTC ? 'border-gray-300 text-gray-300' : 'border-gray-700'}`}>
            <SelectValue placeholder={BRTC+'*'}/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={BRTC} key={BRTC} className="justify-center">
                {BRTC+'*'}
              </SelectItem>
              {Object.entries(brtcObj).map((item) => (
                <SelectItem value={"" + item[0]} key={item[0]}  className="justify-center">
                  {item[1]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={sgg}
          onValueChange={(value) => {
            setSgg(value);
            if (value === SGG) {
              // 기본값으로 바꾸면 입력값 초기화 및 비활성화
              setAddr("");
              setOrg("");
              setDisableInputs(true);
            } else {
              setDisableInputs(false);
            }
          }}
        >
          <SelectTrigger className={`justify-center ${sgg === SGG ? 'border-gray-300 text-gray-300' : 'border-gray-700 text-gray-700'}`} value={sgg} disabled={disableSgg}>
            <SelectValue placeholder={SGG+'*'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={SGG} key={SGG} className="justify-center">
                {SGG+'*'}
              </SelectItem>
              {Object.entries(regionInfo.get(brtc) || {}).map((item) => (
                <SelectItem value={"" + item[0]} key={item[0]}  className="justify-center">
                  {item[1]}
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
          className={`text-center focus-visible:ring-0 focus-visible:ring-offset-0 ${addr ? 'border-gray-700 text-gray-700' : 'border-gray-300 text-gray-300'}`}
        />
        <Input
          placeholder="병원명"
          value={org}
          onChange={(e) => {
            // 입력값 전후 공백 제거
            setOrg(e.target.value);
          }}
          disabled={disableInputs}
          className={`text-center focus-visible:ring-0 focus-visible:ring-offset-0 ${org ? 'border-gray-700 text-gray-700' : 'border-gray-300 text-gray-300'}`}
        />

        <Button
          type="button"
          onClick={() => {
            const params = { brtcCd: brtc, sggCd: sgg, addr, org, disease, pageNo: "1" };
            setQueryParams(params);
          }}
          disabled={disableInputs}
          className="bg-gray-700 rounded-lg text-base hover:bg-gray-800 disabled:bg-gray-700"
        >
          검색
        </Button>

        <Select
          value={disease}
          onValueChange={(value) => {
            setDisease(value);
          }}
        >
          <SelectTrigger className={`justify-center ${disease === DISEASE ? 'border-gray-300 text-gray-300' : 'border-gray-700 text-gray-700'}`} value={disease} disabled={disableInputs}>
            <SelectValue placeholder={DISEASE} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={DISEASE} key={DISEASE}  className="justify-center">
                {DISEASE}
              </SelectItem>
              {DISEASE_LIST.map((name) => (
                <SelectItem value={name} key={name}  className="justify-center">
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};

export default SearchForm;
