"use client";

import { useUserQuery } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const HeaderAuth = () => {
  // 소셜 로그인 정보 반영하기 위해서
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery(browserClient);
  browserClient.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  });

  return (
    <ul className="flex gap-4 items-center">
      {!user ? (
        <>
          <li>
            <Link className="font-medium p-[8px]" href={"/signin"}>
              로그인
            </Link>
          </li>
          <li>
            <Link className="font-medium p-[8px]" href={"/signup"}>
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
