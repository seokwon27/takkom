"use client";

import React, { ReactNode, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const BRTC = "시/도";
const SGG = "시/군/구";
const brtcDefault = [BRTC, BRTC];
const sggDefault = [SGG, SGG];

const SearchForm = ({
  children,
  brtcObj,
  regionInfo
}: {
  children: ReactNode;
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

  const setQueryParams = (params: {[key: string] : string}) => {
    let newParams = `?brtcCd=${params.brtcCd}&sggCd=${params.sggCd}`;
  
    if (!params.brtcCd || !params.sggCd) {
      console.log('잘못된 접근입니다.')
      return ;
    }
    if (params.addr) {
      newParams += `&addr=${params.addr}`
    }
    if (params.org) {
      newParams += `&org=${params.org}`
    }
    if (params.disease) {
      newParams += `&disease=${params.disease}`
    }
  
    router.replace(`${pathname}${newParams}`);
    return ;
  }

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
              setAddr('')
              setOrg('')
              setDisableInputs(true)
            }
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder={BRTC} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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
              {Object.entries(regionInfo.get(brtc[0]) ?? {})?.map((item) => (
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
            setAddr(e.target.value.trim());
          }}
          disabled={disableInputs}
        />
        <Input
          placeholder="병원명"
          value={org}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // 입력값 전후 공백 제거
            setOrg(e.target.value.trim());
          }}
          disabled={disableInputs}
        />

        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // 입력값 유지하기 위해 preventDefault()
            e.preventDefault();
            const params = { brtcCd: brtc[0], sggCd: sgg[0], addr, org, disease: '' };
            setQueryParams(params)
          }}
          disabled={disableInputs}
        >
          검색
        </Button>
      </form>
      {children}
    </div>
  );
};

export default SearchForm;


//====================================

// const setQueryParams = (params: {[key: string] : string}) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   let newParams = `?brtcCd=${params.brtcCd}&sggCd=${params.sggCd}`;

//   if (!params.brtcCd || !params.sggCd) {
//     console.log('잘못된 접근입니다.')
//     return ;
//   }
//   if (params.addr) {
//     newParams += `&addr=${params.addr}`
//   }
//   if (params.org) {
//     newParams += `&org=${params.org}`
//   }
//   if (params.disease) {
//     newParams += `&disease=${params.disease}`
//   }

//   router.push(`${pathname}${newParams}`);
//   return ;
// }