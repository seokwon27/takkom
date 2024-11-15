import { Button } from "../ui/button";

interface SignUpStatusModalProps {
  showModal: boolean;
  onClose: () => void;
  status: "success" | "failure"; // 성공, 실패 상태
  message: string; // 성공, 실패 메시지
}

const SignUpStatusModal: React.FC<SignUpStatusModalProps> = ({ showModal, onClose, message }) => {
  if (!showModal) return null;

  const modalMessage = message;

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-[52] pointer-events-auto" onClick={onClose}>
      <div
        className="w-[360px] h-fit max-h-[269px] flex flex-col justify-between p-6 rounded-xl bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-lg font-semibold mb-4 whitespace-pre-line">{modalMessage}</p>

        <div className="flex justify-around">
          <Button
            className={"w-[50%] h-14 text-lg font-semibold text-white rounded-xl bg-primary-400 hover:bg-primary-500"}
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpStatusModal;
