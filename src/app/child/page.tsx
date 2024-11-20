import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import browserClient from "@/utils/supabase/client";
import NoChildIcon from "../../../public/child/no-child-icon.svg";
import ChildTapIconActive from "../../../public/child/child-icon-white.svg";
import ChildTapIcon from "../../../public/child/child-icon-gray.svg";
import Image from "next/image";
import { useState } from "react";
import { Child } from "@/types/childType";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "따꼼 - 우리 아이 맞춤형 플랜",
//   description: "아이를 등록해서 시기에 맞는 접종 정보와 접종 기록을 관리할 수 있어요.",
//   keywords: ["따꼼", "따꼬미", "우리 아이 맞춤", "예방접종"],
//   openGraph: {
//     title: "따꼼 - 우리 아이 맞춤형 플랜",
//     description: "아이를 등록해서 시기에 맞는 접종 정보와 접종 기록을 관리할 수 있어요.",
//     url: "https://www.takkom.site/child",
//     images: [
//       {
//         url: "/opengraph/child-og.png",
//         width: 1280,
//         height: 680,
//         alt: "따꼼 - 우리 아이 맞춤형 플랜"
//       }
//     ]
//   }
// };

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

  // 아이 삭제 함수
  const handleDelete = async (id: string) => {
    // 서버에서 아이 삭제 요청
    const { error } = await browserClient.from("child").delete().eq("id", id);

    if (error) {
      console.error("아이 삭제 실패:", error.message);
      return;
    }

    // 로컬 상태에서 삭제된 아이를 제거
    setChildren((prevChildren) => prevChildren.filter((child) => child.id !== id));
    // 선택된 아이가 삭제된 경우, 새로운 아이를 선택
    if (selectedChildId === id) {
      setSelectedChildId(children.length > 1 ? children[1].id : null);
    }
  };

  return (
    <div className="container flex flex-col mx-auto justify-center max-w-[996px] mt-16 max-sm:mt-3 max-sm:px-6 max-sm:pb-[132px] max-sm:mb-0 xl:bg-gray-10">
      <div className="py-[6px] mb-4 hidden max-sm:block">
        <p className="text-gray-800 text-title-m font-semibold">우리아이</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 max-w-[996px] w-full">
        {/* 좌측 사이드바 영역 */}
        <aside className="w-full bg-white lg:max-w-[180px] max-lg:w-auto max-sm:p-0">
          <div className="flex flex-col max-lg:flex-row p-3 rounded-xl bg-white shadow-[0px_0px_12px_#7272721A] gap-2">
            {children && children.length > 0 && (
              <div className="flex flex-col overflow-x-auto max-lg:flex-row lg:flex-col gap-2">
                {children.map((child) => (
                  <button
                    key={child.id}
                    className={`flex items-center lg:w-full max-lg:w-auto shirnk-0 truncate shrink-0 rounded-lg px-3 py-2 gap-2 ${
                      selectedChildId === child.id ? "bg-primary-300 text-white" : "bg-white"
                    }`}
                    onClick={() => handleTabClick(child.id)}
                  >
                    <Image
                      src={selectedChildId === child.id ? ChildTapIconActive : ChildTapIcon}
                      width={18}
                      height={18}
                      alt="아이 탭 메뉴 아이콘"
                      className=""
                    />
                    {child.name}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center shrink-0 grow-0 justify-start">
              <RegisterButton />
            </div>
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
                      .map((child) => <ChildCard key={child.id} child={child} onDelete={handleDelete} />)
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
  );
};

export default ChildPage;
