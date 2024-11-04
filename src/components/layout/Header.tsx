import Link from "next/link";
import React from "react";

const Header = async () => {
  // const user = await fetchCurrentUser();
  return (
    <header className={`w-full max-w-[1200px] flex justify-between items-center mx-auto sticky top-0 left-0 right-0 z-[10] bg-white`}>
        <Link className="font-bold" href={"/"}>
          따꼼
        </Link>
        <ul className="flex gap-4 items-center">
          <li>
            <Link href={"/vaccineinfo"}>연령별 예방접종 정보</Link>
          </li>
          <li>
            <Link href={"/search"}>동네 병원 찾기</Link>
          </li>
          <li>
            <Link href={"/child"}>우리 아이 맞춤형 플랜</Link>
          </li>
        </ul>

        <ul className="flex gap-4 items-center">
          {/* {!user ? (
            <> */}
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
          <li>
            <Link href={"/mypage"}>마이페이지</Link>
          </li>

          {/* </>
          ) : (
            <>
              <li className="flex gap-3 items-center">
                <Link className="font-medium" href={"/mypage"}>
                  <p>Profile</p>
                </Link>
              </li>
            </>
          )} */}
        </ul>
    </header>
  );
};

export default Header;
