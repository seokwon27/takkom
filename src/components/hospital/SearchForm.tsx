"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useHospitalContext } from "@/providers/HospitalProvider";
import { createQueryParams } from "../../utils/hospital/setHospitalQueryParams";
import { HospitalSearchParams } from "@/types/hospital";
import { BRTC, DISEASE, DISEASE_LIST, SGG } from "../../constants/constants";
import RegionDrawer from "./RegionDrawer";
import DesktopLayout from "../layout/DesktopLayout";
import MobileLayout from "../layout/MobileLayout";
import useQueryParams from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import InfoTag from "./InfoTag";
import RegionSelect from "./RegionSelect";
import InfoCircle from "../../../public/hospital/info-circle.svg";
import VaccineFilterOffIcon from "../../../public/hospital/vaccine-filter-off-icon.svg";
import VaccineFilterOnIcon from "../../../public/hospital/vaccine-filter-on-icon.svg";
import SearchIcon from "../../../public/hospital/search-icon.svg";

type SearchFormProps = {
  brtcObj: { [key: string]: string };
  regionInfo: Map<string, { [key: string]: string }>;
  searchParams: HospitalSearchParams;
};

const SearchForm = ({ brtcObj, regionInfo, searchParams }: SearchFormProps) => {
  const pathname = usePathname();
  const [currentQuery, setCurrentQuery] = useState(new URLSearchParams(searchParams).toString());
  const [currentParams, setQueryParams] = useQueryParams(currentQuery);
  const [params, setParams] = useState<{ brtcCd: string; sggCd: string; addr: string; org: string }>({
    brtcCd: currentParams.brtcCd ?? BRTC,
    sggCd: currentParams.sggCd ?? SGG,
    addr: currentParams.addr ?? "",
    org: currentParams.org ?? ""
  });
  const [disease, setDisease] = useState(currentParams.disease || DISEASE);
  const [showInfoTag, setShowInfoTag] = useState(true);
  const { step, setStep } = useHospitalContext((state) => state);

  // searchParams가 바뀔 때마다 재실행
  useEffect(() => {
    if (!currentParams.brtcCd || !currentParams.sggCd) {
      setStep(0);
    } else {
      setStep(1);
    }
    setParams({
      brtcCd: currentParams.brtcCd ?? BRTC,
      sggCd: currentParams.sggCd ?? SGG,
      addr: currentParams.addr ?? "",
      org: currentParams.org ?? ""
    });
    setDisease((prev) => {
      if (prev !== currentParams?.disease) {
        return currentParams?.disease ?? DISEASE;
      }
      return prev;
    });
  }, [searchParams, currentParams]);

  const onBrtcSelectChange = (value: string) => {
    setParams((prev) => {
      const tmpParams = { ...prev, brtcCd: value, sggCd: SGG, addr: "", org: "" };
      return tmpParams;
    });
  };

  const onSggSelectChange = (value: string) => {
    // 이상하게 기본페이지에서 뒤로가기 하면 실행돼서 빈 문자열이 되는 오류가 있어 조건문 추가
    if (value) {
      setParams((prev) => {
        const tmpParams = { ...prev, sggCd: value, addr: "", org: "" };
        return tmpParams;
      });
    }
  };

  const onBrtcDrawerChange = ([code]: [string, string]) => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setParams((prev) => {
        const tmpParams = { ...prev, brtcCd: String(code), sggCd: SGG, addr: "", org: "" };
        return tmpParams;
      });
    };
  };

  const onSggDrawerChange = ([code]: [string, string]) => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setParams((prev) => {
        const tmpParams = { ...prev, sggCd: String(code), addr: "", org: "" };
        return tmpParams;
      });
    };
  };

  const onVaccineChange = (value: string) => {
    setDisease(value);
    if (currentParams.brtcCd && currentParams.sggCd) {
      const params = { ...currentParams, disease: value, pageNo: "1" };
      setQueryParams(params);
    }
  };

  const onButtonClick = () => {
    setDisease(DISEASE);
    const newURL = createQueryParams({ ...params, pageNo: "1" }, pathname);
    if (newURL !== pathname + "?" + currentQuery) {
      setCurrentQuery(new URLSearchParams({ ...params, pageNo: "1" }).toString());
      setQueryParams({ ...params, pageNo: "1" });
    }
    setStep(1);
  };

  return (
    <>
      <MobileLayout>
        {step === 0 && (
          <>
            <div className="w-full mt-3 px-6 py-1.5 text-title-m text-gray-800 font-bold">검색</div>
            <form className="grid grid-cols-[1fr_1fr] gap-4 mt-14 mb-4 px-6">
              {/* 시도 select */}
              <RegionDrawer
                defaultValue={BRTC}
                regionArray={Object.entries(brtcObj)}
                trigger={params.brtcCd === BRTC}
                disabled={false}
                value={params.brtcCd}
                onClick={onBrtcDrawerChange}
              />
              {/* 시군구 select */}
              <RegionDrawer
                defaultValue={SGG}
                regionArray={Object.entries(regionInfo.get(params.brtcCd) || {}).sort((a, b) =>
                  a[1].localeCompare(b[1])
                )}
                trigger={params.sggCd === SGG}
                disabled={params.brtcCd === BRTC}
                value={params.sggCd}
                onClick={onSggDrawerChange}
              />

              <div className="max-sm:col-span-2 max-sm:relative">
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
                    "focus-visible:bg-white focus-visible:text-gray-600 focus-visible:placeholder:text-gray-400",
                    "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-700",
                    "max-sm:py-3 max-sm:pr-4 max-sm:pl-[42px] max-sm:rounded-xl max-sm:text-left"
                  )}
                />
                <Image src={SearchIcon} alt="검색" className="absolute top-[15px] left-4 sm:hidden" />
              </div>

              <div className="max-sm:col-span-2 max-sm:relative">
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
                    "focus-visible:bg-white focus-visible:text-gray-600 focus-visible:placeholder:text-gray-400",
                    "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-700",
                    "max-sm:py-3 max-sm:pr-4 max-sm:pl-[42px] max-sm:rounded-xl max-sm:text-left"
                  )}
                />
                <Image src={SearchIcon} alt="검색" className="absolute top-[15px] left-4 sm:hidden" />
              </div>

              <Button
                type="button"
                onClick={onButtonClick}
                disabled={params.brtcCd === BRTC || params.sggCd === SGG}
                className={cn(
                  "h-12 bg-primary-400 rounded-lg text-base font-semibold hover:bg-primary-400 disabled:bg-primary-400",
                  "max-sm:mt-1 max-sm:col-span-2 max-sm:rounded-xl"
                )}
              >
                검색
              </Button>
            </form>
          </>
        )}
        {step === 1 && (
          <>
            <div
              className={"w-full flex items-center gap-2 mt-3 mb-1 px-6"}
              onClick={() => {
                setStep(0);
              }}
            >
              <ChevronLeft size={24} className="w-6 h-6 text-gray-400" />
              <div className="w-full h-fit py-[10px] pr-4 pl-[42px] rounded-lg bg-gray-10 text-label-l font-semibold text-gray-700 relative">
                <Image src={SearchIcon} alt="검색" className="absolute top-[11.5px] left-4 sm:hidden" />
                <p>
                  {brtcObj[params.brtcCd]} {regionInfo.get(params.brtcCd)?.[params.sggCd]} {params.addr} {params.org}
                </p>
              </div>
            </div>
            <div className={cn("w-full flex justify-end items-center border-b border-gray-30")}>
              <Select value={disease} onValueChange={onVaccineChange}>
                <SelectTrigger className={`w-fit p-2 mr-6 border-0`}>
                  <Image
                    src={disease === DISEASE ? VaccineFilterOffIcon : VaccineFilterOnIcon}
                    alt="백신 찾기"
                    className="max-sm:w-6 max-sm:aspect-square"
                  />
                  <span className="ml-2 text-gray-700 text-label-xl font-medium max-sm:text-title-xxs max-sm:text-gray-500 max-sm:font-semibold">
                    백신 찾기
                  </span>
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="shadow-[0px_0px_16px_rgba(114,114,114,0.1)] max-sm:h-[216px]"
                  avoidCollisions={false}
                >
                  {/** avoidCollision : 충돌이 발생하는 방향의 반대로 select가 열리게 하는 속성, 항상 아래로 열리도록 false로 변경 */}
                  <SelectGroup>
                    <SelectItem value={DISEASE} key={DISEASE} className="justify-center max-sm:text-text-m">
                      {"전체"}
                    </SelectItem>
                    {DISEASE_LIST.map((name) => (
                      <SelectItem value={name} key={name} className="justify-center max-sm:text-text-m">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </MobileLayout>
      <DesktopLayout>
        <div className="w-full flex gap-2 items-end mb-3 max-sm:hidden">
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
        <form className={cn("grid grid-cols-[144fr_144fr_144fr_196fr_100fr] gap-4 mb-4", "max-sm:grid-cols-[1fr_1fr]")}>
          {/* 시도 select */}
          <RegionSelect
            defaultValue={BRTC}
            regionArray={Object.entries(brtcObj)}
            trigger={params.brtcCd === BRTC}
            disabled={false}
            value={params.brtcCd}
            onValueChange={onBrtcSelectChange}
          />
          {/* 시군구 select */}
          <RegionSelect
            defaultValue={SGG}
            regionArray={Object.entries(regionInfo.get(params.brtcCd) || {}).sort((a, b) => a[1].localeCompare(b[1]))}
            trigger={params.sggCd === SGG}
            disabled={params.brtcCd === BRTC}
            value={params.sggCd}
            onValueChange={onSggSelectChange}
          />

          <div className="max-sm:col-span-2 max-sm:relative">
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
                "focus-visible:bg-white focus-visible:text-gray-600 focus-visible:placeholder:text-gray-400",
                "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-700",
                "max-sm:py-3 max-sm:pr-4 max-sm:pl-[42px] max-sm:rounded-xl max-sm:text-left"
              )}
            />
            <Image src={SearchIcon} alt="검색" className="absolute top-[15px] left-4 sm:hidden" />
          </div>

          <div className="max-sm:col-span-2 max-sm:relative">
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
                "focus-visible:bg-white focus-visible:text-gray-600 focus-visible:placeholder:text-gray-400",
                "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-700",
                "max-sm:py-3 max-sm:pr-4 max-sm:pl-[42px] max-sm:rounded-xl max-sm:text-left"
              )}
            />
            <Image src={SearchIcon} alt="검색" className="absolute top-[15px] left-4 sm:hidden" />
          </div>

          <Button
            type="button"
            onClick={onButtonClick}
            disabled={params.brtcCd === BRTC || params.sggCd === SGG}
            className={cn(
              "h-12 bg-primary-400 rounded-lg text-base font-semibold hover:bg-primary-400 disabled:bg-primary-400",
              "max-sm:mt-1 max-sm:col-span-2"
            )}
          >
            검색
          </Button>
        </form>
        <div className={cn("w-full flex justify-end items-center")}>
          <Select value={disease} onValueChange={onVaccineChange}>
            <SelectTrigger className={`w-fit p-2 border-0`}>
              {disease !== DISEASE && (
                <p className="h-fit px-3 py-[6px] mr-4 bg-primary-50 ring-inset ring-1 ring-primary-400 rounded-[18px] text-primary-400 text-base">
                  {disease}
                </p>
              )}
              <Image
                src={disease === DISEASE ? VaccineFilterOffIcon : VaccineFilterOnIcon}
                alt="백신 찾기"
                className="max-sm:w-6 max-sm:aspect-square"
              />
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
      </DesktopLayout>
    </>
  );
};

export default SearchForm;
