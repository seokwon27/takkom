import { create } from "zustand";

interface AgeState {
  ageGroup: string;
  subAgeGroup: number[];
  selectedAge: number;
  currentDisease: string;
  setAgeGroup: (newText: string) => void;
  setSelectedAge: (newAge: number) => void;
  setThisDisease: (newText: string) => void;
}

// 상태 스토어 생성
export const useAgeGroupStore = create<AgeState>((set) => ({
  // 초기 상태
  ageGroup: "신생아",
  subAgeGroup: [0, 0.4],
  selectedAge: 0,
  currentDisease: "",
  // 상태변환 함수
  setAgeGroup: (newText: string) =>
    set(() => {
      return {
        ageGroup: newText,
        subAgeGroup: subGroup[newText],
        selectedAge: subGroup[newText][0],
        thisDisease: ""
      };
    }), //
  setSelectedAge: (newAge: number) =>
    set(() => {
      return {
        selectedAge: newAge,
        thisDisease: ""
      };
    }),
  setThisDisease: (newText: string) => set({ currentDisease: newText })
}));

//소분류
const subGroup: { [key: string]: number[] } = {
  신생아: [0, 0.4],
  영아기: [1, 2, 4, 6],
  유아기: [12, 15, 18, 19, 24, 48],
  아동기: [72, 132, 144]
};
