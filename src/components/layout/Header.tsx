import Link from "next/link";
import React from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderAuth from "./HeaderAuth";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import MobileNav from "./MobileNav";

const Header = async () => {
  return (
    // <header
    //   className={`w-full max-w-[1200px] flex justify-between items-center mx-auto pt-12 pb-4 sticky top-0 left-0 right-0 z-10 bg-white`}
    // >
    //   <Link href={"/"} className="max-w-[92px] max-h-[32px]">
    //     <Image src={logo} alt="로고" />
    //   </Link>
    //   <HeaderLinks />
    //   <HeaderAuth />
    // </header>
    <>
      {/* 기존 헤더 - 모바일에서 숨기기 */}
      <header
        className={`w-full max-w-[1200px] flex justify-between items-center mx-auto pt-12 pb-4 sticky top-0 left-0 right-0 z-10 bg-white hidden md:flex`}
      >
        <Link href={"/"} className="max-w-[92px] max-h-[32px]">
          <Image src={logo} alt="로고" />
        </Link>
        <HeaderLinks />
        <HeaderAuth />
      </header>

      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </>
  );
};

export default Header;
