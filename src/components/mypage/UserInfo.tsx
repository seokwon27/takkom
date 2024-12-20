"use client";

import SignOut from "@/components/auth/SignOut";
import { useUserQuery } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Info = () => {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient); // 타입으로 함수를 반환해서 쓰기

  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;
    if (isUserError || !user) {
      router.push("/signin");
      return;
    }
  }, [isUserLoading, isUserError, user, router]);

  return (
    <div className="grid place-items-center gap-6 mt-[84px] w-full max-w-[1200px] mx-auto max-sm:mt-6">
      <div className="w-full max-w-[588px] h-hit flex-col justify-start items-start inline-flex">
        <div className="w-full h-[112px] bg-primary-50 rounded-[13.86px] p-6 max-sm:h-[100px]">
          <div className="grid place-items-start">
            {user ? (
              <>
                <div className="text-gray-800 text-heading-s font-bold">{user.user_metadata.name}님 반갑습니다!</div>
                <div className="text-gray-500 text-label-l">이메일 : {user.user_metadata.email}</div>
              </>
            ) : (
              <div>로딩 중...</div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-center mt-16 mb-20 max-sm:mt-10 max-sm:mb-6">
          <div className="w-full h-fit flex flex-col justify-start items-start gap-6">
            <div className="h-fit w-full flex flex-col justify-start items-start gap-[21px] max-sm:gap-6">
              {/* 임시로 아이정보 페이지로 이동시킴 */}
              {/* <Link href={"/"} className=" text-gray-800 text-label-xl font-normal">
                비밀번호 수정하기
              </Link>
              <hr className="border-t border-gray-30 w-full" /> */}
              <Link href={"/child"} className=" text-gray-800 text-label-xl">
                아이 정보 수정하기
              </Link>
              <hr className="border-t border-gray-30 w-full" />
              <Link href={"/mypage/like?pageNo=1"} className=" text-gray-800 text-label-xl font-normal">
                나의 관심 병원
              </Link>
              <hr className="border-t border-gray-30 w-full" />
              <Link href={"/policy"} className=" text-gray-800 text-label-xl">
                개인정보 처리방침
              </Link>
              <hr className="border-t border-gray-30 w-full" />
              <Link href={"/termsofuse"} className=" text-gray-800 text-label-xl">
                이용 약관
              </Link>
              <hr className="border-t border-gray-30 w-full sm:hidden" />
            </div>
          </div>
        </div>
        <SignOut />
      </div>
    </div>
  );
};

export default Info;
