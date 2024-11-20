// 각 지역(시도/시군구)의 이름cdNm과 코드 번호cd
export type RegionItem = {
  cdNm: string;
  cd: string;
};

// getBrtcCd 또는 getSggCd 반환 타입
export type RegionType = {
  header: {
    resultCode: number;
    resultMsg: string;
  };
  body: {
    items: {
      item: RegionItem[] | RegionItem;
    };
    pageNo: string;
    dataTime: string;
    numOfRows: string;
    totalCount: string;
  };
};

type VcnInfo = {
  vcnNm: string; // 백신 이름 (접종명)
  vcncd: string; // 백신 코드
};

export type HopsitalItem = {
  orgnm: string; // 병원 이름
  orgTlno: string; // 전화번호
  orgAddr: string; // 병원 주소
  expnYmd: number; // 병원 ?
  orgcd: number; // 병원 코드
  vcnList: {
    vcnInfo: VcnInfo[] | VcnInfo;
  };
};

// getHospitals 반환 타입
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

// 병원 목록 결과 type
export type HospitalData = { items: HopsitalItem[]; totalCount: number; maxPage: number };

// 쿼리스트링에 저장될 변수들 타입
export type HospitalSearchParams = {
  brtcCd?: string;
  sggCd?: string;
  addr?: string;
  org?: string;
  disease?: string;
  pageNo?: string;
};

// 공공데이터 에러 타입
export type OpenAPI_Error = {
  cmmMsgHeader: {
    errMsg: string;
    returnAuthMsg: string;
    returnReasonCode: number;
  };
};

export type OpenAPI_ErrorMessage = {
  message: string;
};
