"use server";
import { HospitalType, RegionType } from "@/types/hospital";
import { XMLParser } from "fast-xml-parser";

const serviceKey = process.env.NEXT_PUBLIC_HOSPITAL_KEY_DEC as string;
const BASE_URL = "https://apis.data.go.kr/1790387/orglist3";

// xml to json 변환
// fetch된 데이터를 .text()를 통해 text로 변환한 값을 넣어야 함.
function xmlParser<T> (xmlData: string): T {
  const parser = new XMLParser({
    ignoreAttributes: false, // 속성 유지
    attributeNamePrefix: "", // 속성명 앞에 접두어 없이 처리
  });
  const {response}:{response: T} = parser.parse(xmlData);
  return response;
}

// 시도 정보 가져오기
export const getBrtcCd = async () => {
  const params = new URLSearchParams({serviceKey});
  const res = await fetch(BASE_URL+`/getCondBrtcCd3?`+params,{
    method:"GET",
  })
  const data = await res.text();
  const {header, body:{items:{item}}} = xmlParser<RegionType>(data);

  const brtcArray = item.map(ele => [ele.cd, ele.cdNm])

  return brtcArray;
}

// 시도 정보 가져오기
export const getSggCd = async (brtcCd: string) => {
  const params = new URLSearchParams({serviceKey, brtcCd});
  const res = await fetch(BASE_URL+`/getCondSggCd3?`+params,{
    method:"GET",
  })
  const data = await res.text();
  const {header, body:{items:{item}}} = xmlParser<RegionType>(data);

  const brtcArray = item.map(ele => [ele.cd, ele.cdNm])

  return brtcArray;
}

// 병원 목록 가져오기 위한 input params
type HospitalParams = {
  pageNo: string;
  numOfRows: string;
  brtcCd: string;
  sggCd: string;
  sesarchTpcd?: string;
  seasrchWord?: string;
};

// 병원 목록 가져오기
export const getHospitals = async (inputs: HospitalParams) => {
  const params = {serviceKey, ...inputs}
  const searchParams = new URLSearchParams(params).toString();
  const res = await fetch(BASE_URL + `/getOrgList3?` + searchParams, {
    method: "GET"
  });
  const data = await res.text();
  const {header, body} = xmlParser<HospitalType>(data);
  const item = body.items.item
  console.log(header)
  console.log(body)

  if (header.resultCode !== 0) {
    return '죄송합니다. 데이터를 불러오는 중에 에러가 발생했습니다.'
  }

  return item;
};
