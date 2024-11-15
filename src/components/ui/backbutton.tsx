"use client";

import { usePathname, useRouter } from "next/navigation";
import BackIcon from "../../../public/backicon.svg";
import Link from "next/link";
import Image from "next/image";

interface BackButtonProps {
  childId?: string;
}

const BackButton = ({ childId }: BackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes(`child/${childId}`)) {
    return (
      <Link href={`/child/`}>
        <Image src={BackIcon} alt="뒤로가기" width={24} height={24} />
      </Link>
    );
  }

  if (pathname.includes("record")) {
    return (
      <Link href={`/child/${childId}`}>
        <Image src={BackIcon} alt="뒤로가기" width={24} height={24} />
      </Link>
    );
  }

  return (
    <button onClick={() => router.back()}>
      <Image src={BackIcon} alt="뒤로가기" width={24} height={24} />
    </button>
  );
};

export default BackButton;
