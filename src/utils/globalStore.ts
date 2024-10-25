import { create } from "zustand";

interface MultiState {
  ageGroup: string;
  subAgeGroup: string[];
  selectedAge: string;
  thisVaccine: string;
  setAgeGroup: (newText: string) => void;
  setSelectedAge: (newAge: string) => void;
  setThisVaccine: (newText: string) => void;
}

// 상태 스토어 생성
export const useMultiStore = create<MultiState>((set) => ({
  // 초기 상태
  ageGroup: "신생아",
  subAgeGroup: ["0개월", "1개월", "2개월"],
  selectedAge: "0개월",
  thisVaccine: "",
  // 상태변환 함수
  setAgeGroup: (newText: string) =>
    set(() => {
      const newSubGroup = getSubGroup(newText);
      return {
        ageGroup: newText,
        subAgeGroup: newSubGroup,
        selectedAge: newSubGroup[0]
      };
    }), //
  setSelectedAge: (newAge: string) => set({ selectedAge: newAge }),
  setThisVaccine: (newText: string) => set({ thisVaccine: newText })
}));

//소분류 반환 함수
const getSubGroup = (ageGroup: string) => {
  switch (ageGroup) {
    case "신생아":
      return ["0개월", "1개월", "2개월"];
    case "영아기":
      return ["4개월", "6개월"];
    case "유아기 초기":
      return ["12개월", "15개월", "18개월"];
    case "유아기 중기":
      return ["23개월", "35개월"];
    case "아동기":
      return ["만 4세", "만 6세", "만 11세", "만 12세"];
    default:
      return [""];
  }
};
