import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signout } from "@/api/auth-actions";
import { useQueryClient } from "@tanstack/react-query";

const SignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    // server-action으로 변경
    await signout();
    // user와 관련된 쿼리 데이터 무효화
    queryClient.invalidateQueries({ queryKey: ["user"] });

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
