import { Button } from "../ui/button";
import browserClient from "@/utils/supabase/client";

const SignOut = () => {
  const handleSignOut = async () => {
    await browserClient.auth.signOut();
    alert("로그아웃 되었습니다. 메인페이지로 이동합니다.");
    // 이동해야해
  };
  return <Button onClick={handleSignOut}>로그아웃</Button>;
};

export default SignOut;
