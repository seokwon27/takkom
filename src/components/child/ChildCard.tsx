import React from "react";
import { Child } from "@/types/childType";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import Link from "next/link";

interface ChildCardProps {
  child?: Child; // 등록된 child가 없으면 undefined일 수 있음
  onEdit?: (child: Child) => void; // 수정 기능을 위해 child를 전달
}
export const ChildCard = ({ child }: ChildCardProps) => {
  // child가 없을 때를 대비한 처리
  if (!child) {
    return <div>아이가 등록되지 않았습니다.</div>;
  }

  return (
    <>
      <div>
        <Image
          src={child.profile || DEFAULT_PROFILE_IMAGE_URL} // 기본 이미지 설정
          alt="아이 프로필 이미지"
          width={150}
          height={150}
        />
        <h2>아이 이름: {child.name}</h2>
        <p>생년월일: {child.birth}</p>
        {child.notes && <p>특이사항: {child.notes}</p>}
        <Link key={child.id} href={`/child/${child.id}/edit1`}>
          <button>수정</button>
        </Link>
      </div>
      <div>
        <h3>이번 달 접종 리스트</h3>
        <Link href={`/child/${child.id}`}>
          <button>전체 접종 체크리스트로 이동</button>
        </Link>
      </div>
    </>
  );
};

export default ChildCard;
