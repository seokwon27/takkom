import { create } from "zustand";

interface AgeState {
  ageGroup: string;
  subAgeGroup: number[];
  selectedAge: number;
  thisDisease: string;
  setAgeGroup: (newText: string) => void;
  setSelectedAge: (newAge: number) => void;
  setThisDisease: (newText: string) => void;
}

// 상태 스토어 생성
export const useAgeGroupStore = create<AgeState>((set) => ({
  // 초기 상태
  ageGroup: "신생아",
  subAgeGroup: [0, 1, 2],
  selectedAge: 0,
  thisDisease: "",
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
  setThisDisease: (newText: string) => set({ thisDisease: newText })
}));

//소분류
const subGroup: { [key: string]: number[] } = {
  신생아: [0, 1, 2],
  영아기: [4, 6],
  유아초기: [12, 15, 18],
  유아중기: [19, 24],
  아동기: [48, 72, 132, 144]
};
