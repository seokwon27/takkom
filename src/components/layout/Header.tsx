import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import HeaderLinks from "./HeaderLinks";

const Header = async () => {
  const supabase = createClient();
  const res = await supabase.auth.getUser();
  const user = res.data.user;

  return (
    <header
      className={`w-full max-w-[1200px] flex justify-between items-center mx-auto pt-12 pb-4 sticky top-0 left-0 right-0 z-10 bg-white`}
    >
      <Link href={"/"} className="max-w-[92px] max-h-[32px]">
        <img src="/따꼼.svg" />
      </Link>
      <HeaderLinks />

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
    </header>
  );
};

export default Header;
