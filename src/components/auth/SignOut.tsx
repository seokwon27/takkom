import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signout } from "@/api/auth-actions";
import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import SignOutModal from "./SignOutModal";

const SignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  const handleSignOut = async () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });

    await signout();

    //   setShowModal(false); // 로그아웃 후 모달 닫기
    router.push("/");
  };

  // const handleCloseModal = () => {
  //   setShowModal(false); // 모달 닫기
  // };

  return (
    <>
      {/* 로그아웃 버튼 */}
      <Button
        onClick={() => handleSignOut()}
        className="h-fit text-gray-700 text-text-xl font-normal mx-auto p-0 bg-transparent hover:bg-transparent hover:text-black max-sm:ml-0"
      >
        로그아웃
      </Button>

      {/* SignOutModal 컴포넌트 사용 */}
      {/* <SignOutModal
        showModal={showModal}
        onClose={handleCloseModal} // 취소 버튼이나 모달 외부 클릭 시 모달 닫기
        onSignOut={handleSignOut} // 로그아웃 처리
      /> */}
    </>
  );
};

export default SignOut;
