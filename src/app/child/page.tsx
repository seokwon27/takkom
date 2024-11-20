"use client";
import browserClient from "@/utils/supabase/client";
import { useUserQuery } from "@/query/useUserQuery";
import { useChildrenQuery } from "@/query/useChildQuery";
import { useEffect, useState } from "react";
import { Child } from "@/types/childType";
import Sidebar from "@/components/child/Sidebar";
import ChildCardList from "@/components/child/ChildCardList";
import NoChildren from "@/components/child/NoChildren";

const ChildPage = () => {
  // 현재 로그인한 사용자 정보를 가져오기 위한 useUserQuery 훅 호출
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // userId가 설정된 후에만 useChildrenQuery 호출
  const userId = user?.id; // 현재 로그인한 사용자의 ID를 설정
  const { data: childrenData, isLoading, error } = useChildrenQuery(browserClient, userId);
  // 여기까지 서버에서 요청하는걸로 바꾸기.... 하나의 서브액션으로 처리해서 Children만 반환....을 받아서 각각의 컴포넌트에 데이터를 내려주기???

  // 22-27 loading.tsx, error.tsx 로 로딩표시 에러표시 가능
  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // userId가 로드될 때까지 로딩 표시
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  // 아래 로직은 각각이 아니고~~ 하나의 클라이언트 컴포넌트를 만들어야함 여기서 상태들을 관리하고
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  useEffect(() => {
    if (childrenData) {
      // 생년월일 기준으로 정렬된 children 배열을 상태로 설정
      const sortedChildren = [...childrenData].sort((a, b) => {
        const dateA = new Date(a.birth).getTime();
        const dateB = new Date(b.birth).getTime();
        return dateA - dateB;
      });
      setChildren(sortedChildren);
      // 정렬된 배열의 첫 번째 아이의 ID를 selectedChildId로 설정
      if (sortedChildren.length > 0) {
        setSelectedChildId(sortedChildren[0].id);
      }
    }
  }, [childrenData]);

  const handleTabClick = (childId: string) => {
    setSelectedChildId(childId);
  };

  // 아이 정보 삭제 함수
  const handleDelete = (id: string) => {
    setChildren((prevChildren) => prevChildren.filter((child) => child.id !== id));
  };

  return (
    <div className="container flex flex-col mx-auto justify-center max-w-[996px] mt-16 max-sm:mt-3 max-sm:px-6 max-sm:pb-[132px] max-sm:mb-0 xl:bg-gray-10">
      <div className="py-[6px] mb-4 hidden max-sm:block">
        <p className="text-gray-800 text-title-m font-semibold">우리아이</p>
      </div>
      {/* 여기 통째로 분리: 시작 */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-[996px] w-full">
        {/* 좌측 사이드바 영역 */}
        <Sidebar children={children} selectedChildId={selectedChildId} onTabClick={handleTabClick} />

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-grow w-full">
          {children && children.length > 0 ? (
            <div className="flex flex-col gap-4">
              <ChildCardList children={children} selectedChildId={selectedChildId} onDelete={handleDelete} />
            </div>
          ) : (
            <NoChildren />
          )}
        </main>
      </div>
      {/* 여기 통째로 분리: 끝 */}
    </div>
  );
};

export default ChildPage;
