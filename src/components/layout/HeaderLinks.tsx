"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderLinks = () => {
  const pathName = usePathname();

  return (
    <ul className="flex gap-8 items-center w-[588px] h-[60px] p-2 justify-center rounded-[100px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.10)]">
      <li>
        <Link
          href={"/vaccineinfo"}
          className={`${
            pathName.includes("/vaccineinfo") ? "font-bold text-primary-400" : "font-medium text-gray-800"
          } p-[10px]   `}
        >
          연령별 예방접종 정보
        </Link>
      </li>
      <li>
        <Link
          href={"/hospital"}
          className={`${
            pathName.includes("/hospital") ? "font-bold text-primary-400" : "font-medium text-gray-800"
          } p-[10px]   `}
        >
          동네 병원 찾기
        </Link>
      </li>
      <li>
        <Link
          href={"/child"}
          className={`${
            pathName.includes("/child") ? "font-bold text-primary-400" : "font-medium text-gray-800"
          } p-[10px]   `}
        >
          우리 아이 맞춤형 플랜
        </Link>
      </li>
    </ul>
  );
};

export default HeaderLinks;
