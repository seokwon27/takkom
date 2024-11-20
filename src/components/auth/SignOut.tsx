import { Button } from "../ui/button";
import { signout } from "@/api/auth-actions";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const SignOut = () => {
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });

    await signout();
  };

  return (
    <>
      {/* 로그아웃 버튼 */}
      <Link href={"/"}>
        <Button
          onClick={() => handleSignOut()}
          className="h-fit text-gray-700 text-text-xl font-normal mx-auto p-0 bg-transparent hover:bg-transparent hover:text-black max-sm:ml-0"
        >
          로그아웃
        </Button>
      </Link>
    </>
  );
};

export default SignOut;
