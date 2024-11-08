"use server";

import { defaultHospitalData, NUM_OF_CARDS_PER_PAGE } from "@/constants/constants";
import { HopsitalItem, HospitalType, RegionType } from "@/types/hospital";
import { XMLParser } from "fast-xml-parser";

const serviceKey = process.env.HOSPITAL_KEY_DEC as string;
const BASE_URL = "https://apis.data.go.kr/1790387/orglist3";

// xml to json 변환
// fetch된 데이터를 .text()를 통해 text로 변환한 값을 넣어야 함.
function xmlParser<T>(xmlData: string): T {
  const parser = new XMLParser({
    ignoreAttributes: false, // 속성 유지
    attributeNamePrefix: "" // 속성명 앞에 접두어 없이 처리
  });
  const { response }: { response: T } = parser.parse(xmlData);
  return response;
}

// 시도 정보 가져오기
// brtc는 ... ai에게 질의 결과 basic regional tele-communication의 약자라고 합니다.
// return : key=시도 코드 번호, value=시도 이름
export const getBrtcCd = async (): Promise<{ [key: string]: string }> => {
  const params = new URLSearchParams({ serviceKey });
  const res = await fetch(BASE_URL + `/getCondBrtcCd3?` + params, {
    method: "GET",
    // cache: "no-store",
    next: {
      revalidate: 3600 // 표현식 사용이 불가능해서 원시값으로 변경
    }
  });
  const data = await res.text();
  const {
    body: {
      items: { item }
    }
  } = xmlParser<RegionType>(data);

  if (Array.isArray(item)) {
    const brtcObj: { [key: string]: string } = {};
    item.forEach((ele) => {
      brtcObj[ele.cd] = ele.cdNm;
    });

    return brtcObj;
  }

  const brtcObj: { [key: string]: string } = {};
  const cd = item.cd;
  brtcObj[cd] = item.cdNm;
  return brtcObj;
};

// 시군구 정보 가져오기
// sgg : 시군구
// return : key=시군구 코드 번호, value=시군구 이름
export const getSggCd = async (brtcCd: string): Promise<{ [key: string]: string }> => {
  const params = new URLSearchParams({ serviceKey, brtcCd });
  const res = await fetch(BASE_URL + `/getCondSggCd3?` + params, {
    method: "GET",
    next: {
      revalidate: 3600
    }
  });
  const data = await res.text();
  const {
    body: {
      items: { item }
    }
  } = xmlParser<RegionType>(data);

  if (Array.isArray(item)) {
    const sggObj: { [key: string]: string } = {};
    item.forEach((ele) => {
      sggObj[ele.cd] = ele.cdNm;
    });

    return sggObj;
  }

  const sggObj: { [key: string]: string } = {};
  const cd = item.cd;
  sggObj[cd] = item.cdNm;
  return sggObj;
};

// 시도, 시군구 정보 합치기
// return : key=시도 코드번호, value=해당 시도의 getSggCd값
export const getRegionInfo = async (): Promise<Map<string, { [key: string]: string }>> => {
  const regionInfo = new Map();

  const brtcArray = await getBrtcCd().then((data) => Object.entries(data));

  for (const brtc of brtcArray) {
    const sggArray = await getSggCd(brtc[0]);
    regionInfo.set(brtc[0], sggArray);
  }

  return regionInfo;
};

// 병원 목록 가져오기 위한 input params
export type HospitalParams = {
  // numOfRows: string;
  brtcCd: string; // 각 시/도에 해당하는 코드
  sggCd: string; // 각 시/군/구에 해당하는 코드
  searchTpcd?: string; // 주소:ADDR 또는 기관명:ORG 중 하나를 입력 받는 type code
  searchWord?: string; // 입력한 검색어 word
};

// 병원 목록 결과 type
export type HospitalData = { items: HopsitalItem[]; totalCount: number; maxPage: number };

// 병원 목록 가져오기
export const getHospitals = async (
  input: HospitalParams
): Promise<{ items: HopsitalItem[]; totalCount: number; maxPage: number }> => {
  const params = { serviceKey, ...input, numOfRows: "100", pageNo: "1" };
  const searchParams = new URLSearchParams(params).toString();
  const res = await fetch(BASE_URL + `/getOrgList3?` + searchParams, {
    method: "GET",
    // cache: "no-store",
    next: {
      revalidate: 3600
    }
  });
  const data = await res.text();
  const { header, body } = xmlParser<HospitalType>(data);
  // console.log(xmlParser<HospitalType>(data))
  let item = Array.isArray(body.items.item) ? body.items.item : [body.items.item];

  if (header.resultCode !== 0) {
    return defaultHospitalData;
  }

  if (body.maxPage > 1) {
    const allData = await Promise.all(
      Array(body.maxPage - 1)
        .fill(0)
        .map(async (_, idx) => {
          params.pageNo = "" + (idx + 2);
          const searchParams = new URLSearchParams(params).toString();

          const res = await fetch(BASE_URL + `/getOrgList3?` + searchParams, {
            method: "GET",
            // cache: "no-store",
            next: {
              revalidate: 3600
            }
          });
          const data = await res.text();
          const { body } = xmlParser<HospitalType>(data);
          // console.log(xmlParser<HospitalType>(data))
          return Array.isArray(body.items.item) ? body.items.item : [body.items.item];
        })
    );
    for (const data of allData) {
      item = item.concat(data);
    }
  }

  return { items: item, totalCount: body.totalCount, maxPage: Math.ceil(body.totalCount / NUM_OF_CARDS_PER_PAGE) };
};

// 병원 목록 가져오기 위한 input params
export type HospitalsMutliConditionParams = {
  // pageNo: string;
  // numOfRows: string;
  brtcCd: string; // 각 시/도에 해당하는 코드
  sggCd: string; // 각 시/군/구에 해당하는 코드
  addr?: string; // 주소 검색어
  org?: string; // 병원명 검색어
  disease?: string; // 접종명 필터
};

// 여러 조건에 대해 병원 모록 정보 가져오기
export const getHospitalsMutliConditions = async (input: HospitalsMutliConditionParams) => {
  const { brtcCd, sggCd, addr, org, disease } = input;

  // if (!disease) {
  if (!disease && !org && !addr) {
    // console.log("addr & org 1 :", addr, org);
    const data = await getHospitals({ brtcCd, sggCd });
    return data;
  }
  if (!disease && !org && addr) {
    // console.log("addr & org 2 :", addr, org);
    const data = await getHospitals({ brtcCd, sggCd, searchTpcd: "ADDR", searchWord: addr });
    return data;
  }
  if (!disease && org && !addr) {
    // console.log("addr & org 3 :", addr, org);
    const data = await getHospitals({ brtcCd, sggCd, searchTpcd: "ORG", searchWord: org });
    return data;
  }
  if (!disease && org && addr) {
    // else
    // console.log("addr & org 4 :", addr, org);
    const tmpData = await getHospitals({ brtcCd, sggCd, searchTpcd: "ORG", searchWord: org });
    if (tmpData.totalCount === 0) {
      return defaultHospitalData;
    }
    const items = tmpData.items.filter((item) => item.orgAddr.includes(addr));
    const totalCount = items.length;
    const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE);
    return { items, totalCount, maxPage };
  }
  if (disease && !org && !addr) {
    // console.log("addr & org 5 :", addr, org);
    const tmpData = await getHospitals({ brtcCd, sggCd });
    if (tmpData.totalCount === 0) {
      return defaultHospitalData;
    }
    const items = tmpData.items.filter((item) => {
      if (Array.isArray(item.vcnList.vcnInfo)) {
        return item.vcnList.vcnInfo.some((vcn) => vcn.vcnNm.includes(disease));
      }

      return item.vcnList.vcnInfo.vcnNm.includes(disease);
    });
    const totalCount = items.length;
    const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE);
    return { items, totalCount, maxPage };
  }
  if (disease && !org && addr) {
    // console.log("addr & org 6 :", addr, org);
    const tmpData = await getHospitals({ brtcCd, sggCd, searchTpcd: "ADDR", searchWord: addr });
    if (tmpData.totalCount === 0) {
      return defaultHospitalData;
    }
    const items = tmpData.items.filter((item) => {
      if (Array.isArray(item.vcnList.vcnInfo)) {
        return item.vcnList.vcnInfo.some((vcn) => vcn.vcnNm.includes(disease));
      }

      return item.vcnList.vcnInfo.vcnNm.includes(disease);
    });
    const totalCount = items.length;
    const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE);
    return { items, totalCount, maxPage };
  }
  if (disease && org && !addr) {
    // console.log("addr & org 7 :", addr, org);
    const tmpData = await getHospitals({ brtcCd, sggCd, searchTpcd: "ORG", searchWord: org });
    if (tmpData.totalCount === 0) {
      return defaultHospitalData;
    }
    const items = tmpData.items.filter((item) => {
      if (Array.isArray(item.vcnList.vcnInfo)) {
        return item.vcnList.vcnInfo.some((vcn) => vcn.vcnNm.includes(disease));
      }

      return item.vcnList.vcnInfo.vcnNm.includes(disease);
    });
    const totalCount = items.length;
    const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE);
    return { items, totalCount, maxPage };
  }
  if (disease && org && addr) {
    // else
    // console.log("addr & org 8 :", addr, org);
    const tmpData = await getHospitals({ brtcCd, sggCd, searchTpcd: "ORG", searchWord: org });
    if (tmpData.totalCount === 0) {
      return defaultHospitalData;
    }
    const items = tmpData.items.filter((item) => {
      if (item.orgAddr.includes(addr)) {
        if (Array.isArray(item.vcnList.vcnInfo)) {
          return item.vcnList.vcnInfo.some((vcn) => vcn.vcnNm.includes(disease));
        }

        return item.vcnList.vcnInfo.vcnNm.includes(disease);
      }

      return false;
    });
    const totalCount = items.length;
    const maxPage = Math.ceil(totalCount / NUM_OF_CARDS_PER_PAGE);
    return { items, totalCount, maxPage };
  }

  return defaultHospitalData;
};
