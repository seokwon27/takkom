"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useChildInfoQuery } from "@/query/useChildQuery";
import { useUserQuery } from "@/query/useUserQuery";
import PreIcon from "../../../public/icon/preIcon.svg";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ToastDescription } from "@/components/ui/toast";
import EditChildForm from "@/components/child/EditChildForm";
import browserClient from "@/utils/supabase/client";

const ChildInfoPageContent = () => {
  const { toast } = useToast();

  // useParams를 이용해 id 추출
  const { id } = useParams();
  const router = useRouter();

  // 현재 로그인한 사용자 정보 가져옴
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // userId가 설정된 후 아이들 정보 가져오기
  const userId = user?.id;
  const childId = Array.isArray(id) ? id[0] : id;
  const { data: child, isLoading: isChildLoading, error: isChildError } = useChildInfoQuery(userId, childId);
  // console.log(child);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // 아이들 정보 로드하는 동안 로딩 표시
  if (isChildLoading) return <p>로딩 중...</p>;
  if (isChildError) return <p>아이 정보를 가져오는 데 오류가 발생했습니다: {isChildError.message}</p>;

  const onComplete = () => {
    toast({
      description: <ToastDescription className="text-white">수정이 완료되었습니다.</ToastDescription>,
      variant: "mobile"
    });
    router.back();
  };

  return (
    <div>
      {/* 모바일에서 보이는 레이아웃 */}
      <div className="w-full px-6 py-2 flex items-center gap-6 sm:hidden">
        <div className="relative">
          {/* 이전 버튼 */}
          <button onClick={() => router.back()}>
            <Image src={PreIcon} alt="이전" />
          </button>
        </div>
        <div className="flex-1 text-center" style={{ transform: "translateX(-24px)" }}>
          <p className="text-base font-bold text-[#303030]">수정하기</p>
        </div>
      </div>
      {/* 데스크톱에서 보이는 레이아웃 */}
      <div className="hidden sm:flex w-full px-6 py-2 gap-6">
        <div className="flex flex-col justify-start items-start self-stretch mb-6">
          <p className="text-[40px] font-bold text-left text-[#303030]">수정하기</p>
        </div>
      </div>

      {child ? <EditChildForm child={child} onComplete={onComplete} /> : <p>아이 정보를 불러올 수 없습니다.</p>}
    </div>
  );
};

export default ChildInfoPageContent;
