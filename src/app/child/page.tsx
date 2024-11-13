"use client";
import { Child } from "@/types/childType";
import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import browserClient from "@/utils/supabase/client";
import { useUserQuery } from "@/query/useUserQuery";
import { useChildrenQuery } from "@/query/useChildQuery";
import NoChildIcon from "../../../public/child/no-child-icon.svg";
import ChildTapIconActive from "../../../public/child/child-icon-white.svg";
import ChildTapIcon from "../../../public/child/child-icon-gray.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

const ChildPage = () => {
  // 현재 로그인한 사용자 정보를 가져오기 위한 useUserQuery 훅 호출
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);

  // userId가 설정된 후에만 useChildrenQuery 호출
  const userId = user?.id; // 현재 로그인한 사용자의 ID를 설정
  const { data: childrenData, isLoading, error } = useChildrenQuery(browserClient, userId);

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

  // 사용자 정보를 로드하는 동안 로딩 표시
  if (isUserLoading) return <p>로딩 중...</p>;
  if (isUserError) return <p>사용자 정보를 가져오는 데 오류가 발생했습니다.</p>;

  // userId가 로드될 때까지 로딩 표시
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  const handleTabClick = (childId: string) => {
    setSelectedChildId(childId);
  };

  return (
    <>
      <div className="hidden max-sm:block text-gray-800 text-xl font-semibold px-6 py-1.5 mt-3  ">우리아이</div>
      <div className="flex flex-col lg:flex-row justify-center px-4 sm:px-8 lg:px-12 mx-auto mt-8 lg:mt-16 ">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[996px] w-full">
          {/* 좌측 사이드바 영역 */}
          <aside className="flex-shrink-0 w-full lg:w-auto bg-whtie">
            <div className="flex flex-col justify-start items-start w-full md:w-[180px] gap-2 p-3 rounded-xl bg-white shadow-[0px_0px_12px_#7272721A]">
              {/* 아이 이름별 탭 */}
              {children && children.length > 0 && (
                <div className="flex flex-col gap-2 w-full justify-center display:inline-block">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={`flex items-center px-3 py-2 rounded-lg ${
                        selectedChildId === child.id ? "bg-primary-300 text-white" : "bg-white"
                      }`}
                      onClick={() => handleTabClick(child.id)}
                    >
                      <Image
                        src={selectedChildId === child.id ? ChildTapIconActive : ChildTapIcon}
                        width={18}
                        height={18}
                        alt="아이 탭 메뉴 아이콘"
                        className="mr-2"
                      />
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
              <RegisterButton />
            </div>
          </aside>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-grow w-full">
            {children && children.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  {selectedChildId
                    ? children
                        .filter((child) => child.id === selectedChildId)
                        .map((child) => <ChildCard key={child.id} child={child} />)
                    : null}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-start items-center w-full lg:min-w-[792px] my-20 lg:my-60">
                <Image
                  src={NoChildIcon}
                  width={250}
                  height={182}
                  alt="따꼼 아이콘"
                  className="w-40 h-28 lg:w-[250px] lg:h-[182px] object-cover"
                />
                <p className="text-center text-lg sm:text-xl lg:text-2xl p-4 sm:p-6 lg:p-8 text-gray-200">
                  우리 아이를 등록해 보세요!
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ChildPage;
