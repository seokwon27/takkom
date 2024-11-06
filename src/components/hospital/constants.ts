import { HospitalData } from "@/api/hospitalApi";

export const BRTC = "시/도";

export const SGG = "시/군/구";

export const DISEASE = "접종명";

export const defaultHospitalData: HospitalData = { items: [], totalCount: 0, maxPage: 1 };

export const DISEASE_LIST = [
  "결핵",
  "디프테리아/파상풍/백일해",
  "로타바이러스",
  "사람유두종바이러스",
  "수두",
  "인플루엔자",
  "일본뇌염",
  "폐렴구균",
  "폴리오",
  "홍역/유행성이하선염/풍진",
  "A형간염",
  "b형헤모필루스인플루엔자",
  "B형간염"
];

export const NUM_OF_CARDS_PER_PAGE = 5;
