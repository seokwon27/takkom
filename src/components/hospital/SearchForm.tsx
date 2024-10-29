"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BRTC, DISEASE, DISEASE_LIST, SGG } from "./constants";
import { Info } from "lucide-react";
import { setQueryParams } from "./setQueryParams";

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
    brtcCd: searchParams.get("brtcCd") || BRTC,
    sggCd: searchParams.get("sggCd") || SGG,
    addr: searchParams.get("addr") || "",
    org: searchParams.get("org") || ""
  });
  const [disableSgg, setDisableSgg] = useState(!searchParams.has("brtcCd"));
  const [disableInputs, setDisableInputs] = useState(
    !searchParams.has("brtcCd") || !searchParams.has("sggCd") ? true : false
  );
  const [disease, setDisease] = useState(searchParams.get("disease") || DISEASE);

  return (
    <div className="w-full flex flex-col ">
      <Info />
      <form className="hospital-search">
        <Select
          value={params.brtcCd}
          onValueChange={(value) => {
            setParams(() => {
              const tmpParams = { brtcCd: value, sggCd: SGG, addr: "", org: "" };
              return tmpParams;
            });
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
          <SelectTrigger
            className={`justify-center ${params.brtcCd === BRTC ? "border-gray-300 text-gray-300" : "border-gray-700"}`}
          >
            <SelectValue placeholder={BRTC + "*"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={BRTC} key={BRTC} className="justify-center">
                {BRTC + "*"}
              </SelectItem>
              {Object.entries(brtcObj).map((item) => (
                <SelectItem value={String(item[0])} key={item[0]} className="justify-center">
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
              const tmpParams = { ...prev };
              tmpParams.sggCd = value;
              console.log(2, tmpParams);
              if (value === SGG) {
                // 기본값으로 바꾸면 입력값 초기화
                tmpParams.addr = "";
                tmpParams.org = "";
                console.log(3, tmpParams);
              }
              return tmpParams;
            });
            if (value === SGG) {
              // 기본값으로 바꾸면 비활성화
              setDisableInputs(true);
            } else {
              setDisableInputs(false);
            }
          }}
        >
          <SelectTrigger
            className={`justify-center ${
              params.sggCd === SGG ? "border-gray-300 text-gray-300" : "border-gray-700 text-gray-700"
            }`}
            disabled={disableSgg}
          >
            <SelectValue placeholder={SGG + "*"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={SGG} key={SGG} className="justify-center">
                {SGG + "*"}
              </SelectItem>
              {Object.entries(regionInfo.get(params.brtcCd) || {}).map((item) => (
                <SelectItem value={String(item[0])} key={item[0]} className="justify-center">
                  {item[1]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          placeholder="도로명/동 주소"
          value={params.addr}
          onChange={(e) => {
            setParams((prev) => {
              const tmpParams = { ...prev, addr: e.target.value };
              return tmpParams;
            });
          }}
          disabled={disableInputs}
          className={`text-center focus-visible:ring-0 focus-visible:ring-offset-0 ${
            params.addr ? "border-gray-700 text-gray-700" : "border-gray-300 text-gray-300"
          }`}
        />
        <Input
          placeholder="병원명"
          value={params.org}
          onChange={(e) => {
            setParams((prev) => {
              const tmpParams = { ...prev, org: e.target.value };
              return tmpParams;
            });
          }}
          disabled={disableInputs}
          className={`text-center focus-visible:ring-0 focus-visible:ring-offset-0 ${
            params.org ? "border-gray-700 text-gray-700" : "border-gray-300 text-gray-300"
          }`}
        />

        <Button
          type="button"
          onClick={() => {
            setDisease(DISEASE);
            setQueryParams(params, router, pathname);
          }}
          disabled={disableInputs}
          className="bg-gray-700 rounded-lg text-base hover:bg-gray-800 disabled:bg-gray-700"
        >
          검색
        </Button>

        {searchParams.has("brtcCd") && searchParams.has("sggCd") && (
          <Select
            value={disease}
            onValueChange={(value) => {
              setDisease(value);
              if (searchParams.has("brtcCd") && searchParams.has("sggCd")) {
                const brtcCd = searchParams.get("brtcCd") || "";
                const sggCd = searchParams.get("sggCd") || "";
                const addr = searchParams.get("addr") || "";
                const org = searchParams.get("org") || "";
                const params = { brtcCd, sggCd, addr, org, disease: value };
                setQueryParams(params, router, pathname);
              }
            }}
          >
            <SelectTrigger
              className={`justify-center ${
                disease === DISEASE ? "border-gray-300 text-gray-300" : "border-gray-700 text-gray-700"
              }`}
              disabled={disableInputs}
            >
              <SelectValue placeholder={DISEASE} />
            </SelectTrigger>
            <SelectContent>
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
        )}
      </form>
    </div>
  );
};

export default SearchForm;
