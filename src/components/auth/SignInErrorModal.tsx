// components/ErrorModal.tsx
import { Button } from "../ui/button";

interface ErrorModalProps {
  showModal: boolean;
  onClose: () => void;
  message: string;
}

const SignInErrorModal: React.FC<ErrorModalProps> = ({ showModal, onClose, message }) => {
  if (!showModal) return null; // 모달이 열려 있을 때만 렌더링

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-[52] pointer-events-auto"
      onClick={onClose} // 모달 외부 클릭 시 모달 닫기
    >
      <div
        className="w-[360px] h-fit max-h-[269px] flex flex-col justify-between p-6 rounded-xl bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 모달 닫히지 않도록
      >
        <h2 className="text-center text-lg font-semibold mb-4 whitespace-pre-line">{message}</h2>
        <div className="flex justify-center">
          <Button
            className="w-[50%] h-14 text-lg font-semibold text-white rounded-xl bg-primary-400 hover:bg-primary-500"
            onClick={onClose} // 확인 버튼 클릭 시 모달 닫기
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInErrorModal;
