import { create } from "zustand";

interface MultiState {
  ageGroup: string;
  ageIndex: number;
  thisVaccine: string;
  setAgeGroup: (newText: string) => void;
  setAgeIndex: (index: number) => void;
  setThisVaccine: (newText: string) => void;
}

// 상태 스토어 생성
export const useMultiStore = create<MultiState>((set) => ({
  ageGroup: "신생아", // 초기 상태
  ageIndex: 0,
  thisVaccine: "",
  setAgeGroup: (newText: string) => set({ ageGroup: newText }), //
  setAgeIndex: (index: number) => set({ ageIndex: index }),
  setThisVaccine: (newText: string) => set({ thisVaccine: newText })
}));
