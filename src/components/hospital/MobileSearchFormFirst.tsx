import Image from 'next/image';
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import RegionSelect from './RegionSelect';
import SearchIcon from "../../../public/hospital/search-icon.svg";

type MobileSearchFormProps = {
  params: { brtcCd: string; sggCd: string; addr: string; org: string };
  
}

const MobileSearchFormFirst = () => {
  return (
    <form className={cn("grid grid-cols-[144fr_144fr_144fr_196fr_100fr] gap-4 mb-4", "max-sm:grid-cols-[1fr_1fr]")}>
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
        onClick={() => {
          setDisease(DISEASE);
          router.push(createQueryParams({ ...params, pageNo: "1" }, pathname));
          setStep(1);
        }}
        disabled={params.brtcCd === BRTC || params.sggCd === SGG}
        className={cn(
          "h-12 bg-primary-400 rounded-lg text-base font-semibold hover:bg-primary-400 disabled:bg-primary-400",
          "max-sm:mt-1 max-sm:col-span-2"
        )}
      >
        검색
      </Button>
    </form>
  );
  )
}

export default MobileSearchFormFirst