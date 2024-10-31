"use client";

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCityDataQuery } from "@/query/useCityDataQuery";

const SelectBrtc = () => {
  const router = useRouter();
  const [brtc, setBrtc] = useState("");
  const [sgg, setSgg] = useState("");
  const { currentDisease } = useAgeGroupStore();

  const { data, error, isPending } = useCityDataQuery();
  if (error) throw new Error(`Error: ${error}`);

  const brtcObj = data?.brtcObj ?? [];
  const regionInfo = Object.entries(data?.regionRes.get(brtc) ?? {});

  const handleClick = () => {
    const searchParams = new URLSearchParams();

    searchParams.set("brtcCd", brtc);
    searchParams.set("sggCd", sgg);
    searchParams.set("disease", currentDisease);

    router.push(`/search?${searchParams.toString()}&pageNo=1`);
  };

  return (
    <>
      <div className="">
        <Select
          value={brtc}
          onValueChange={(value) => {
            setBrtc(value);
            // console.log(value);
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="시/도" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {isPending
                ? "도시 정보"
                : brtcObj.map((item) => {
                    const [brtcCd, brtcName] = item;

                    return (
                      <SelectItem value={brtcCd} key={brtcCd}>
                        {brtcName}
                      </SelectItem>
                    );
                  })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="">
          <Select
            value={sgg}
            onValueChange={(value) => {
              setSgg(value);
              // console.log(value);
            }}
          >
            <SelectTrigger className="" disabled={!brtc}>
              <SelectValue placeholder="시/군/구" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {regionInfo.map((item) => {
                  const [sggCd, sggName] = item;
                  return (
                    <SelectItem value={sggCd} key={sggCd}>
                      {sggName}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleClick} disabled={!brtc || !sgg}>
        확인
      </Button>
    </>
  );
};

export default SelectBrtc;
