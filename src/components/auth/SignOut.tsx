import { createClient } from "@supabase/supabase-js";
import { Button } from "../ui/button";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const SignOut = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    alert("로그아웃 되었습니다. 메인페이지로 이동합니다.");
    // 이동해야해
  };
  return <Button onClick={handleSignOut}>로그아웃</Button>;
};

export default SignOut;
