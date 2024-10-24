export type RegtionItem = {
  cdNm: string,
  cd: string
}
export type RegionType = {
  header: {
    resultCode: number,
    resultMsg: string
  },
  body: {
    items: {
      item: RegtionItem[] | RegtionItem
    },
    pageNo: string,
    dataTime: string,
    numOfRows: string,
    totalCount: string
  }
}

export type HopsitalItem = {
  orgnm: string,
  orgTlno: string,
  orgAddr: string,
  expnYmd: number,
  orgcd: number,
  vcnList: [
    {
      vcnInfo: [
        {
          vcnNm: string,
          vcncd: string
        }
      ]
    }
  ]
}

export type HospitalType = {
  header: {
    resultCode: number,
    resultMsg: string
  },
  body: {
    dataTime: string,
    pageNo: number,
    numOfRows: number,
    totalCount: number,
    maxPage: number,
    items: {
      item: HopsitalItem[]
    }
  }
}