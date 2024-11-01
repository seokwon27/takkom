import React from "react";
import { Child } from "@/types/childType";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import { Button } from "../ui/button";

interface ChildCardProps {
  child?: Child; // 등록된 child가 없으면 undefined일 수 있음
  onEdit?: () => void;
}
export const ChildCard = ({ child, onEdit }: ChildCardProps) => {
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
        <Button onClick={onEdit}>수정</Button>
      </div>
      <div>
        <h3>이번 달 접종 리스트</h3>
        {/* 접종 리스트 컴포넌트 */}
        <button>전체 접종 체크리스트로 이동</button>
      </div>
    </>
  );
};

export default ChildCard;
