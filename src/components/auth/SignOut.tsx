import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import browserClient from "@/utils/supabase/client";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await browserClient.auth.signOut();
    alert("로그아웃 되었습니다. 메인페이지로 이동합니다.");
    router.push("/");
  };
  return (
    <Button
      onClick={handleSignOut}
      className="text-[#636363] text-base font-normal font-['ABeeZee'] leading-normal m-[12px] bg-transparent hover:bg-transparent hover:text-black"
    >
      로그아웃
    </Button>
  );
};

export default SignOut;
