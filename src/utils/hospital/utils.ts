import { OpenAPI_Error } from "@/types/hospital";

// 에러가 발생했는지 확인할 수 있도록 타입 가드
export function isOpenAPIError<T>(result: T | OpenAPI_Error): result is OpenAPI_Error {
  return (result as OpenAPI_Error).cmmMsgHeader !== undefined;
}

export const checkRequired = (vaccineNames: string[]): [boolean, boolean] => {
  return [
    vaccineNames.some(
      (name) => !!name && !(name.includes("인플루엔자") || name.includes("사람유두종바이러스") || name.includes("PPSV"))
    ),
    vaccineNames.some(
      (name) => !!name && (name.includes("인플루엔자") || name.includes("사람유두종바이러스") || name.includes("PPSV"))
    )
  ];
};
