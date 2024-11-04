"use client";

import { useUserQuery } from "@/api/userApi";
import SignOut from "@/components/auth/SignOut";
import browserClient from "@/utils/supabase/client";
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
    <div>
      {userData ? (
        <div>
          <div>{userData.name}님 반갑습니다!</div>
          <div>email : {userData.email}</div>
        </div>
      ) : (
        <div>로딩 중...</div>
      )}

      <SignOut />
    </div>
  );
};

export default MyPage;
