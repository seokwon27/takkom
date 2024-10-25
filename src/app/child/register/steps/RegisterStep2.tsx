"use client";

import { useForm } from "react-hook-form";
import { Child } from "../../page";

interface RegisterStep2Props {
  child: Child; // child prop 추가
  onPrev: () => void;
  onComplete: () => void;
}
const RegisterStep2 = ({ child, onPrev, onComplete }: RegisterStep2Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      // 필요한 접종 내역 필드 초기화
      vaccine1: false,
      vaccine2: false
    }
  });

  const onSubmit = (data: any) => {
    console.log("접종 내역:", data);
    onComplete(); // 완료 처리
  };
  
  return (
    <div>
      <h1>2단계</h1>
      <h2>접종 완료한 내역을 선택해주세요.</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <input type="checkbox" {...register("vaccine1")} />
            BCG 접종 완료
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" {...register("vaccine2")} />
            간염 예방 접종 완료
          </label>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onPrev}>
            이전
          </button>
          <button type="submit" onClick={onComplete}>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep2;
