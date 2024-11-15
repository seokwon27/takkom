"use client";

import SignOut from "@/components/auth/SignOut";
import { useUserQuery } from "@/query/useUserQuery";
import browserClient from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Info = () => {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null); // 제네릭
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient); // 타입으로 함수를 반환해서 쓰기

  const router = useRouter();

  console.log(user?.email);

  useEffect(() => {
    if (isUserLoading) return;
    if (isUserError || !user) {
      router.push("/signin");
      return;
    }
    const userInfo = async () => {
      const { data, error } = await browserClient.from("user").select("*").eq("id", user.id);
      if (error) {
        console.log("유저 정보 가져오기 에러: ", error);
      } else if (data && data.length > 0) {
        setUserData(data[0]); // 첫 번째 사용자 정보 설정
      } else {
        console.log("유저 정보를 찾을 수 없습니다.", error);
      }
    };

    userInfo();
  }, [isUserLoading, isUserError, user, router]);

  return (
    <div className="grid place-items-center gap-6 mt-[84px] w-full max-w-[1200px] mx-auto max-sm:mt-6">
      <div className="w-full max-w-[588px] h-hit flex-col justify-start items-start inline-flex">
        <div className="w-full h-[112px] bg-primary-50 rounded-[13.86px] p-6 max-sm:h-[100px]">
          <div className="grid place-items-start">
            {userData ? (
              <>
                <div className="text-gray-800 text-heading-s font-bold">{userData.name}님 반갑습니다!</div>
                <div className="text-gray-500 text-label-l">email : {userData.email}</div>
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
              </Link> */}
              <hr className="border-t border-gray-30 w-full" />
              <Link href={"/child"} className=" text-gray-800 text-label-xl">
                아이 정보 수정하기
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
