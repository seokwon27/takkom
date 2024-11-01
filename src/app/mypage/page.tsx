"use client";

import SignOut from "@/components/auth/SignOut";
import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyPage = () => {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  const router = useRouter();

  const getUser = async () => {
    console.log("유져 정보 가져오는 중");

    const {
      data: { user },
      error: authError
    } = await browserClient.auth.getUser();

    if (authError) {
      console.log("로그인 정보 확인 에러 : ", authError);
      router.push("/");
      return;
    }

    console.log("로그인 정보 : ", user); // 여기까진 불러와짐

    if (user) {
      const { data, error } = await browserClient.from(`user`).select("*").eq("id", user.id); // 여기가 걍 존나 문제임 수파베이스가 문제임

      console.log(data);

      if (error) {
        console.log("유저 정보 가져오기 에러: ", error);
      } else if (data && data.length > 0) {
        setUserData(data[0]); // 첫 번째 사용자 정보 설정
      } else {
        console.log("유저 정보를 찾을 수 없습니다.", error);
      }
    } else {
      console.log("로그인 정보가 없습니다. 로그인 해주세요.");
      router.push("/signin");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <div>{userData.name}님 반갑습니다!</div>
          <div>EMAIL : {userData.email}</div>
        </div>
      ) : (
        <div>로딩 중...</div>
      )}

      <SignOut />
    </div>
  );
};

export default MyPage;
