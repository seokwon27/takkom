import { BRTC, DISEASE, SGG } from "@/constants/constants";
import { HospitalSearchParams } from "@/types/hospital";
import { create } from "zustand";

type HospitalSearchStore = { step: number; params: { brtcCd?: string; sggCd?: string; addr?: string; org?: string, disease?: string, pageNo?: string } };

export interface HospitalState {
  step: number;
  params: { brtcCd: string; sggCd: string; addr: string; org: string, disease: string, pageNo: string };

  setStep: (step: number) => void;
  setParams: (params: Partial<HospitalSearchStore['params']>) => void;
  // reset: () => void;
}

const DefaultState: Pick<HospitalState, "step" | "params"> = {
  step: 0,
  params: {
    brtcCd: BRTC,
    sggCd: SGG,
    addr: "",
    org: "",
    disease: DISEASE,
    pageNo: "1"
  }
};

export type HospitalStore = ReturnType<typeof createHospitalStore>;

const createHospitalStore = (init?: HospitalSearchParams) =>  {
  const step = (init?.brtcCd && init?.sggCd) ? 1 : 0
  return create<HospitalState>((set, get) => ({
  step,
  params: {...DefaultState.params, ... init},
  setStep: (step: number) => set(() => ({ step })),
  setParams: (params: Partial<HospitalSearchStore['params']>) => {
    const currentParams = get().params; // 현재 상태의 params 값을 가져옴

    // 새로운 params 값이 기존의 값과 다를 때만 업데이트하도록 조건 추가
    if (
      params.brtcCd !== undefined  && params.brtcCd !== currentParams.brtcCd ||
      params.sggCd !== undefined && params.sggCd !== currentParams.sggCd ||
      params.addr !== undefined && params.addr !== currentParams.addr ||
      params.org !== undefined && params.org !== currentParams.org ||
      params.disease !== undefined && params.disease !== currentParams.disease ||
      params.pageNo !== undefined && params.pageNo !== currentParams.pageNo
    ) {
      console.log('setting :', params)
      set((state) => ({
        params: {
          ...state.params,
          ...params
        }
      }));
    }
  },
  // reset: () => set(() => ({ step: 0, params: { brtcCd: BRTC, sggCd: SGG, addr: "", org: "", disease: DISEASE, pageNo: "1" } }))
}))};

export default createHospitalStore;
