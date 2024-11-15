"use client";

import { usePathname, useRouter } from "next/navigation";
import BackIcon from "../../../public/backicon.svg";
import Link from "next/link";
import Image from "next/image";

interface BackButtonProps {
  childId?: string;
  onBack?: () => void;
}

const BackButton = ({ childId, onBack }: BackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === `child/${childId}`) {
    return (
      <Link href={`/child/`}>
        <Image src={BackIcon} alt="back" width={24} height={24} />
      </Link>
    );
  }

  if (pathname === `child/${childId}/record`) {
    return (
      <Link href={`/child/${childId}`}>
        <Image src={BackIcon} alt="back" width={24} height={24} />
      </Link>
    );
  }

  if (onBack) {
    return (
      <button onClick={onBack}>
        <Image src={BackIcon} alt="back" width={24} height={24} />
      </button>
    );
  }

  return (
    <button onClick={() => router.back()}>
      <Image src={BackIcon} alt="back" width={24} height={24} />
    </button>
  );
};

export default BackButton;
