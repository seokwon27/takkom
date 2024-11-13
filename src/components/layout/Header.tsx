import Link from "next/link";
import React from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderAuth from "./HeaderAuth";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import MobileNav from "./MobileNav";

const Header = async () => {
  return (
    <>
      {/* pc 화면세어 보이는 헤더 - 모바일에서 숨기기 */}
      <header
        className={`w-full max-w-[1200px] flex justify-between items-center mx-auto pt-12 pb-4 sticky top-0 left-0 right-0 z-10 bg-white hidden md:flex`}
      >
        <Link href={"/"} className="max-w-[92px] max-h-[32px]">
          <Image src={logo} alt="로고" />
        </Link>
        <HeaderLinks />
        <HeaderAuth />
      </header>

      {/* 모바일 환경에서 로고 상단에 배치, 모바일 하단 네비게이션 */}
      <div className="md:hidden">
        <header className="w-full bg-white pt-3 px-6 sticky top-0 left-0 right-0 z-10">
          <Link href={"/"} className="flexr">
            <Image src={logo} alt="로고" width={92} height={32} />
          </Link>
        </header>
        <MobileNav />
      </div>
    </>
  );
};

export default Header;
