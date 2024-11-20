import Sidebar from "@/components/child/Sidebar";
import ChildCardList from "@/components/child/ChildCardList";
import NoChildren from "@/components/child/NoChildren";
import Loading from "@/components/child/loading";
import ErrorMessage from "@/components/child/error";
import useChildrenData from "@/components/child/useChildrenData";

const ChildPage = () => {
  console.log("ChildPage 컴포넌트 렌더링됨");
  console.log(useChildrenData);

  const { children, setChildren, selectedChildId, setSelectedChildId, isUserLoading, isUserError, isLoading, error } =
    useChildrenData();
  
  console.log("useChildrenData 호출됨:", { children, isUserLoading, isUserError, isLoading, error });

  // 로딩 중 또는 에러 발생 시 처리
  if (isUserLoading || isLoading) return <Loading />;
  if (isUserError) return <ErrorMessage message="사용자 정보를 가져오는 데 오류가 발생했습니다." />;
  if (error) return <ErrorMessage message={error.message} />;

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
