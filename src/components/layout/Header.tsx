import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const supabase = createClient();
  const res = await supabase.auth.getUser();
  const user = res.data.user;

  return (
    <header
      className={`w-full max-w-[1200px] flex justify-between items-center mx-auto sticky top-0 left-0 right-0 z-[100] bg-white mt-12`}
    >
      <Link href={"/"} className="max-w-[92px] max-h-[32px]">
        <img src="/따꼼.svg" />
      </Link>
      <ul className="flex gap-8 items-center max-w-[588px] h-[60px] p-2 justify-center rounded-[100px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.10)]">
        <li>
          <Link href={"/vaccineinfo"} className="p-[10px] text-base">
            연령별 예방접종 정보
          </Link>
        </li>
        <li>
          <Link href={"/search"} className="p-[10px]">
            동네 병원 찾기
          </Link>
        </li>
        <li>
          <Link href={"/child"} className="p-[10px]">
            우리 아이 맞춤형 플랜
          </Link>
        </li>
      </ul>

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
