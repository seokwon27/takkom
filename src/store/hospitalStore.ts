import { HospitalSearchParams } from "@/types/hospital";
import { create } from "zustand";

export interface HospitalState {
  step: number;

  setStep: (step: number) => void;
}

export type HospitalStore = ReturnType<typeof createHospitalStore>;

const createHospitalStore = (init?: HospitalSearchParams) =>  {
  const step = (init?.brtcCd && init?.sggCd) ? 1 : 0
  return create<HospitalState>((set) => ({
  step,
  setStep: (step: number) => set(() => ({ step })),
}))};

export default createHospitalStore;
