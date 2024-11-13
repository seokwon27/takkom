import { BRTC, SGG } from "@/constants/constants";
import { create } from "zustand";

type HospitalSearchStore = { step: number; params: { brtcCd?: string; sggCd?: string; addr?: string; org?: string } };

interface HospitalSearchState {
  step: number;
  params: { brtcCd: string; sggCd: string; addr: string; org: string };

  setStep: (step: number) => void;
  setParams: (params: Pick<HospitalSearchState, 'params'>) => void;
  reset: () => void;
}

const INITIAL: Pick<HospitalSearchState, "step" | "params"> = {
  step: 0,
  params: {
    brtcCd: BRTC,
    sggCd: SGG,
    addr: "",
    org: ""
  }
};

const useHospitalSearchStore = create<HospitalSearchState>((set, get) => ({
  ...INITIAL,
  setStep: (step: number) => set(() => ({ step })),
  setParams: (params: HospitalSearchStore['params']) => {
    const currentParams = get().params; // 현재 상태의 params 값을 가져옴

    // 새로운 params 값이 기존의 값과 다를 때만 업데이트하도록 조건 추가
    if (
      params.brtcCd  && params.brtcCd !== currentParams.brtcCd ||
      params.sggCd !== undefined && params.sggCd !== currentParams.sggCd ||
      params.addr !== undefined && params.addr !== currentParams.addr ||
      params.org !== undefined && params.org !== currentParams.org
    ) {
      set((state) => ({
        params: {
          ...state.params,
          ...params
        }
      }));
    }
  },
  reset: () => set(() => ({ step: 0, params: { brtcCd: BRTC, sggCd: SGG, addr: "", org: "" } }))
}));

export default useHospitalSearchStore;
