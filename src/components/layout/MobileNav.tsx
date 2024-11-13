"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "../../../public/common/home.svg";
import InfoIcon from "../../../public/common/vaccine.svg";
import ChildIcon from "../../../public/common/mood-kid.svg";
import SearchIcon from "../../../public/common/search.svg";
import UserIcon from "../../../public/common/empathize.svg";
import Image from "next/image";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white md:hidden pt-2 shadow-[0px_0px_24px_rgba(0,0,0,0.05)]">
      <ul className="flex justify-around items-center h-16 px-4">
        <li className="w-full">
          <Link
            href="/"
            className={`${pathName === "/" ? "text-primary-400" : "text-gray-600"} flex flex-col items-center gap-1.5`}
          >
            <Image src={HomeIcon} alt={"홈버튼"} className="h-6 w-6" />

            <span className="text-xs">홈</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/vaccineinfo"
            className={`${
              pathName.includes("/vaccineinfo") ? "text-primary-400" : "text-gray-600"
            } flex flex-col items-center gap-1.5`}
          >
            <Image src={InfoIcon} alt={"예방접종 아이콘"} className="h-6 w-6" />
            <span className="text-xs">예방접종</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/child"
            className={`${
              pathName.includes("/child") ? "text-primary-400" : "text-gray-600"
            } flex flex-col items-center gap-1.5`}
          >
            <Image src={ChildIcon} alt={"우리아이 아이콘"} className="h-6 w-6" />
            <span className="text-xs">우리아이</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/hospital"
            className={`${
              pathName.includes("/hospital") ? "text-primary-400" : "text-gray-600"
            } flex flex-col items-center gap-1.5`}
          >
            <Image src={SearchIcon} alt={"병원 찾기 아이콘"} className="h-6 w-6" />
            <span className="text-xs">병원 찾기</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/mypage"
            className={`${
              pathName.includes("/mypage") ? "text-primary-400" : "text-gray-600"
            } flex flex-col items-center gap-1.5`}
          >
            <Image src={UserIcon} alt={"마이페이지 아이콘"} className="h-6 w-6" />
            <span className="text-xs">MY</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
