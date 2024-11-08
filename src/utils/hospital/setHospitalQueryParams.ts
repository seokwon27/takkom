import { DISEASE } from "@/constants/constants";

type HospitalQueryParams = {
  brtcCd?: string;
  sggCd?: string;
  addr?: string;
  org?: string;
  disease?: string;
  pageNo?: string;
};

export const createQueryParams = (params: HospitalQueryParams, pathname: string) => {
  const { brtcCd, sggCd, addr, org, disease, pageNo } = params;
  const searchParams = new URLSearchParams();

  if (!brtcCd || !sggCd) {
    console.error("잘못된 접근입니다.");
    return pathname;
  }

  if (brtcCd) searchParams.set("brtcCd", brtcCd);
  if (sggCd) searchParams.set("sggCd", sggCd);
  if (addr) searchParams.set("addr", addr);
  if (org) searchParams.set("org", org);
  if (disease !== DISEASE && disease) searchParams.set("disease", disease);
  if (pageNo) searchParams.set("pageNo", pageNo);

  const queryString = searchParams.toString();
  return `${pathname}?${queryString}`;
};
