import React, { useState } from "react";
import { Child } from "../../app/child/page";

interface ChildModalProps {
  onAddChild: (child: Child) => void;
  onClose: () => void;
}
const ChildModal = ({ onClose, onAddChild }: ChildModalProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // 1단계 제출 후 2단계로 이동
  };

  const handleSubmitStep2 = () => {
    const newChild = { name, birthday, notes };
    onAddChild(newChild);
    resetForm(); // 모달 초기화
    onClose(); // 모달 닫기
  };

  const resetForm = () => {
    setName("");
    setBirthday("");
    setNotes("");
    setStep(1);
  };

  return (
    <div>
      <div>
        {step === 1 && (
          <form onSubmit={handleSubmitStep1}>
            <h2>1단계</h2>
            <h3>정보를 입력해주세요.</h3>
            <div className="mb-4">
              <label>이름:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>생년월일:</label>
              <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label>특이사항:</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={onClose}>
                취소
              </button>
              <button type="submit">다음</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h2>2단계</h2>
            <h3>접종 완료한 내역을 선택해주세요.</h3>
            {/* 백신 체크리스트가 보여질 자리 */}
            {/* <VaccinationChecklist /> */}
            <button onClick={handleSubmitStep2}>등록 완료</button>
            <button type="button" onClick={() => setStep(1)}>
              이전
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildModal;
