"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAgeGroupStore } from "@/utils/zustand/ageGroupStore";
import { useRouter } from "next/navigation";
import { getBrtcCd, getRegionInfo } from "@/api/hospitalApi";

const SelectBrtc = () => {
  const router = useRouter();
  const [brtcObj, setBrtcObj] = useState<BrtcObj>({});
  const [regionInfo, setRegionInfo] = useState<RegionInfo>(new Map());
  const [brtc, setBrtc] = useState<string>("");
  const [sgg, setSgg] = useState<string>("");
  const { thisDisease } = useAgeGroupStore();

  const getCityData = async () => {
    const brtcRes = await getBrtcCd();
    const regionRes = await getRegionInfo();
    // console.log("brtcobj : ", brtcRes);
    setBrtcObj(brtcRes);
    // console.log("regionInfo : ", regionRes);
    setRegionInfo(regionRes);
  };
  useEffect(() => {
    getCityData();
  }, []);

  const handleClick = () => {
    const searchParams = new URLSearchParams();

    searchParams.set("brtcCd", brtc);
    searchParams.set("sggCd", sgg);
    searchParams.set("disease", thisDisease);

    router.push(`/search?${searchParams.toString()}&pageNo=1`);
  };

  // console.log("brtc : ", brtc, "sgg :", sgg);

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
              {Object.entries(brtcObj).map((item) => {
                return (
                  <SelectItem value={"" + item[0]} key={item[0]}>
                    {item[1]}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
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
            <SelectTrigger className="" disabled={brtc === ""}>
              <SelectValue placeholder="시/군/구" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(regionInfo.get(brtc) || {}).map((item) => {
                  return (
                    <SelectItem value={"" + item[0]} key={item[0]}>
                      {item[1]}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </div>
      </div>

      <button
        onClick={() => {
          handleClick();
        }}
        disabled={brtc === "" || sgg === ""}
      >
        확인
      </button>
    </>
  );
};

type BrtcObj = {
  [key: string]: string;
};

type RegionInfo = Map<
  string,
  {
    [key: string]: string;
  }
>;

export default SelectBrtc;
