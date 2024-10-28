export type RegtionItem = {
  cdNm: string;
  cd: string;
};
export type RegionType = {
  header: {
    resultCode: number;
    resultMsg: string;
  };
  body: {
    items: {
      item: RegtionItem[] | RegtionItem;
    };
    pageNo: string;
    dataTime: string;
    numOfRows: string;
    totalCount: string;
  };
};

export type vcnInfo = {
  vcnNm: string;
  vcncd: string;
};

export type HopsitalItem = {
  orgnm: string; // 병원 이름
  orgTlno: string; // 전화번호
  orgAddr: string; // 병원 주소
  expnYmd: number; // 병원 ?
  orgcd: number;
  vcnList: {
    vcnInfo: vcnInfo[] | vcnInfo;
  };
};

export type HospitalType = {
  header: {
    resultCode: number;
    resultMsg: string;
  };
  body: {
    dataTime: string;
    pageNo: number;
    numOfRows: number;
    totalCount: number;
    maxPage: number;
    items: {
      item: HopsitalItem[];
    };
  };
};
