import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signout } from "@/api/auth-actions";
import { useQueryClient } from "@tanstack/react-query";

const SignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });

    await signout();

    router.push("/");
  };

  return (
    <>
      {/* 로그아웃 버튼 */}
      <Button
        onClick={() => handleSignOut()}
        className="h-fit text-gray-700 text-text-xl font-normal mx-auto p-0 bg-transparent hover:bg-transparent hover:text-black max-sm:ml-0"
      >
        로그아웃
      </Button>
    </>
  );
};

export default SignOut;
