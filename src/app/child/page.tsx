"use client";
import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import browserClient from "@/utils/supabase/client";
import { useChildrenQuery, useUserQuery } from "@/api/userApi";

const ChildPage = () => {
  // 현재 로그인한 사용자 정보를 가져오기 위한 useUserQuery 훅 호출
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // userId가 설정된 후에만 useChildrenQuery 호출
  const userId = user?.id; // 현재 로그인한 사용자의 ID를 설정
  const { data: children, isLoading, error } = useChildrenQuery(browserClient, userId);

  console.log("children: ", children);

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // userId가 로드될 때까지 로딩 표시
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <div className="flex justify-center px-8 lg:px-12 mx-auto">
      <div className="flex gap-8 max-w-[996px] w-full">
        {/* 좌측 사이드바 영역 */}
        <aside className="flex-shrink-0">
          <RegisterButton />
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-grow">
          {children && children.length > 0 ? ( // children 배열을 확인
            <div className="flex flex-col gap-4">
              {children.map((child) => (
                <ChildCard key={child.id} child={child} />
              ))}
            </div>
          ) : (
            <p>등록된 아이가 없습니다.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChildPage;
