import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const HeaderAuth = async () => {
  const supabaseClient = createClient();
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();


  return (
    <ul className="flex gap-4 items-center">
      {!user ? (
        <>
          <li>
            <Link className="font-medium" href={"/signin"}>
              로그인
            </Link>
          </li>
          <li>
            <Link className="font-medium" href={"/signup"}>
              회원가입
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="flex gap-6 items-center">
            <Link className="font-semibold text-sm text-gray-700 p-2" href={"/mypage"}>
              <p>{`${user.user_metadata.name}님`}</p>
            </Link>
          </li>
          <li>
            <Link href={"/mypage"} className="text-sm text-gray-700 p-2">
              마이페이지
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default HeaderAuth;
