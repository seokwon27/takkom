"use client";

import { useUserQuery } from "@/api/userApi";
import SignOut from "@/components/auth/SignOut";
import browserClient from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyPage = () => {
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
      console.log("로그인 정보 : ", user);
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
    <section className="grid place-items-center gap-6 mt-[77px] w-full max-w-[1200px] m-auto">
      <div className="w-[588.42px] h-[442.98px] flex-col justify-start items-start gap-16 inline-flex">
        {userData ? (
          <div className="w-[588px] h-[111.71px] bg-[#f4f8ff] rounded-[13.86px]">
            <div className="grid place-items-center">
              <div className="text-[#303030] text-lg font-bold font-['Pretendard'] leading-normal">
                {userData.name}님 반갑습니다!
              </div>
              <div className="text-[#7c7c7c] text-sm font-normal font-['ABeeZee'] leading-[21px]">
                email : {userData.email}
              </div>
            </div>
          </div>
        ) : (
          <div>로딩 중...</div>
        )}
        <div className="self-stretch h-[267.27px] flex-col justify-start items-center gap-20 flex">
          <div className="self-stretch h-[163.27px] flex-col justify-start items-start gap-6 flex">
            <div className="h-[45.63px] w-[588.42px] flex-col justify-start items-start gap-[21.63px] flex">
              <Link
                href={"/child"}
                className="self-stretch text-[#303030] text-base font-normal font-['ABeeZee'] leading-normal"
              >
                아이 정보 수정하기
              </Link>
<<<<<<< HEAD
              <hr className="bg-gray-800 w-full" />
=======

>>>>>>> 42ad4f3d5dacd551b685c5d7cd340a8412303bf1
              <Link
                href={"/"}
                className="self-stretch text-[#303030] text-base font-normal font-['ABeeZee'] leading-normal"
              >
                개인정보 처리방침
              </Link>
              <hr className="bg-gray-800 w-full" />
              <Link
                href={"/"}
                className="self-stretch text-[#303030] text-base font-normal font-['ABeeZee'] leading-normal"
              >
                이용 약관
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SignOut />
    </section>
  );
};

export default MyPage;
